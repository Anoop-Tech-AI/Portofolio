export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0c0d10",
          subtle: "#121419",
          card: "#161820",
          elevated: "#1c1e27",
          border: "rgba(255, 255, 255, 0.07)",
          "border-strong": "rgba(255, 255, 255, 0.14)",
        },
        editorial: {
          sand: "#f5f5f0",
          bone: "#e5e5dc",
          muted: "#9a9da8",
          dim: "#5e616d",
        },
        accent: {
          DEFAULT: "#f59e0b", 
          amber: "#f59e0b",
          orange: "#ea580c",
          sky: "#38bdf8",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
      },
      animation: {
        noise: "noise 1s steps(2) infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        noise: {
          "0%, 100%": { backgroundPosition: "0 0" },
          "10%": { backgroundPosition: "-5% -10%" },
          "30%": { backgroundPosition: "3% -15%" },
          "50%": { backgroundPosition: "-10% 5%" },
          "70%": { backgroundPosition: "15% 0" },
          "90%": { backgroundPosition: "0 10%" },
        },
      },
    },
  },
  plugins: [],
};
