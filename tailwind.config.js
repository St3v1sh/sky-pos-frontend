/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary-100': '#003c78',
        'color-primary-200': '#2e4f86',
        'color-primary-300': '#4b6295',
        'color-primary-400': '#6577a4',
        'color-primary-500': '#7e8cb3',
        'color-primary-600': '#97a2c2',
        'color-surface-100': '#121212',
        'color-surface-200': '#282828',
        'color-surface-300': '#3f3f3f',
        'color-surface-400': '#575757',
        'color-surface-500': '#717171',
        'color-surface-600': '#8b8b8b',
        'color-surface-mixed-100': '#161a25',
        'color-surface-mixed-200': '#2b2f39',
        'color-surface-mixed-300': '#42454f',
        'color-surface-mixed-400': '#5a5d66',
        'color-surface-mixed-500': '#74767e',
        'color-surface-mixed-600': '#8e9096',
      },
    },
  },
  plugins: [],
}

