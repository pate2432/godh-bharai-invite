import LotusBud from "./LotusBud";
import FeatherEye from "./FeatherEye";

/**
 * Section separator: a row of tiny lotus buds flanking a single
 * peacock-feather eye, with sindoor bindi dots between them.
 */
export default function LotusDivider({ className = "" }: { className?: string }) {
  const buds = [0, 1, 2];
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 py-10 sm:gap-4 ${className}`}
    >
      {buds.map((i) => (
        <span key={`l-${i}`} className="flex items-center gap-3 sm:gap-4">
          <LotusBud size={13} />
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: "var(--sindoor)" }}
          />
        </span>
      ))}
      <FeatherEye size={20} />
      {buds.map((i) => (
        <span key={`r-${i}`} className="flex items-center gap-3 sm:gap-4">
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: "var(--sindoor)" }}
          />
          <LotusBud size={13} />
        </span>
      ))}
    </div>
  );
}
