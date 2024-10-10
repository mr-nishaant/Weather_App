/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#1f51ff',
        'neon-pink': '#ff1aff',
        'neon-green': '#39ff14',
        'shadow-neon': '0 0 10px rgba(31, 81, 255, 0.7), 0 0 20px rgba(255, 26, 255, 0.7), 0 0 30px rgba(57, 255, 20, 0.7)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14' },
          '50%': { textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 50px #39ff14' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

