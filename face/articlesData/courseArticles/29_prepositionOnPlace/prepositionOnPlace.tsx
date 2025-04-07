import ArticleType from '../../articleType'

const prepositionOnPlace: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 31,
		slug: 'preposition-on-place',
		caption: 'Глава 29',
		articleName: 'Предлог места on',
		articleDescription:
			'Научимся выражаеть идею нахождения предмета на какой-то поверхности и узнаем какой предлог использовать если человек находится в транспортном средстве.',
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
					text: 'Предлог in используется чтобы показать, что объект находится внутри закрытого области, предлог at представляет эту область как точку на карте, а предлог on сообщает, что объект находится на какой-то поверхности. На русский язык on обычно переводится предлогом «на».',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Объект на поверхности' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Поверхность может быть в любой плоскости: сверху, снизу, вертикально.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Книги на столе.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The books are on the table.',
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
					text: 'Я повешу эту картину на стену.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I’ll put this picture on the wall.',
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
					text: 'Под поверхностью может восприниматься любая внешняя оболочка.',
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
					text: 'Они сготовили рыбу на огне.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'They cooked the fish on their fire.',
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
					text: 'Он прыгнул на доктора и двое начали бороться.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'He jumped on the doctor and the two men began to fight.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Они разрешают собаке спать на кровати?',
					engSentences: [
						{
							engSentences: ['Do they allow their dog to sleep on the bed?'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					note: 'Озеро — это поверхность на которой находится наша лодка.',
					rusSentence: 'Наша лодка на озере.',
					engSentences: [{ engSentences: ['Our boat is on the lake.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он поставил чашку на стол.',
					engSentences: [
						{ engSentences: ['He put the cup on the table.'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence:
						'Света и ее собаки неразлучны — они спят рядом друг с другом на матрасах.',
					engSentences: [
						{
							engSentences: [
								'Sveta and her dogs are inseparable — they sleep next to each other on their own mattresses.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{ engSentences: ['Jake saw a camera on the table.'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: ['I knocked once on the big wooden door.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: ['A row of boxes lie on the floor of the room.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								'Indians protest when a property developer builds new homes on their ancient cemetery.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'На первой странице нашей истории будущее казалось таким ярким.',
					engSentences: [
						{
							engSentences: [
								'On the first page of our story the future seemed so bright.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Объект в транспорте' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если на транспорте сидят верхом (мотоцикл, даже лошадь), то используют on. И если  транспорт принимает большое количество людей (автобус, самолёт, корабль), то тоже on, несмотря на то, что пассажиры находятся внутри. Но если человек находится внутри легкового автомобиля, то используется in.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-62141',
			cells: [
				{
					minWidth: '250px',
					width: '1fr',
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
									text: 'Предлог on.',
								},
							],
						},
						{
							type: 'header',
							tag: 'h3',
							style: 'h4',
							text: 'Сидит на средстве передвижения.',
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'На велосипеде.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'On a bike.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'На лошаде.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'On a horse.',
								},
							],
						},
					],
				},
				{
					minWidth: '250px',
					width: '1fr',
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
									text: 'Предлог on.',
								},
							],
						},
						{
							type: 'header',
							tag: 'h3',
							style: 'h4',
							text: 'Внутри общественного транспорта.',
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'В автобусе.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'On a bus.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'В метро.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'On a metro.',
								},
							],
						},
					],
				},
				{
					minWidth: '250px',
					width: '1fr',
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
									text: 'Предлог in.',
								},
							],
						},
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Внутри автомобиля.' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'В машине.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'In a car.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'В такси.',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'In a taxi.',
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
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Она была в автобусе, когда он позвонил.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'She was on the bus, when he called.',
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
					text: 'Я потратил 10 часов в автобусе.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I spent ten hours on a bus.',
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
					text: 'Они поймали ее, когда садилась в автобус.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'They caught her when she got on a bus.',
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
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Но если хотят подчеркнуть нахождение внутри транспорта, то используют in.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Я оставил сумку в фургоне.',
						},
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'I left my bag in the wagon.',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Этим утром в метро было очень людно.',
					engSentences: [
						{
							engSentences: ['It was really crowded on the metro this morning.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: ['The sheriff and his men followed on their horses.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: ['He rode in a big car with other important men.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								'On the plane, April sits next to Laura. Her eyes are wet.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'В самолете неожиданно погас свет.',
					engSentences: [
						{
							engSentences: ['The light on the plane suddenly went off. —'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Объект на линии' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если объект находится на местности напоминающей линию, то тоже используется on. Это может быть река, побережье, дорога. Даже по-русский в названии некоторых городов есть предлог «на» с названием реки, около которой город расположен: Ростов-на-Дону, Тверь-на-Волге, Рязань-на-Оке.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Город на реке.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The town is on the river.',
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
					text: 'Они жили на берегу реки.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'They lived on the coast of a river.',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Санкт-Петербург расположен на Неве.',
					engSentences: [
						{ engSentences: ['St.Petersburg lies on the Neva.'], isCorrect: true },
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Все дома на нашей улице были синими, за исключением нашего.',
					engSentences: [
						{
							engSentences: ['Every house on our street was blue except ours.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
	],
}

export default prepositionOnPlace
