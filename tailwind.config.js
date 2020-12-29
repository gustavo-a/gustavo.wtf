module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      container: {
        center: true
      },
      colors: {},

      fontFamily: {
        body: ['Open Sans', 'Helvetica', 'sans-serif'],
        display: ['Hind', 'Verdana', 'Arial', 'sans-serif']
      },

      letterSpacing: {
        super: '.2rem'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
}
