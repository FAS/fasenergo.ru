/**
 * @jest-environment jsdom
 */

/* eslint-env jest */
/* global GROUP, INPUT_1, INPUT_2, LABEL_1, LABEL_2 */

describe('ToggleSorters click listner', () => {
  it('should toggle inputs ordering', () => {
    document.body.innerHTML = `
      <form id='GROUP' class='js-toggle-sorter'>
        <label>First <input id='INPUT_1' name='sort' type='radio' data-order='asc' checked></label>
        <label>Second <input id='INPUT_2' name='sort' type='radio' data-order='asc'></label>
      </form>
    `

    require('../../source/scripts/plugins/toggle-radio-group')

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)

    // We leave first input in cliecked state to ensure that
    // it will return to default state after INPUT_2 being clicked
    INPUT_1.click()

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)

    INPUT_2.click()

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    INPUT_2.click()

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    INPUT_2.click()

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    INPUT_1.click()

    expect(GROUP.outerHTML).toMatchSnapshot()
    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)
  })
})

describe('togglePresets click listner', () => {
  it('should toggle presets checked state', () => {
    document.body.innerHTML = `
      <form id='GROUP' class='js-toggle-presets'>
        <label id='LABEL_1'>
          First <input id='INPUT_1' name='preset' type='radio' data-preset='' checked>
        </label>
        <label id='LABEL_2'>
          Second <input id='INPUT_2'  name='preset' type='radio' data-preset='[7,10]'>
        </label>
      </form>
    `

    require('../../source/scripts/plugins/toggle-radio-group')

    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)

    INPUT_1.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(false)

    INPUT_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    INPUT_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(false)

    INPUT_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    INPUT_1.click()

    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)

    // Checking labels clicking
    // In some cases in might wrongly yeild wrong results

    LABEL_1.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(false)

    LABEL_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    LABEL_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(false)

    LABEL_2.click()

    expect(INPUT_1.checked).toBe(false)
    expect(INPUT_2.checked).toBe(true)

    LABEL_1.click()

    expect(INPUT_1.checked).toBe(true)
    expect(INPUT_2.checked).toBe(false)
  })
})
