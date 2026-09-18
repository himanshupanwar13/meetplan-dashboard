/**
 * components/dashboard/NewMeetingButton.js
 * Primary "+ New Meeting" action button positioned at the bottom of the right column.
 */
import { Plus } from "lucide-react";

export default function NewMeetingButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-[#103B2B] hover:bg-[#0b2b1f] active:bg-[#082218] text-white font-semibold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${className}`}
    >
      <Plus className="w-4 h-4" strokeWidth={2.5} />
      <span>New Meeting</span>
    </button>
  );
}