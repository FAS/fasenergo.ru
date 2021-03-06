module.exports = () ->

  ###
  Copy
  https://github.com/gruntjs/grunt-contrib-copy
  Copy files and folders
  ###

  @config.merge
    copy:
      docs:
        files: [
          expand: true
          cwd: '<%= path.source.docs %>/'
          src: ['**']
          dest: '<%= path.build.docs %>/'
        ]

      # @todo Terrible workaround to lack of file loader for CSS for JSPM/SystemJS
      jspm_assets:
        files: if @config('env.build') then [
          expand: true
          cwd: 'jspm_packages'
          src: ['**/*.{jpg,png,gif,svg}']
          dest: '<%= path.build.root %>/jspm_packages'
        ] else []

  ###
  Watch
  https://github.com/gruntjs/grunt-contrib-watch
  Watches scss, js etc for changes and compiles them
  ###

  @config.merge
    watch:
      docs:
        files: ['<%= path.source.docs %>/{,**/}*']
        tasks: ['newer:copy:docs']