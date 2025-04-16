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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Из предыдущих уроков вы знаете, что перед каждым существительным должен быть определитель. И определённый артикль ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',
					color: 'black',

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

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'gold', text: 'A' },
								{
									type: 'text',
									color: 'black',

									text: ' car in ',
								},
								{ type: 'text', color: 'gold', text: 'a' },
								{ type: 'text', color: 'black', text: ' garage' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

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

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', text: 'The' },
								{
									type: 'text',
									color: 'black',

									text: ' car in ',
								},
								{ type: 'text', color: 'gold', text: 'a' },
								{ type: 'text', color: 'black', text: ' garage' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Если применён определённый артикль ',
								},
								{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
								{
									type: 'text',
									color: 'black',

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

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', text: 'The' },
								{
									type: 'text',
									color: 'black',

									text: ' car in ',
								},
								{ type: 'text', color: 'blue', text: 'the' },
								{ type: 'text', color: 'black', text: ' garage' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

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
				{ type: 'text', color: 'black', text: 'Неопределённый артикль ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',
					color: 'black',

					text: ' применяется только для исчисляемых существительных в единственном числе. У определённого артикля ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',
					color: 'black',

					text: ' таких ограничений нет: работает и с неисчисляемыми и с существительными во множественном числе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Яблоки красные.' },

				{ type: 'text', color: 'black', text: 'The apples are red.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Багаж тяжёлый.' },

				{ type: 'text', color: 'black', text: 'The baggage is heavy.' },
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'В примере ниже это магазин. Сначала на него указали введя в контекст, а затем достали использовав ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'Этот магазин' },
				{ type: 'text', color: 'black', text: ' очень дорогой.' },

				{ type: 'text', color: 'black', text: '' },
				{ type: 'text', color: 'blue', text: 'This shop' },
				{ type: 'text', color: 'black', text: ' is very expensive.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'Магазин' },
				{ type: 'text', color: 'black', text: ' ещё и закрыт сегодня.' },

				{ type: 'text', color: 'black', text: '' },
				{ type: 'text', color: 'blue', text: 'The shop' },
				{ type: 'text', color: 'black', text: ' is also closed today.' },
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Некоторые конкретные существительные понятны и без ввода в контекст. Например предложения ниже собеседник поймёт как «зима в этом году была ветренной». То есть одна конкретная зима. Поэтому зиму даже не нужно было вводить в контекст. И так понятно что подразумевалось.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Зима была ветренной.' },

				{ type: 'text', color: 'black', text: '' },
				{ type: 'text', color: 'blue', text: 'The winter' },
				{ type: 'text', color: 'black', text: ' was windy.' },
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

					text: 'Туда же относятся предметы имеющие свойство в превосходной степени потому что может быть только один такой объект.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Он был самым молодым федеральным судьёй в стране.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'He was the youngest federal judge in the country.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Или заходите в квартиру и спрашиваете «Где туалет?». Перед туалетом тоже будет артикль ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',
					color: 'black',

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

					text: 'Если сидите в машине и она не заводится, то перед engine будет стоять определённый артикль потому что понятно из контекста о каком двигателе идёт речь.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Двигатель не запускается.',
				},

				{
					type: 'text',
					color: 'black',

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

					text: 'Прочие случаи использования ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'определённого артикля the' },
				{
					type: 'text',
					color: 'black',

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

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

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
					engSentences: [{ engSentences: ['The food is in the refrigerator'], isCorrect: true }],
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
					engSentences: [{ engSentences: ['I was somewhere inside the ship.'], isCorrect: true }],
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
					engSentences: [{ engSentences: ['Eagles are very strong birds.'], isCorrect: true }],
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

					text: 'Начнём с неопределённого артикля ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'a/an' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'An' },
				{ type: 'text', color: 'black', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

					text: 'Притяжательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'My' },
				{ type: 'text', color: 'black', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

					text: 'Указательное местоимение.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', color: 'black', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Отличное решение когда собеседнику нужно указать на предмет. Но это делается один раз для ввода предмета в контекст. А если я снова хочу что-то сообщить об этом предмете, то опять вводить его в контекст через ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{
					type: 'text',
					color: 'black',

					text: ' будет излишне потому что он и так уже там находится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', text: 'Определённый артикль ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'The' },
				{ type: 'text', color: 'black', text: ' iron is hot.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если мы ввели предмет в контекст, то ссылаться на него в дальнейшем разговоре нужно подставляя артикль the.',
				},
			],
		},
	],
}*/

// export default the
