/** Krishna's gold bansuri — slender flute with bindings and finger holes. */
export default function Flute({
  width = 260,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const height = width * 0.1;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 26"
      aria-hidden="true"
      className={className}
    >
      {/* body */}
      <rect x="6" y="9" width="248" height="8" rx="4" fill="var(--radha-gold)" />
      <rect x="6" y="10" width="248" height="2.4" rx="1.2" fill="var(--gold-leaf)" opacity="0.8" />
      {/* end caps */}
      <rect x="2" y="7.5" width="7" height="11" rx="3" fill="var(--gold-leaf)" />
      <rect x="251" y="7.5" width="7" height="11" rx="3" fill="var(--gold-leaf)" />
      {/* silk bindings */}
      <rect x="52" y="7" width="3.4" height="12" rx="1.6" fill="var(--sindoor)" opacity="0.9" />
      <rect x="206" y="7" width="3.4" height="12" rx="1.6" fill="var(--sindoor)" opacity="0.9" />
      {/* blow hole */}
      <ellipse cx="34" cy="13" rx="3.6" ry="2.2" fill="var(--yamuna-night)" />
      {/* finger holes */}
      {[86, 108, 130, 152, 174, 196].map((x) => (
        <circle key={x} cx={x} cy="13" r="2.1" fill="var(--yamuna-night)" />
      ))}
    </svg>
  );
}
