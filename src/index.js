/* eslint no-eval: 0 */

const distance = require('./distance')
const mass = require('./mass')
const currency = require('./currency')
const temperature = require('./temperature')
const icon = require('./icon.png')

// Array of all available converters
const CONVERTERS = [
  distance,
  mass,
  currency,
  temperature,
]

const numberRegexp = /[-+/*\d\s,\.\( )]+/
const unitRegexp = /[\wa-я\$€£₣₹฿₴₽₪'"°℃]+/

const mainRegexpString = [
  // Start of line
  '^',
  // Number that we want to convert
  `(${numberRegexp.source})`,
  // Maybe space before source unit
  '\\s?',
  // Source unit name
  `(${unitRegexp.source})`,
  // Maybe spaces and any of word, like 'to' or 'in'
  '\\s*(?:to|in|at|в)?\\s*',
  // Maybe target unit (we can try to get default target unit by source unit)
  `(${unitRegexp.source})?`,
  // End of line
  '$'
].join('')

// Main regexp to match conversation strings
const REGEXP = new RegExp(mainRegexpString, 'i')

/**
 * Get rates for all units
 * @return {Promise} promise that resolves when all units are ready
 */
function eachConverter(config, fn) {
  CONVERTERS.forEach(converter => {
    converter.getRates(config).then(() => fn(converter))
  })
}

/**
 * Convert currency
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const converterPlugin = ({ term, display, config }) => {
  const match = term.toLowerCase().match(REGEXP)
  if (match) {
    let amount
    try {
      amount = parseFloat(eval(match[1].toString().replace(/,/g, '.')))
    } catch (err) {
      // do nothing when amount parse failed
      return
    }

    eachConverter(config, converter => {
      const pair = converter.extract(match)
      if (!pair) {
        return
      }
      const [from, to] = pair
      const result = converter.convert(amount, from, to).toLocaleString()
      display({
        icon,
        title: `${amount.toLocaleString()}${from.displayName} = ${result}${to.displayName}`,
        term: `${term} = ${result}${to.displayName}`,
        clipboard: result.toString(),
      })
    })
  }
}

module.exports = {
  name: 'Convert',
  fn: converterPlugin,
}
