/** A single closed lotus bud, used in dividers and the RSVP radio controls. */
export default function LotusBud({
  size = 16,
  color = "var(--lotus-pink)",
  className = "",
}: {
  size?: number;
  color?: string;
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
      <path
        d="M12 3 C15 8 16.5 12 12 20 C7.5 12 9 8 12 3 Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M12 6 C8 9 6.5 13 9.5 18 C10.5 15 11 11 12 6 Z"
        fill={color}
        opacity="0.55"
      />
      <path
        d="M12 6 C16 9 17.5 13 14.5 18 C13.5 15 13 11 12 6 Z"
        fill={color}
        opacity="0.55"
      />
    </svg>
  );
}
