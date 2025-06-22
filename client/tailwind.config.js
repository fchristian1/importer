import colors from 'tailwindcss/colors';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        menu: colors.gray['200'],
        navitem: colors.amber['200'],
      },
    },
  },
  plugins: [],
};
