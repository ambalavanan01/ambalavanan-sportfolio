/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        surface: '#f8fafc',
        primary: '#2563eb',
        'primary-hover': '#1d4ed8',
        secondary: '#0891b2',
        'secondary-hover': '#0e7490',
        text: '#0f172a',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Trebuchet MS"', '"Segoe UI"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    }
  },
  plugins: [],
}
