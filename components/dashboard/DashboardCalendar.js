/**
 * components/dashboard/DashboardCalendar.js
 * Dynamic mini Calendar widget matching the MeetPlan design reference.
 * Automatically displays the current month and year based on the user's local date.
 * Features:
 * - Dynamic current month/year header with functional previous/next month navigation
 * - 7-day week headers (SUN - SAT)
 * - Dynamic selected active date indicator (today by default in dark forest green)
 * - Smooth month transitions and date selection
 * - Event indicator dots below scheduled days
 * - "View full calendar" footer link
 */
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DashboardCalendar({
  events = [],
  onDateSelect,
}) {
  // Current visible month (defaults to real current local month)
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  // Currently selected date (defaults to real current local day)
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Month navigation
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleResetToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    if (onDateSelect) onDateSelect(today);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    // If user clicked a day from adjacent month, smoothly shift visible month
    if (!isSameMonth(day, currentMonth)) {
      setCurrentMonth(startOfMonth(day));
    }
    if (onDateSelect) onDateSelect(day);
  };

  // Compute 7-column calendar grid interval
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 }); // Saturday
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Map events to date strings (YYYY-MM-DD) for quick indicator lookup
  const eventDateSet = new Set(
    (events || [])
      .filter((e) => e?.rawStart)
      .map((e) => {
        try {
          return format(
            typeof e.rawStart === "string" ? parseISO(e.rawStart) : e.rawStart,
            "yyyy-MM-dd"
          );
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  );

  return (
    <Card className="p-5">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-base font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-1 text-gray-400">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded-md hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded-md hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 gap-1 text-center py-2 border-t border-gray-100">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="text-xs font-medium text-gray-400 uppercase tracking-wider"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center text-sm pt-1">
        {calendarDays.map((day) => {
          const isCurrentMonthDay = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);
          const dateKey = format(day, "yyyy-MM-dd");
          const hasEvent = eventDateSet.has(dateKey);

          return (
            <div
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className="h-8 flex flex-col items-center justify-center cursor-pointer group"
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm transition-all ${
                  isSelected
                    ? "bg-[#103B2B] text-white font-semibold shadow-xs"
                    : isCurrentMonthDay
                    ? isDayToday
                      ? "text-[#103B2B] font-semibold bg-[#E8F5EE]"
                      : "text-gray-700 group-hover:bg-gray-100 font-normal"
                    : "text-gray-300 select-none group-hover:text-gray-500 font-normal"
                }`}
              >
                {format(day, "d")}
              </span>

              {/* Event indicator dot */}
              {hasEvent && (
                <span
                  className={`w-1 h-1 rounded-full -mt-0.5 ${
                    isSelected ? "bg-white" : "bg-[#103B2B]"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Link: View full calendar / Return to today */}
      <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={handleResetToToday}
          className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#103B2B] transition cursor-pointer"
        >
          <CalendarIcon className="w-4 h-4 text-gray-500" strokeWidth={1.8} />
          <span>View full calendar</span>
        </button>

        {!isSameMonth(currentMonth, new Date()) && (
          <button
            type="button"
            onClick={handleResetToToday}
            className="text-[11px] font-semibold text-[#103B2B] hover:underline"
          >
            Today
          </button>
        )}
      </div>
    </Card>
  );
}