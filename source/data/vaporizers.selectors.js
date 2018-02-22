const selectVaporizer = (data, id) => data[id]

const selectAllVaporizersIds = (data) => Object.keys(data)
const selectAllVaporizers = (data) => selectAllVaporizersIds(data)
  .map((id) => selectVaporizer(data, id))

const selectVaporizers = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испаритель')

const selectVaporizingStations = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испарительная установка')

const exporting = {
  selectVaporizer,
  selectAllVaporizersIds,
  selectAllVaporizers,
  selectVaporizers,
  selectVaporizingStations
}

const nunjucksExtensions = (env) => {
  for (const e in exporting) { env.addGlobal(e, exporting[e]) }
}

module.exports = Object.assign({ nunjucksExtensions }, exporting)
