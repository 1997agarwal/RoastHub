/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#060608',
          900: '#0a0a0c',
          850: '#101015',
          800: '#16161d',
          700: '#23232c',
          600: '#32323e',
        },
        flame: {
          DEFAULT: '#ff5500',
          50: '#fff5ed',
          100: '#ffe8d5',
          200: '#ffd0aa',
          300: '#ffb074',
          400: '#ff853d',
          500: '#ff5500',
          600: '#f04300',
          700: '#c72e00',
          800: '#9e2400',
          900: '#801e00',
        },
        amber: {
          neon: '#ffaa00',
          bright: '#ffbb1a',
          glow: '#ffcc33',
        },
        bone: '#f8fafc',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier Prime"', 'monospace'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flame-flicker': 'flicker 2s infinite ease-in-out',
        'stamp-down': 'stamp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'scanline': 'scanline 8s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(255, 85, 0, 0.6))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 8px rgba(255, 170, 0, 0.4))' },
        },
        stamp: {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '70%': { transform: 'scale(0.92) rotate(-8deg)', opacity: '0.95' },
          '100%': { transform: 'scale(1) rotate(-10deg)', opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
