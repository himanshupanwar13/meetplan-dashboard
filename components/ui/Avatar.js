/**
 * components/ui/Avatar.js
 * Flexible Avatar component supporting Google profile images,
 * initials fallback (name or email), stacked rings, and online indicator dots.
 */
import Image from "next/image";

export default function Avatar({
  src,
  name = "",
  email = "",
  size = 32,
  className = "",
  showOnline = false,
}) {
  let initials = "U";
  if (name && name.trim()) {
    initials = name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  } else if (email && email.trim()) {
    initials = email.trim()[0].toUpperCase();
  }

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Circular Avatar Container with clipping */}
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#E8F5EE] text-[#103B2B] select-none">
        {src ? (
          <Image
            src={src}
            alt={name || "User profile"}
            width={size}
            height={size}
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <span className="font-semibold text-xs text-[#103B2B]">
            {initials}
          </span>
        )}
      </div>

      {/* Online status indicator dot precisely attached at the bottom-right edge */}
      {showOnline && (
        <span
          className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#10B981] ring-2 ring-white z-10 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function AvatarGroup({ attendees = [], extraCount = 0, size = 28 }) {
  return (
    <div className="flex items-center -space-x-2 overflow-hidden">
      {attendees.map((person, idx) => (
        <div key={idx} className="ring-2 ring-white rounded-full">
          <Avatar src={person.avatar} name={person.name} size={size} />
        </div>
      ))}
      {extraCount > 0 && (
        <div
          style={{ width: size, height: size }}
          className="ring-2 ring-white rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold flex items-center justify-center shrink-0"
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}