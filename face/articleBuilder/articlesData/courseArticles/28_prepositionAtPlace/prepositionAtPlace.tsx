import ArticleType from '../../articleType'

const prepositionAtPlace: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 30,
		slug: 'preposition-at-place',
		caption: 'Глава 28',
		articleName: 'Предлог места at',
		articleDescription:
			'Предлог at полезен когда нужно рассказать в какой точке пространства находится объект.',
		isPaid: false,
	},
	content: [
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Как предлог in предлог at используется для указания объекта в каком-то месте. Но с другим смысловым отличием.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Точка на карте' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'In' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' используют когда говорят, что персонаж находится внутри области, а через ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'at' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' эту область обозначают как точку на карте. Для одних и тех же мест могут использовать оба предлога и выбор будет зависить от закладываемого смысла высказывания.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-78589',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Предлог in' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I waited in the bus stop.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Я ждал в автобусной остановке.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Он ждал ' },
								{ type: 'text', color: 'gray', weight: 'bold', text: 'внутри' },
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: ' автобусной остановки.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I\'ll meet you in the station.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Я встречу тебя в здании вокзала.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Чтобы с ним встретиться нужно зайти внутрь вокзала, а не просто подойти к вокзалу. Но по-русски со словом «вокзал» не принято употреблять предлог «в», поэтому лучше перевести «в здании вокзала».',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Предлог at' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I waited at the bus stop.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Я ждал на автобусной остановке.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Через предлог at передаётся, что автобусная остановка — это точка, где он ожидал. А находился он внутри остановки или где-то рядом предлог at не передаёт. Это просто место.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I\'ll meet you at the station.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Я встречу тебя на вокзале.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Вокзал — это точка где будет встреча. Тут не акцентируется будет встречать около входа в вокзал или внутри. Вокзал используется как место встречи.',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Лучше всего смысл in и at передают русские предлоги «в» и «на». Когда мы говорим «Я на стадионе», то подразумеваем «стадион» как точку на карте. Тут не акцентируется нахожусь ли я около стадиона или внутри него. А если я скажу «Я в стадионе», то уже прямо сообщается, что я нахожусь внутри стадиона.',
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
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Точкой на карте могут быть такие крупные объекты как города.',
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
					text: 'Он встретился с Лениным в Москве в 1921 году.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'He met Lenin at Moscow in 1921.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Или даже люди.' }],
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
					text: 'Саша и Николай пришли к девушкам.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Sasha and Nikolai arrived at the girls.',
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
					text: 'Выражение in the corner разбиралось в теме про предлог in. И там я говорил, что in the corner используется чтобы сообщить, что объект находится в закрытом пространстве, например комнаты. А форма at the corner если на улице.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Урна стоит на углу.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The trash can is at the corner.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Где применять не стоит' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Не для всех случаев можно применить at. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ручка в кармане.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The pen is in my pocket.',
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
					text: 'The pen is at my pocket будет звучать странно как будто ручка около кармана.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Я встречу тебя на кухне.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I’ll see you in the kitchen.',
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
					text: 'Тут больше подходит in потому что кухня — это закрытое пространство где человек будет находиться. Для нас не привычно использовать комнату как точку на карте.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Она была в неизвестном месте среди неизвестных людей.',
					engSentences: [
						{
							engSentences: ['She was at an unknown place, among unknown people.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'неизвестный', engWord: 'unknown' },
						{ rusWord: 'место', engWord: 'place' },
						{ rusWord: 'среди', engWord: 'among' },
						{ rusWord: 'люди', engWord: 'people' },
					],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: [
								'Jacob did not go to the celebration at the park because he was angry.',
							],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'неизвестный', engWord: 'unknown' },
						{ rusWord: 'место', engWord: 'place' },
						{ rusWord: 'среди', engWord: 'among' },
						{ rusWord: 'люди', engWord: 'people' },
					],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: ['The two men looked at the money with happy smiles.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'неизвестный', engWord: 'unknown' },
						{ rusWord: 'место', engWord: 'place' },
						{ rusWord: 'среди', engWord: 'among' },
						{ rusWord: 'люди', engWord: 'people' },
					],
				},
				{
					rusSentence: 'Вы помните крысу у забора?',
					engSentences: [
						{
							engSentences: ['Do you remember the rat at the fence?'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'неизвестный', engWord: 'unknown' },
						{ rusWord: 'место', engWord: 'place' },
						{ rusWord: 'среди', engWord: 'among' },
						{ rusWord: 'люди', engWord: 'people' },
					],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: [
								'More friends came to laugh at Tom, but soon they all wanted to paint  too.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Увидимся на барбекю.',
					engSentences: [
						{ engSentences: ['We\'ll see you at the barbeque.'], isCorrect: true },
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{ engSentences: ['She looked at the letter.'], isCorrect: true },
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: ['I said nothing and did not even look at him.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: [
								'Jake looked at the beautiful tall girl in her carnival costume. Their eyes met and she smiled at him.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Переведи...',
					engSentences: [
						{
							engSentences: [
								'He saw his friend Joe Harper in the street, but he didn\'t look at him.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
				{
					rusSentence: 'Именно это станция является одной из самых длинных в Москве.',
					engSentences: [
						{
							engSentences: ['Also this station is the longest at Moscow.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'неизвестный', engWord: 'unknown' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Нахождение поблизости' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Если ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'at' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' употребляется рядом с крупными объектами, которые сложно обозначить как точку на карте, то это обозначает нахождение поблизости.',
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
					text: 'У нас есть дом на берегу моря.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'We have a house at the sea.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Моря настолько большие, что их нельзя использовать как точку на карте. Поэтому подразумевается берег моря.',
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
					text: 'Если в объект нельзя «зайти», то можно только находиться рядом.',
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
					text: 'Я стояла у окна и слушала.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I stood at the window and listened.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Джим поставил стул у стола.',
					engSentences: [
						{ engSentences: ['Jim put a chair at the table.'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я стояла у окна и слушала.',
					engSentences: [
						{ engSentences: ['I stood at the window and listened.'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
	],
}

export default prepositionAtPlace
