/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#71ed6f',
          secondary: '#e0c260',
          accent: '#2b9ea0',
          neutral: '#221D35',
          'base-100': '#3C4044',
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
