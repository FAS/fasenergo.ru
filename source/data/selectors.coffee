moment = require('moment')
{ orderBy } = require('lodash')
urljoin = require('../../modules/urljoin')

######################
# Generators selectors
######################

selectGenerator = (data, id) -> data[id]
selectGeneratorsIds = (data) -> Object.keys(data)
selectGenerators = (data, discontinued) ->
  generators = selectGeneratorsIds(data).map (id) => selectGenerator(data, id)
  generators = if discontinued then generators else rejectDiscontinued(generators)
  return generators

selectGeneratorsMaxPower = (data) -> getGeneratorHighestPower(getMostPowerfulGenerator(selectGenerators(data)))
selectGeneratorsMinPower = (data) -> getGeneratorHighestPower(getLeastPowerfulGenerator(selectGenerators(data)))

selectGeneratorsMaxPrice = (data) -> getMostExpensiveGenerator(selectGenerators(data)).price
selectGeneratorsMinPrice = (data) -> getLeastExpensiveGenerator(selectGenerators(data)).price

selectGeneratorsMaxServiceLife = (data) ->
  selectGenerators(data).map((g) => g.warranty.serviceLife).reduce((a, b) => if a > b then a else b)

selectGeneratorsMinServiceLife = (data) ->
  selectGenerators(data).map((g) => g.warranty.serviceLife).reduce((a, b) => if a < b then a else b)

getGeneratorHighestPower = (entry, type) =>
  power = entry.specs.power

  powers = [power.ng.max, power.lpg.max].filter (e) => typeof e == 'number'

  return Math.max powers...

getGeneratorMaxPowers = (entry) ->
  powers = entry.specs.power

  return Object.keys(powers).map (id) => powers[id].max

getMostPowerfulGenerator = (entries) -> entries.reduce ((acc, cur) =>
  if getGeneratorHighestPower(acc) > getGeneratorHighestPower(cur) then acc else cur),
  { specs: { power: { lpg: { max: -Infinity }, ng: { max: -Infinity } } } }
getLeastPowerfulGenerator = (entries) -> entries.reduce ((cur, pre) =>
  if getGeneratorHighestPower(cur) < getGeneratorHighestPower(pre) then cur else pre),
  { specs: { power: { lpg: { max: Infinity }, ng: { max: Infinity } } } }

getGeneratorMainPhoto = (entry) -> entry.photos and entry.photos.filter((p) => p.main == true)[0]
getGeneratorPhotosUrls = (entry) -> entry.photos and entry.photos.map((p) => p.url)

getGeneratorsWithHighestDiscount = (entries) -> entries.reduce ((cur, pre) =>
  if cur.discount > pre.discount then cur else pre),
  { discount: -Infinity }

getGeneratorCurrentPrice = (entry) ->
  price = entry.price
  discount = entry.discount

  if entry.priceBeforeDiscount
    return price
  if discount
    return (price - price * (discount / 100))

  return price

getGeneratorOriginalPrice = (entry) -> entry.priceBeforeDiscount or entry.price

getMostExpensiveGenerator = (entries) -> entries.reduce ((acc, cur) =>
  if getGeneratorCurrentPrice(acc) > getGeneratorCurrentPrice(cur) then acc else cur),
  { price: -Infinity }
getLeastExpensiveGenerator = (entries) -> entries.reduce ((cur, pre) =>
  if getGeneratorCurrentPrice(cur) < getGeneratorCurrentPrice(pre) then cur else pre),
  { price: Infinity }

getGeneratorSize = (entry) ->
  { _legacySize, size: { length, width, height } } = entry.enclosure

  if _legacySize
    return _legacySize

  return length and width and height and "#{length}x#{width}x#{height}"


generatorIsDiscontinued = (entry) -> entry.availability == 'discontinued'
generatorIsAvailable = (entry) -> entry.availability == 'available'

sortGeneratorsByPower = (entries) -> entries.sort (a, b) => getGeneratorHighestPower(a) - getGeneratorHighestPower(b)

rejectDiscontinued = (entries) -> entries.filter((g) => g.availability != 'discontinued')

filterWithBrands = (entries, brands) ->
  if brands.length == 0
    return entries

  return entries.filter (e) => brands.includes(e.manufacturer.brand)

filterWithTags = (entries, tags) ->
  if tags.length == 0
    return entries

  return entries.filter (e) => tags.some (t) => e.tags and e.tags.includes(t)

filterOutWithId = (entries, id) -> entries.filter (e) => e.slug != id

######################
# Engines selectors
######################

selectEngine = (data, id) -> data[id]
selectEnginesIds = (data) -> Object.keys(data)
selectEngines = (data) -> selectEnginesIds(data).map (id) => selectEngine(data, id)

selectEnginesBrands = (data) -> selectEngines(data).reduce (brands, engine) =>
  brand = engine.manufacturer.brand
  if not brands.includes(brand) then brands.push(brand)
  return brands
, []

getEngineTitle = (entry) -> "#{entry.manufacturer.brand} #{entry.model}"
getEngineCompressionRatio = (entry) -> "#{entry.compressionRatio.max}:#{entry.compressionRatio.min}"

######################
# Posts and promos selectors
######################

sortPostsByDate = (entries) => orderBy(entries, 'props.date', 'desc')
# Reject post, which displayed on current page
rejectCurrentPosts = (entries, pageCtx) => entries.filter (e) => e.props.url != pageCtx.url

