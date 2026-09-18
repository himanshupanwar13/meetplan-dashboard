import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MeetPlanLogoIcon } from "@/components/icons/PlatformIcons";
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "MeetPlan - Smart Meeting Planning",
  description: "Plan, organize, and sync your meetings seamlessly with Google Calendar.",
  verification: {
    google: "Srx54uhTSyXAYvWmn0HzbdBvcvhg_GjIreVytHJdgNw",
  },
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // If already authenticated, direct to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FBFBF9] flex flex-col justify-between select-none">
      {/* Top Navigation */}
      <header className="h-16 px-6 md:px-12 border-b border-gray-200/60 bg-white/80 backdrop-blur-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MeetPlanLogoIcon className="w-7 h-[30px]" />
          <span className="text-[19px] font-bold tracking-tight text-gray-900 leading-none">
            MeetPlan
          </span>
        </div>
        <Link
          href="/login"
          className="bg-[#103B2B] hover:bg-[#0c2e21] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6 my-auto">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-8 sm:p-12 max-w-xl w-full text-center flex flex-col items-center">
          <div className="w-12 h-[52px] mb-4">
            <MeetPlanLogoIcon className="w-full h-full" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Smart Meeting Planning, <br />
            <span className="text-[#103B2B]">Effortlessly Synced.</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-md mt-3 leading-relaxed">
            Connect your Google Calendar to view upcoming meetings, track booked hours, and manage your availability in one clean SaaS dashboard.
          </p>

          {/* Call to action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#103B2B] hover:bg-[#0c2e21] text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-xs cursor-pointer"
            >
              <span>Connect Google Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Highlights */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 w-full text-center">
            <div className="flex flex-col items-center">
              <Calendar className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Google Calendar</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Live Sync</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">Read-Only OAuth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-5 px-6 border-t border-gray-200/60 bg-white text-xs text-gray-500">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <span>© {new Date().getFullYear()} MeetPlan. All rights reserved.</span>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="/login" className="hover:text-gray-900 transition">
              Login
            </Link>
            <Link href="/privacy" className="text-emerald-700 hover:text-emerald-900 font-semibold transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}