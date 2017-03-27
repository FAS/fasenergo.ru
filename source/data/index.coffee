{ merge } = require('lodash')
{ join } = require('path')

module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'
  sitename = grunt.config('env.sitename')

  data =
    path:
      # Remove `build/` part from path
      docs: '<%= grunt.template.process(path.build.docs).replace(path.build.root + \'/\', \'\') %>'
      fonts: '<%= grunt.template.process(path.build.fonts).replace(path.build.root + \'/\', \'\') %>'
      images: '<%= grunt.template.process(path.build.images).replace(path.build.root + \'/\', \'\') %>'
      scripts: '<%= grunt.template.process(path.build.scripts).replace(path.build.root + \'/\', \'\') %>'
      styles: '<%= grunt.template.process(path.build.styles).replace(path.build.root + \'/\', \'\') %>'
      sprites: '<%= grunt.template.process(path.build.sprites).replace(path.build.root + \'/\', \'\') %>'
      source: '<%= path.source %>'
      build: '<%= path.build %>'
    site:
      name: pkg.name
      desc: pkg.description
      themeColor: '#252f38'
      homepage: if sitename then "https://#{sitename}" else pkg.homepage
      twitter: pkg.twitter
      version: pkg.version
      locales: grunt.config('locales')
      baseLocale: grunt.config('baseLocale')
      googleAnalyticsId: false # 'UA-XXXXX-X'
      yandexMetrikaId: false # 'XXXXXX'
    env:
      production: '<%= env.production %>'
      staging: '<%= env.staging %>'
    data:
      currentYear: new Date().getFullYear()
      contacts: require('./contacts')
      generators: grunt.file.readYAML join(grunt.config('path.source.data'), 'generators.yml')
      engines: grunt.file.readYAML join(grunt.config('path.source.data'), 'engines.yml')

  return (locale) ->

    switch locale

      when 'ru-RU' then merge {}, data,

      else data