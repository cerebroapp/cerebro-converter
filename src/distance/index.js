const { SYNONIMS, UNITS } = require('./constants')
const { buildExtract, getRates, parseUnitName, linearConverter } = require('../base')

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS)

function defaultTarget(unit) {
  return unit === 'm' ? 'ft' : 'm'
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: unit,
  }
}


module.exports ={
  getRates,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
  convert: linearConverter(UNITS),
}
