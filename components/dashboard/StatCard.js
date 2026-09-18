/**
 * components/dashboard/StatCard.js
 * Individual metric card with icon badge, count value, and trend indicator.
 */
import Card from "@/components/ui/Card";
import { Calendar, UserPlus, Clock3, DollarSign } from "lucide-react";

const ICON_MAP = {
  calendar: Calendar,
  invite: UserPlus,
  clock: Clock3,
  revenue: DollarSign,
};

export default function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.iconType] || Calendar;

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between hover:shadow-xs transition-shadow">
      {/* Top: Icon Badge */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${stat.iconBg} ${stat.iconColor}`}
      >
        <Icon className="w-4.5 h-4.5" strokeWidth={1.8} />
      </div>

      {/* Middle: Metric Info */}
      <div className="mt-3.5">
        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
        <p className="text-[28px] lg:text-[30px] font-bold text-gray-900 mt-1 tracking-tight leading-none">
          {stat.value}
        </p>
      </div>

      {/* Bottom: Trend Indicator */}
      <div className="mt-3 flex items-center text-[13px] font-medium text-[#10B981]">
        <span>{stat.change}</span>
      </div>
    </Card>
  );
}