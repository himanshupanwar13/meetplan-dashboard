/**
 * components/dashboard/LiveDashboardView.js
 * Client component that manages live Google Calendar data fetching,
 * loading states, error fallbacks, and synchronizes the dashboard metrics.
 */
"use client";

import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingMeetings from "@/components/dashboard/UpcomingMeetings";
import MeetingTypes from "@/components/dashboard/MeetingTypes";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import TodaysSchedule from "@/components/dashboard/TodaysSchedule";
import NewMeetingButton from "@/components/dashboard/NewMeetingButton";
import {
  MOCK_STATS,
  MOCK_UPCOMING_MEETINGS,
  MOCK_TODAYS_SCHEDULE,
} from "@/data/dashboardMockData";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning,";
  if (hour < 17) return "Good Afternoon,";
  return "Good Evening,";
}

export default function LiveDashboardView({ isDemo = false }) {
  const { events, loading, error, isGoogleConnected, refetch } =
    useCalendarEvents();

  // Determine meetings list: live Google events if available, else mock fallback in demo mode
  const displayMeetings = isGoogleConnected
    ? events
    : isDemo
      ? MOCK_UPCOMING_MEETINGS
      : [];

  // Today's meetings: filter from live events if connected
  const liveTodayMeetings = isGoogleConnected
    ? events.filter((e) => e.isToday)
    : [];

  const displaySchedule = isGoogleConnected
    ? liveTodayMeetings
    : isDemo
      ? MOCK_TODAYS_SCHEDULE
      : [];

  const todayMeetingsCount = isGoogleConnected
    ? liveTodayMeetings.length
    : isDemo
      ? 8
      : 0;

  // Key Statistics:
  // - In demo mode (local dev ?demo=true only): use full MOCK_STATS
  // - When Google is connected: live upcoming count and clear indicators
  // - When not connected and not demo mode: clean empty/not connected state ("—" / "Not connected")
  const updatedStats = MOCK_STATS.map((stat) => {
    if (isDemo) {
      return stat;
    }

    if (stat.id === "upcoming") {
      return {
        ...stat,
        value: isGoogleConnected ? String(events.length) : "0",
        change: isGoogleConnected
          ? `${events.length} synced from Google`
          : "Not connected",
      };
    }

    return {
      ...stat,
      value: "—",
      change: "Not connected",
    };
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-start">
      {/* Left / Main Column (approx 68% desktop width: col-span-8) */}
      <div className="xl:col-span-8 space-y-5 lg:space-y-6 min-w-0">
        {/* 1. Welcome / Hero Section with dynamic time-based greeting */}
        <WelcomeSection
          greeting={getGreeting()}
          title="Welcome back!"
          meetingsCount={todayMeetingsCount}
        />

        {/* 2. Key Statistics Grid (4 cards) */}
        <StatsGrid stats={updatedStats} />

        {/* 3. Upcoming Meetings List with live states */}
        <UpcomingMeetings
          meetings={displayMeetings}
          loading={loading}
          error={error}
          isGoogleConnected={isGoogleConnected}
          isDemo={isDemo}
          onRefetch={refetch}
        />

        {/* 4. Your Meeting Types Grid */}
        <MeetingTypes />
      </div>

      {/* Right Column (approx 32% desktop width: col-span-4) */}
      <div className="xl:col-span-4 space-y-5 lg:space-y-6 min-w-0">
        {/* 1. Dynamic Calendar Widget (uses actual current month/day) */}
        <DashboardCalendar events={displayMeetings} />

        {/* 2. Today's Schedule Timeline */}
        <TodaysSchedule
          schedule={displaySchedule}
          isGoogleConnected={isGoogleConnected}
        />

        {/* 3. "+ New Meeting" Action Button */}
        <NewMeetingButton />
      </div>
    </div>
  );
}