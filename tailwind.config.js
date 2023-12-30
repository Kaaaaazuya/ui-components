/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: false,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
   ],
  theme: {
    extend: {},
  },
  plugins: [],
}
