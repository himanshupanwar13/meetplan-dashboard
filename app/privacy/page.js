/**
 * app/privacy/page.js
 * MeetPlan Public Privacy Policy Page.
 * Publicly accessible without authentication (HTTP 200).
 * Accurately describes the real Next.js/NextAuth Google Calendar integration
 * and adheres to the Google API Services User Data Policy (Limited Use requirements).
 */
import Link from "next/link";
import { MeetPlanLogoIcon } from "@/components/icons/PlatformIcons";
import {
  ShieldCheck,
  Calendar,
  Lock,
  UserCheck,
  Database,
  ExternalLink,
  Mail,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - MeetPlan",
  description:
    "MeetPlan Privacy Policy and Google API Services User Data Policy Compliance.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 px-6 md:px-12 border-b border-gray-200/70 bg-white/80 backdrop-blur-xs sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <MeetPlanLogoIcon className="w-7 h-[30px]" />
            <span className="text-[19px] font-bold tracking-tight text-gray-900 leading-none">
              MeetPlan
            </span>
          </Link>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 hidden sm:inline">
            Privacy Policy
          </span>
        </div>

        <nav className="flex items-center gap-4 text-xs font-semibold">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            href="/login"
            className="bg-[#103B2B] hover:bg-[#0c2e21] text-white px-3.5 py-1.5 rounded-xl transition shadow-xs"
          >
            Sign In / Login
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 md:py-14">
        {/* Header Title */}
        <div className="border-b border-gray-200/80 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Google API User Data Compliance</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
          </p>
        </div>

        {/* Policy Content */}
        <div className="mt-8 space-y-10 text-sm leading-relaxed text-gray-700">
          {/* Section 1: Overview & Purpose */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <span>About MeetPlan & Service Purpose</span>
            </h2>
            <p>
              <strong>MeetPlan</strong> is a modern meeting planning and productivity dashboard application. The purpose of MeetPlan is to provide authenticated users with a real-time, consolidated schedule of their upcoming events, conference links (such as Google Meet, Zoom, and Microsoft Teams), daily agendas, and meeting statistics in one unified interface.
            </p>
            <p>
              We are committed to protecting your privacy and being transparent about our data practices. This Privacy Policy details the information we access, how it is processed, and our strict commitment to zero persistent data storage of your calendar data.
            </p>
          </section>

          {/* Section 2: Google OAuth Authentication */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <span>Google OAuth Authentication & Account Information</span>
            </h2>
            <p>
              MeetPlan uses <strong>Google OAuth 2.0</strong> to authenticate users securely. When you choose to sign in with Google, MeetPlan requests access to the following basic profile information:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
              <li>
                <strong>Email address</strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">userinfo.email</code>): Used to identify your account and authenticate your session.
              </li>
              <li>
                <strong>Basic profile information</strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">userinfo.profile</code> & <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">openid</code>): Used to display your name and profile avatar across the dashboard and top navigation.
              </li>
            </ul>
            <p>
              We do not access or collect passwords, billing information, or contacts from your Google account.
            </p>
          </section>

          {/* Section 3: Google Calendar Read-Only Access */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <span>Google Calendar Read-Only Scope & Data Accessed</span>
            </h2>
            <p>
              To populate your dashboard with your upcoming schedule, MeetPlan requests the following specific read-only scope:
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
              <code className="text-xs font-semibold text-emerald-900 break-all">
                https://www.googleapis.com/auth/calendar.readonly
              </code>
            </div>
            <p>
              <strong>What information we access:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
              <li>Event titles / summaries</li>
              <li>Event start and end dates and times</li>
              <li>Attendee names and email addresses (for attendee count badges and avatars)</li>
              <li>Conference / video call links (e.g., Google Meet URLs, Zoom links, Teams links)</li>
              <li>Event status (confirmed, tentative, cancelled)</li>
            </ul>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900">
              <strong>Important:</strong> MeetPlan does <strong>NOT</strong> request write, edit, or delete permissions. MeetPlan <strong>CANNOT</strong> create new calendar events, modify existing meetings, delete entries, or alter your calendar settings.
            </div>
          </section>

          {/* Section 4: Data Storage & Retention (Zero DB) */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <span>Data Storage & Retention Policy (No Database)</span>
            </h2>
            <div className="flex items-start gap-3 bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 text-xs text-blue-950">
              <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-semibold mb-1">Zero Database Persistence</strong>
                MeetPlan operates completely without a persistent database. We do not store, copy, archive, or retain your Google Calendar data, meeting titles, or attendee information on any database or persistent storage system.
              </div>
            </div>
            <p>
              <strong>How data is processed:</strong>
            </p>
            <p>
              When you open the dashboard, your browser sends a request to our secure Next.js server proxy (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/api/calendar</code>). The proxy uses your active encrypted session token to query the official Google Calendar API in real time. The resulting events are formatted in memory and delivered directly to your browser for ephemeral display. Once you close the tab, log out, or end your session, all cached meeting data is cleared.
            </p>
          </section>

          {/* Section 5: No Sharing with Third Parties */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                5
              </span>
              <span>No Third-Party Sharing or Sale of Data</span>
            </h2>
            <p>
              MeetPlan has a strict no-sharing policy:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
              <li>We do <strong>NOT</strong> sell, trade, rent, or lease your personal information or calendar data to anyone.</li>
              <li>We do <strong>NOT</strong> share your Google user data with advertisers, third-party data brokers, or marketing platforms.</li>
              <li>We do <strong>NOT</strong> use your Google Calendar data or meeting content to train machine learning models or artificial intelligence algorithms.</li>
            </ul>
          </section>

          {/* Section 6: Google API Limited Use Disclosure */}
          <section className="bg-white rounded-2xl border-2 border-emerald-600/30 p-6 md:p-8 shadow-xs space-y-3 bg-gradient-to-br from-white to-emerald-50/20">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#103B2B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                6
              </span>
              <span>Google API Services User Data Policy Compliance</span>
            </h2>
            <p className="font-medium text-gray-900">
              MeetPlan&apos;s use and transfer to any other app of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline font-semibold hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Google API Services User Data Policy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          {/* Section 7: Security & Token Handling */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                7
              </span>
              <span>Security & Token Protection</span>
            </h2>
            <p>
              We implement industry-standard safeguards to secure your session:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
              <li>
                <strong>Server-Side Token Storage:</strong> Google OAuth access tokens and refresh tokens are encrypted inside server-side HTTP-only cookies managed by NextAuth.js.
              </li>
              <li>
                <strong>No Client Exposure:</strong> OAuth access tokens and client secrets are never exposed to client-side JavaScript or the browser console.
              </li>
              <li>
                <strong>Encrypted Transmission:</strong> All web traffic is strictly served over HTTPS with Transport Layer Security (TLS).
              </li>
            </ul>
          </section>

          {/* Section 8: Revoking Access */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                8
              </span>
              <span>How to Revoke Google Access</span>
            </h2>
            <p>
              You maintain total control over your permissions. You can disconnect MeetPlan or revoke its access at any time:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-2 text-gray-600">
              <li>
                <strong>Log out of MeetPlan:</strong> Click on your profile in the dashboard sidebar and select <em>&quot;Log out&quot;</em>. This immediately terminates your session and removes local session cookies.
              </li>
              <li>
                <strong>Revoke in Google Account Settings:</strong> Visit Google&apos;s Third-Party Apps permission page at{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium hover:text-emerald-900 inline-flex items-center gap-1"
                >
                  <span>myaccount.google.com/permissions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                , locate <em>MeetPlan</em>, and click <em>&quot;Remove Access&quot;</em>.
              </li>
            </ol>
          </section>

          {/* Section 9: Contact Information */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xs font-bold shrink-0">
                9
              </span>
              <span>Contact Us</span>
            </h2>
            <p>
              If you have any questions, inquiries, or feedback regarding this Privacy Policy or MeetPlan&apos;s data practices, please contact us:
            </p>
            <div className="pt-2 flex items-center gap-2 text-sm text-gray-800">
              <Mail className="w-4 h-4 text-emerald-700" />
              <span>Email: </span>
              <a
                href="mailto:himanshupanwarxiii@gmail.com"
                className="text-emerald-700 font-semibold underline hover:text-emerald-900"
              >
                himanshupanwarxiii@gmail.com
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200/60 bg-white text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MeetPlanLogoIcon className="w-5 h-[22px]" />
            <span className="font-semibold text-gray-800">MeetPlan</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="/login" className="hover:text-gray-900 transition">
              Login
            </Link>
            <Link href="/privacy" className="text-emerald-700 font-semibold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}