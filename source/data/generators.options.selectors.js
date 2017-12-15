const selectOption = (data, id) => data[id]
const selectOptionsIds = (data) => Object.keys(data)
const selectOptions = (data) => selectOptionsIds(data).map((id) => selectOption(data, id))

const exporting = {
  selectOption,
  selectOptionsIds,
  selectOptions
}

const nunjucksExtensions = (env) => {
  for (const e in exporting) { env.addGlobal(e, exporting[e]) }
}

module.exports = Object.assign({ nunjucksExtensions }, exporting)
