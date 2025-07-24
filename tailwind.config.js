// tailwind.config.js
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // ganti sesuai struktur lo
  ],
  theme: {
    extend: {
      extend: {
        keyframes: {
          marquee: {
            "0%": { transform: "translateX(0%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        },
        animation: {
          marquee: "marquee 30s linear infinite",
        },
      },
    },
  },
  plugins: [],
};
