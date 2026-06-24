/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master Prompt অনুযায়ী কালার সিস্টেম
        primary: "#0F172A",
        accent: "#2563EB",
        secondary: "#475569",
        border: "#E2E8F0",
        sectionBg: "#F8FAFC",
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
}