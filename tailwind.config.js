/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tree-gradient': 'linear-gradient(rgba(26, 26, 43, 0.8), rgba(26, 26, 43, 0)), linear-gradient(#295e5c, #295e5c)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        '3d': '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000',
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        'courier-new': ['"Courier New"', 'monospace'],
        'tahoma': ['Tahoma', 'sans-serif'],
      },
      
      colors:{
        cyan:{
          100: "#083344",
          
        },
        customNeutral: '#f0ede6',
        originalColor:"#faf7f5",
        redRose:"#a1405f",
        tree:"#295e5c"
        // slate:{
        //   800:"#1e293b"
        // }
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/aspect-ratio'), 
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-3d': {
          textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000'
        },
      }
      addUtilities(newUtilities)
    }
  ],
  daisyui: {
    themes: ["light", "coffee","dark", "cupcake", "forest", "halloween", "winter", "dracula", "black"],
  },
}
