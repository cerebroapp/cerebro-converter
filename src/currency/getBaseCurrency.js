const { CURRENCY_BY_LANG, CURRENCY_BY_COUNTRY } = require('./constants')

/**
 * Get base currency based on country and language
 * @return {String}
 */
module.exports = (config) => (
  CURRENCY_BY_COUNTRY[config.get('country')] || CURRENCY_BY_LANG[config.get('lang')] || 'usd'
)
