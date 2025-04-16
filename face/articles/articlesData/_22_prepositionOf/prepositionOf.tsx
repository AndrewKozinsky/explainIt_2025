// import ArticleType from '../../articleType'

/*const prepositionOf: ArticleType.Art = {
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

			children: [
				{
					type: 'text',

					text: 'Существительное в родительском падеже в русском языке отвечает на вопрос Кого? / Чего?.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я купил бутылку ' },
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text',  text: ' молока.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Без родительского падежа эти слова были бы никак не связаны друг с другом: бутылка молоко.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В английском языке для этого используют предлог of.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Предлог — это служебная часть речи логически связывающая слова друг с другом для задания принадлежности, направления, положения в пространстве, времени совершения действия, причины. Он ставится перед существительными, местоимениями и наречиями.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В английском у существительного есть только общий и притяжательный падеж. И связка предлога of + существительного делает ту же работу, что и родительский падеж в русском.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Другие примеры:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты не платишь мне много ',
				},
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text',  text: ' денег.' },

				{ type: 'text',  text: "You don't pay me a lot " },
				{ type: 'text', color: 'gray', text: '(чего?)' },
				{ type: 'text',  text: ' of money.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Шумная толпа ' },
				{ type: 'text', color: 'gray', text: '(кого?)' },
				{
					type: 'text',

					text: ' людей внезапно затихла.',
				},

				{ type: 'text',  text: 'The noisy crowd ' },
				{ type: 'text', color: 'gray', text: '(кого?)' },
				{
					type: 'text',

					text: ' of people was suddenly silent.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Предлог of для указания принадлежности' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Предлог of используется в том числе для указания принадежности персонажа или предмета.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мой дом' },

				{ type: 'text',  text: 'The house of mine' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Дом моего отца' },

				{ type: 'text',  text: 'The house of my dad' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но вы ранее уже изучали притяжательные местоимения и существительные, которые могут заменить предлог of в этом контексте.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мой дом' },

				{ type: 'text',  text: 'The house of mine' },

				{ type: 'text',  text: 'My house' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Дом моего отца' },

				{ type: 'text',  text: 'The house of my dad' },

				{ type: 'text',  text: 'My dad’s house' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

					children: [
						{
							type: 'text',

							text: 'Если возможно поставить притяжательное местоимение, то лучше предпочесть его. Такая запись выглядит лаконичной и простой.',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

							text: 'Если объект принадлежит одушевлённому персонажу, то предпочитают использовать притяжательное существительное.',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

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

					children: [
						{
							type: 'text',

							text: 'Притяжательное существительное и предлог of всегда означают одно и то же. Но, например, то что касается картин и фотографий предлог of обозначает, что там изображён этот человек, а притяжательное местоимение что фотография принадлежит человеку.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'A photo of Julia',
						},

						{
							type: 'text',

							text: 'На фотографии Юлия',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Julia’s picture' },

						{ type: 'text',  text: 'Фотография Юлии' },
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

			children: [
				{
					type: 'text',

					text: 'Предлог of используется чтобы сообщить о каком-то количестве из других объектов: ',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Этот рейс — ' },
				{ type: 'text', color: 'gold', text: 'один' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'из' },
				{
					type: 'text',

					text: ' трёх счастливчиков в этом месяце.',
				},

				{ type: 'text',  text: 'This is ' },
				{ type: 'text', color: 'gold', text: 'one' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{
					type: 'text',

					text: ' three lucky flights this month.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

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

					text: 'Гавайцы живут на шести из восьми главных островов.',
				},

				{
					type: 'text',

					text: 'Hawaiians live on six of the eight main islands.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Шесть из восьми главных островов.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Вместо цифр могут использовать словосочитания',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'some of' },

				{ type: 'text',  text: 'некоторые из' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'most of' },

				{ type: 'text',  text: 'большая часть из' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'all of' },

				{ type: 'text',  text: 'все из' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я прочитал 60 книг, и ' },
				{ type: 'text', color: 'gold', text: 'все' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'из' },
				{
					type: 'text',

					text: ' них говорят одно и то же.',
				},

				{ type: 'text',  text: 'I read 60 books, and ' },
				{ type: 'text', color: 'gold', text: 'all' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{
					type: 'text',

					text: ' the books said the same things.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [{ type: 'text', color: 'gray', text: 'Все из этих книг.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они жили на основе ' },
				{ type: 'text', color: 'gold', text: 'большую часть' },
				{ type: 'text',  text: ' года.' },

				{
					type: 'text',

					text: 'They lived on another island ',
				},
				{ type: 'text', color: 'gold', text: 'most' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'of' },
				{ type: 'text',  text: ' the year.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

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

					children: [
						{
							type: 'text',

							text: 'На следующем уроке изучите количественные местоимения, которые используются с предлогом of в значении «из»:',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{ type: 'text',  text: 'a lot of' },

						{ type: 'text',  text: 'множество из' },
					],
				},
				{
					type: 'paragraph',

					children: [
						{ type: 'text',  text: 'many of' },

						{ type: 'text',  text: 'множество из' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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
}*/

// export default prepositionOf
