/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        italicSerif: ['Instrument Serif', 'Fraunces', 'serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#fbfbf9',
          alt: '#f7f6f2',
          card: '#ffffff',
          subtle: '#f4f4f0',
          border: '#e2e2dc',
          borderLight: '#e5e7eb',
        },
        ink: {
          primary: '#0f172a',
          secondary: '#1e293b',
          muted: '#64748b',
          tertiary: '#94a3b8',
        },
        midnight: {
          DEFAULT: '#090e1a',
          card: '#111827',
          border: '#1e293b',
        },
      },
      letterSpacing: {
        eyebrow: '0.15em',
        tightHeadline: '-0.025em',
      },
    },
  },
  plugins: [],
};
