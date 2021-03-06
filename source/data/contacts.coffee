module.exports = {

  main: {
    title: 'Центральный офис и производство',
    desc: null,
    address: [
      {
        country: 'Российская Федерация',
        index: 197229,
        city: 'Санкт-Петербург',
        street: 'п.&nbsp;Лахта, ул.&nbsp;Красных&nbsp;Партизан, д.&nbsp;10, к.&nbsp;1, литер&nbsp;А',
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
      # @todo Remove `TEMP_hideInMainContact` whicn was added for Mango Calltracker later
      { country: '7', city: '812', tel: ['407', '37', '73'], add: null, track: true, TEMP_hideInMainContact: false },
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
        { country: '7', city: '812', tel: ['407', '37', '73'], add: '510', track: true },
      ],
      emails: [{ value: ['info', 'fasenergo.ru'] }],
      skypes: null
    },

    support: {
      title: 'Сервис',
      desc: 'Обслуживание, гарантия, ремонт, заказ запчастей.',
      address: null,
      worktime: null,
      phones: [
        { country: '7', city: '812', tel: ['407', '18', '71'], track: false },
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
        { country: '7', city: '812', tel: ['407', '37', '73'], track: true }
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
        { country: '7', city: '812', tel: ['407', '37', '73'], add: '510', track: true }
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
    #     { country: '7', city: '812', tel: ['407', '37', '73'], add: '512', track: true }
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
      phones: [{ country: '7', city: '988', tel: ['602', '47', '27'], add: null, track: false }],
      emails: [{ value: ['gpu', 'kes-group.com'] }]
    }

  }

}
