// List of available currencies
const { CURRENCIES } = require('./constants.js')

/**
 * Build url to get exchange rates
 * @param  {String} base Base currency
 * @return {String} url
 */
module.exports = (base) => {
  const symbols = CURRENCIES.map(cur => cur.toUpperCase()).join(',')
  return `https://api.fixer.io/latest?base=${base}&symbols=${symbols}`
}
