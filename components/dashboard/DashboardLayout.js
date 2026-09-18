/**
 * components/dashboard/DashboardLayout.js
 * Responsive layout container for the MeetPlan Dashboard.
 * Manages desktop persistent sidebar, tablet collapse, and mobile drawer.
 */
"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { X } from "lucide-react";

export default function DashboardLayout({ children, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#FBFBF9] flex">
      {/* Desktop Sidebar (hidden on mobile/small tablets) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar user={user} />
      </div>

      {/* Mobile Drawer (with backdrop) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-10 flex w-full max-w-xs flex-1 flex-col bg-[#FBFBF9] shadow-xl">
            {/* Close Button */}
            <div className="absolute top-4 right-3 z-20">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 transition"
                aria-label="Close sidebar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar inside drawer */}
            <div className="h-full overflow-y-auto">
              <Sidebar
                user={user}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <Header
          user={user}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}