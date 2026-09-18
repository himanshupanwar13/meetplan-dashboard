/**
 * components/dashboard/Sidebar.js
 * Left navigation sidebar replicating the MeetPlan design reference.
 * Includes:
 * - Brand logo
 * - 11 navigation links with exact-match active state (only ONE active at a time)
 * - Upgrade to Pro banner with desk illustration
 * - Interactive Account profile area with popover menu containing:
 *   - Account details (name, email, plan)
 *   - NextAuth secure Logout with LogOut icon
 */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutGrid,
  CalendarCheck,
  Calendar,
  Clock3,
  Layers3,
  ContactRound,
  ChartNoAxesColumn,
  Blocks,
  UsersRound,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { MeetPlanLogoIcon, DeskIllustration } from "@/components/icons/PlatformIcons";
import Avatar from "@/components/ui/Avatar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Meetings", href: "/meetings", icon: CalendarCheck },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Availability", href: "/availability", icon: Clock3 },
  { label: "Meeting Types", href: "/meeting-types", icon: Layers3 },
  { label: "Contacts", href: "/contacts", icon: ContactRound },
  { label: "Analytics", href: "/analytics", icon: ChartNoAxesColumn },
  { label: "Integrations", href: "/integrations", icon: Blocks },
  { label: "Team", href: "/team", icon: UsersRound },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ user, onCloseMobile }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  // Close account menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    }

    if (isAccountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  // Handle logout via NextAuth
  const handleLogout = async () => {
    setIsAccountMenuOpen(false);
    if (onCloseMobile) onCloseMobile();
    await signOut({ callbackUrl: "/login" });
  };

  // Use session user as single source of truth
  const activeUser = session?.user || user;
  const displayName =
    activeUser?.name ||
    (activeUser?.email ? activeUser.email.split("@")[0] : "Account");
  const displayEmail = activeUser?.email || "";
  const avatarSrc = activeUser?.image || null;

  let displayInitials = "A";
  if (activeUser?.name && activeUser.name.trim()) {
    displayInitials = activeUser.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  } else if (activeUser?.email && activeUser.email.trim()) {
    displayInitials = activeUser.email.trim()[0].toUpperCase();
  }

  return (
    <aside className="w-60 shrink-0 bg-[#FBFBF9] border-r border-gray-200/70 min-h-screen flex flex-col justify-between select-none">
      {/* Top Branding & Navigation */}
      <div className="flex flex-col">
        {/* Brand Logo */}
        <div className="h-16 px-6 flex items-center gap-3">
          <MeetPlanLogoIcon className="w-7 h-[30px]" />
          <span className="text-[19px] font-bold tracking-tight text-gray-900 leading-none">
            MeetPlan
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 pt-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            // Exact match logic: only ONE item can be active at a time
            // Never use startsWith() or partial matching
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname === `/dashboard${item.href}`);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#103B2B] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-800"
                  }`}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Upgrade to Pro & Account */}
      <div className="p-3 space-y-3 mt-4">
        {/* Upgrade to Pro Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-3.5 shadow-xs flex flex-col">
          <div className="flex justify-center mb-1">
            <DeskIllustration className="w-24 h-auto" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">Upgrade to Pro</h4>
          <p className="text-xs text-gray-500 leading-snug mt-1">
            Unlock advanced features and grow your business.
          </p>
          <button
            type="button"
            className="mt-3 w-full bg-[#103B2B] hover:bg-[#0c2e21] text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            Upgrade Now
          </button>
        </div>

        {/* Account Profile Area with Popover Dropdown */}
        <div ref={accountMenuRef} className="relative pt-1 border-t border-gray-200/60">
          {/* Popover Dropdown Menu */}
          {isAccountMenuOpen && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl border border-gray-200/90 shadow-lg p-2.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150"
              role="menu"
              aria-orientation="vertical"
            >
              {/* Account Details */}
              <div className="px-2 py-1.5 border-b border-gray-100 pb-2 mb-1 flex items-center gap-2.5">
                <Avatar
                  src={avatarSrc}
                  name={displayName}
                  email={displayEmail}
                  size={32}
                  showOnline={true}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {displayName}
                  </p>
                  {displayEmail && (
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {displayEmail}
                    </p>
                  )}
                  <span className="inline-block text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-100">
                    Starter Plan
                  </span>
                </div>
              </div>

              {/* Secure Logout Option */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer text-left"
                role="menuitem"
              >
                <LogOut className="w-4 h-4 text-red-500 shrink-0" />
                <span>Log out</span>
              </button>
            </div>
          )}

          {/* Account Profile Bar (Trigger) */}
          <button
            type="button"
            onClick={() => setIsAccountMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-gray-100/70 transition cursor-pointer text-left group"
            aria-expanded={isAccountMenuOpen}
            aria-haspopup="true"
            aria-label="Account menu"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={avatarSrc}
                name={displayName}
                email={displayEmail}
                size={32}
                showOnline={true}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-black">
                  {displayName}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  Starter Plan
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                isAccountMenuOpen ? "rotate-180 text-gray-600" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}