/**
 * components/dashboard/StatsGrid.js
 * 4-column responsive grid displaying key meeting and business statistics.
 */
import StatCard from "./StatCard";
import { MOCK_STATS } from "@/data/dashboardMockData";

export default function StatsGrid({ stats = MOCK_STATS }) {
  return (
    <section aria-label="Key Statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}