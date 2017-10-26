const sendBitrixForms = (e) => {
  const SELECTOR = '.js-bitrix-form'
  const $target = e.target

  const $forms = document.querySelectorAll(SELECTOR)

  $forms.forEach(($form) => {
    console.log('form')
    const $submitBtns = $form.querySelectorAll('button[type="submit"')
    const isSubmit = Array.from($submitBtns).some(($btn) => $btn.contains($target))

    if (!isSubmit) return
    e.preventDefault()
    console.log('isSubmit')

    const $inputs = $form.querySelectorAll('input')
    let data = {}

    $inputs.forEach(($input) => {
      data[$input.name] = $input.value
    })

    console.log(data)
  })
}

document.addEventListener('click', sendBitrixForms)
