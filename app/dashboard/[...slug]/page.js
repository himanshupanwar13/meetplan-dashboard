/**
 * app/dashboard/[...slug]/page.js
 * Subroute page for dashboard navigation items (Meetings, Availability, Settings, etc.)
 * Uses the authenticated NextAuth session user as the single source of truth.
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function SubroutePage({ params }) {
  const session = await getServerSession(authOptions);
  const isDev = process.env.NODE_ENV === "development";

  // Enforce authentication in production
  if (!session && !isDev) {
    redirect("/login");
  }

  const user = session?.user || null;
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? resolvedParams.slug.join(" / ") : "Page";
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <DashboardLayout user={user}>
      <Card className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#103B2B] flex items-center justify-center text-xl font-bold">
          ⚡
        </div>
        <h1 className="text-xl font-bold text-gray-900 capitalize">{title}</h1>
        <p className="text-xs text-gray-500 max-w-sm">
          This section is currently under development. Head back to the main
          dashboard to view your meetings and statistics.
        </p>
        <Link
          href="/dashboard"
          className="bg-[#103B2B] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0c2e21] transition"
        >
          Return to Dashboard
        </Link>
      </Card>
    </DashboardLayout>
  );
}