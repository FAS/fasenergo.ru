const { selectOption } = require('./generators.options.selectors')

// @todo This is a place for new selectors. Old one should be moved here

const getGeneratorOptions = (entry, options) => {
  const optionsIds = entry.equipment.optionsIds

  if (!optionsIds) return

  return optionsIds.map((id) => selectOption(options, id))
}

const exporting = {
  getGeneratorOptions
}

const nunjucksExtensions = (env) => {
  for (const e in exporting) { env.addGlobal(e, exporting[e]) }
}

module.exports = Object.assign({ nunjucksExtensions }, exporting)
