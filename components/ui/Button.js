/**
 * components/ui/Button.js
 * MeetPlan button component with dark green primary, join outline, and ghost variants.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    xs: "px-2.5 py-1 text-xs rounded-md",
    sm: "px-3.5 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-xl",
    lg: "px-5 py-3 text-sm font-semibold rounded-xl",
  };

  const variantStyles = {
    primary:
      "bg-[#103B2B] text-white hover:bg-[#0b2b1f] focus:ring-[#103B2B] shadow-xs",
    secondary:
      "bg-[#E8F5EE] text-[#103B2B] hover:bg-[#d8ece0] focus:ring-[#103B2B]",
    outline:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
    join:
      "border border-gray-200 bg-gray-50/70 text-gray-700 hover:bg-gray-100 text-xs font-medium px-4 py-1.5 rounded-lg",
    ghost:
      "text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-1.5",
  };

  return (
    <button
      className={`${base} ${sizeStyles[size] ?? ""} ${variantStyles[variant] ?? ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}