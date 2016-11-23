module.exports = {

  main: {
    title: 'Центральный офис и производство',
    desc: null,
    address: [
      { index: 194044, city: 'Санкт-Петербург', street: 'п. Лахта, ул. Красных партизан, д. 10 литер А', map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7980.791353707298!2d30.15379!3d59.995213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x61bce8d8cbac3f95!2z0KTQsNGB0Y3QvdC10YDQs9C-0LzQsNGI!5e0!3m2!1sen!2sua!4v1479760331367' }
    ],
    worktime: [
      { days: ['Пн' , 'Пт'], start: [9, '00'], end: [18, '00'] },
      { days: ['Сб' , 'Вс'], nonWorking: true }
    ],
    phones: [
      { country: '7', city: '800', tel: [333, 79, 11], add: null, desc: null }
    ],
    emails: [
      { value: ['info', 'fasenergo.ru'], desc: 'по запросам дилерства' }
    ],
    map: null
  },

  departaments: {

    sales: {
      title: 'Отдел продаж',
      desc: 'Любые вопросы, связанные с покупкой оборудования.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: [318, 75, 75], add: 511, desc: null },
        { country: '7', city: '911', tel: [77, 204, '04'], add: null, desc: null }
      ],
      emails: [{ value: ['vaa', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'vaa.fasenergo', desc: null }]
    },

    support: {
      title: 'Сервисный отдел',
      desc: 'Обслуживание, гарантия, ремонт, заказ запчастей.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: [318, 75, 75], add: 700, desc: null },
        { country: '7', city: '921', tel: [984, 61, 44], add: null, desc: null }
      ],
      emails: [{ value: ['vaa', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'vaa.fasenergo', desc: null }]
    }

    industrial: {
      title: 'Промышленные решения',
      desc: 'Продажа и обслуживание оборудования большой мощности для промышленных объектов.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: [318, 75, 75], add: 513, desc: null },
        { country: '7', city: '911', tel: [743, 40, 61], add: null, desc: null }
      ],
      emails: [{ value: ['vde', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'vde.fasenergo', desc: null }]
    },

    export: {
      title: 'Экспорт',
      desc: 'Обслуживание, гарантия, ремонт, заказ запчастей.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: [318, 75, 75], add: 512, desc: null },
        { country: '7', city: '921', tel: [868, 38, 49], add: null, desc: null }
      ],
      emails: [{ value: ['snn', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'snn.fasenergo', desc: null }]
    },

    export: {
      title: 'Дилерам',
      desc: 'Задать вопрос, узнать условия сотрудничества, получить типовой договор.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: [318, 75, 75], add: 512, desc: null }
      ],
      emails: [{ value: ['dealer', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'dealer.fasenergo', desc: null }]
    }

  }

  representatives: {

    fasMoscow: {
      title: 'ФАС-Москва',
      desc: null,
      address: [
        { index: 117449, city: 'Москва', street: 'ул. Карьер, дом 2А, строение 2', map: '#' }
      ],
      worktime: null,
      phones: [{ country: '7', city: '985', tel: [46, 204, '04'], add: null, desc: null }],
      emails: [{ value: ['bii', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'fasenergo762', desc: null }]
    },

    fasEkaterinburg: {
      title: 'ФАС-Екатеринбург',
      desc: null,
      address: [
        { index: 620075, city: 'Екатеринбург', street: 'ул. Ленина д. 50 литер Д оф. 128', map: '#' }
      ],
      worktime: null,
      phones: [{ country: '7', city: '912', tel: ['05', 204, '04'], add: null, desc: null }],
      emails: [{ value: ['dya', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'live:dya_132', desc: null }]
    },

    fasKazan: {
      title: 'ФАС-Казань',
      desc: null,
      address: [
        { index: 420034, city: 'Казань', street: 'ул. Проточная д.8 офис 309', map: '#' }
      ],
      worktime: null,
      phones: [{ country: '7', city: '987', tel: [40, 204, '04'], add: null, desc: null }],
      emails: [{ value: ['mtn', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'mtn@fasenergo', desc: null }]
    },

    fasNovosibirsk: {
      title: 'ФАС-Новосибирск',
      desc: null,
      address: [
        { index: 630091, city: 'Новосибирск', street: 'ул. Фрунзе, дом 5, оф.631', map: '#' }
      ],
      worktime: null,
      phones: [
        { country: '7', city: '913', tel: [93, 204, '04'], add: null, desc: null },
        { country: '7', city: '383', tel: [36, 36, '047'], add: null, desc: null }
      ],
      emails: [{ value: ['dpv', 'fasenergo.ru'], desc: null }],
      skypes: [{ value: 'dpv.fasenergo', desc: null }]
    },

    fasKrasnodar: {
      title: 'ФАС-Краснодар (ООО «КЭС-ГРУПП»)',
      desc: null,
      address: [
        { index: 350018, city: 'Краснодар', street: 'ул. Сормовская, д.7', map: '#' }
      ],
      worktime: null,
      phones: [{ country: '7', city: '988', tel: [602, 47, 27], add: null, desc: null }],
      emails: [{ value: ['gpu', 'kes-group.com'], desc: null }],
      skypes: [{ value: 'dunkovs', desc: null }]
    }

  }

}