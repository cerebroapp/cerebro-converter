// List of available currencies
const { CURRENCIES } = require('./constants.js')

/**
 * Build url to get exchange rates
 * @return {String} url
 */
module.exports = () => {
  return "https://www.mycurrency.net/service/rates"
}
