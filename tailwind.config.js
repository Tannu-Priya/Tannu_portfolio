/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#030305',
          900: '#07070a',
          850: '#0b0c11',
          800: '#10121a',
          750: '#171924',
          700: '#202433',
          600: '#2c3247',
        },
        charcoal: {
          950: '#050608',
          900: '#090b10',
          850: '#0e1117',
          800: '#141824',
          750: '#191f2e',
          700: '#22293d',
          600: '#2f3852',
        },
        champagne: {
          100: '#fdf9f0',
          200: '#f9f0db',
          300: '#f2dfb4',
          400: '#eed7a1',
          500: '#d4a849',
          600: '#b88931',
        },
        silver: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        platinum: {
          light: '#f1f5f9',
          DEFAULT: '#e2e8f0',
          dark: '#cbd5e1',
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'metallic-linear': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(200, 210, 230, 0.7) 40%, rgba(238, 215, 161, 0.5) 75%, rgba(255, 255, 255, 0.9) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'obsidian-glow': 'radial-gradient(ellipse at 50% 0%, rgba(238, 215, 161, 0.08) 0%, rgba(3, 3, 5, 0) 70%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatRev 9s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(226, 232, 240, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(238, 215, 161, 0.45))' },
        },
      },
    },
  },
  plugins: [],
}
