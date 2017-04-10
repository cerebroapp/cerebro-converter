/**
 * Generate base linear converter from rates hash
 * @param  {Object} rates
 * @return {Function} converter function
 */
module.exports = (rates) => (amount, from, to) => (
  Math.round(amount / rates[from.unit] * rates[to.unit] * 100) / 100
)
