/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070a14',
          900: '#0a0e1a',
          850: '#0d1424',
          800: '#111b33',
          700: '#1a2747',
        },
        cyan: {
          400: '#22d3ee',
          300: '#67e8f9',
          500: '#06b6d4',
        },
        sky: {
          400: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(34, 211, 238, 0.35), 0 0 10px rgba(56, 189, 248, 0.2)',
        'cyan-glow-lg': '0 0 40px rgba(34, 211, 238, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite alternate',
        'orbit-spin': 'orbitSpin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(34, 211, 238, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(34, 211, 238, 0.8))' },
        },
        orbitSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
