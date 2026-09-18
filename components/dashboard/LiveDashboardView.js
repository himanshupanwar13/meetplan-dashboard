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

export default function LiveDashboardView() {
  const { events, loading, error, isGoogleConnected, refetch } =
    useCalendarEvents();

  // Determine meetings list: live Google events if available, else mock fallback in demo mode
  const displayMeetings = isGoogleConnected ? events : MOCK_UPCOMING_MEETINGS;

  // Today's meetings: filter from live events if connected
  const liveTodayMeetings = isGoogleConnected
    ? events.filter((e) => e.isToday)
    : [];

  const displaySchedule = isGoogleConnected
    ? liveTodayMeetings.length > 0
      ? liveTodayMeetings
      : [] // empty schedule for today if none scheduled
    : MOCK_TODAYS_SCHEDULE;

  const todayMeetingsCount = isGoogleConnected
    ? liveTodayMeetings.length
    : 8;

  // Synchronize stats with live counts when connected
  const updatedStats = MOCK_STATS.map((stat) => {
    if (stat.id === "upcoming" && isGoogleConnected) {
      return {
        ...stat,
        value: String(events.length),
        change: `${events.length} synced from Google`,
      };
    }
    return stat;
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
        <TodaysSchedule schedule={displaySchedule} />

        {/* 3. "+ New Meeting" Action Button */}
        <NewMeetingButton />
      </div>
    </div>
  );
}