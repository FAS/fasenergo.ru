module.exports = () ->

  ###
  Shell
  https://github.com/sindresorhus/grunt-shell
  Run shell commands
  ###

  @config 'shell',
    jspm_build:
      command: 'jspm build <%= file.source.script %> <%= file.build.script.compiled %> --minify'
    jspm_build_loncin_promo:
      command: 'jspm build <%= path.source.scripts %>/landings/loncin-promo.js <%= path.build.scripts %>/landings/loncin-promo.js --minify'
    # @todo It doesn't build Landings scripts, unless you launch it with Hot Reloading
    jspm_watch:
      command: 'jspm build <%= file.source.script %> <%= file.build.script.compiled %> -wid'

  ###
  Uglify
  https://github.com/gruntjs/grunt-contrib-uglify
  Minify files with UglifyJS
  ###

  @config 'uglify',
    build:
      files: [
        expand: true
        cwd: '<%= path.build.scripts %>'
        src: '{,**/}*.js'
        dest: '<%= path.build.scripts %>'
        ext: '.min.js'
      ]

  ###
  Clean
  https://github.com/gruntjs/grunt-contrib-clean
  Clean folders to start fresh
  ###

  @config.merge
    clean:
      scripts:
        files: [
          expand: true
          cwd: '<%= path.build.scripts %>'
          src: [
            '{,**/}*.*'
            '!{,**/}*.min.js'
          ]
        ]