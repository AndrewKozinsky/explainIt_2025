// import ArticleType from '../../articleType'

/*const adjectivesDegreesOfComparison: ArticleType.Art = {
	meta: {
		number: 13,
		slug: 'adjectives-degrees-of-comparison',
		caption: 'Глава 11',
		articleName: 'Степени сравнения прилагательных',
		articleDescription:
			'Разберём как образуются три степени сравнения прилагательных: положительная, сравнительная и превосходная.',
	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Прилагательные в английском языке не зависят от лица подлежащего или времени, не имеют числа и рода. Прилагательные бывают относительными и качественным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  weight: 'bold', text: 'Относительные' },
				{
					type: 'text',

					text: ' передают признаки, которые не могут быть в предмете в большей или меньшей степени.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',   text: 'Стеклянный' }],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',   text: 'Деревянный' }],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Предмет не может быть в большей или меньшей степени деревянным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  weight: 'bold', text: 'Качественные' },
				{
					type: 'text',

					text: ' имеет сравнительную и превосходную степень.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',   text: 'Тяжёлый' },

				{ type: 'text',   text: 'Тяжелее' },

				{ type: 'text',   text: 'Самый тяжёлый' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',   text: 'Высокий' },

				{ type: 'text',   text: 'Выше' },

				{ type: 'text',   text: 'Самый высокий' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray',  text: 'Обычный признак предмета' },

				{
					type: 'text',
					color: 'gray',

					text: 'Признак предмета по сравнению с другим',
				},

				{
					type: 'text',
					color: 'gray',

					text: 'Предмет с высшей степенью проявления признака',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Давайте посмотрим как образуется сравнительная и превосходная степень у качественных прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Что такое слог' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Слог — это звук или сочетание звуков в слове, произносимые одним толчком выдыхаемого воздуха. ',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'fresh [фрэш]' },

				{ type: 'text',   text: 'свежий' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Одна согласная. Поэтому односложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'white [вэйт]' },

				{ type: 'text',   text: 'белый' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Тут на письме две согласные. Но последняя ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'e' },
				{
					type: 'text',
					color: 'gray',

					text: ' не произносится. Поэтому это односложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'alive [элайв]' },

				{ type: 'text',   text: 'живой' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Тут два слога. Поэтому это двухсложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'accurate [экджурэт]' },

				{ type: 'text',   text: 'точный' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Тут три слога. Трёхсложное прилагательное.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Одно и двухсложные прилагательные' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Это слова состоящие из одного или двух слогов. ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В большинстве случаев добавляйте ',
				},
				{ type: 'text',  weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text',   text: ' и ' },
				{ type: 'text',  weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',

					text: ' соответственно. Такой механизм образования степени прилагательного называется синтетическим. К любой превосходной степени добавляется ',
				},
				{ type: 'text',  weight: 'bold', text: 'определённый артикль the' },
				{
					type: 'text',

					text: ' потому что объект с высшей степерью проявления признака по определению является единственным.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-4748',
			cells: [
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Нормальная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'плохой' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'long' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'бедный' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'poor' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'хуже' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'long' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'беднее' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'poor' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'худший' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' long' },
								{ type: 'text', color: 'blue',  text: 'est' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый бедный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' poor' },
								{ type: 'text', color: 'blue',  text: 'est' },
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

					text: 'Он был быстрее и более надёжным.',
				},

				{ type: 'text',   text: 'It was fast' },
				{ type: 'text', color: 'blue',  text: 'er' },
				{ type: 'text',   text: ' and more reliable.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Он был самым богатым мальчиком в Санкт-Петербурге.',
				},

				{ type: 'text',   text: 'He was ' },
				{ type: 'text', color: 'blue',  text: 'the' },
				{ type: 'text',   text: ' rich' },
				{ type: 'text', color: 'blue',  text: 'est' },
				{ type: 'text',   text: ' boy in St Petersburg.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Часто в предложениях в сравнительной степени можно увидеть слово ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{
					type: 'text',

					text: ' (чем) и дальше описывается объект с которым идёт сравнение.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Их путь был короче, чем наш.',
				},

				{
					type: 'text',

					text: 'Their route was shorter ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{ type: 'text',   text: ' ours.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Её расценки в три раза выше, чем наши.',
				},

				{
					type: 'text',

					text: 'Her rates are three times higher ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{ type: 'text',   text: ' ours.' },
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Армейские самолёты более тяжелые, чем гражданские.',
					engSentences: [
						{
							engSentences: ['Military aircraft are heavier than civilian aircraft.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Факт: Безглютеновые продукты не являются более здоровыми.',
					engSentences: [
						{
							engSentences: ['Fact: Gluten-free foods are not healthier.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'К сожалению срок их жизни короче нашего.',
					engSentences: [
						{
							engSentences: ['Unfortunately their lives are shorter than ours.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Это Сан-Франциско, который ещё и более старый город чем Лос-Анжелес',
					engSentences: [
						{
							engSentences: ['This is San Francisco, which is also an older city than Los Angeles.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Я был самым молодым из пяти.',
					engSentences: [{ engSentences: ['I was the youngest of five.'], isCorrect: true }],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence:
						'Цена был на 30 долларов дешевле, чем мои наушники Audio Technica, но качество было плохим.',
					engSentences: [
						{
							engSentences: [
								'The price was $30 cheaper than my Audio Technica headphones, but the quality was bad.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
			],
			offset: true,
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В прилагательных, оканчивающихся на одну согласную + гласную + согласную, конечная согласная  удваивается: ',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-38497',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'ho' },
								{ type: 'text', color: 'gold',  text: 't' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'thi' },
								{ type: 'text', color: 'gold',  text: 'n' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'ho' },
								{ type: 'text', color: 'gold',  text: 'tt' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'thi' },
								{ type: 'text', color: 'gold',  text: 'nn' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' ho' },
								{ type: 'text', color: 'gold',  text: 'tt' },
								{ type: 'text', color: 'blue',  text: 'est' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' thi' },
								{ type: 'text', color: 'gold',  text: 'nn' },
								{ type: 'text', color: 'blue',  text: 'est' },
							],
						},
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

					text: 'Слово big оканчивается на согласную + гласную + согласную. Поэтому последняя согласная удваивается.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ричардсон был его самым большим конкурентом.',
				},

				{ type: 'text',   text: 'Richardson was his bi' },
				{ type: 'text', color: 'blue',  text: 'gg' },
				{ type: 'text',   text: 'est competitor.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Тут удваивается последняя ',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'l' },
				{ type: 'text',   text: ' в слове ' },
				{ type: 'text',  weight: 'bold', text: 'small' },
				{ type: 'text',   text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Её двор гораздо меньше нашего.',
				},

				{ type: 'text',   text: 'Her courtyard is sma' },
				{ type: 'text', color: 'blue',  text: 'll' },
				{ type: 'text',   text: 'er than ours.' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Рыбья молодь — это пища для более крупных рыб.',
					engSentences: [{ engSentences: ['Small fish are food for bigger fish.'], isCorrect: true }],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Его квартира была меньше, чем наша.',
					engSentences: [{ engSentences: ['Her apartment was smaller than ours.'], isCorrect: true }],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Это будет крупнейшим культурным событием в эстонской истории.',
					engSentences: [
						{
							engSentences: ['This will be the biggest cultural event in the history of Estonia.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Хотя Лос-Анжелес самый крупный город в Калифорнии это не столица штата.',
					engSentences: [
						{
							engSentences: [
								'Although Los Angeles is the biggest city in California it is not the state capital.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Лос-Анжелес третий по величине город в Соединённых Штатах после Нью-Йорка и Чикаго.',
					engSentences: [
						{
							engSentences: [
								'Los Angeles is the third biggest city in the United States after New York and Chicago.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
			],
			offset: true,
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Если прилагательное оканчивается на ',
				},
				{ type: 'text',  weight: 'bold', text: '-e' },
				{ type: 'text',   text: ', то ' },
				{ type: 'text',  weight: 'bold', text: 'e' },
				{
					type: 'text',

					text: ' не удваивается. То есть добавляется ',
				},
				{ type: 'text',  weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'r' },
				{ type: 'text',   text: ' и ' },
				{ type: 'text',  weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'st' },
				{ type: 'text',   text: ' соответственно.' },
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-93045',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'fin' },
								{ type: 'text', color: 'gold',  text: 'e' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'плохой' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'fre' },
								{ type: 'text', color: 'gold',  text: 'e' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'fin' },
								{ type: 'text', color: 'gold',  text: 'e' },
								{ type: 'text', color: 'blue',  text: 'r' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'хуже' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'fre' },
								{ type: 'text', color: 'gold',  text: 'e' },
								{ type: 'text', color: 'blue',  text: 'r' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' fin' },
								{ type: 'text', color: 'gold',  text: 'e' },
								{ type: 'text', color: 'blue',  text: 'st' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'худший' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' fre' },
								{ type: 'text', color: 'gold',  text: 'e' },
								{ type: 'text', color: 'blue',  text: 'st' },
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
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Мой ближайший сосед в полумиле отсюда.',
					engSentences: [
						{
							engSentences: ['My closest neighbor is half a mile away.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Их офис крупнее нашего.',
					engSentences: [{ engSentences: ['Their office is larger than ours.'], isCorrect: true }],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
			],
			offset: true,
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

							text: 'После прилагательного в превосходной степени существительное можно не ставить если оно подразумевается:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Виктор самый высокий.',
						},

						{
							type: 'text',

							text: 'Victor is the tallest.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Многосложные прилагательные' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Это слова состоящие из трёх и более слогов. Они длинные и если ещё дополнительно прибавлять -',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text',   text: ' или -' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',

					text: ', то произносить станет труднее. Английский не любит длинных слов. Поэтому для сравнительной степени добавьте слово ',
				},
				{ type: 'text',  weight: 'bold', text: 'more' },
				{ type: 'text',   text: ' (более) или ' },
				{ type: 'text',  weight: 'bold', text: 'less' },
				{
					type: 'text',

					text: ' (менее). Для абсолютной ',
				},
				{ type: 'text',  weight: 'bold', text: 'the most' },
				{ type: 'text',   text: ' (наибольший) и ' },
				{ type: 'text',  weight: 'bold', text: 'the least' },
				{
					type: 'text',

					text: ' (наименьший). Такой механизм образования степени прилагательного называется аналитическим. ',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-67916',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'реалистичный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'realistic',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'более реалистичный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'more' },
								{
									type: 'text',

									text: ' realistic',
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

									text: 'менее реалистичный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'less' },
								{
									type: 'text',

									text: ' realistic',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'наиболее реалистичный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the most' },
								{
									type: 'text',

									text: ' realistic',
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

									text: 'наименее реалистичный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'blue',

									text: 'the least',
								},
								{
									type: 'text',

									text: ' realistic',
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
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Следующий день был Четвёртое Июля, один из самых важных праздников Америки.',
					engSentences: [
						{
							engSentences: [
								'The next day was the Fourth of July, one of America\'s most important holidays.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
			],
			offset: true,
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Для некоторых односложных и многосложных слов степень можно сделать как через синтетический метод, так и аналитический. Если сомневаетесь какой правильный, то используйте аналитический. У языка идёт тенденция так строить степень прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прилагательные на -y' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если прилагательное оканчивается на y с предшествующей согласной, то ',
				},
				{ type: 'text',  weight: 'bold', text: '-y' },
				{
					type: 'text',

					text: ' меняется на i не зависимо это односложное или многосложное слово:',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-43331',
			cells: [
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Нормальная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'счастливый',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'happ' },
								{ type: 'text', color: 'gold',  text: 'y' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'занятой' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'bus' },
								{ type: 'text', color: 'gold',  text: 'y' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'счастливее',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'happ' },
								{ type: 'text', color: 'gold',  text: 'i' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'более занятой',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',   text: 'bus' },
								{ type: 'text', color: 'gold',  text: 'i' },
								{ type: 'text', color: 'blue',  text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый счастливый',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' happ' },
								{ type: 'text', color: 'gold',  text: 'i' },
								{ type: 'text', color: 'blue',  text: 'est' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый занятой',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue',  text: 'the' },
								{ type: 'text',   text: ' bus' },
								{ type: 'text', color: 'gold',  text: 'i' },
								{ type: 'text', color: 'blue',  text: 'est' },
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
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'Но если перед ' },
				{ type: 'text',  weight: 'bold', text: 'y ' },
				{ type: 'text',   text: 'стоит гласная, то ' },
				{ type: 'text',  weight: 'bold', text: 'y' },
				{
					type: 'text',

					text: ' остается без изменения.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'У этих прилагательных у относительной и превосходной степени изменяется корень слова. Такие слова нужно запомнить. Это будет не сложно потому что это одни из самых частоиспользуемых прилагательных.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-32716',
			cells: [
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Нормальная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'хороший' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'good' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'плохой' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'bad' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'маленький',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'little' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'лучше' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'better' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'хуже' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'worse' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'меньше' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'less' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'лучший' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'the best',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'худший' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'the worst',
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

									text: 'наименьший',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'the least',
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
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  weight: 'bold', text: 'much' },
				{
					type: 'text',

					text: ' используется с неисчисляемыми объектами, а ',
				},
				{ type: 'text',  weight: 'bold', text: 'many' },
				{ type: 'text',   text: ' с исчисляемыми.' },
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-57146',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'много/многие',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'much/many',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'больше' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'more' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'больше всего',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'the most',
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
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Much more усиливает высказывание:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Мой подход гораздо более гуманный.',
				},

				{
					type: 'text',

					text: 'My approach is much more human.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Есть различия в сравнительной и превосходной степени у слова old. Тут используются разные слова если сравнивают с каким-то человеком или членом семьи.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-23219',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'старый' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'old' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'старее' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'older' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'старше в семье',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'elder' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'старейший',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'oldest' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'самый старший в семье',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text',   text: 'eldest' }],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Это было плохо, но разговор с Ником было хуже, гораздо хуже.',
					engSentences: [
						{
							engSentences: ['That was bad, but talking with Nick was worse, much worse.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Эта пища была хорошей — самый лучшей ужин в мире!',
					engSentences: [
						{
							engSentences: ['That meat was good — the best dinner in the world!'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Он очень умный.',
					engSentences: [{ engSentences: ['He is very smart.'], isCorrect: true }],
					words: [{ rusWord: 'милый', engWord: 'nice' }],
				},
				{
					rusSentence: 'Они не невероятно добры.',
					engSentences: [{ engSentences: ['They aren’t incredibly kind.'], isCorrect: true }],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
			],
			offset: true,
		},
		{
			type: 'faq',
			items: [
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',

								children: [
									{
										type: 'text',

										text: 'Это предложение написано правильно? It is a tables. ',
									},
								],
							},
						],
					},
					answer: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',

								children: [
									{
										type: 'text',

										text: 'Нет не правильно. Перед существительными множественного числа не ставится неопределённый артикль. И для множественного числа не используется местоимение it. Должно быть they.',
									},
								],
							},
						],
					},
				},
			],
		},
	],
}*/

// export default adjectivesDegreesOfComparison
