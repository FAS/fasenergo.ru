const yml = require('yandex-market-language')
const { cyan, red } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write }, util: { pluralize } }) =>
  registerMultiTask('yandexMarketLanguage', 'Extract data from specified files with Gray Matter', function () {
    const { data } = this.options({
      data: {}
    })

    if (!this.files.length) return log.error('No files specified.')

    let processedFiles = 0
    let errors = 0

    this.files.forEach((file) => {
      const { dest, src } = file

      if (src) log.warn('Task does not accept sources, but in files `src` property has been provided')
      if (!dest) return log.warn('No dest file specified')

      try {
        const YML = yml(data)
        write(dest, YML.end({ pretty: true }))
      } catch (err) {
        errors++
        return log.warn(err)
      }

      processedFiles++
      verbose.ok(`File ${cyan(dest)} created`)
    })

    const processedMessage = `${cyan(processedFiles)} ${pluralize(processedFiles, 'file/files')} created`
    const failedMessage = `${errors ? `, ${red(errors)} failed` : ''}`

    log[errors ? 'error' : 'ok'](processedMessage + failedMessage)

    if (errors) throw new Error(`${errors} ${pluralize(errors, 'error/errors')} has been encountered during creating YML files.\nSee log above for details.`)
  })
