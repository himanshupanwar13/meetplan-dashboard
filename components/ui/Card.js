/**
 * components/ui/Card.js
 * Crisp white card component with delicate border and gentle radius
 * strictly matching the MeetPlan design theme.
 */
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}