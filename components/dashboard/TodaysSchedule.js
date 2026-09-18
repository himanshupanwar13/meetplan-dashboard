/**
 * components/dashboard/TodaysSchedule.js
 * Today's Schedule timeline component matching the MeetPlan design reference.
 * Displays ordered timeline events with colored status dots,
 * platform badges, titles, and context menus.
 * Gracefully displays live Google Calendar events for today or fallback data.
 */
import Card from "@/components/ui/Card";
import {
  GoogleMeetIcon,
  ZoomIcon,
  TeamsIcon,
  CalendarPlatformIcon,
} from "@/components/icons/PlatformIcons";
import { MoreVertical, Calendar } from "lucide-react";
import { MOCK_TODAYS_SCHEDULE } from "@/data/dashboardMockData";

const PLATFORM_ICONS = {
  meet: GoogleMeetIcon,
  zoom: ZoomIcon,
  teams: TeamsIcon,
  calendar: CalendarPlatformIcon,
};

const PLATFORM_DOTS = {
  meet: "bg-[#10B981]", // emerald dot
  zoom: "bg-[#3B82F6]", // blue dot
  teams: "bg-[#8B5CF6]", // purple dot
  calendar: "bg-[#10B981]",
};

export default function TodaysSchedule({
  schedule = MOCK_TODAYS_SCHEDULE,
  isGoogleConnected = false,
  loading = false,
  onSeeFullDay,
}) {
  const hasEvents = schedule && schedule.length > 0;

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Today&apos;s Schedule</h3>
        <button
          type="button"
          onClick={onSeeFullDay}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition cursor-pointer"
        >
          See full day
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="divide-y divide-gray-100/70 py-1" aria-busy="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="py-3 flex items-center justify-between gap-2.5 animate-pulse"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-16 h-3.5 bg-gray-200 rounded" />
                <div className="w-2 h-2 rounded-full bg-gray-200 shrink-0" />
                <div className="w-6 h-6 rounded-md bg-gray-200 shrink-0" />
                <div className="space-y-1.5 flex-1 max-w-[140px]">
                  <div className="h-3.5 bg-gray-200 rounded w-full" />
                  <div className="h-2.5 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
              <div className="w-4 h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : hasEvents ? (
        <div className="divide-y divide-gray-100/70">
          {schedule.map((item) => {
            const PlatformIcon =
              PLATFORM_ICONS[item.platform] || PLATFORM_ICONS.calendar;
            const dotColor =
              item.dotColor || PLATFORM_DOTS[item.platform] || "bg-[#10B981]";

            return (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-2.5 hover:bg-gray-50/60 rounded-xl px-1.5 -mx-1.5 transition"
              >
                {/* Left: Time, Colored Dot, Platform Icon & Titles */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {/* Time */}
                  <span className="w-18 shrink-0 text-sm font-semibold text-gray-900">
                    {item.time}
                  </span>

                  {/* Status Dot */}
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}
                    aria-hidden="true"
                  />

                  {/* Platform Icon */}
                  <div className="shrink-0">
                    <PlatformIcon className="w-6 h-6 rounded-md" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 flex-1 pr-1">
                    <h4 className="text-[14px] font-semibold text-gray-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-400 font-normal truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: More Menu */}
                <button
                  type="button"
                  className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition shrink-0"
                  aria-label="Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-1.5">
          <Calendar className="w-6 h-6 text-gray-300" />
          <p className="text-xs font-medium text-gray-700">
            {isGoogleConnected
              ? "No events today"
              : "Connect Google Calendar to see today's schedule."}
          </p>
          <p className="text-[11px] text-gray-400">
            {isGoogleConnected
              ? "Enjoy your free time!"
              : "Sync your Google account to track today's meetings."}
          </p>
        </div>
      )}
    </Card>
  );
}