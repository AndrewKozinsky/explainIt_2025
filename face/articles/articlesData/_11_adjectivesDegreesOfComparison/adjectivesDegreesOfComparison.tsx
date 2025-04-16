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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Прилагательные в английском языке не зависят от лица подлежащего или времени, не имеют числа и рода. Прилагательные бывают относительными и качественным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'Относительные' },
				{
					type: 'text',
					color: 'black',

					text: ' передают признаки, которые не могут быть в предмете в большей или меньшей степени.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text', color: 'black',  text: 'Стеклянный' }],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text', color: 'black',  text: 'Деревянный' }],
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
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'Качественные' },
				{
					type: 'text',
					color: 'black',

					text: ' имеет сравнительную и превосходную степень.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Тяжёлый' },

				{ type: 'text', color: 'black',  text: 'Тяжелее' },

				{ type: 'text', color: 'black',  text: 'Самый тяжёлый' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Высокий' },

				{ type: 'text', color: 'black',  text: 'Выше' },

				{ type: 'text', color: 'black',  text: 'Самый высокий' },
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Давайте посмотрим как образуется сравнительная и превосходная степень у качественных прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Что такое слог' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Слог — это звук или сочетание звуков в слове, произносимые одним толчком выдыхаемого воздуха. ',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'fresh [фрэш]' },

				{ type: 'text', color: 'black',  text: 'свежий' },
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
				{ type: 'text', color: 'black',  text: 'white [вэйт]' },

				{ type: 'text', color: 'black',  text: 'белый' },
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
				{ type: 'text', color: 'black',  text: 'alive [элайв]' },

				{ type: 'text', color: 'black',  text: 'живой' },
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
				{ type: 'text', color: 'black',  text: 'accurate [экджурэт]' },

				{ type: 'text', color: 'black',  text: 'точный' },
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Это слова состоящие из одного или двух слогов. ',
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

					text: 'В большинстве случаев добавляйте ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text', color: 'black',  text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',
					color: 'black',

					text: ' соответственно. Такой механизм образования степени прилагательного называется синтетическим. К любой превосходной степени добавляется ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'определённый артикль the' },
				{
					type: 'text',
					color: 'black',

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
							children: [{ type: 'text', color: 'black',  text: 'long' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'бедный' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text', color: 'black',  text: 'poor' }],
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
								{ type: 'text', color: 'black',  text: 'long' },
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
								{ type: 'text', color: 'black',  text: 'poor' },
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
								{ type: 'text', color: 'black',  text: ' long' },
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
								{ type: 'text', color: 'black',  text: ' poor' },
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
					color: 'black',

					text: 'Он был быстрее и более надёжным.',
				},

				{ type: 'text', color: 'black',  text: 'It was fast' },
				{ type: 'text', color: 'blue',  text: 'er' },
				{ type: 'text', color: 'black',  text: ' and more reliable.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Он был самым богатым мальчиком в Санкт-Петербурге.',
				},

				{ type: 'text', color: 'black',  text: 'He was ' },
				{ type: 'text', color: 'blue',  text: 'the' },
				{ type: 'text', color: 'black',  text: ' rich' },
				{ type: 'text', color: 'blue',  text: 'est' },
				{ type: 'text', color: 'black',  text: ' boy in St Petersburg.' },
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

					text: 'Часто в предложениях в сравнительной степени можно увидеть слово ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{
					type: 'text',
					color: 'black',

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
					color: 'black',

					text: 'Их путь был короче, чем наш.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Their route was shorter ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{ type: 'text', color: 'black',  text: ' ours.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Её расценки в три раза выше, чем наши.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Her rates are three times higher ',
				},
				{ type: 'text', color: 'blue',  text: 'than' },
				{ type: 'text', color: 'black',  text: ' ours.' },
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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
								{ type: 'text', color: 'black',  text: 'ho' },
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
								{ type: 'text', color: 'black',  text: 'thi' },
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
								{ type: 'text', color: 'black',  text: 'ho' },
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
								{ type: 'text', color: 'black',  text: 'thi' },
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
								{ type: 'text', color: 'black',  text: ' ho' },
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
								{ type: 'text', color: 'black',  text: ' thi' },
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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
					color: 'black',

					text: 'Ричардсон был его самым большим конкурентом.',
				},

				{ type: 'text', color: 'black',  text: 'Richardson was his bi' },
				{ type: 'text', color: 'blue',  text: 'gg' },
				{ type: 'text', color: 'black',  text: 'est competitor.' },
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

					text: 'Тут удваивается последняя ',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'l' },
				{ type: 'text', color: 'black',  text: ' в слове ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'small' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Её двор гораздо меньше нашего.',
				},

				{ type: 'text', color: 'black',  text: 'Her courtyard is sma' },
				{ type: 'text', color: 'blue',  text: 'll' },
				{ type: 'text', color: 'black',  text: 'er than ours.' },
			],
		},
		{
			type: 'exercises',
			id: 2,
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если прилагательное оканчивается на ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-e' },
				{ type: 'text', color: 'black',  text: ', то ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'e' },
				{
					type: 'text',
					color: 'black',

					text: ' не удваивается. То есть добавляется ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'r' },
				{ type: 'text', color: 'black',  text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'st' },
				{ type: 'text', color: 'black',  text: ' соответственно.' },
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
								{ type: 'text', color: 'black',  text: 'fin' },
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
								{ type: 'text', color: 'black',  text: 'fre' },
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
								{ type: 'text', color: 'black',  text: 'fin' },
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
								{ type: 'text', color: 'black',  text: 'fre' },
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
								{ type: 'text', color: 'black',  text: ' fin' },
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
								{ type: 'text', color: 'black',  text: ' fre' },
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
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			id: 3,
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

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

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
							color: 'black',

							text: 'Виктор самый высокий.',
						},

						{
							type: 'text',
							color: 'black',

							text: 'Victor is the tallest.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Многосложные прилагательные' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Это слова состоящие из трёх и более слогов. Они длинные и если ещё дополнительно прибавлять -',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text', color: 'black',  text: ' или -' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',
					color: 'black',

					text: ', то произносить станет труднее. Английский не любит длинных слов. Поэтому для сравнительной степени добавьте слово ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'more' },
				{ type: 'text', color: 'black',  text: ' (более) или ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'less' },
				{
					type: 'text',
					color: 'black',

					text: ' (менее). Для абсолютной ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'the most' },
				{ type: 'text', color: 'black',  text: ' (наибольший) и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'the least' },
				{
					type: 'text',
					color: 'black',

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
									color: 'black',

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
									color: 'black',

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
									color: 'black',

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
									color: 'black',

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
									color: 'black',

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
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			id: 4,
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Для некоторых односложных и многосложных слов степень можно сделать как через синтетический метод, так и аналитический. Если сомневаетесь какой правильный, то используйте аналитический. У языка идёт тенденция так строить степень прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прилагательные на -y' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если прилагательное оканчивается на y с предшествующей согласной, то ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-y' },
				{
					type: 'text',
					color: 'black',

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
								{ type: 'text', color: 'black',  text: 'happ' },
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
								{ type: 'text', color: 'black',  text: 'bus' },
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
								{ type: 'text', color: 'black',  text: 'happ' },
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
								{ type: 'text', color: 'black',  text: 'bus' },
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
								{ type: 'text', color: 'black',  text: ' happ' },
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
								{ type: 'text', color: 'black',  text: ' bus' },
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
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'Но если перед ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'y ' },
				{ type: 'text', color: 'black',  text: 'стоит гласная, то ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'y' },
				{
					type: 'text',
					color: 'black',

					text: ' остается без изменения.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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
							children: [{ type: 'text', color: 'black',  text: 'good' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'плохой' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text', color: 'black',  text: 'bad' }],
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
							children: [{ type: 'text', color: 'black',  text: 'little' }],
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
							children: [{ type: 'text', color: 'black',  text: 'better' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'хуже' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text', color: 'black',  text: 'worse' }],
						},
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray',  text: 'меньше' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [{ type: 'text', color: 'black',  text: 'less' }],
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
									color: 'black',

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
									color: 'black',

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
									color: 'black',

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
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'much' },
				{
					type: 'text',
					color: 'black',

					text: ' используется с неисчисляемыми объектами, а ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'many' },
				{ type: 'text', color: 'black',  text: ' с исчисляемыми.' },
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
									color: 'black',

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
							children: [{ type: 'text', color: 'black',  text: 'more' }],
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
									color: 'black',

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
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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
					color: 'black',

					text: 'Мой подход гораздо более гуманный.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'My approach is much more human.',
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
							children: [{ type: 'text', color: 'black',  text: 'old' }],
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
							children: [{ type: 'text', color: 'black',  text: 'older' }],
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
							children: [{ type: 'text', color: 'black',  text: 'elder' }],
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
							children: [{ type: 'text', color: 'black',  text: 'oldest' }],
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
							children: [{ type: 'text', color: 'black',  text: 'eldest' }],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', color: 'black',  text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			id: 5,
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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

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
