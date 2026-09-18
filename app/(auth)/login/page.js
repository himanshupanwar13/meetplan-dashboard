/**
 * app/(auth)/login/page.js
 * MeetPlan sign-in page styled with the dark green branding.
 * Includes "Connect Google Calendar" OAuth button.
 * Development-only demo mode link is hidden in production.
 */
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { MeetPlanLogoIcon } from "@/components/icons/PlatformIcons";

export default function LoginPage() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBFBF9] p-4">
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-8 sm:p-10 flex flex-col items-center gap-6 w-full max-w-md text-center">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3">
          <MeetPlanLogoIcon className="w-11 h-[48px]" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            MeetPlan
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
            Plan, organize, and sync your meetings seamlessly with Google Calendar.
          </p>
        </div>

        {/* Action Button: Connect Google Calendar */}
        <div className="w-full space-y-3 pt-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs cursor-pointer"
          >
            {/* Google "G" Logo */}
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285F4" d="M47.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.2z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.6v6.2C6.6 42.5 14.7 48 24 48z"/>
              <path fill="#FBBC05" d="M10.8 28.8c-.5-1.4-.7-2.9-.7-4.8s.3-3.4.7-4.8v-6.2H2.6C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.9l8.2-6.1z"/>
              <path fill="#EA4335" d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.5 30.4 0 24 0 14.7 0 6.6 5.5 2.6 13.1l8.2 6.2C12.7 13.6 17.9 9.5 24 9.5z"/>
            </svg>
            Connect Google Calendar
          </button>

          {/* Development / Review Demo Mode Link (NEVER rendered in production) */}
          {isDev && (
            <div className="pt-2">
              <Link
                href="/dashboard?demo=true"
                className="text-xs text-[#103B2B] hover:text-[#0b2b1f] font-semibold underline underline-offset-4"
              >
                Explore Dashboard UI (Dev Demo Mode) →
              </Link>
            </div>
          )}
        </div>

        <p className="text-[11px] text-gray-400">
          By signing in, you agree to MeetPlan terms and{" "}
          <Link
            href="/privacy"
            className="text-emerald-700 hover:text-emerald-900 underline font-medium"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>

      {/* Footer Navigation */}
      <div className="mt-6 flex items-center gap-4 text-xs font-medium text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <span>•</span>
        <Link href="/privacy" className="hover:text-emerald-800 transition">
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}