module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: (theme) => ({
        // 'first': '#447EB4',
        // 'middle': '#646eb2',
        // 'last': '#8F5FB1'
        first: "#5069ef",
        second: "#715df4",
      }),

      container: {
        center: true,
      },

      borderRadius: {
        borderstoryCustom: "5px",
      },

      fontSize: {
        custom: ["6em", "80px"],
      },

      spacing: {
        custom: "59.8%",
      },

      height: {
        custom: "80px",
        128: "90vh",
        192: "48rem",
      },

      leading: {
        custom: "80px",
      },

      padding: {
        custom: "0.05em",
        StoryCustom: "20px",
        inputcustom: "17.4em",
        selectCustom: "4.5rem",
      },

      width: {
        custom: "40rem",
      },

      backgroundColor: (theme) => ({
        bgColor: "#253237",
        homeButton: "#00CD92",
        navbarCustom: "#1C2530",
        grayCustom: "#DAE1ED",
        grayCustom1: "#f8f9ff",
        grayCustom2: "#f6f6f9",
      }),

      btnColor: (theme) => ({
        btnIndigo: "#6366F1",
      }),

      textColor: (theme) => ({
        customWhite: "#F4F6F6",
      }),

      container: {
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  transform: {
    customRotate: "rotate(90deg)",
  },

  variants: {
    extend: {
      shadow: ["hover"],
      translate: ["hover", "group-hover"],
      transform: ["hover", "group-hover"],
      transition: ["hover"],
      // skew: ['group-hover']
      scale: ["hover"],
      opacity: ["hover"],
      underline: ["hover"],
      rotate: ["group-hover", "hover"],
    },
  },
  plugins: [],
};
