import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        muted: "#667085",
        line: "#E5E7EB",
        canvas: "#FFFFFF",
        soft: "#F7F8FA",
        accent: "#2563EB",
        success: "#16A34A",
        warning: "#D97706",
        critical: "#DC2626"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
