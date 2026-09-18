/**
 * data/dashboardMockData.js
 * Centralized static mock data matching the MeetPlan design reference.
 * In Phase 3, dynamic Google Calendar events will connect into this architecture.
 */

export const MOCK_USER = {
  name: "Alex Morgan",
  email: "alex@meetplan.io",
  plan: "Starter Plan",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
};

export const MOCK_STATS = [
  {
    id: "upcoming",
    label: "Upcoming Meetings",
    value: "8",
    change: "↑ 12% vs yesterday",
    changeType: "positive",
    iconType: "calendar",
    iconBg: "bg-[#E8F5EE]",
    iconColor: "text-[#103B2B]",
  },
  {
    id: "pending",
    label: "Pending Invitations",
    value: "3",
    change: "↑ 8% vs yesterday",
    changeType: "positive",
    iconType: "invite",
    iconBg: "bg-[#FEF3E8]",
    iconColor: "text-[#E66E19]",
  },
  {
    id: "hours",
    label: "Hours Booked",
    value: "24.5",
    change: "↑ 18% vs last week",
    changeType: "positive",
    iconType: "clock",
    iconBg: "bg-[#EBF7F5]",
    iconColor: "text-[#12887A]",
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "₹24,680",
    change: "↑ 15% vs last month",
    changeType: "positive",
    iconType: "revenue",
    iconBg: "bg-[#FFF4E5]",
    iconColor: "text-[#F59E0B]",
  },
];

export const MOCK_UPCOMING_MEETINGS = [
  {
    id: "up-1",
    time: "09:30 AM",
    day: "Today",
    platform: "meet",
    title: "Design Review",
    subtitle: "Team Sync",
    attendees: [
      { name: "Sarah Connor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendees: 2,
    joinUrl: "#",
  },
  {
    id: "up-2",
    time: "11:00 AM",
    day: "Today",
    platform: "zoom",
    title: "Product Demo",
    subtitle: "Acme Corporation",
    attendees: [
      { name: "Emily Blunt", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendees: 0,
    joinUrl: "#",
  },
  {
    id: "up-3",
    time: "02:30 PM",
    day: "Today",
    platform: "teams",
    title: "Interview – UX Designer",
    subtitle: "Hiring Team",
    attendees: [
      { name: "Michael Chang", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendees: 0,
    joinUrl: "#",
  },
  {
    id: "up-4",
    time: "04:00 PM",
    day: "Today",
    platform: "meet",
    title: "Sales Call",
    subtitle: "Global Solutions",
    attendees: [
      { name: "David Miller", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" },
      { name: "Anna Bell", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
    ],
    extraAttendees: 1,
    joinUrl: "#",
  },
];

export const MOCK_TODAYS_SCHEDULE = [
  {
    id: "sch-1",
    time: "09:30 AM",
    platform: "meet",
    title: "Design Review",
    subtitle: "Team Sync",
    dotColor: "bg-[#10B981]", // emerald dot
  },
  {
    id: "sch-2",
    time: "11:00 AM",
    platform: "zoom",
    title: "Product Demo",
    subtitle: "Acme Corporation",
    dotColor: "bg-[#3B82F6]", // blue dot
  },
  {
    id: "sch-3",
    time: "02:30 PM",
    platform: "teams",
    title: "Interview – UX Designer",
    subtitle: "Hiring Team",
    dotColor: "bg-[#8B5CF6]", // purple dot
  },
  {
    id: "sch-4",
    time: "04:00 PM",
    platform: "meet",
    title: "Sales Call",
    subtitle: "Global Solutions",
    dotColor: "bg-[#10B981]", // emerald dot
  },
];

export const MOCK_MEETING_TYPES = [
  {
    id: "type-1",
    title: "30 Min Consultation",
    duration: "30 mins",
    type: "One-on-One",
    iconType: "video",
    iconBg: "bg-[#E8F5EE]",
    iconColor: "text-[#103B2B]",
    link: "https://meetplan.io/alex/30-min-consultation",
  },
  {
    id: "type-2",
    title: "60 Min Strategy Call",
    duration: "60 mins",
    type: "One-on-One",
    iconType: "video",
    iconBg: "bg-[#FEF3E8]",
    iconColor: "text-[#E66E19]",
    link: "https://meetplan.io/alex/strategy-call",
  },
  {
    id: "type-3",
    title: "Quick Demo",
    duration: "30 mins",
    type: "Group",
    iconType: "monitor",
    iconBg: "bg-[#EEF4FF]",
    iconColor: "text-[#3B82F6]",
    link: "https://meetplan.io/alex/quick-demo",
  },
  {
    id: "type-4",
    title: "Interview Session",
    duration: "45 mins",
    type: "One-on-One",
    iconType: "users",
    iconBg: "bg-[#FFF0F0]",
    iconColor: "text-[#EF4444]",
    link: "https://meetplan.io/alex/interview",
  },
];

export const MOCK_CALENDAR_DATA = {
  monthName: "May 2025",
  year: 2025,
  monthIndex: 4, // 0-indexed May
  selectedDay: 20,
  daysWithEvents: [6, 8, 14, 20, 29],
  prevMonthDays: [27, 28, 29, 30],
  currentMonthDaysCount: 31,
};