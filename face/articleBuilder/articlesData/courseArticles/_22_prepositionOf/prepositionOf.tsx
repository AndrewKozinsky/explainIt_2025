import ArticleType from '../../articleType'

const prepositionOf: ArticleType.Art = {
	meta: {
		number: 24,
		slug: 'preposition-of',
		caption: 'Глава 22',
		articleName: 'Предлог of',
		articleDescription: 'Предлог of универсальный способ задать принадлежность существительному.',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Родительский падеж' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Существительное в родительском падеже в русском языке отвечает на вопрос Кого? / Чего?.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я купил бутылку ' },
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text', color: 'black', text: ' молока.' },
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
					text: 'Без родительского падежа эти слова были бы никак не связаны друг с другом: бутылка молоко.',
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
					text: 'В английском языке для этого используют предлог of.',
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
					text: 'Предлог — это служебная часть речи логически связывающая слова друг с другом для задания принадлежности, направления, положения в пространстве, времени совершения действия, причины. Он ставится перед существительными, местоимениями и наречиями.',
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
					text: 'В английском у существительного есть только общий и притяжательный падеж. И связка предлога of + существительного делает ту же работу, что и родительский падеж в русском.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', text: 'Другие примеры:' }],
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
					text: 'Ты не платишь мне много ',
				},
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text', color: 'black', text: ' денег.' },

				{ type: 'text', color: 'black', text: "You don't pay me a lot " },
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text', color: 'black', text: ' of money.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Шумная толпа ' },
				{ type: 'text', color: 'gray', text: '(кого?)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' людей внезапно затихла.',
				},

				{ type: 'text', color: 'black', text: 'The noisy crowd ' },
				{ type: 'text', color: 'gray', text: '(кого?)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' of people was suddenly silent.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Предлог of для указания принадлежности' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Предлог of используется в том числе для указания принадежности персонажа или предмета.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Мой дом' },

				{ type: 'text', color: 'black', text: 'The house of mine' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Дом моего отца' },

				{ type: 'text', color: 'black', text: 'The house of my dad' },
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
					text: 'Но вы ранее уже изучали притяжательные местоимения и существительные, которые могут заменить предлог of в этом контексте.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Мой дом' },

				{ type: 'text', color: 'black', text: 'The house of mine' },

				{ type: 'text', color: 'black', text: 'My house' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Дом моего отца' },

				{ type: 'text', color: 'black', text: 'The house of my dad' },

				{ type: 'text', color: 'black', text: 'My dad’s house' },
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
					text: 'Чем руководствоваться при выборе грамматической конструкции:',
				},
			],
		},
		{
			type: 'list',
			listType: 'dots',
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
							text: 'Если возможно поставить притяжательное местоимение, то лучше предпочесть его. Такая запись выглядит лаконичной и простой.',
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
							text: 'Если объект принадлежит одушевлённому персонажу, то предпочитают использовать притяжательное существительное.',
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
							text: 'Во всех остальных случаях ставят предлог of.',
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
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Притяжательное существительное и предлог of всегда означают одно и то же. Но, например, то что касается картин и фотографий предлог of обозначает, что там изображён этот человек, а притяжательное местоимение что фотография принадлежит человеку.',
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
							text: 'A photo of Julia',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'На фотографии Юлия',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', text: 'Julia’s picture' },

						{ type: 'text', color: 'black', text: 'Фотография Юлии' },
					],
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Ты боишься приведений?',
					engSentences: [{ engSentences: ['Are you afraid of ghosts?'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Миссис Мартин сделала большую чашку картофельного салата.',
					engSentences: [
						{
							engSentences: ['Mrs Martin made a big bowl (чего?) of potato salad.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Следующий день был Четвёртым июлем, один из самых важдый американских праздников.',
					engSentences: [
						{
							engSentences: [
								"The next day was the Fourth of July, one of America's most important holidays.",
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Знаешь, Том был моим другом.',
					engSentences: [{ engSentences: ['You know, Tom was a friend of mine.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Хаббл доказал существование других галактик, помимо нашей галактики.',
					engSentences: [
						{
							engSentences: ['Hubble demonstrated the existence of the other galaxies besides ours.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Его волосы были цвета сухой травы и он был слепой.',
					engSentences: [
						{
							engSentences: ['His hair was the colour of dry grass and he was blind.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ["Keola was afraid of Kalamake but his wife's words made him angry."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ['Suddenly he heard the voices of men on a big ship.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ["Thousands of tourists visit Maui's beautiful beaches every year."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ['He was a short man of about fifty with gray hair and blue eyes.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Однажды ночью с плавал около с островом и увидел множество огней.',
					engSentences: [
						{
							engSentences: ['One night I sailed near the island and saw a lot of lights.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ['Keola asked the people of the tribe and learned a lot of new things.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Предлог «из»' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Предлог of используется чтобы сообщить о каком-то количестве из других объектов: ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Этот рейс — ' },
				{ type: 'text', color: 'gold', text: 'один' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'из' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' трёх счастливчиков в этом месяце.',
				},

				{ type: 'text', color: 'black', text: 'This is ' },
				{ type: 'text', color: 'gold', text: 'one' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' three lucky flights this month.',
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
					text: 'Один из трёх «счастливых рейсов».',
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
					text: 'Гавайцы живут на шести из восьми главных островов.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Hawaiians live on six of the eight main islands.',
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
					text: 'Шесть из восьми главных островов.',
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
					text: 'Вместо цифр могут использовать словосочитания',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'some of' },

				{ type: 'text', color: 'black', text: 'некоторые из' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'most of' },

				{ type: 'text', color: 'black', text: 'большая часть из' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'all of' },

				{ type: 'text', color: 'black', text: 'все из' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я прочитал 60 книг, и ' },
				{ type: 'text', color: 'gold', text: 'все' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'из' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' них говорят одно и то же.',
				},

				{ type: 'text', color: 'black', text: 'I read 60 books, and ' },
				{ type: 'text', color: 'gold', text: 'all' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' the books said the same things.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [{ type: 'text', color: 'gray', text: 'Все из этих книг.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они жили на основе ' },
				{ type: 'text', color: 'gold', text: 'большую часть' },
				{ type: 'text', color: 'black', text: ' года.' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'They lived on another island ',
				},
				{ type: 'text', color: 'gold', text: 'most' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{ type: 'text', color: 'black', text: ' the year.' },
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
					text: 'На русском слово «из» отсутствует, но смысл остаётся таким же.',
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
							text: 'На следующем уроке изучите количественные местоимения, которые используются с предлогом of в значении «из»:',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', text: 'a lot of' },

						{ type: 'text', color: 'black', text: 'множество из' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', text: 'many of' },

						{ type: 'text', color: 'black', text: 'множество из' },
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
					text: 'Русский предлог «из» ещё используется в значении стартой точки: я вышел из дома. Но в этом значении уже нужно использовать предлог from. Про него будет рассказано в одном из следующих глав.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ["Nick Chan was one of Bill's best friends at Montego Bay."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'В одном из его путешествий в 1876 он встретил Фанни Осборн и влюбился.',
					engSentences: [
						{
							engSentences: ['On one of his journeys in 1876, he met Fanny Osbourne and fell in love.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: [
								'The highest point on Maui is Haleakala, one of the biggest inactive volcanoes in the world.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи....',
					engSentences: [
						{
							engSentences: ["Nick Chan was one of Bill's best friends at Montego Bay."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Гавайский Большой остров самый большой из островов.',
					engSentences: [
						{
							engSentences: ["Hawaii's Big Island is the largest of the islands."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Предлог «о»' },
	],
}

export default prepositionOf
