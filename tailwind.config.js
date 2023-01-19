/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#333F44',
          secondary: '#37AA9C',
          accent: '#94F3E4',
          neutral: '#fff',
          'base-100': '#1A1A1B',
          info: '#61AFCC',
          success: '#17CF94',
          warning: '#D77F14',
          error: '#F34B35'
        }
      }
    ]
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway']
      }
    }
  },
  plugins: [
    require('autoprefixer'),
    require('daisyui'),
    require('prettier-plugin-tailwindcss')
  ]
}
