/**
 * components/dashboard/Header.js
 * Top navigation and search bar matching the MeetPlan design reference.
 * Uses the authenticated NextAuth session user as the single source of truth.
 * Features:
 * - Search bar with ⌘K shortcut
 * - Notification bell with badge (3)
 * - Dynamic authenticated user Avatar (image or initials from name/email) with online indicator
 * - Mobile menu toggle button
 */
"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, Menu } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function Header({ user, onOpenMobileMenu }) {
  const { data: session } = useSession();

  // Use authenticated session as single source of truth across all pages
  const activeUser = session?.user || user;

  return (
    <header className="h-16 px-4 md:px-8 border-b border-gray-200/60 bg-[#FBFBF9] flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile hamburger menu & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search input with shortcut badge */}
        <div className="relative flex-1 flex items-center">
          <Search
            className="absolute left-3.5 w-[18px] h-[18px] text-gray-400 pointer-events-none"
            strokeWidth={1.8}
          />
          <input
            type="text"
            placeholder="Search meetings, contacts, etc..."
            className="w-full pl-10 pr-14 py-2 bg-white border border-gray-200/90 rounded-xl text-sm font-normal text-gray-900 placeholder:text-gray-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#103B2B]/20 focus:border-[#103B2B]"
          />
          <div className="absolute right-2.5 flex items-center gap-0.5 pointer-events-none">
            <kbd className="text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
              ⌘ K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Notifications & Profile Avatar */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.8} />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-[#FBFBF9]">
            3
          </span>
        </button>

        {/* User Avatar with Green Online Dot (Dynamic authenticated user) */}
        <div className="flex items-center gap-2">
          <Avatar
            src={activeUser?.image || null}
            name={activeUser?.name || ""}
            email={activeUser?.email || ""}
            size={36}
            showOnline={true}
          />
        </div>
      </div>
    </header>
  );
}