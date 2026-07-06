import { config } from "@/config";
import LotusBud from "@/components/art/LotusBud";

export default function Footer() {
  return (
    <footer className="safe-bottom px-4 pb-20 pt-10 text-center sm:px-6">
      <div lang="gu" className="font-guj space-y-2 text-lg leading-relaxed text-goldleaf sm:text-xl">
        {config.footerShloka.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <LotusBud key={i} size={i === 2 ? 15 : 11} />
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-moonlight/90">
        made with <span className="text-sindoor">♥</span>{" "}
        <span className="font-semibold text-goldleaf">by mamu!</span>{" "}
        {config.footerCredit}
      </p>
    </footer>
  );
}
