export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["DM Mono", "Consolas", "monospace"],
      },
      colors: {
        void: "#101417",
        panel: "rgba(25, 31, 34, 0.88)",
        arc: "#8ed0e5",
        ether: "#b7c5a6",
        shadow: "#182126",
      },
      boxShadow: {
        aura: "0 12px 30px rgba(0, 0, 0, 0.16)",
        violet: "0 18px 44px rgba(0, 0, 0, 0.22)",
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
