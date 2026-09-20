/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0d14',
          850: '#10131d',
          800: '#161a29',
          700: '#22283f',
          600: '#323b5c',
        },
        category: {
          music: '#10b981',      // Emerald / Neon Mint
          movie: '#f43f5e',      // Rose / Coral
          place: '#f59e0b',      // Amber / Warm Gold
          purchase: '#06b6d4',   // Cyan / Sea
          photo: '#3b82f6',      // Azure Blue
          message: '#8b5cf6',    // Violet / Purple
          search: '#6366f1',     // Indigo / Electric
          event: '#ec4899',      // Pink / Fuchsia
          note: '#eab308',       // Warm Yellow / Sand
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
