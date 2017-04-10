const { SYNONIMS, UNITS } = require('./constants')
const { buildExtract, getRates, parseUnitName, linearConverter } = require('../base')

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS)

function defaultTarget(unit) {
  return unit === 'kg' ? 'lb' : 'kg'
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: unit,
  }
}


module.exports = {
  getRates,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
  convert: linearConverter(UNITS),
}
