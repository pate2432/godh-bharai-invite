import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "var(--yamuna-night)",
        pichwai: "var(--pichwai-blue)",
        gold: "var(--radha-gold)",
        goldleaf: "var(--gold-leaf)",
        lotus: "var(--lotus-pink)",
        teal: "var(--peacock-teal)",
        emerald: "var(--morpankh-emerald)",
        moonlight: "var(--moonlight)",
        sindoor: "var(--sindoor)",
        cream: "var(--dawn-cream)",
        golddeep: "var(--gold-deep)",
        river: "var(--yamuna-day)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        deva: ["var(--font-devanagari)", "serif"],
        "deva-display": ["var(--font-deva-display)", "serif"],
        guj: ["var(--font-gujarati)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        label: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
