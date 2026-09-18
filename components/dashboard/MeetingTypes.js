/**
 * components/dashboard/MeetingTypes.js
 * "Your Meeting Types" section matching the MeetPlan design reference.
 * Displays meeting type template cards with icon badges, durations,
 * copy-link actions, and configuration options.
 */
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { Video, Monitor, UsersRound, Link2, MoreVertical, Check } from "lucide-react";
import { MOCK_MEETING_TYPES } from "@/data/dashboardMockData";

const ICON_MAP = {
  video: Video,
  monitor: Monitor,
  users: UsersRound,
};

export default function MeetingTypes({
  meetingTypes = MOCK_MEETING_TYPES,
  onManageAll,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, link) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section aria-label="Your Meeting Types">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-lg font-bold text-gray-900">
          Your Meeting Types
        </h2>
        <button
          type="button"
          onClick={onManageAll}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition cursor-pointer"
        >
          Manage all
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {meetingTypes.map((type) => {
          const Icon = ICON_MAP[type.iconType] || Video;
          const isCopied = copiedId === type.id;

          return (
            <Card
              key={type.id}
              className="p-4 flex flex-col justify-between hover:shadow-xs transition-all"
            >
              {/* Top: Icon Badge */}
              <div>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${type.iconBg} ${type.iconColor}`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </div>

                {/* Title & Duration */}
                <div className="mt-3">
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {type.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-normal mt-0.5">
                    {type.duration} • {type.type}
                  </p>
                </div>
              </div>

              {/* Bottom: Copy Link & Context Menu */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => handleCopy(type.id, type.link)}
                  className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-800 transition"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981] font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                  aria-label="More options"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}