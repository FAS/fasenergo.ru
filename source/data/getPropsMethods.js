const s = require('./selectors')

module.exports = ({ config }) => {
  const { GENERATORS } = config('data')()

  return {
    getGeneratorPageProps (id) {
      const g = s.selectGenerator(GENERATORS, id)

      return {
        generatorId: id,

        title: g.meta.title,
        contentTitle: g.title,
        navTitle: g.title,
        breadcrumbTitle: g.title,

        description: g.meta.description,

        excludeFromBreadcrumbSubmenu: s.generatorIsDiscontinued(g)
      }
    }
  }
}
