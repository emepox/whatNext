module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'grayBg': '#dcdde1',
        'grayVia': '#F0F1F3'
      }),
      container: {
        padding: {
          DEFAULT: '2rem',
          sm: '1rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
    },
  },
  variants: {
    extend: {
      shadow: ['hover'],
      translate: ['hover'],
      // skew: ['group-hover']
      scale: ['hover'],
      opacity: ['hover'],
    },
  },
  plugins: [],
}
