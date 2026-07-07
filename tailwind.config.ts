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
        brand: {
          50: "#eef7ff",
          100: "#d9edff",
          200: "#bce0ff",
          300: "#8ecdff",
          400: "#59b0ff",
          500: "#3390ff",
          600: "#1c6ff5",
          700: "#1758e0",
          800: "#1a48b5",
          900: "#1b408e",
          950: "#152a56"
        }
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Myanmar", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
