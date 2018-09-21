const getUrl = require('./getUrl')
const getBaseCurrency = require('./getBaseCurrency')
const { SYNONIMS, DISPLAY_NAMES, PRIORITY_CURRENCIES } = require('./constants')
const { parseUnitName, buildExtract, linearConverter } = require('../base/')

// Hash of exchange rates
const rates = {}

// Date of fetching exchange rates
let ratesDate = null

let baseCurrency = null

/**
 * Get cache expiration date
 * @return {Date}
 */
function cacheExpirationDate() {
  return new Date(Date.now() - 2 * 3600 * 1000)
}

/**
 * Check that saved exchange rates are still valid
 * @return {Boolean}
 */
function cacheValid() {
  return ratesDate && ratesDate >= cacheExpirationDate()
}

/**
 * Fetch & save rates from yahoo API
 * @return {Promise} promise that resolves with rates JSON
 */
function getRates(config) {
  baseCurrency = getBaseCurrency(config)
  const url = getUrl()
  if (cacheValid()) return Promise.resolve(rates)
  return fetch(url)
    .then(resp => resp.json())
    .then(response => {
      // Save exchange rates date
      ratesDate = new Date() // mycurrency.net doesn't provide last refresh timestamp
      // Convert response array with exchange rates to hash
      Object.keys(response.rates).forEach(key => {
        rates[key.toLowerCase()] = parseFloat(response.rates[key])
      })
    })
}

/**
 * Convert string to real currency
 * @param  {String} unit
 * @return {String}
 */
function toUnit(unit) {
  return parseUnitName(SYNONIMS, rates, unit)
}

/**
 * Get target currency when it is not defined
 * @param  {string} currency
 * @return {string}
 */
function defaultTarget(currency) {
  if (baseCurrency !== currency) {
    return baseCurrency
  }
  return PRIORITY_CURRENCIES.find(cur => cur !== currency)
}

/**
 * Prettified name of currency. It is currency sign if it is supported
 * @param  {String} currency
 * @return {String}
 */
function displayName(currency) {
  return DISPLAY_NAMES[currency] || currency
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: displayName(unit),
  }
}

module.exports = {
  getRates,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
  convert: linearConverter(rates),
}
