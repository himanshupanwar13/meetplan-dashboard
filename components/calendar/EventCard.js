/**
 * components/calendar/EventCard.js
 * Renders a single Google Calendar event.
 * Full MeetPlan design will be applied in Phase 3.
 */
import { format } from "date-fns";

export default function EventCard({ event }) {
  const start = event.start?.dateTime
    ? new Date(event.start.dateTime)
    : new Date(event.start?.date);

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition">
      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 shrink-0">
        <span className="text-xs font-semibold uppercase leading-none">
          {format(start, "MMM")}
        </span>
        <span className="text-lg font-bold leading-tight">
          {format(start, "d")}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {event.summary ?? "Untitled event"}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {event.start?.dateTime ? format(start, "h:mm a") : "All day"}
        </p>
        {event.location && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {event.location}
          </p>
        )}
      </div>
    </div>
  );
}