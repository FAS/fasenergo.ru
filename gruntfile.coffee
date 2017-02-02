{ map, includes } = require('lodash')

module.exports = (grunt) ->
  'use strict'

  Gettext = require('./modules/gettext')(grunt)
  require('./modules/grunt-gray-matter')(grunt)
  # Track execution time
  require('time-grunt') grunt
  # Load grunt tasks automatically
  require('jit-grunt') grunt,
    nunjucks: 'grunt-nunjucks-2-html'
    sprite: 'grunt-spritesmith'

  # Define the configuration for all the tasks
  grunt.initConfig

    # Specify environment variables
    env:
      sitename: process.env.SITENAME
      production: process.env.PRODUCTION or includes(grunt.cli.tasks, 'build')
      staging: process.env.STAGING or grunt.option('staging')
      tinypng:
        api:
          key: process.env.TINYPNG_API_KEY
      github:
        api:
          key: process.env.GITHUB_API_KEY

    # Specify your source and build directory structure
    path:
      tasks:
        root: 'tasks'

      source:
        root: 'source'
        docs: '<%= path.source.root %>/assets/docs'
        data: '<%= path.source.root %>/data'
        fonts: '<%= path.source.root %>/assets/fonts'
        icons: '<%= path.source.root %>/assets/icons'
        images: '<%= path.source.root %>/assets/images'
        locales: '<%= path.source.root %>/locales'
        scripts: '<%= path.source.root %>/scripts'
        sprites: '<%= path.source.root %>/assets/sprites'
        static: '<%= path.source.root %>/static'
        styles: '<%= path.source.root %>/styles'
        templates: '<%= path.source.root %>/templates'

      temp:
        root: 'temp'
        data: '<%= path.temp.root %>/data'
        styles: '<%= path.temp.root %>/styles'

      build:
        root: 'docker/nginx/build'
        assets: '<%= path.build.root %>/assets'
        docs: '<%= path.build.assets %>/docs'
        fonts: '<%= path.build.assets %>/fonts'
        images: '<%= path.build.assets %>/images'
        scripts: '<%= path.build.assets %>/scripts'
        sprites: '<%= path.build.assets %>/sprites'
        static: '<%= path.build.root %>'
        styles: '<%= path.build.assets %>/styles'
        templates: '<%= path.build.root %>'

    # Specify files
    file:
      source:
        script: '<%= path.source.scripts %>/main.js'

      temp:
        data:
          matter: '<%= path.temp.data %>/matter.json'

      build:
        script:
          compiled: '<%= path.build.scripts %>/main.js'
        style:
          tidy: '<%= path.build.styles %>/style.tidy.css'
        sprite:
          compiled: '<%= path.build.sprites %>/sprite.png'
          hash: '<%= path.build.sprites %>/hash.json'

    i18n:
      locales: [
          locale: 'ru-RU'
          url: 'ru'
          rtl: false
          defaultForLanguage: true
          numberFormat: '0,0.[00]'
          currencyFormat: '0,0.[00] $'
      ]
      baseLocale: 'ru-RU'

  localesNames = map(grunt.config('i18n.locales'), 'locale')

  grunt.config.merge
    i18n:
      gettext: new Gettext({ locales: localesNames, cwd: grunt.config('path.source.locales'), src: '{,**/}*.{po,mo}' })
      localesNames: localesNames

    data: require('./' + grunt.config('path.source.data'))(grunt)

  grunt.loadTasks grunt.config('path.tasks.root')

  ###
  Default task
  ###
  grunt.registerTask 'default', [
    'clean:build'
    'copy'
    'grayMatter'
    'nunjucks'
    'sprite'
    'webfont'
    'sass'
    'postcss:autoprefix'
    'shell:jspm_install'
    'shell:jspm_build'
    'responsive_images:thumbnails'
    'browserSync'
    'watch'
  ]

  ###
  A task for your production environment
  ###
  grunt.registerTask 'build', [
    'clean'
    'copy'
    'grayMatter'
    'nunjucks'
    'sprite'
    'webfont'
    'sass'
    'postcss:autoprefix'
    'uncss'
    'csso'
    'shell'
    'uglify'
    'htmlmin'
    'responsive_images:thumbnails'
    'tinypng'
    'clean:styles'
    'clean:scripts'
    'cacheBust'
    'sitemap_xml'
    'size_report'
  ]

  ###
  A task for linting
  ###
  grunt.registerTask 'lint', [
    'stylelint:lint'
    'standard:lint'
  ]

  ###
  A task for a static server with a watch
  ###
  grunt.registerTask 'serve', [
    'browserSync'
    'watch'
  ]

  return