module.exports = {

  sale: {
    title: 'Отдел продаж по СЗФО',
    desc: null,
    address: {
      main: { index: 194044, city: 'Санкт-Петербург', street: 'п. Лахта, ул. Красных партизан, д. 10 литер А'}
    }
    worktime: [
      { days: 'Пн-Пт', start: [9, '00'], end: [18, '00'] },
      { days: 'Сб-Вс', nonWorking: true }
    ],
    phones: {
      main: { country: '7', city: '812', tel: [318, 75, 75], add: 511, desc: null }
    },
    emails: {
      main: { value: ['info', 'fasenergo.ru'], desc: null }
    },
    skypes: {
      main: { value: 'vaa.fasenergo', desc: null }
    }
  }

}