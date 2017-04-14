crumble = require('../modules/crumble')
{ merge } = require('lodash')
{ dirname, basename, extname } = require('path')
{ resolve } = require('url')

module.exports = () ->

  ###
  Gray Matter
  https://www.npmjs.com/package/grunt-gray-matter
  Extract data from specified files with Gray Matter
  ###

  @config 'grayMatter',
    build:
      options:
        baseDir: '<%= path.source.templates %>'

        preprocessPath: (path) ->
          return [crumble(path)..., 'props']

        preprocessMatterData: (data, path, src) ->
          [breadcrumb..., prop] = path
          breadcrumbPath = breadcrumb.join('/')

          # @todo This should prevent edge cases with `/test/page.html` resulting in `/test/page.html/`
          #       However, it should be re-checked, since it seems like a fragile method
          if not breadcrumbPath.includes('.')
            breadcrumbPath += '/'

          composedData = merge {
            slug:       path.slice(-2)[0]
            url:        if breadcrumb.length == 1 and  breadcrumb[0] == 'index' then '/' else resolve('/', breadcrumbPath)
            breadcrumb: breadcrumb
            depth:      breadcrumb.length
            dirname:    basename(dirname(src))
            basename:   basename(src, extname(src))
          }, data

          return composedData

      files: [
        src: ['<%= path.source.templates %>/{,**/}*.{nj,html}', '!<%= path.source.templates %>/{,**/}_*.{nj,html}']
        dest: '<%= file.temp.data.matter %>'
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
        tasks: ['nunjucks']