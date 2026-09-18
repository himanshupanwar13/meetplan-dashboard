/**
 * lib/googleCalendar.js
 * Server-side helper to fetch and normalize Google Calendar events.
 * Runs strictly on the server: keeps tokens and credentials secure.
 */
import { format, isToday, isTomorrow, parseISO } from "date-fns";

const CALENDAR_API = "https://www.googleapis.com/calendar/v3";

/**
 * Detect meeting platform from links, conferenceData, or location.
 * Returns: "meet" | "zoom" | "teams" | "calendar"
 */
function detectPlatform(event, joinUrl) {
  const checkString = `${joinUrl || ""} ${event.location || ""} ${event.description || ""}`.toLowerCase();

  if (checkString.includes("meet.google.com") || event.hangoutLink) {
    return "meet";
  }
  if (checkString.includes("zoom.us")) {
    return "zoom";
  }
  if (checkString.includes("teams.microsoft.com") || checkString.includes("teams.live.com")) {
    return "teams";
  }

  // Default to meet if video conference data is present, else general calendar
  if (event.conferenceData?.entryPoints?.some((ep) => ep.entryPointType === "video")) {
    return "meet";
  }

  return "calendar";
}

/**
 * Extract the primary join URL from Google Calendar event properties.
 */
function extractJoinUrl(event) {
  // 1. Google Meet hangout link
  if (event.hangoutLink) {
    return event.hangoutLink;
  }

  // 2. Video conference entry points
  const videoEp = event.conferenceData?.entryPoints?.find(
    (ep) => ep.entryPointType === "video" && ep.uri
  );
  if (videoEp?.uri) {
    return videoEp.uri;
  }

  // 3. URL in location
  if (event.location && /^https?:\/\//i.test(event.location.trim())) {
    return event.location.trim();
  }

  // 4. URL found in description (Zoom / Teams / Meet link)
  if (event.description) {
    const urlMatch = event.description.match(
      /https:\/\/(?:[a-zA-Z0-9-]+\.)?(?:zoom\.us\/[^\s<"]+|meet\.google\.com\/[^\s<"]+|teams\.microsoft\.com\/[^\s<"]+)/i
    );
    if (urlMatch?.[0]) {
      return urlMatch[0];
    }
  }

  // 5. Fallback to Google Calendar event web link
  return event.htmlLink || null;
}

/**
 * Format time and day string using date-fns.
 */
function formatEventTime(startObj) {
  if (!startObj) return { time: "TBD", day: "Upcoming", isEventToday: false };

  // All-day events only provide a date (YYYY-MM-DD)
  if (!startObj.dateTime && startObj.date) {
    const d = parseISO(startObj.date);
    return {
      time: "All day",
      day: isToday(d) ? "Today" : isTomorrow(d) ? "Tomorrow" : format(d, "MMM d"),
      isEventToday: isToday(d),
    };
  }

  // Timed events provide dateTime
  const date = new Date(startObj.dateTime);
  const isEventToday = isToday(date);
  const day = isEventToday
    ? "Today"
    : isTomorrow(date)
    ? "Tomorrow"
    : format(date, "MMM d");

  return {
    time: format(date, "hh:mm a"),
    day,
    isEventToday,
  };
}

/**
 * Normalize Google Calendar event into MeetPlan's dashboard format.
 */
export function normalizeCalendarEvent(item) {
  const joinUrl = extractJoinUrl(item);
  const platform = detectPlatform(item, joinUrl);
  const { time, day, isEventToday } = formatEventTime(item.start);

  // Parse attendees safely (exclude resource rooms)
  const validAttendees = (item.attendees || [])
    .filter((a) => !a.resource)
    .map((a) => ({
      name: a.displayName || (a.email ? a.email.split("@")[0] : "Guest"),
      email: a.email,
      avatar: null, // Initials will be displayed cleanly
    }));

  const visibleAttendees = validAttendees.slice(0, 2);
  const extraAttendees = Math.max(0, validAttendees.length - 2);

  // Subtitle: clean first line of description, organizer name, or location
  let subtitle = "Google Calendar";
  if (item.description) {
    const firstLine = item.description.replace(/<[^>]*>?/gm, "").split("\n")[0].trim();
    if (firstLine && firstLine.length > 0 && !firstLine.startsWith("http")) {
      subtitle = firstLine.length > 40 ? `${firstLine.slice(0, 40)}...` : firstLine;
    }
  } else if (item.organizer?.displayName) {
    subtitle = `By ${item.organizer.displayName}`;
  } else if (item.location && !item.location.startsWith("http")) {
    subtitle = item.location;
  }

  return {
    id: item.id,
    title: item.summary || "(No Title)",
    subtitle,
    time,
    day,
    isToday: isEventToday,
    platform,
    joinUrl,
    attendees: visibleAttendees,
    extraAttendees,
    rawStart: item.start?.dateTime || item.start?.date,
  };
}

/**
 * Fetch upcoming events from Google Calendar API.
 * Performs safe scope check and detailed error diagnostics.
 * NEVER logs tokens, secrets, or credentials.
 * @param {string} accessToken Valid Google OAuth access token
 * @param {number} maxResults Maximum number of events to fetch
 * @returns {Promise<Array>} Normalized array of upcoming meetings
 */
export async function getUpcomingEvents(accessToken, maxResults = 15) {
  const now = new Date().toISOString();

  // 1. Diagnostic: Check granted scopes from Google's tokeninfo endpoint (safe, non-sensitive)
  try {
    const tokenInfoRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );
    if (tokenInfoRes.ok) {
      const tokenInfo = await tokenInfoRes.json();
      const grantedScopes = tokenInfo.scope ? tokenInfo.scope.split(" ") : [];
      const hasCalendarReadonly = grantedScopes.some((s) =>
        s.includes("calendar.readonly")
      );

      console.log("[Google OAuth Scope Diagnostic]", {
        hasCalendarReadonly,
        scopeCount: grantedScopes.length,
        grantedScopes: tokenInfo.scope,
      });

      if (!hasCalendarReadonly) {
        console.warn(
          "[Google OAuth Warning] Token missing 'calendar.readonly' scope. Granted:",
          tokenInfo.scope
        );
      }
    } else {
      const tokenInfoErr = await tokenInfoRes.json().catch(() => ({}));
      console.warn("[Google TokenInfo Check Non-OK]", {
        status: tokenInfoRes.status,
        error: tokenInfoErr.error_description || tokenInfoErr.error,
      });
    }
  } catch (diagErr) {
    console.warn("[Google TokenInfo Check Error]:", diagErr.message);
  }

  // 2. Query Google Calendar API /calendars/primary/events
  const url = new URL(`${CALENDAR_API}/calendars/primary/events`);
  url.searchParams.set("timeMin", now);
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("conferenceDataVersion", "1");

  console.log(`[Google Calendar Request] GET ${url.origin}${url.pathname}`);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errorObj = errorBody.error || {};
    const firstError = errorObj.errors?.[0] || {};

    // Log exact Google API diagnostic information without credentials
    console.error("[Google Calendar API Error Diagnostic]", {
      httpStatus: res.status,
      statusText: res.statusText,
      errorCode: errorObj.code,
      errorStatus: errorObj.status,
      reason: firstError.reason,
      domain: firstError.domain,
      message: errorObj.message,
      extendedHelp: firstError.extendedHelp,
    });

    const err = new Error(
      errorObj.message || `Google Calendar API error (${res.status})`
    );
    err.status = res.status;
    err.reason = firstError.reason || errorObj.status || "UNKNOWN";
    err.domain = firstError.domain;
    err.extendedHelp = firstError.extendedHelp;
    throw err;
  }

  const data = await res.json();
  const rawItems = data.items || [];

  return rawItems.map(normalizeCalendarEvent);
}