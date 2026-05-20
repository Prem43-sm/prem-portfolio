export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      colors: {
        void: "#060813",
        panel: "rgba(14, 20, 39, 0.72)",
        arc: "#57c7ff",
        ether: "#9c6bff",
        shadow: "#18102f",
      },
      boxShadow: {
        aura: "0 0 34px rgba(87, 199, 255, 0.18)",
        violet: "0 0 48px rgba(156, 107, 255, 0.2)",
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 7s ease-in-out infinite",
        rain: "rain 12s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        rain: {
          "0%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(20%)" },
        },
      },
    },
  },
  plugins: [],
};
