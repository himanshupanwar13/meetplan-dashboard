/**
 * app/api/calendar/route.js
 * Protected server-side API endpoint to retrieve Google Calendar events.
 * Tokens stay server-side inside the encrypted HTTP cookie.
 * Automatically handles token expiration and token refresh.
 */
import { getToken } from "next-auth/jwt";
import { refreshGoogleAccessToken } from "@/lib/auth";
import { getUpcomingEvents } from "@/lib/googleCalendar";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in with Google." },
        { status: 401 }
      );
    }

    let accessToken = token.accessToken;

    // Check if access token is expired or close to expiry (1 minute buffer)
    const isExpired =
      token.expiresAt && Date.now() >= token.expiresAt * 1000 - 60000;

    if (isExpired && token.refreshToken) {
      console.log("[API /api/calendar] Access token expired. Attempting token refresh...");
      const refreshed = await refreshGoogleAccessToken(token);
      if (refreshed?.accessToken) {
        accessToken = refreshed.accessToken;
      }
    }

    try {
      const events = await getUpcomingEvents(accessToken);
      return NextResponse.json({
        events,
        isGoogleConnected: true,
        count: events.length,
      });
    } catch (apiError) {
      // If token expired on Google's end (401), attempt one emergency refresh
      if (apiError.status === 401 && token.refreshToken) {
        console.log("[API /api/calendar] Google returned 401. Retrying with refreshed token...");
        const refreshed = await refreshGoogleAccessToken(token);
        if (refreshed?.accessToken) {
          const events = await getUpcomingEvents(refreshed.accessToken);
          return NextResponse.json({
            events,
            isGoogleConnected: true,
            count: events.length,
          });
        }
      }
      throw apiError;
    }
  } catch (err) {
    console.error("[API /api/calendar Error Caught]", {
      message: err.message,
      status: err.status,
      reason: err.reason,
      domain: err.domain,
      extendedHelp: err.extendedHelp,
    });
    return NextResponse.json(
      {
        error: err.message || "Failed to fetch Google Calendar events",
        reason: err.reason || "UNKNOWN",
        domain: err.domain || null,
        extendedHelp: err.extendedHelp || null,
        isGoogleConnected: false,
      },
      { status: err.status || 500 }
    );
  }
}