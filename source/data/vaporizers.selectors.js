const selectVaporizer = (data, id) => data[id]

const selectAllVaporizersIds = (data) => Object.keys(data)
const selectAllVaporizers = (data) => selectAllVaporizersIds(data)
  .map((id) => selectVaporizer(data, id))

const selectVaporizers = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испаритель')

const selectVaporizingStationsInLocker = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испарительная установка' && v.enclosure.type === 'шкаф')

const selectCircularVaporizingStations = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испарительная установка' && v.enclosure.type === 'кольцевое')

const selectVaporizingStationsWithSelfHeating = (data) => selectAllVaporizers(data)
  .filter((v) => v.type === 'испарительная установка' && v.specs.selfHeating)

const filterWithElectricalHeating = (entries) => entries
  .filter((v) => v.specs.heatType === 'электрический')

const filterWithLiquidHeating = (entries) => entries
  .filter((v) => v.specs.heatType === 'жидкостный')

const filterWithLowPressure = (entries) => entries
  .filter((v) => v.specs.pressureType === 'низкое')

const filterWithMedPressure = (entries) => entries
  .filter((v) => v.specs.pressureType === 'среднее')

const filterWithBasicPressure = (entries) => entries
  .filter((v) => !v.specs.pressureType)

const exporting = {
  selectVaporizer,
  selectAllVaporizersIds,
  selectAllVaporizers,
  selectVaporizers,
  selectVaporizingStationsInLocker,
  selectCircularVaporizingStations,
  selectVaporizingStationsWithSelfHeating,

  filterWithElectricalHeating,
  filterWithLiquidHeating,
  filterWithLowPressure,
  filterWithMedPressure,
  filterWithBasicPressure
}

const nunjucksExtensions = (env) => {
  for (const e in exporting) { env.addGlobal(e, exporting[e]) }
}

module.exports = Object.assign({ nunjucksExtensions }, exporting)
