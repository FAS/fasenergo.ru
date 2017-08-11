{ merge } = require('lodash')
pkg = require('../../package.json')

module.exports = ({ config, file: { readYAML } }) ->
  sitename = config('env.sitename')
  buildRoot = config('path.build.root') + '/'
  imagesPath = config('path.build.images').replace(buildRoot, '')

  data =
    PATH:
      docs: config('path.build.docs').replace(buildRoot, '')
      fonts: config('path.build.fonts').replace(buildRoot, '')
      images: imagesPath
      scripts: config('path.build.scripts').replace(buildRoot, '')
      styles: config('path.build.styles').replace(buildRoot, '')
      sprites: config('path.build.sprites').replace(buildRoot, '')
      source: config('path.source')
      build: config('path.build')
    SITE:
      name: pkg.name
      shortName: pkg.name
      version: pkg.version
      description: pkg.description
      homepage: if sitename then "https://#{sitename}" else pkg.homepage
      logo: "/#{imagesPath}/logo.svg"
      viewport: 'width=960, initial-scale=1'
      themeColor: '#252f38'
      locales: config('locales')
      baseLocale: config('baseLocale')
      googleAnalyticsId: 'UA-35704990-1'
      yandexMetrikaId: '20139793'
    PLACEHOLDERS:
      company: pkg.name
    PAGE_DEFAULTS:
      image: ''
      class: '',
      bodyClass: ''
      coverImage: false,
      applyWrapper: true,
      applyWrapperV: true,
      applyWrapperMain: true,
      applyWrapperContainer: true,
      applyWrapperContent: true,
      forceFooterWrapperContent: false,
      applyPreformat: true,
      showContentTitle: true,
      showBreadcrumb: true
    SOCIAL:
      vk:
        url: "https://vk.com/fasenergo"
      facebook:
        image: "/#{imagesPath}/facebook.png"
        url: 'https://www.facebook.com/fasenergo'
    ENV:
      production: config('env.production')
      staging: config('env.staging')
      build: config('env.build')
      hotModuleRloading: config('env.hotModuleRloading')
    CONTACTS: require('./contacts')
    GENERATORS: readYAML "#{__dirname}/generators.yml"
    ENGINES: readYAML "#{__dirname}/engines.yml"

  return (locale) -> switch locale
    when 'ru-RU' then merge {}, data
    else data