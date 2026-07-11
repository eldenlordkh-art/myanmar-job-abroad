import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Jade — Myanmar's iconic export stone, standing in for the default SaaS blue.
        brand: {
          50: "#EAF6F1",
          100: "#CFEBE0",
          200: "#A1D6C2",
          300: "#6FBEA0",
          400: "#45A483",
          500: "#2C8A6B",
          600: "#1F7159",
          700: "#195C48",
          800: "#164A3A",
          900: "#123D30",
          950: "#081F19"
        },
        // Gold leaf — the metal of temple gilding and lacquerware trim; used sparingly.
        gold: {
          50: "#FCF6E8",
          100: "#F7E9C4",
          200: "#EFD48D",
          300: "#E3BB5E",
          400: "#D2A03F",
          500: "#B8862E",
          600: "#8F6A22",
          700: "#6E5119"
        },
        lac: "#9A3324",
        ink: "#0B1F19",
        mist: "#F4F7F3"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "var(--font-myanmar)", "system-ui", "sans-serif"],
        mono: ["var(--font-data)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
