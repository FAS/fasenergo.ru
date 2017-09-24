/* eslint-env jquery */

import 'ajaxchimp'
import * as track from './analytics'

$('.js-mc-subscribe-form').each((i, element) => {
  const $form = $(element)
  const $formSuccess = $form.find('.js-mc-subscribe-form__success')

  // @note Post URL is taken from forms's `action` attribute which is generated by Nunjucks component
  $($form).ajaxChimp({
    language: 'ru',
    callback: ({ result, msg }) => {
      if (result === 'success') {
        $form.fadeOut('slow', () => $form.replaceWith($formSuccess) && $formSuccess.fadeIn('slow'))
      }

      track.alreadySubscribed(result, msg)
    }
  })
})

$.ajaxChimp.translations.ru = {
  submit: 'Отправка формы...',
  0: 'Мы отправили на указанный адрес электронной почты письмо для подтверждения подписки',
  1: 'Пожалуйста, введите адрес электронной почты',
  2: 'Адрес электронной почты должен содержать как минимум один символ @',
  3: 'Неверный домен в адресе электронной почты (часть после @: )',
  4: 'Неверное имя пользователя в адресе электронной почты (часть после @: )',
  5: 'Введенный адрес электронной почты выглядит ложным или неправильным. Пожалуйста, введите настоящий адрес'
}
