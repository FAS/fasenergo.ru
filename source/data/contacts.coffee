module.exports = {

  main: {
    title: 'Центральный офис и производство',
    desc: null,
    address: [
      {
        index: 197229,
        city: 'Санкт-Петербург',
        street: 'п. Лахта, ул. Красных партизан, д. 10 литер А',
        yandexMapSrc: 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=zz08rnmsLRzMg4-TBs3zRWGJbxgsTuuf&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;sourceType=constructor',
        # @todo Enable when will be real photos
        # images: [{
        #   src: 'http://placehold.it/1350x700',
        #   alt: 'Описание картинки'
        # },{
        #   src: 'http://placehold.it/1350x450',
        #   alt: 'Описание картинки'
        # },{
        #   src: 'http://placehold.it/1350x450',
        #   alt: 'Описание картинки'
        # }]
      }
    ],
    worktime: [
      { days: ['Пн' , 'Пт'], daysFull: ['понедельник' , 'пятница'], start: ['9', '00'], end: ['18', '00'] },
      { days: ['Сб' , 'Вс'], daysFull: ['суббота' , 'воскресенье'], nonWorking: true }
    ],
    phones: [
      { country: '7', city: '800', tel: ['333', '79', '11'], add: null, noParentheses: true },
      { country: '7', city: '812', tel: ['318', '75', '75'], add: null }
    ],
    emails: [
      { value: ['info', 'fasenergo.ru'] }
    ]
  },

  departments: {

    sales: {
      title: 'Отдел продаж',
      desc: 'Любые вопросы, связанные с покупкой оборудования.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: ['318', '75', '75'], add: '510' },
      ],
      emails: [{ value: ['sale', 'fasenergo.ru'] }],
      skypes: null
    },

    support: {
      title: 'Сервис',
      desc: 'Обслуживание, гарантия, ремонт, заказ запчастей.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: ['318', '75', '75'], add: '540' },
      ],
      emails: [{ value: ['support', 'fasenergo.ru'] }],
      skypes: false
    }

    industrial: {
      title: 'Промышленные решения',
      desc: 'Продажа и обслуживание оборудования большой мощности для промышленных объектов.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: ['318', '75', '75'] }
      ],
      emails: [{ value: ['industrial', 'fasenergo.ru'] }],
      skypes: false
    },

    dealers: {
      title: 'Дилерский',
      desc: 'Узнать условия сотрудничества, получить типовой договор и прочие вопросы.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: ['318', '75', '75'], add: '511' }
      ],
      emails: [{ value: ['dealer', 'fasenergo.ru'] }],
      skypes: false
    }

    # @todo До определения что делать с этим отделом, зачем он и кто за него отвечает
    # export: {
    #   title: 'Экспорт',
    #   desc: 'Покупка, обслуживание, ремонт, запчасти.',
    #   address: null,
    #   worktime: null,
    #   phones: [
    #     { country: '7', city: '812', tel: ['318', '75', '75'], add: '512' }
    #   ],
    #   emails: [{ value: ['snn', 'fasenergo.ru'] }],
    #   skypes: [{ value: 'snn.fasenergo' }]
    # }

  }

  representatives: {

    fasKrasnodar: {
      title: 'Краснодар',
      desc: null,
      address: [
        {
          index: 350018,
          city: 'Краснодар',
          street: 'ул. Сормовская, д. 7',
          yandexMapSrc: 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=BEORC6wevBhsncqMHHW5lWScm8flkDng&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;sourceType=constructor',
          images: null
        }
      ],
      worktime: null,
      phones: [{ country: '7', city: '988', tel: ['602', '47', '27'], add: null }],
      emails: [{ value: ['gpu', 'kes-group.com'] }],
      skypes: [{ value: 'dunkovs' }]
    }

  }

}