const yml = require('yandex-market-language')
const { cyan, red } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write }, util: { pluralize } }) =>
  registerMultiTask('yandexMarketLanguage', 'Extract data from specified files with Gray Matter', function () {
    const files = this.files.length
    const { data } = this.options({
      data: {}
    })

    if (!files) return log.error('No files specified.')

    let count = 0

    this.files.forEach((file) => {
      const { dest, src } = file

      if (src) log.warn('Task does not accept sources, but in files `src` property has been provided')
      if (!dest) return log.warn('No dest file specified')

      try {
        const YML = yml(data)
        write(dest, YML.end({ pretty: true }))
      } catch (err) {
        return log.warn(err)
      }

      count += 1
      verbose.ok(`File ${cyan(dest)} created`)
    })

    const failedFiles = files - count

    log[failedFiles ? 'error' : 'ok'](`${cyan(count)} ${pluralize(count, 'file/files')} created${failedFiles ? `, ${red(failedFiles)} failed` : ''}`)
  })
