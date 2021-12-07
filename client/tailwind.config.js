module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'first': '#447EB4',
        'middle': '#646eb2',
        'last': '#8F5FB1'
      }),

      borderRadius: {
        'borderstoryCustom': '5px'
      },

      fontSize: {
        'custom': ['6em', '80px']
      },

      spacing: {
        'custom':'59.8%'
      },

      height: {
        'custom': '80px'
      },

      leading: {
        'custom': '80px'
      },

      padding: {
        'custom': '0.05em',
        'StoryCustom': '20px',
        'inputcustom': '17.4em'
      },


      backgroundColor: theme => ({
        'bgColor': '#253237',
      }),

      btnColor:  theme => ({
        'btnIndigo': '#6366F1',
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