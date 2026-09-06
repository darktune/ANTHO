import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        antho: {
          black: "#0A0A0A",
          white: "#FAFAF9",
          stone: "#A8A29E",
          gold: "#C9A96E",
          "gold-light": "#D4BA8A",
          "gold-dark": "#B8954E",
          charcoal: "#1C1C1C",
          ash: "#2A2A2A",
          muted: "#6B6B6B",
          border: "#2E2E2E",
          "border-light": "#E5E5E3",
          surface: "#141414",
          "surface-elevated": "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "0" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["0.9375rem", { lineHeight: "1.6" }],
        "caption": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "overline": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "4/5": "4 / 5",
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};

export default config;
