/**
 * components/icons/PlatformIcons.js
 * High-fidelity SVG icons for Google Meet, Zoom, Microsoft Teams,
 * MeetPlan branding, and custom illustrations matching the reference design.
 */

export function MeetPlanLogoIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top Binder Rings / Loops */}
      <rect x="7.5" y="1" width="2.4" height="4.5" rx="1.2" fill="#103B2B" />
      <rect x="18.1" y="1" width="2.4" height="4.5" rx="1.2" fill="#103B2B" />

      {/* Outer Calendar Frame with White Interior */}
      <rect
        x="2.5"
        y="4"
        width="23"
        height="23"
        rx="3.8"
        fill="white"
        stroke="#103B2B"
        strokeWidth="2"
      />

      {/* Top Solid Dark Green Calendar Banner */}
      <path
        d="M2.5 8 C2.5 5.79 4.29 4 6.5 4 H21.5 C23.71 4 25.5 5.79 25.5 8 V11 H2.5 V8 Z"
        fill="#103B2B"
      />

      {/* Two White Binder Holes in the Top Banner */}
      <circle cx="8.7" cy="7.5" r="1.0" fill="white" />
      <circle cx="19.3" cy="7.5" r="1.0" fill="white" />

      {/* Centered Checkmark Mark */}
      <path
        d="M8.2 19 L11.8 22.6 L19.8 14.6"
        stroke="#103B2B"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function GoogleMeetIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#F3F4F6" />
      <g transform="translate(3.5, 3.5) scale(0.7)">
        <path d="M4 8v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2z" fill="#00832d" />
        <path d="M16 9.5l4-3v11l-4-3v-5z" fill="#0066da" />
        <path d="M4 8l5 5-5 5V8z" fill="#e53935" />
        <path d="M6 6h8l-4 4-4-4z" fill="#ffb300" />
      </g>
    </svg>
  );
}

export function ZoomIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#2D8CFF" />
      <path
        d="M6 9.5C6 8.67 6.67 8 7.5 8h6c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-6C6.67 16 6 15.33 6 14.5v-5z"
        fill="white"
      />
      <path d="M15 10.5l3.5-2.2v7.4L15 13.5v-3z" fill="white" />
    </svg>
  );
}

export function TeamsIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#4B53BC" />
      <path
        d="M14.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 10h-4a1 1 0 00-1 1v4.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V11a1 1 0 00-1-1z"
        fill="#7B83EB"
      />
      <rect x="5.5" y="8" width="6.5" height="8" rx="1" fill="#5059C9" />
      <path d="M7 10h3.5M8.75 10v4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CitySkylineIllustration({ className = "w-full max-w-[280px] h-auto" }) {
  return (
    <svg className={className} viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun */}
      <circle cx="205" cy="55" r="28" fill="#FFF2E8" />
      <circle cx="205" cy="55" r="24" fill="#FFE2CA" />

      {/* Subtle clouds */}
      <path d="M70 45 Q78 35 88 40 Q98 33 108 42 Q115 44 112 50 H66 Q64 47 70 45Z" fill="#F1F5F9" />
      <path d="M235 32 Q241 24 250 28 Q258 22 266 30 Q272 32 270 36 H232 Q230 34 235 32Z" fill="#F1F5F9" />

      {/* Birds */}
      <path d="M120 40 Q124 35 128 40 Q132 35 136 40" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M142 30 Q145 26 148 30 Q151 26 154 30" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Background Buildings (Blue/Slate) */}
      <rect x="235" y="50" width="45" height="130" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
      <line x1="247" y1="65" x2="247" y2="170" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="262" y1="65" x2="262" y2="170" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

      {/* Midground Tall Building */}
      <path d="M205 30 L220 20 L235 30 V180 H205 V30Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.4" />
      <rect x="214" y="45" width="12" height="120" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" fill="none" />

      {/* Main Peach Office Tower */}
      <rect x="155" y="60" width="50" height="120" rx="2" fill="#FFE8DD" stroke="#EA580C" strokeWidth="1.4" />
      {/* Louver lines on peach building */}
      <line x1="162" y1="75" x2="198" y2="75" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="88" x2="198" y2="88" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="101" x2="198" y2="101" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="114" x2="198" y2="114" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="127" x2="198" y2="127" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="140" x2="198" y2="140" stroke="#FDBA74" strokeWidth="1.5" />
      <line x1="162" y1="153" x2="198" y2="153" stroke="#FDBA74" strokeWidth="1.5" />

      {/* Front Angled/Slanted Roof Building */}
      <path d="M125 105 L155 80 V180 H125 V105Z" fill="#FFF7ED" stroke="#475569" strokeWidth="1.4" />
      <line x1="133" y1="115" x2="133" y2="175" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="145" y1="105" x2="145" y2="175" stroke="#CBD5E1" strokeWidth="1" />

      {/* Green Curved Foreground Tower */}
      <path d="M95 125 C95 100 115 100 115 125 V180 H95 V125Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.4" />
      <circle cx="105" cy="120" r="3" fill="#16A34A" />
      <line x1="105" y1="130" x2="105" y2="175" stroke="#86EFAC" strokeWidth="1.2" />

      {/* Front Small Tree */}
      <path d="M80 155 C75 140 90 135 90 148 C95 142 100 150 95 158 H80Z" fill="#103B2B" opacity="0.9" />
      <line x1="88" y1="158" x2="88" y2="175" stroke="#78350F" strokeWidth="2" />

      {/* Ground baseline */}
      <line x1="60" y1="178" x2="290" y2="178" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  );
}

export function DeskIllustration({ className = "w-full max-w-[120px] h-auto" }) {
  return (
    <svg className={className} viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk surface line */}
      <line x1="15" y1="78" x2="125" y2="78" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

      {/* Desk calendar stand */}
      <rect x="35" y="32" width="48" height="42" rx="4" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <line x1="35" y1="44" x2="83" y2="44" stroke="#E2E8F0" strokeWidth="1" />
      {/* Calendar rings */}
      <circle cx="43" cy="32" r="2.5" fill="#64748B" />
      <circle cx="53" cy="32" r="2.5" fill="#64748B" />
      <circle cx="65" cy="32" r="2.5" fill="#64748B" />
      <circle cx="75" cy="32" r="2.5" fill="#64748B" />
      {/* Calendar mini grid */}
      <rect x="42" y="50" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="52" y="50" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="62" y="50" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="72" y="50" width="6" height="4" rx="1" fill="#103B2B" />
      <rect x="42" y="58" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="52" y="58" width="6" height="4" rx="1" fill="#10B981" />
      <rect x="62" y="58" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="72" y="58" width="6" height="4" rx="1" fill="#E2E8F0" />

      {/* Potted Plant */}
      <path d="M96 56 C90 40 102 36 104 46 C110 38 116 48 108 56 H96Z" fill="#16A34A" />
      <path d="M98 56 L100 76 H108 L110 56 Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="1" />

      {/* Pen holder */}
      <rect x="22" y="54" width="10" height="22" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
      <line x1="25" y1="46" x2="26" y2="54" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="42" x2="28" y2="54" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function CalendarPlatformIcon({ className = "w-7 h-7" }) {
  return (
    <div className={`${className} bg-emerald-50 text-[#103B2B] rounded-lg flex items-center justify-center shrink-0 border border-emerald-100`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  );
}