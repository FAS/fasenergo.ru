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