selectPromos = (data) => Object.keys(data).map((id) => data[id]).filter (e) => e.props.tags and e.props.tags.includes('promo')
filterActivePromos = (entries) => entries.filter (e) => moment().isBefore(e.props.promoEndDate)
rejectActivePromos = (entries) => entries.filter (e) =>
  { tags, promoEndDate } = e.props
  return not tags or not tags.includes('promo') or not promoEndDate or not moment().isBefore(promoEndDate)

######################
# Magazines selectors
######################

sortMagazinesByDate = (entries) => orderBy(entries, 'props.date', 'desc')
getFreshMagazineIssue = (entries) => sortMagazinesByDate(entries)[0]
getArchivehMagazineIssues = (entries) =>
  [freshIssue, rest...] = sortMagazinesByDate(entries)
  return rest

######################
# Nunjucks extensions
######################

nunjucksExtensions = (env) ->
  env.addGlobal 'selectGenerator', selectGenerator
  env.addGlobal 'selectGeneratorsIds', selectGeneratorsIds
  env.addGlobal 'selectGenerators', selectGenerators
  env.addGlobal 'selectGeneratorsMaxPower', selectGeneratorsMaxPower
  env.addGlobal 'selectGeneratorsMinPower', selectGeneratorsMinPower
  env.addGlobal 'selectGeneratorsMaxPrice', selectGeneratorsMaxPrice
  env.addGlobal 'selectGeneratorsMinPrice', selectGeneratorsMinPrice
  env.addGlobal 'selectGeneratorsMaxServiceLife', selectGeneratorsMaxServiceLife
  env.addGlobal 'selectGeneratorsMinServiceLife', selectGeneratorsMinServiceLife
  env.addGlobal 'getGeneratorHighestPower', getGeneratorHighestPower
  env.addGlobal 'getGeneratorMaxPowers', getGeneratorMaxPowers
  env.addGlobal 'getMostPowerfulGenerator', getMostPowerfulGenerator
  env.addGlobal 'getLeastPowerfulGenerator', getLeastPowerfulGenerator
  env.addGlobal 'getGeneratorMainPhoto', getGeneratorMainPhoto
  env.addGlobal 'getGeneratorsWithHighestDiscount', getGeneratorsWithHighestDiscount
  env.addGlobal 'getGeneratorCurrentPrice', getGeneratorCurrentPrice
  env.addGlobal 'getGeneratorOriginalPrice', getGeneratorOriginalPrice
  env.addGlobal 'getGeneratorSize', getGeneratorSize
  env.addGlobal 'generatorIsDiscontinued', generatorIsDiscontinued
  env.addGlobal 'generatorIsAvailable', generatorIsAvailable
  env.addGlobal 'sortGeneratorsByPower', sortGeneratorsByPower
  env.addGlobal 'rejectDiscontinued', rejectDiscontinued
  env.addGlobal 'filterWithBrands', filterWithBrands
  env.addGlobal 'filterWithTags', filterWithTags
  env.addGlobal 'filterOutWithId', filterOutWithId

  env.addGlobal 'selectEngine', selectEngine
  env.addGlobal 'selectEnginesIds', selectEnginesIds
  env.addGlobal 'selectEngines', selectEngines
  env.addGlobal 'selectEnginesBrands', selectEnginesBrands
  env.addGlobal 'getEngineTitle', getEngineTitle
  env.addGlobal 'getEngineCompressionRatio', getEngineCompressionRatio

  env.addGlobal 'sortPostsByDate', sortPostsByDate
  env.addGlobal 'rejectCurrentPosts', rejectCurrentPosts
  env.addGlobal 'selectPromos', selectPromos
  env.addGlobal 'filterActivePromos', filterActivePromos
  env.addGlobal 'rejectActivePromos', rejectActivePromos

  env.addGlobal 'sortMagazinesByDate', sortMagazinesByDate
  env.addGlobal 'getFreshMagazineIssue', getFreshMagazineIssue
  env.addGlobal 'getArchivehMagazineIssues', getArchivehMagazineIssues

module.exports = {
  selectGenerator
  selectGeneratorsIds
  selectGenerators
  selectGeneratorsMaxPower
  selectGeneratorsMinPower
  selectGeneratorsMaxPrice
  selectGeneratorsMinPrice
  selectGeneratorsMaxServiceLife
  selectGeneratorsMinServiceLife
  getGeneratorHighestPower
  getGeneratorMaxPowers
  getMostPowerfulGenerator
  getLeastPowerfulGenerator
  getGeneratorMainPhoto
  getGeneratorPhotosUrls
  getGeneratorsWithHighestDiscount
  getGeneratorCurrentPrice
  getGeneratorOriginalPrice
  getGeneratorSize
  generatorIsDiscontinued
  generatorIsAvailable
  sortGeneratorsByPower
  rejectDiscontinued
  filterWithBrands
  filterWithTags
  filterOutWithId

  selectEngine
  selectEnginesIds
  selectEngines
  selectEnginesBrands
  getEngineTitle
  getEngineCompressionRatio

  sortPostsByDate
  rejectCurrentPosts
  selectPromos
  filterActivePromos
  rejectActivePromos

  sortMagazinesByDate
  getFreshMagazineIssue
  getArchivehMagazineIssues

  nunjucksExtensions
}
