######################
# Generators selectors
######################

selectGenerator = (data, id) -> data.generators[id]
selectGeneratorsIds = (data) -> Object.keys(data.generators)
selectGenerators = (data) -> selectGeneratorsIds(data).map (id) => selectGenerator(data, id)

getGeneratorHighestPower = (entry, type) =>
  power = entry.specs.power

  if power._legacy
    return power._legacy

  return Math.max power.lpg._legacy, power.ng._legacy

getGeneratorMaxPowers = (entry) ->
  powers = entry.specs.power

  if powers._legacy
    return [powers._legacy]

  powersIds = Object.keys(powers).filter (id) => id != '_legacy'
  return powersIds.map (id) => powers[id]._legacy or powers[id].max

getMostPowerfulGenerator = (entries) -> entries.reduce ((acc, cur) => if getGeneratorHighestPower(acc) > getGeneratorHighestPower(cur) then acc else cur), { specs: { power: { _legacy: -Infinity } } }
getLeastPowerfulGenerator = (entries) -> entries.reduce ((cur, pre) => if getGeneratorHighestPower(cur) < getGeneratorHighestPower(pre) then cur else pre), { specs: { power: { _legacy: Infinity } } }

getGeneratorMainPhoto = (entry) -> entry.photos and entry.photos.filter((p) => p.main == true)[0]

getGeneratorsWithHighestDiscount = (entries) -> entries.reduce ((cur, pre) => if cur.discount > pre.discount then cur else pre), { discount: -Infinity }

getGeneratorPrice = (entry) -> entry._legacyPrice or entry.price
getGeneratorCurrentPrice = (entry) ->
  price = getGeneratorPrice(entry)
  discount = entry.discount

  if entry._legacyOldPrice
    return price
  if discount
    return (price - price * (discount / 100))

  return price

getGeneratorOriginalPrice = (entry) -> entry._legacyOldPrice or getGeneratorPrice(entry)

generatorIsDiscontinued = (entry) -> entry.availability == 'discontinued'
generatorIsAvailable = (entry) -> entry.availability == 'available'

sortGeneratorsByPower = (entries) -> entries.sort (a, b) => getGeneratorHighestPower(a) - getGeneratorHighestPower(b)

filterWithBrands = (entries, brands) ->
  if brands.length == 0
    return entries

  return entries.filter (e) => brands.includes(e.manufacturer.brand)

filterWithTags = (entries, tags) ->
  if tags.length == 0
    return entries

  return entries.filter (e) => tags.some (t) => e.tags and e.tags.includes(t)

######################
# Engines selectors
######################

selectEngine = (data, id) -> data.engines[id]

getEngineTitle = (entry) -> "#{entry.manufacturer.brand} #{entry.model}"

######################
# Nunjucks extensions
######################

nunjucksExtensions = (env) ->
  env.addGlobal 'selectGenerator', selectGenerator
  env.addGlobal 'selectGeneratorsIds', selectGeneratorsIds
  env.addGlobal 'selectGenerators', selectGenerators
  env.addGlobal 'getGeneratorHighestPower', getGeneratorHighestPower
  env.addGlobal 'getGeneratorMaxPowers', getGeneratorMaxPowers
  env.addGlobal 'getMostPowerfulGenerator', getMostPowerfulGenerator
  env.addGlobal 'getLeastPowerfulGenerator', getLeastPowerfulGenerator
  env.addGlobal 'getGeneratorMainPhoto', getGeneratorMainPhoto
  env.addGlobal 'getGeneratorsWithHighestDiscount', getGeneratorsWithHighestDiscount
  env.addGlobal 'getGeneratorPrice', getGeneratorPrice
  env.addGlobal 'getGeneratorCurrentPrice', getGeneratorCurrentPrice
  env.addGlobal 'getGeneratorOriginalPrice', getGeneratorOriginalPrice
  env.addGlobal 'generatorIsDiscontinued', generatorIsDiscontinued
  env.addGlobal 'generatorIsAvailable', generatorIsAvailable
  env.addGlobal 'sortGeneratorsByPower', sortGeneratorsByPower
  env.addGlobal 'filterWithBrands', filterWithBrands
  env.addGlobal 'filterWithTags', filterWithTags

  env.addGlobal 'selectEngine', selectEngine
  env.addGlobal 'getEngineTitle', getEngineTitle

module.exports = {
  selectGenerator
  selectGeneratorsIds
  selectGenerators
  getGeneratorHighestPower
  getGeneratorMaxPowers
  getMostPowerfulGenerator
  getLeastPowerfulGenerator
  getGeneratorMainPhoto
  getGeneratorsWithHighestDiscount
  getGeneratorPrice
  getGeneratorCurrentPrice
  getGeneratorOriginalPrice
  generatorIsDiscontinued
  generatorIsAvailable
  sortGeneratorsByPower
  filterWithBrands
  filterWithTags

  selectEngine
  getEngineTitle

  nunjucksExtensions
}