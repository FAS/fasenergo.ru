/* eslint-env jquery */

import 'ajaxchimp'

const { account, baseUrl, uuid, lists } = {
  'account': 'fas',
  'baseUrl': 'us11.list-manage.com',
  'uuid': '2f53e4a700ea23c4785d076b2',
  'lists': {
    // @todo put here proper list name and id, then change name in source/templates/components/_SubscriptionForm.nj
    testers: '0e5589489b'
  }
}

$('.js-mc-subscribe-form').each((i, element) => {
  const $form = $(element)
  const $formSuccess = $form.find('.js-mc-subscribe-form__success')
  const formList = $form.data('list')

  !lists.hasOwnProperty(formList) &&
    console.error(`[mailchimp] unrecognized list type \`${formList}\` specified in \`data-list\` form attribute`)

  $($form).ajaxChimp({
    url: `https://${account}.${baseUrl}/subscribe/post?u=${uuid}&amp;id=${lists[formList]}`,
    language: 'ru',
    callback: (r) => {
      if (r.result === 'success') {
        $form.fadeOut('slow', () => $form.replaceWith($formSuccess) && $formSuccess.fadeIn('slow'))
      }
    }
  })
})

$.ajaxChimp.translations.ru = {
  'submit': 'Отправка формы...',
  0: 'Мы отправили на указанный адрес электронной почты письмо для подтверждения подписки',
  1: 'Пожалуйста, введите адрес электронной почты',
  2: 'Адрес электронной почты должен содержать как минимум один символ @',
  3: 'Неверный домен в адресе электронной почты (часть после @: )',
  4: 'Неверное имя пользователя в адресе электронной почты (часть после @: )',
  5: 'Введенный адрес электронной почты выглядит ложным или неправильным. Пожалуйста, введите настоящий адрес'
}
