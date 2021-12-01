module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: theme => ({
        // 'grayBg': '#dcdde1',
        // 'grayVia': '#F0F1F3',
        'first': '#447EB4',
        'middle': '#646eb2',
        'last': '#8F5FB1'
      }),

      

      backgroundColor: theme => ({
        'bgColor': '#253237',
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
