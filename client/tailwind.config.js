/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0F172A",
        cardDark: "#1E293B",
        accent: "#2563EB",
      },
    },
  },
  plugins: [],
}
