/**
 * app/dashboard/page.js
 * MeetPlan Protected Dashboard Page.
 * Server component enforcing production authentication and rendering the
 * live dashboard composition.
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveDashboardView from "@/components/dashboard/LiveDashboardView";
import { MOCK_USER } from "@/data/dashboardMockData";

export default async function DashboardPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;

  /**
   * SECURITY ENFORCEMENT (Requirements 13 & 14):
   * The demo bypass parameter (?demo=true) is STRICTLY restricted to local development
   * (process.env.NODE_ENV === "development").
   * In production (process.env.NODE_ENV === "production"), isDemo evaluates to false,
   * completely preventing unauthenticated access to /dashboard.
   */
  const isDev = process.env.NODE_ENV === "development";
  const isDemo = isDev && resolvedSearchParams?.demo === "true";

  if (!session && !isDemo) {
    redirect("/login");
  }

  // Use authenticated Google user as single source of truth; mock user only in dev demo
  const user = session?.user || (isDemo ? MOCK_USER : null);

  return (
    <DashboardLayout user={user}>
      <LiveDashboardView user={user} isDemo={isDemo} />
    </DashboardLayout>
  );
}