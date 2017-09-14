crumble = require('../modules/crumble')
{ merge } = require('lodash')
{ dirname, basename, extname, join } = require('path')
urljoin = require('../modules/urljoin')

module.exports = () ->
  DATA = @config.process @config('data')()

  ###
  Gray Matter
  https://www.npmjs.com/package/grunt-gray-matter
  Extract data from specified files with Gray Matter
  ###

  { PAGE_DEFAULTS } = DATA

  @config 'grayMatter',
    build:
      options:
        baseDir: '<%= path.source.templates %>'

        preprocessPath: (path) ->
          return [crumble(path)..., 'props']

        preprocessMatterData: (data, path, src) ->
          [breadcrumb..., prop] = path
          url = urljoin('/', breadcrumb...)

          return merge {}, PAGE_DEFAULTS, {
            slug:       path.slice(-2)[0]
            url:        if url == '/index' then '/' else url
            breadcrumb: breadcrumb
            depth:      breadcrumb.length
            dirname:    basename(dirname(src))
            basename:   basename(src, extname(src))
          }, data

      files: [
        src: ['<%= path.source.templates %>/{,**/}*.{nj,html}', '!<%= path.source.templates %>/{,**/}_*.{nj,html}']
        dest: '<%= file.temp.data.matter %>'
      ]

  ###
  Yandex Market Language
  modules/grunt-yandex-market-language
  Generates YML file from input data
  ###
  @config 'yandexMarketLanguage',
    build:
      options:
        data: require(join(process.cwd(), @config('path.source.data'), 'transformForYML'))(DATA)
      files: [
        dest: '<%= path.build.root %>/yandex-market.yml'
      ]

  ###
  Watch
  https://github.com/gruntjs/grunt-contrib-watch
  Watches scss, js etc for changes and compiles them
  ###

  @config.merge
    watch:
      data:
        files: ['<%= path.source.data %>/{,**/}*.{json,yml,js,coffee}']
        tasks: ['grayMatter', 'nunjucks']