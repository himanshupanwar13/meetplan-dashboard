/**
 * components/dashboard/WelcomeSection.js
 * Hero banner section matching the MeetPlan design.
 * Features:
 * - Greeting text: Good Morning, Welcome back!
 * - Meetings count note
 * - City skyline illustration
 */
import Card from "@/components/ui/Card";
import { CitySkylineIllustration } from "@/components/icons/PlatformIcons";

export default function WelcomeSection({
  greeting = "Good Morning,",
  title = "Welcome back!",
  meetingsCount = 8,
}) {
  return (
    <Card className="p-6 md:p-7 relative overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Greeting text */}
        <div className="space-y-1 z-10">
          <p className="text-base font-medium text-gray-600">{greeting}</p>
          <h1 className="text-3xl md:text-[36px] lg:text-[38px] font-bold tracking-tight text-gray-900 leading-[1.15] flex items-center gap-2.5 mt-0.5">
            {title} <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-base text-gray-500 font-normal pt-1">
            You have{" "}
            <span className="font-semibold text-gray-900">
              {meetingsCount} meetings
            </span>{" "}
            today.
          </p>
        </div>

        {/* Right: City Skyline Illustration */}
        <div className="shrink-0 flex justify-end items-center max-w-[240px] md:max-w-[300px] w-full self-end md:self-center">
          <CitySkylineIllustration className="w-full h-auto drop-shadow-xs" />
        </div>
      </div>
    </Card>
  );
}