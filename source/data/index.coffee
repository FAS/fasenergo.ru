{ merge } = require('lodash')
{ join } = require('path')
pkg = require('../../package.json')

module.exports = ({ config, file: { readYAML, readJSON } }) ->
  cwd = process.cwd()
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
      name: 'Фасэнергомаш'
      shortName: 'Фасэнергомаш'
      version: pkg.version
      description: 'Немецко-российский производитель газового оборудования'
      homepage: if sitename then "https://#{sitename}" else pkg.homepage
      logo: "/#{imagesPath}/logo.svg"
      viewport: 'width=1000'
      themeColor: '#252f38'
      locales: config('locales')
      baseLocale: config('baseLocale')
      matter: require(join(cwd, config('file.temp.data.matter')))
      images: require(join(cwd, config('file.temp.data.images')))
      googleAnalyticsId: 'UA-35704990-1'
      yandexMetrikaId: '20139793'
      mangoCallTrackerId: 11927
      roistatId: '87857cf3f1dc945c5daa3ef27bf87cfd'
      googleOptimizeId: 'GTM-WT37JN9'
    PLACEHOLDERS:
      company: 'Фасэнергомаш'
    PAGE_DEFAULTS:
      image: ''
      class: ''
      bodyClass: 'Wrapper--site Wrapper--sidebar-shift'
      coverImage: false
      applyWrapper: true
      applyWrapperV: true
      applyWrapperMain: true
      applyWrapperContainer: true
      applyWrapperContent: true
      forceFooterWrapperContent: false
      applyPreformat: true
      showContentTitle: true
      showBreadcrumb: true
    SOCIAL:
      vk:
        url: 'https://vk.com/fasenergo'
      facebook:
        image: "/#{imagesPath}/facebook.png"
        url: 'https://www.facebook.com/fasenergo'
      twitter:
        handle: '@fasenergo'
        image: "/#{imagesPath}/twitter.png"
        url: 'https://twitter.com/fasenergo'
    MAILCHIMP:
      account: 'fasenergo'
      accountId: '61a2bb4e7123eaa6a8ead27d4'
      listsIds:
        subscribers: '0a6025db66'
    BITRIX:
      # domain qualified name of your bitrix portal
      portalDomain: 'fasenergo.bitrix24.ru'
      forms:
        requestOffer:
          id: 9
          sec: '2j2s4m'
          type: 'button'
          click: ''
          # This can't be configurated, last number should always match id
          selector: 'b24-web-form-popup-btn-9'
    ENV:
      production: config('env.production')
      staging: config('env.staging')
      build: config('env.build')
      hotModuleRloading: config('env.hotModuleRloading')
    CONTACTS: require('./contacts')
    GENERATORS: readYAML join(__dirname, 'generators.yml')
    GENERATORS_OPTIONS: readYAML join(__dirname, 'generators.options.yml')
    ENGINES: readYAML join(__dirname, 'engines.yml')
    VAPORIZERS: readYAML join(__dirname, 'vaporizers.yml')

  return (locale) -> switch locale
    when 'ru-RU' then merge {}, data
    else data
