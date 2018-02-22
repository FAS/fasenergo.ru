const selectVaporizer = (data, id) => data[id]

const selectAllVaporizersIds = (data) => Object.keys(data)
const selectAllVaporizers = (data) => selectAllVaporizersIds(data)
  .map((id) => selectVaporizer(data, id))

const selectVaporizers = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испаритель')

const selectVaporizingStations = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испарительная установка')

const getWithLowPressure = (entries) => entries
  .filter((v) => v.specs.pressureType === 'низкое')

const getWithMedPressure = (entries) => entries
  .filter((v) => v.specs.pressureType === 'среднее')

const getWithBasicPressure = (entries) => entries
  .filter((v) => !v.specs.pressureType)

const exporting = {
  selectVaporizer,
  selectAllVaporizersIds,
  selectAllVaporizers,
  selectVaporizers,
  selectVaporizingStations,

  getWithLowPressure,
  getWithMedPressure,
  getWithBasicPressure
}

const nunjucksExtensions = (env) => {
  for (const e in exporting) { env.addGlobal(e, exporting[e]) }
}

module.exports = Object.assign({ nunjucksExtensions }, exporting)
