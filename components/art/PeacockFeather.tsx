/**
 * A full peacock feather (morpankh) — emerald fronds around the jewel eye,
 * on a slender quill. Stylized flat Pichwai rendering, no gradients.
 */
export default function PeacockFeather({
  width = 60,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const height = width * 2.4;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 120"
      aria-hidden="true"
      className={className}
    >
      {/* fronds */}
      <g stroke="var(--morpankh-emerald)" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
        <path d="M25 46 C12 38 7 26 9 12" fill="none" />
        <path d="M25 46 C38 38 43 26 41 12" fill="none" />
        <path d="M25 44 C16 34 14 22 18 8" fill="none" />
        <path d="M25 44 C34 34 36 22 32 8" fill="none" />
        <path d="M25 42 C21 30 22 16 25 4" fill="none" />
        <path d="M25 50 C10 46 4 38 3 28" fill="none" />
        <path d="M25 50 C40 46 46 38 47 28" fill="none" />
      </g>
      <g stroke="var(--peacock-teal)" strokeWidth="1.1" strokeLinecap="round" opacity="0.8">
        <path d="M25 48 C15 42 11 32 12 20" fill="none" />
        <path d="M25 48 C35 42 39 32 38 20" fill="none" />
        <path d="M25 46 C22 36 22 24 24 12" fill="none" />
        <path d="M25 46 C28 36 28 24 26 12" fill="none" />
      </g>
      {/* eye */}
      <ellipse cx="25" cy="46" rx="12" ry="15" fill="var(--morpankh-emerald)" />
      <ellipse cx="25" cy="47" rx="8.5" ry="11" fill="var(--peacock-teal)" />
      <ellipse cx="25" cy="48.5" rx="5" ry="6.6" fill="var(--pichwai-blue)" />
      <ellipse cx="25" cy="49.5" rx="2.3" ry="3" fill="var(--radha-gold)" />
      {/* quill */}
      <path
        d="M25 60 C25 78 24 96 23 116"
        stroke="var(--radha-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
