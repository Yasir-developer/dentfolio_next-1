/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './page-components/**/*.{js,ts,jsx,tsx,mdx}',

    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'banner-image': 'url(/images/Dentfoilo-BG.jpg)',
        'banner-image-mobile': 'url(/images/Dentfoilo-_BG_Mobile.jpg)',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      textDecorationLine: {
        underline: 'underline',
        'line-through': 'line-through',
        // Add more custom decoration lines if needed
      },
      colors: {
        'custom-blue': '#0372E2',
        'custom-blue-dark': '#0056b3',
        'custom-blue-light': '#0372E221',
        'custom-grey': '#707070',
        'footer-blue': '#001323',
        'custom-grey-dark': '#c8bfc3',
        'custom-dashboard-bg': '#F9FBFC',
        'custom-black': '#252525',
        'custom-grey-medium': '#d6d3cc',
        'custom-grey-light': '#d5d3d8',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1900px',
        'm-x': { max: '767px' },
      },
    },
  },
  plugins: [],
};
