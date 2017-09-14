/**
 * Output fuel type as a word
 * @param {string} phases Fuel type id
 * @return {string} Fuel type in a word
 * @example fuelTypeToWord('ng') // => 'метан'
 */
const fuelTypeToWord = (fuel) => {
  switch (fuel) {
    case 'ng': return 'метан'
    case 'lpg': return 'СУГ'
    default: throw new Error(`[fuelTypeToWord] unknown fuel type: \`${fuel}\``)
  }
}

/**
 * Output engine cooling type as a word
 * @param {string} coolingType Engine cooling type id
 * @return {string} Enclosure type in a word
 * @example coolingToWord('air') // => 'воздушное'
 */
const coolingToWord = (coolingType) => {
  switch (coolingType) {
    case 'air': return 'воздушное'
    case 'liquid': return 'жидкостное'
    default: throw new Error(`[coolingToWord] unknown cooling type: \`${coolingType}\``)
  }
}

/**
 * Output amount of the phases as a word
 * @param {number} phases Amount of phases
 * @return {string} Phases in a word
 * @example PhasesToWord(1) // => 'однофазный'
 */
const phasesToWord = (phases) => {
  switch (phases) {
    case 1: return 'однофазный'
    case 3: return 'трехфазный'
    default: throw new Error(`[phasesToWord] unknown number of phases: \`${phases}\``)
  }
}

const nunjucksExtensions = (env) => {
  env.addGlobal('fuelTypeToWord', fuelTypeToWord)
  env.addGlobal('coolingToWord', coolingToWord)
  env.addGlobal('phasesToWord', phasesToWord)
}

module.exports = {
  fuelTypeToWord,
  coolingToWord,
  phasesToWord,

  nunjucksExtensions
}
