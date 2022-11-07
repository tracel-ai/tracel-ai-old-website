const { Icons } = require('tailwindcss-plugin-icons')

const carbon = require('@iconify-json/carbon/icons.json')
const mdi = require('@iconify-json/mdi/icons.json')

/**
 * @type {import('tailwindcss-plugin-icons').Options}
 */
const options = () => ({
  carbon,
  mdi,
})

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    Icons(options),
  ],
}
