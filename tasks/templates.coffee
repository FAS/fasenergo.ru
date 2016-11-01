{ set, get, merge } = require('lodash')
{ join }            = require('path')
crumble             = require('../modules/crumble')
humanReadableUrl    = require('../modules/humanReadableUrl')
i18nTools           = require('../modules/i18n-tools')
nunjucksExtensions  = require('../modules/nunjucks-extensions')

module.exports = (grunt) ->

  ###
  Nunjucks to HTML
  https://github.com/vitkarpov/grunt-nunjucks-2-html
  Render nunjucks templates
  ###

  # ======
  # Config
  # ======

  options =
    autoescape         : false
    data               : grunt.config('data')
    paths              : grunt.config('path.source.templates')
    files:
      cwd              : grunt.config('path.source.templates')
      src              : ['{,**/}*.{nj,html}', '!{,**/}_*.{nj,html}']
      dest             : grunt.config('path.build.templates')
      ext              : '.html'
      matter           : grunt.config('file.temp.data.matter')
    humanReadableUrls:
      enabled          : true
      exclude          : /^(index|\d{3})$/
    i18n:
      locales          : grunt.config('i18n.locales')
      baseLocale       : grunt.config('i18n.baseLocale')
      baseLocaleAsRoot : true
      gettext          : grunt.config('i18n.gettext')

  { getLocalesNames, getLocaleProps, getLocaleDir, getLangcode, getRegioncode, isoLocale } = new i18nTools(options.i18n.locales, options.i18n.baseLocale, options.i18n.baseLocaleAsRoot)

  gettext = options.i18n.gettext
  locales = getLocalesNames()

  # =======================
  # Config l10n of Nunjucks
  # =======================

  locales.forEach (currentLocale) =>
    localeDir     = getLocaleDir(currentLocale)
    localeProps   = getLocaleProps(currentLocale)
    localizedData = options.data(currentLocale)

    # Define targets, with unique options and files for each locale
    @config "nunjucks.#{currentLocale}",

      options:
        paths                : options.paths
        autoescape           : options.autoescape
        data                 : localizedData
        configureEnvironment : (env) ->

          ###*
           * Init built-in Nunjucks extensions, globals and filters. See `nunjucks-extensions` module for docs
          ###
          nunjucksExtensions(env, grunt, currentLocale, localeProps.numberFormat, localeProps.currencyFormat)

          # -----
          # i18n
          # -----

          ###*
           * Output or not locale's dir name based on whether it's base locale or not.
           * Most useful for urls construction
           * @param {string} locale = currentLocale locale Name of locale, for which should be made resolving
           * @return {string} Resolved dir name
           * @example <a href="{{ localeDir() }}/blog/">blog link</a>
          ###
          env.addGlobal 'localeDir', (locale = currentLocale) ->
            _localeDir = getLocaleDir(locale)
            if _localeDir then '/' + _localeDir else ''

          ###*
           * Init gettext for Nunjucks. See `gettext` module for docs
          ###
          gettext.textdomain(currentLocale)
          gettext.installNunjucksGlobals(env)

          ###*
           * Get language code from locale, without country
           * @param {string} locale = currentLocale Locale, from which should be taken language code
           * @return {string} Language code from locale
          ###
          env.addFilter 'langcode', (locale = currentLocale) ->
            getLangcode(locale)

        preprocessData: (data) ->
          pagepath     = humanReadableUrl(@src[0].replace(options.files.cwd, ''), options.humanReadableUrls.exclude)
          breadcrumb   = crumble(pagepath)
          matterData   = grunt.file.readJSON(options.files.matter)
          pageProps    = (get(matterData, breadcrumb) or {}).props

          set data, 'site.__matter__', matterData

          data.page = merge data.page,
            props:
              locale    : currentLocale
              isoLocale : isoLocale(currentLocale)
              language  : getLangcode(currentLocale)
              region    : getRegioncode(currentLocale)
              rtl       : localeProps.rtl
            ,
              props: pageProps

          return data

      files: [
        expand: true
        cwd: options.files.cwd
        src: options.files.src
        dest: join(options.files.dest, localeDir)
        ext: options.files.ext
        rename: (dest, src) =>
          src = if options.humanReadableUrls.enabled then humanReadableUrl(src, options.humanReadableUrls.exclude) else src
          join(dest, src)
      ]

  ###
  Minify HTML
  https://github.com/gruntjs/grunt-contrib-htmlmin
  Minify HTML code
  ###

  @config 'htmlmin',
    build:
      options:
        removeComments: true
        removeCommentsFromCDATA: true
        collapseWhitespace: true
        conservativeCollapse: true
        collapseBooleanAttributes: true
        removeEmptyAttributes: true
        removeScriptTypeAttributes: true
        removeStyleLinkTypeAttributes: true
      files: [
        expand: true
        cwd: '<%= path.build.root %>'
        src: '{,**/}*.html'
        dest: '<%= path.build.root %>'
      ]

  ###
  Watch
  https://github.com/gruntjs/grunt-contrib-watch
  Watches scss, js etc for changes and compiles them
  ###

  @config.merge
    watch:
      templates:
        files: ['<%= path.source.templates %>/{,**/}*.nj', '!<%= path.source.templates %>{,**/}_*.nj']
        tasks: ['grayMatter', 'newer:nunjucks']
      templatesPartials:
        files: ['<%= path.source.templates %>/{,**/}_*.nj']
        tasks: ['grayMatter', 'nunjucks']