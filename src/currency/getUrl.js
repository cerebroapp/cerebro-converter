// List of available currencies
const { CURRENCIES } = require('./constants.js')

/**
 * Build url to get exchange rates
 * @return {String} url
 */
module.exports = () => {
  return "http://www.mycurrency.net/service/rates"
}
