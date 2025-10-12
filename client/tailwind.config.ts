// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#00033D",
          400: "#0600AB",
          300: "#0033FF",
        },
        secondary: {
          500: "'#0600AB",
          400: "#0033FF",
          300: "#977DFF",
        },
        accent: {
          500: "#0033FF",
          400: "#FFCCF2",
          300: "#977DFF",
          200: "#F2E6EE",
        },
        background: "#E6EEFA",

        text: {
          light: "#000",
          dark: "#fff",
        },
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
      },
    },
  },
  plugins: [],
};

export default config;
