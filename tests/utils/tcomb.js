import t from 'tcomb-validation'

/**
 * Throw formatted list of tcomb errors
 * @param  {array} errors Array of tcomb errors
 * @return {void}
 * @throws {TypeError} If there are any errors in `errors` array
 */
const throwOnErrors = (errors) => {
  if (errors.length) {
    const message = errors.map((e) => e.message).reduce((acc, cur) => acc + '\n' + cur)

    throw new TypeError('[tcomb]\n' + message)
  }
}

/**
 * Validate data against schema with tcomb-validation
 * @param  {*}      data   Data structure to be validated
 * @param  {object} schema tcomb schema to be validate against
 * @return {void}
 * @throws {TypeError} If there are any validation errors
 */
const validate = (data, schema) => {
  const errors = t.validate(data, schema, { path: [schema.displayName] }).errors
  throwOnErrors(errors)
}

const refinements = {
  // Check is type exactly `false` or no
  False: t.refinement(t.Boolean, (b) => b === false, 'false'),

  /**
   * Check does target's keys are same as its `slug`s
   * @param  {object} target tcomb schema to be refined
   * @param  {string} [name] Name of result
   * @return {bool}
   */
  equalKeysAndSlugs: (target, name) => t.refinement(target, (obj) => {
    for (let k in obj) {
      const id = obj[k].slug

      if (k !== id) {
        console.error(`[tcomb] ivalid value ${id}<${typeof id}> supplied to \`../slug\`: expected ${k}<${typeof k}>`)
        return false
      }
    }

    return true
  }, name)
}

export { validate, throwOnErrors, refinements }
