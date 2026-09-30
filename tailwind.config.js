/** Yeahzy theme — mirrors the Yeahzy design system tokens. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FFE500',
        'on-brand': '#0A0A0A',
        ink: '#0A0A0A',
        surface: {
          100: '#161616',
          200: '#1C1C1C',
          300: '#262626',
        },
        line: {
          100: '#1F1F1F',
          200: '#2A2A2A',
          300: '#3A3A3A',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans Variable"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        tag: '4px',
        sm: '10px',
        md: '14px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        nav: '76px',
      },
    },
  },
  plugins: [],
};
