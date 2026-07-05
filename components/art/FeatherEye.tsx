/** The "eye" of a peacock feather (morpankh) — concentric jewel tones. */
export default function FeatherEye({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="12" cy="12" rx="9" ry="10.5" fill="var(--morpankh-emerald)" />
      <ellipse cx="12" cy="12.5" rx="6.2" ry="7.4" fill="var(--peacock-teal)" />
      <ellipse cx="12" cy="13" rx="3.6" ry="4.4" fill="var(--pichwai-blue)" />
      <ellipse cx="12" cy="13.5" rx="1.7" ry="2.1" fill="var(--radha-gold)" />
    </svg>
  );
}
