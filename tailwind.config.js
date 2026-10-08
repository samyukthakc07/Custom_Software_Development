/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07111F',
        secondaryBg: '#0B1728',
        card: '#101D30',
        primary: '#2563EB',
        accent: '#3B82F6',
        secondaryAccent: '#06B6D4',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        borderLight: 'rgba(148,163,184,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
