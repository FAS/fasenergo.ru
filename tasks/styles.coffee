sass = require('node-sass')
{ castToSass } = require('node-sass-utils')(sass)
{ get } = require('lodash')
onecolor = require('onecolor')

module.exports = () ->

  ###
  Sass
  https://github.com/sindresorhus/grunt-sass
  Compiles Sass with node-sass
  ###

  data = @config.process @config('data')()

  @config 'sass',
    build:
      options:
        outputStyle: 'nested'
        sourceMap: true
        functions:

          ###*
           * Get path from shared data
           * @todo Add proper handling of localized data
           * @param  {array|string} query Query to property in `data.PATH`, which contains
           *                              needed path, according to https://lodash.com/docs#get
           * @return {string}             Requested path
           * @example $images-path: '/' + kotsu-path(images);
          ###
          'kotsu-path($query)': (query) => castToSass(get(data.PATH, query.getValue()))

          ###*
           * Get current theme color from `data.SITE.themeColor`, which used for `theme-color` meta
           * @todo Add proper handling of localized data
           * @return {string} Requested color as Sass rgba value
           * @example $primary-color: kotsu-theme-color();
          ###
          'kotsu-theme-color()': () =>
            c = onecolor(data.SITE.themeColor)
            return sass.types.Color(c.red() * 255, c.green() * 255, c.blue() * 255, c.alpha())

      files: [
        expand: true
        cwd: '<%= path.source.styles %>'
        src: '{,**/}*.scss'
        dest: '<%= path.build.styles %>'
        ext: '.compiled.css'
      ]

  ###
  PostCSS
  https://github.com/nDmitry/grunt-postcss
  Apply several post-processors to your CSS using PostCSS
  ###

  @config 'postcss',
    autoprefix:
      options:
        processors: [
          require('autoprefixer')
        ]
        map: true
      files: [
        expand: true
        cwd: '<%= path.build.styles %>'
        src: '{,**/}*.compiled.css'
        dest: '<%= path.build.styles %>'
        # @todo Revert to this value when `uncss` task issue will be solved
        # ext: if @config('env.production') then '.min.css' else '.prefixed.css'
        ext: '.prefixed.css'
      ]

  ###
  Uncss
  https://github.com/addyosmani/grunt-uncss
  Remove unused CSS
  ###

  # @todo Disabled because it doesn't play well with tons of pages and takes forever to process them
  #       It seems that issue somehow coming from `main.js`. When removed, processing
  #       still takes a lot, but usually around 6 minutes. But, unfortunately, I wasn't
  #       able to pinpoint exact source of issue, since debugging is tricky.
  #       It might become more usable when https://github.com/giakki/uncss/issues/321 will be implemented

  # @config 'uncss',
  #   build:
  #     options:
  #       htmlroot: '<%= path.build.root %>'
  #       ignore: [
  #         # Classes inside IE conditional blocks have to be ignored explicitly
  #         # See https://github.com/giakki/uncss/issues/112
  #         '.Outdated-browser'
  #         '.Outdated-browser__link'

  #         # @todo https://github.com/tmpvar/jsdom/issues/1750
  #         'svg:not(:root)'

  #         # @todo https://github.com/giakki/uncss/pull/280#issuecomment-320507763
  #         '::placeholder'

  #         # This class usually not occurs in original templates, but you might want
  #         # to use it occasionally on production
  #         '.o-show-grid'

  #         # Ignore state-related classes, like `is-active` and `menu-entry--is-active`
  #         /[-\.#](is|has|not)-/
  #       ]
  #       ignoreSheets : [
  #         # Ignoring all remote CSS to avoid pulling into main styles unexpected CSS.
  #         # It is recommended to whitelist needed external CSS explicitly instead.
  #         /^(http(s)?|\/\/).*/
  #       ]
  #     files: [
  #       src: '<%= path.build.root %>/{,**/}*.html'
  #       dest: '<%= file.build.style.tidy %>'
  #     ]

  ###
  CSSO
  https://github.com/t32k/grunt-csso
  Minify CSS files with CSSO
  ###

  @config 'csso',
    build:
      options:
        report: 'min'
      files: [
        expand: true
        cwd: '<%= path.build.styles %>'
        # @todo Revert to this value when issue with `uncss` task will be solved
                # src: '{,**/}*.tidy.css'
        src: '{,**/}*.prefixed.css'
        dest: '<%= path.build.styles %>'
        ext: '.min.css'
      ]

  ###
  Clean
  https://github.com/gruntjs/grunt-contrib-clean
  Clean folders to start fresh
  ###

  @config.merge
    clean:
      styles:
        files: [
          expand: true
          cwd: '<%= path.build.styles %>'
          src: [
            '{,**/}*.*'
            '!{,**/}*.min.css'
          ]
        ]

  ###
  Watch
  https://github.com/gruntjs/grunt-contrib-watch
  Watches scss, js etc for changes and compiles them
  ###

  @config.merge
    watch:
      styles:
        files: [
          '<%= path.source.styles %>/{,**/}*.scss'
          '<%= path.temp.styles %>/{,**/}*.scss'
        ]
        tasks: [
          'sass'
          'postcss:autoprefix'
        ]