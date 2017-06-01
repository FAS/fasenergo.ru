module.exports = () ->

  ###
  Generate sitemap
  https://github.com/lotustm/grunt-sitemap-xml
  Grunt plugin for generating XML sitemaps for search engine indexing
  ###

  @config 'sitemap_xml',
    build:
      files: [
        cwd: '<%= path.build.root %>/'
        src: ['{,**/}*.html', '!{403,404,500,503}.html']
        dest: '<%= path.build.root %>/sitemap.xml'
      ]

  ###
  Cache Bust
  https://github.com/hollandben/grunt-cache-bust
  Bust static assets from the cache using content hashing
  ###

  @config.merge
    cacheBust:
      build:
        options:
          algorithm: 'md5'
          deleteOriginals: true
          baseDir: '<%= path.build.root %>'
          assets: ['{,**/}*.{css,js}']
        files: [
          src: [
            '<%= path.build.root %>/{,**/}*.{html,css,js}'
          ]
        ]

  ###
  Clean
  https://github.com/gruntjs/grunt-contrib-clean
  Clean folders to start fresh
  ###

  @config.merge
    clean:
      build:
        files:
          src: [
            '<%= path.build.root %>/*'
          ]
      temp:
        files:
          src: [
            '<%= path.temp.root %>/*'
          ]

  ###
  Browser Sync
  https://github.com/shakyshane/grunt-browser-sync
  Keep multiple browsers & devices in sync
  ###

  @config 'browserSync',
    debug:
      options:
        open: true
        notify: true
        watchTask: true
        online: false
        ghostMode:
          clicks: true
          links: true
          forms: true
          scroll: true
        watchEvents: ['add', 'change']
        server:
          baseDir: '<%= path.build.root %>'
          routes:
            '/jspm_packages': 'jspm_packages'
            '/jspm.config.js': 'jspm.config.js'
            # @note this route should match JSPM `baseURL`
            #       see https://github.com/LotusTM/Kotsu/issues/230
            #           https://github.com/alexisvincent/systemjs-hot-reloader/issues/141
            '/source/scripts': 'source/scripts'
      bsFiles:
        src: [
          # @note For JS files changes watches `chockidar-socket-emitter` and emits directly to `systemjs-hot-reloader`
          '<%= path.build.root %>/**/*.css'
          '<%= path.build.root %>/**/*.html'
          '<%= path.build.root %>/**/*.{png,jpg,jpeg,gif,svg,ico}'
          '<%= path.build.root %>/**/*.{xml,txt}'
          '<%= path.build.root %>/**/*.{eot,ttf,woff}'
        ]