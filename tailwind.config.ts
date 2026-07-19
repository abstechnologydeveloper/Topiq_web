import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEE7FF',
          100: '#DCCEFF',
          200: '#B99CFF',
          300: '#9670FF',
          400: '#7A4AE8',
          500: '#6A33DF',
          600: '#5A22D6',
          700: '#4A1BB0',
          800: '#3A1489',
          900: '#2A0D63',
          950: '#1A063E',
        },
        secondary: {
          50: '#FFFBE6',
          100: '#FFF3B3',
          200: '#FFEB80',
          300: '#FFE34D',
          400: '#FCD21A',
          500: '#F4B400',
          600: '#D49A00',
          700: '#B38000',
          800: '#936600',
          900: '#734C00',
          950: '#523300',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#333333',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config