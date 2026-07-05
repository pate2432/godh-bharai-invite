/** An open white/pink lotus floating on water — layered flat petals. */
export default function LotusFlower({
  size = 56,
  white = false,
  className = "",
}: {
  size?: number;
  white?: boolean;
  className?: string;
}) {
  const petal = white ? "var(--moonlight)" : "var(--lotus-pink)";
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 60 37"
      aria-hidden="true"
      className={className}
    >
      {/* outer petals */}
      <path d="M30 32 C14 30 6 22 2 12 C12 16 20 20 30 32 Z" fill={petal} opacity="0.55" />
      <path d="M30 32 C46 30 54 22 58 12 C48 16 40 20 30 32 Z" fill={petal} opacity="0.55" />
      <path d="M30 32 C18 26 13 16 13 5 C21 12 26 20 30 32 Z" fill={petal} opacity="0.75" />
      <path d="M30 32 C42 26 47 16 47 5 C39 12 34 20 30 32 Z" fill={petal} opacity="0.75" />
      {/* center petal */}
      <path d="M30 32 C25 22 25 10 30 1 C35 10 35 22 30 32 Z" fill={petal} />
      {/* golden heart */}
      <circle cx="30" cy="30" r="2.4" fill="var(--radha-gold)" />
    </svg>
  );
}
