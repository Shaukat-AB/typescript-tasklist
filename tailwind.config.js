/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'var(--primary)',
        success:'var(--success)',
        body:'var(--body)',
        gfrom:'var(--gfrom)',
        section:'var(--section)',
        "gray-150":'var(--gray)',
        "primary-dark" : 'var(--primary-dark)',
        "primary-text": 'var(--primary-text)',
        "success-dark" : 'var(--success-dark)',
        "section-dark" : 'var(--section-dark)',
      },
      animation: {
        'pulse-fin': 'pulse 0.5s linear',
      }
    },
  },
  plugins: [],
}

