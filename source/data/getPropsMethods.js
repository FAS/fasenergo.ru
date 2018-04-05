const s = require('./selectors')

module.exports = ({ config }) => {
  const { GENERATORS } = config('data')()

  return {
    getGeneratorPageProps (id) {
      const g = s.selectGenerator(GENERATORS, id)

      if (!g) throw new Error(`[getPropsMethods] unable to find \`${id}\` in \`data.GENERATORS\``)

      const maxPower = s.getGeneratorHighestPower(g)

      return {
        generatorId: id,

        title: g.meta.title,
        contentTitle: g.title,
        navTitle: `${g.model} (${maxPower} кВт)`,
        breadcrumbTitle: `${g.model} (${maxPower} кВт)`,

        description: g.meta.description,

        excludeFromBreadcrumbSubmenu: s.generatorIsDiscontinued(g)
      }
    }
  }
}
