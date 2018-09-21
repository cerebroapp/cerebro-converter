// List of available currencies
const { CURRENCIES } = require('./constants.js')

// TODO: move API key to plugin settings
const API_KEY = '5d35ac86e868977c24bbae30b5f9d018'

/**
 * Build url to get exchange rates
 * @return {String} url
 */
module.exports = () => {
  return `http://data.fixer.io/api/latest?access_key=${API_KEY}&format=1`
}
