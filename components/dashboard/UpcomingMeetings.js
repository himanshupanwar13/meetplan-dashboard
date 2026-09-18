/**
 * components/dashboard/UpcomingMeetings.js
 * Upcoming Meetings list component matching the MeetPlan design reference.
 * Supports:
 * - Live Google Calendar events when authenticated
 * - Mock data fallback for development/demo mode
 * - Loading skeleton state
 * - Empty state when no events exist
 * - Error state with retry action
 * - Google Meet, Zoom, Teams, and Calendar platform detection
 * - External meeting join links
 */
"use client";

import Card from "@/components/ui/Card";
import { AvatarGroup } from "@/components/ui/Avatar";
import {
  GoogleMeetIcon,
  ZoomIcon,
  TeamsIcon,
  CalendarPlatformIcon,
} from "@/components/icons/PlatformIcons";
import { MoreVertical, RotateCcw, Calendar, AlertCircle } from "lucide-react";

const PLATFORM_ICONS = {
  meet: GoogleMeetIcon,
  zoom: ZoomIcon,
  teams: TeamsIcon,
  calendar: CalendarPlatformIcon,
};

export default function UpcomingMeetings({
  meetings = [],
  loading = false,
  error = null,
  isGoogleConnected = false,
  isDemo = false,
  onRefetch,
  onViewAll,
}) {
  return (
    <Card className="p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-gray-900">
            Upcoming Meetings
          </h2>

          {/* Connection status indicator */}
          {isGoogleConnected ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Google Calendar
            </span>
          ) : isDemo ? (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
              Demo Preview
            </span>
          ) : null}

          {onRefetch && (
            <button
              type="button"
              onClick={onRefetch}
              title="Refresh calendar events"
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              aria-label="Refresh events"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="divide-y divide-gray-100/80 py-1" aria-busy="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="py-3.5 flex items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <div className="w-16 space-y-1.5">
                  <div className="h-3.5 bg-gray-200 rounded w-12" />
                  <div className="h-2.5 bg-gray-100 rounded w-8" />
                </div>
                <div className="w-7 h-7 bg-gray-200 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1 max-w-xs">
                  <div className="h-3.5 bg-gray-200 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="w-14 h-7 bg-gray-100 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && meetings.length === 0 && (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-500" />
          <p className="text-xs font-semibold text-gray-800">
            Could not load Google Calendar events
          </p>
          <p className="text-[11px] text-gray-400 max-w-xs">{error}</p>
          {onRefetch && (
            <button
              type="button"
              onClick={onRefetch}
              className="mt-2 text-xs font-semibold text-[#103B2B] bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && meetings.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-2.5">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-gray-800">
            {isGoogleConnected
              ? "No upcoming meetings scheduled"
              : "Connect Google Calendar to see your upcoming meetings."}
          </p>
          <p className="text-[11px] text-gray-400 max-w-xs">
            {isGoogleConnected
              ? "Your Google Calendar schedule is currently clear for the upcoming days."
              : "Authorize Google Calendar to automatically display and sync your upcoming events here."}
          </p>
        </div>
      )}

      {/* Meetings List */}
      {!loading && meetings.length > 0 && (
        <div className="divide-y divide-gray-100/80">
          {meetings.map((meeting) => {
            const PlatformIcon =
              PLATFORM_ICONS[meeting.platform] || PLATFORM_ICONS.calendar;

            return (
              <div
                key={meeting.id}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/60 rounded-xl px-2 -mx-2 transition"
              >
                {/* Left Group: Time, Platform Icon, Title & Details */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  {/* Time & Day */}
                  <div className="w-18 shrink-0 text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {meeting.time}
                    </p>
                    <p className="text-[13px] text-gray-400 font-normal mt-0.5">
                      {meeting.day}
                    </p>
                  </div>

                  {/* Platform Icon */}
                  <div className="shrink-0">
                    <PlatformIcon className="w-7 h-7 rounded-lg" />
                  </div>

                  {/* Meeting Title & Subtitle */}
                  <div className="min-w-0 flex-1 pr-2">
                    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                      {meeting.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-normal truncate mt-0.5">
                      {meeting.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Group: Attendee Avatars, Join Button & Context Menu */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  {/* Overlapping Attendees (if available) */}
                  {meeting.attendees && meeting.attendees.length > 0 ? (
                    <div className="hidden sm:block">
                      <AvatarGroup
                        attendees={meeting.attendees}
                        extraCount={meeting.extraAttendees}
                        size={28}
                      />
                    </div>
                  ) : null}

                  {/* Join Button */}
                  {meeting.joinUrl ? (
                    <a
                      href={meeting.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-200/90 bg-gray-50/80 hover:bg-gray-100 hover:text-gray-900 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-lg inline-flex items-center justify-center transition"
                    >
                      Join
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm font-normal px-2 py-1 select-none">
                      Scheduled
                    </span>
                  )}

                  {/* Context Menu (Three Dots) */}
                  <button
                    type="button"
                    className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}