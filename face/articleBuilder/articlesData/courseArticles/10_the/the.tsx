import ArticleType from '../../articleType'

const the: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 12,
		slug: 'the',
		caption: 'Глава 10',
		articleName: 'Определённый артикль the',
		articleDescription:
			'Определённый артикль the используется перед сущностями известными собеседнику из контекста. ',
		isPaid: false,
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как работает' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Из предыдущих уроков вы знаете, что перед каждым существительным должен быть определитель. И определённый артикль ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' один из них. Он используется перед объектами известными собеседнику из контекста.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Давайте в предложении «Машина в гараже» подставим разные артикли и посмотрим как изменяется смысл.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-92750',
			cells: [
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'gold', weight: 'normal', text: 'A' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' car in ',
								},
								{ type: 'text', color: 'gold', weight: 'normal', text: 'a' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' garage' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Какая-то машина в каком-то гараже. Предложение лишённое смысла потому что не понятно что это должно сказать собеседнику.',
								},
							],
						},
					],
				},
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'The' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' car in ',
								},
								{ type: 'text', color: 'gold', weight: 'normal', text: 'a' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' garage' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Если применён определённый артикль ',
								},
								{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ', то значит в контексте разговора участники понимают что это за машина. И эта конкретная машина сейчас находится в каком-то гараже, а не стоит, к примеру, на улице.',
								},
							],
						},
					],
				},
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'The' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' car in ',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' garage' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'В контексте разговора участники понимают что это за машина и в каком конкретном гараже она находится.',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Неопределённый артикль ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' применяется только для исчисляемых существительных в единственном числе. У определённого артикля ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' таких ограничений нет: работает и с неисчисляемыми и с существительными во множественном числе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Яблоки красные.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'The apples are red.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Багаж тяжёлый.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'The baggage is heavy.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Случаи употребления' },
		{
			type: 'header',
			tag: 'h4',
			style: 'h4',
			text: 'Перед существительными введёнными в контекст ранее',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В примере ниже это магазин. Сначала на него указали введя в контекст, а затем достали использовав ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Этот магазин' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' очень дорогой.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This shop' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is very expensive.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Магазин' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ещё и закрыт сегодня.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'The shop' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is also closed today.' },
			],
		},
		{
			type: 'header',
			tag: 'h4',
			style: 'h4',
			text: 'Перед существительными находящимися в глобальном контексте ',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Некоторые конкретные существительные понятны и без ввода в контекст. Например предложения ниже собеседник поймёт как «зима в этом году была ветренной». То есть одна конкретная зима. Поэтому зиму даже не нужно было вводить в контекст. И так понятно что подразумевалось.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Зима была ветренной.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'The winter' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' was windy.' },
			],
		},
		{
			type: 'header',
			tag: 'h4',
			style: 'h4',
			text: 'Перед существительными, которые по определению будут единственными',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'На корабле может быть только один капитан. А в стране только один президент. Поэтому такие существительные используются с the даже если упоминаются в первый раз.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Туда же относятся предметы имеющие свойство в превосходной степени потому что может быть только один такой объект.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Он был самым молодым федеральным судьёй в стране.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'He was the youngest federal judge in the country.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'О степенях сравнения прилагательных будет в одном из следующих уроков.',
				},
			],
		},
		{
			type: 'header',
			tag: 'h4',
			style: 'h4',
			text: 'Перед существительными ясными из контекста',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Или заходите в квартиру и спрашиваете «Где туалет?». Перед туалетом тоже будет артикль ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' потому что в большинстве случаев в квартире есть один единственный туалет. Он и подразумевается. Даже если это большой дом с несколькими уборными, то такое построение фразы будет верным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если сидите в машине и она не заводится, то перед engine будет стоять определённый артикль потому что понятно из контекста о каком двигателе идёт речь.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Двигатель не запускается.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The engine refuses to start.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Прочие случаи использования ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'определённого артикля the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' будут разобраны по ходу курса.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Парад был первым событием.',
					engSentences: [
						{ engSentences: ['The parade was the first event.'], isCorrect: true },
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Камин — дорогая вещь.',
					engSentences: [
						{ engSentences: ['A fireplace is an expensive thing.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'однажды', engWord: 'one day' },
						{ rusWord: 'врач', engWord: 'doctor' },
					],
				},
				{
					rusSentence: 'Асфальт очень старый, а вот скамейки отличные.',
					engSentences: [
						{
							engSentences: ['Asphalt is very old, but the benches are excellent.'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом пр',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'два', engWord: 'two' }],
				},
				{
					rusSentence: 'Еда в холодильнике.',
					engSentences: [
						{ engSentences: ['The food is in the refrigerator'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он был хорошим учеником.',
					engSentences: [{ engSentences: ['He was a good pupil.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Окно закрыто.',
					engSentences: [{ engSentences: ['The window is closed.'], isCorrect: true }],
					words: [
						{ rusWord: 'готовый', engWord: 'ready' },
						{ rusWord: 'скоро', engWord: 'soon' },
					],
				},
				{
					rusSentence: 'Кот — чёрный.',
					engSentences: [{ engSentences: ['The cat is black.'], isCorrect: true }],
					words: [
						{ rusWord: 'команда', engWord: 'team' },
						{ rusWord: 'лидер', engWord: 'leader' },
					],
				},
				{
					rusSentence: 'Коробки мокрые.',
					engSentences: [{ engSentences: ['The boxes are wet.'], isCorrect: true }],
					words: [
						{ rusWord: 'дом', engWord: 'home' },
						{ rusWord: 'скоро', engWord: 'soon' },
					],
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
					rusSentence: 'Я был где-то внутри корабля.',
					engSentences: [
						{ engSentences: ['I was somewhere inside the ship.'], isCorrect: true },
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
				{
					rusSentence: 'Орлы — очень сильные  птицы.',
					engSentences: [
						{ engSentences: ['Eagles are very strong birds.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'орёл', engWord: 'eagle' },
						{ rusWord: 'сильный', engWord: 'strong' },
						{ rusWord: 'птица', engWord: 'bird' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Сравнение разных определителей' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Не думайте, что какие-то определители лучше или хуже. Каждый выполняет свою роль и используется в определённых обстоятельствах.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Давайте переведём предложение «Утюг горячий» используя разные определители и посмотрим в каких ситуациях каждый из них подходит.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Начнём с неопределённого артикля ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'a/an' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'An' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В данном контексте смысл в том, что любой утюг горячий. Это их типичное свойство. Подробнее об этом написано в главе про неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Притяжательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'My' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Конкретный мой утюг горячий. Отлично подходит если объект принадлежит кому-то.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Указательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Отличное решение когда собеседнику нужно указать на предмет. Но это делается один раз для ввода предмета в контекст. А если я снова хочу что-то сообщить об этом предмете, то опять вводить его в контекст через ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' будет излишне потому что он и так уже там находится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Определённый артикль ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'The' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если мы ввели предмет в контекст, то ссылаться на него в дальнейшем разговоре нужно подставляя артикль the.',
				},
			],
		},
	],
}

export default the
