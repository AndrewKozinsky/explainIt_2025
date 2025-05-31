// import ArticleType from '../../articleType'

/*const the: ArticleType.Art = {
	meta: {
		number: 12,
		slug: 'the',
		caption: 'Глава 10',
		articleName: 'Определённый артикль the',
		articleDescription:
			'Определённый артикль the используется перед сущностями известными собеседнику из контекста. ',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как работает' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Из предыдущих уроков вы знаете, что перед каждым существительным должен быть определитель. И определённый артикль ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',
					text: ' один из них. Он используется перед объектами известными собеседнику из контекста.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{ type: 'text', text: 'Неопределённый артикль ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',
					text: ' применяется только для исчисляемых существительных в единственном числе. У определённого артикля ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',

					text: ' таких ограничений нет: работает и с неисчисляемыми и с существительными во множественном числе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', text: 'Яблоки красные.' },

				{ type: 'text', text: 'The apples are red.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', text: 'Багаж тяжёлый.' },

				{ type: 'text', text: 'The baggage is heavy.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Парад был первым событием.',
					engSentences: [{ engSentences: ['The parade was the first event.'], isCorrect: true }],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Камин — дорогая вещь.',
					engSentences: [{ engSentences: ['A fireplace is an expensive thing.'], isCorrect: true }],
					words: [
						{ rusWord: 'однажды', engWord: 'one day' },
						{ rusWord: 'врач', engWord: 'doctor' },
					],
				},
				{
					rusSentence: 'Еда в холодильнике.',
					engSentences: [{ engSentences: ['The food is in the refrigerator'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он был хорошим учеником.',
					engSentences: [{ engSentences: ['He was a good pupil.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Капитан был жестоким и не очень хорошим моряком.',
					engSentences: [
						{
							engSentences: ['The captain was violent and not a very good sailor.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'быть уверенным', engWord: 'to be sure' },
						{ rusWord: 'быть готовым', engWord: 'to be ready' },
					],
				},
				{
					rusSentence: 'Ты будешь принцем, а я буду принцессой',
					engSentences: [
						{
							engSentences: ['You will be the prince and I will be the princess'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'быть уверенным', engWord: 'to be sure' },
						{ rusWord: 'быть готовым', engWord: 'to be ready' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Сравнение разных определителей' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Не думайте, что какие-то определители лучше или хуже. Каждый выполняет свою роль и используется в определённых обстоятельствах.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Давайте переведём предложение «Утюг горячий» используя разные определители и посмотрим в каких ситуациях каждый из них подходит.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Начнём с неопределённого артикля ',
				},
				{ type: 'text', weight: 'bold', text: 'a/an' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'An' },
				{ type: 'text', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В данном контексте смысл в том, что любой утюг горячий. Это их типичное свойство. Подробнее об этом написано в главе про неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Притяжательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'My' },
				{ type: 'text', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Конкретный мой утюг горячий. Отлично подходит если объект принадлежит кому-то.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Указательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Отличное решение когда собеседнику нужно указать на предмет. Но это делается один раз для ввода предмета в контекст. А если я снова хочу что-то сообщить об этом предмете, то опять вводить его в контекст через ',
				},
				{ type: 'text', weight: 'bold', text: 'this' },
				{
					type: 'text',

					text: ' будет излишне потому что он и так уже там находится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', text: 'Определённый артикль ' },
				{ type: 'text', weight: 'bold', text: 'the' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'The' },
				{ type: 'text', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если мы ввели предмет в контекст, то ссылаться на него в дальнейшем разговоре нужно подставляя артикль the.',
				},
			],
		},
	],
}*/

// export default the
