import ArticleType from '../../articleType'

const adjectivesDegreesOfComparison: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 13,
		slug: 'adjectives-degrees-of-comparison',
		caption: 'Глава 11',
		articleName: 'Степени сравнения прилагательных',
		articleDescription:
			'Разберём как образуются три степени сравнения прилагательных: положительная, сравнительная и превосходная.',
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
					weight: 'normal',
					text: ' передают признаки, которые не могут быть в предмете в большей или меньшей степени.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Стеклянный' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Деревянный' }],
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
					weight: 'normal',
					text: ' имеет сравнительную и превосходную степень.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Тяжёлый' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Тяжелее' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Самый тяжёлый' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Высокий' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Выше' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Самый высокий' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Обычный признак предмета' },

				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Признак предмета по сравнению с другим',
				},

				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
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
					weight: 'normal',
					text: 'Давайте посмотрим как образуется сравнительная и превосходная степень у качественных прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Что такое слог' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Слог — это звук или сочетание звуков в слове, произносимые одним толчком выдыхаемого воздуха. ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'fresh [фрэш]' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'свежий' },
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
					text: 'Одна согласная. Поэтому односложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'white [вэйт]' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'белый' },
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
					text: 'Тут на письме две согласные. Но последняя ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'e' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' не произносится. Поэтому это односложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'alive [элайв]' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'живой' },
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
					text: 'Тут два слога. Поэтому это двухсложное прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'accurate [экджурэт]' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'точный' },
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
					text: 'Тут три слога. Трёхсложное прилагательное.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Одно и двухсложные прилагательные' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
					weight: 'normal',
					text: 'В большинстве случаев добавляйте ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' соответственно. Такой механизм образования степени прилагательного называется синтетическим. К любой превосходной степени добавляется ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'определённый артикль the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'плохой' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'long' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'бедный' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'poor' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'хуже' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'long' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'беднее' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'poor' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'худший' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' long' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
									text: 'самый бедный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' poor' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
					text: 'Он был быстрее и более надёжным.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'It was fast' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' and more reliable.' },
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
					text: 'Он был самым богатым мальчиком в Санкт-Петербурге.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'He was ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' rich' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' boy in St Petersburg.' },
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
					text: 'Часто в предложениях в сравнительной степени можно увидеть слово ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'than' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' (чем) и дальше описывается объект с которым идёт сравнение.',
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
					text: 'Их путь был короче, чем наш.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Their route was shorter ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'than' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ours.' },
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
					text: 'Её расценки в три раза выше, чем наши.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Her rates are three times higher ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'than' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ours.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
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
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'ho' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 't' },
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
									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'thi' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'n' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'ho' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'tt' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
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
									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'thi' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'nn' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' ho' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'tt' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' thi' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'nn' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
					weight: 'normal',
					text: 'Слово big оканчивается на согласную + гласную + согласную. Поэтому последняя согласная удваивается.',
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
					text: 'Ричардсон был его самым большим конкурентом.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'Richardson was his bi' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'gg' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'est competitor.' },
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
					text: 'Тут удваивается последняя ',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'l' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' в слове ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'small' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
					text: 'Её двор гораздо меньше нашего.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'Her courtyard is sma' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'll' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'er than ours.' },
			],
		},
		{
			type: 'exercises',
			id: 1,
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
					weight: 'normal',
					text: 'Если прилагательное оканчивается на ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-e' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', то ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'e' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' не удваивается. То есть добавляется ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'r' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: '-' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'st' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' соответственно.' },
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'fin' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'плохой' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'fre' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'прекраснее',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'fin' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'r' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'хуже' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'fre' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'r' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'самый прекрасный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' fin' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'st' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'худший' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' fre' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'st' },
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
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			id: 2,
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
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'После прилагательного в превосходной степени существительное можно не ставить если оно подразумевается:',
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
							text: 'Виктор самый высокий.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Victor is the tallest.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Многосложные прилагательные' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Это слова состоящие из трёх и более слогов. Они длинные и если ещё дополнительно прибавлять -',
				},
				{ type: 'text', color: 'blue', weight: 'bold', text: 'er' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' или -' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'est' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', то произносить станет труднее. Английский не любит длинных слов. Поэтому для сравнительной степени добавьте слово ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'more' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (более) или ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'less' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' (менее). Для абсолютной ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'the most' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (наибольший) и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'the least' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'реалистичный',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'более реалистичный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'more' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' realistic',
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
									text: 'менее реалистичный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'less' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'наиболее реалистичный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the most' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' realistic',
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
									text: 'наименее реалистичный',
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
									color: 'blue',
									weight: 'normal',
									text: 'the least',
								},
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Следующий день был Четвёртое Июля, один из самых важных праздников Америки.',
					engSentences: [
						{
							engSentences: [
								"The next day was the Fourth of July, one of America's most important holidays.",
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
					weight: 'normal',
					text: 'Для некоторых односложных и многосложных слов степень можно сделать как через синтетический метод, так и аналитический. Если сомневаетесь какой правильный, то используйте аналитический. У языка идёт тенденция так строить степень прилагательных.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прилагательные на -y' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если прилагательное оканчивается на y с предшествующей согласной, то ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: '-y' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'счастливый',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'happ' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'занятой' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'bus' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'счастливее',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'happ' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'i' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
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
									text: 'более занятой',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'bus' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'i' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'er' },
							],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'самый счастливый',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' happ' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'i' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
									text: 'самый занятой',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' bus' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'i' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'est' },
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
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Но если перед ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'y ' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'стоит гласная, то ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'y' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' остается без изменения.',
				},
			],
		},
		{ type: 'exercises', id: 4, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'хороший' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'good' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'плохой' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'bad' }],
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
									text: 'маленький',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'little' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Сравнительная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'лучше' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'better' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'хуже' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'worse' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'меньше' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'less' }],
						},
					],
				},
				{
					children: [
						{ type: 'header', tag: 'h3', style: 'h4', text: 'Превосходная' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'лучший' }],
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
									text: 'the best',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'худший' }],
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
									text: 'the worst',
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
									text: 'наименьший',
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
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
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
					weight: 'normal',
					text: ' используется с неисчисляемыми объектами, а ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'many' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' с исчисляемыми.' },
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'много/многие',
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
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'больше' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'more' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'больше всего',
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
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
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
					text: 'Much more усиливает высказывание:',
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
					text: 'Мой подход гораздо более гуманный.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'старый' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'old' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [{ type: 'text', color: 'gray', weight: 'normal', text: 'старее' }],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'older' }],
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
									text: 'старше в семье',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'elder' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'старейший',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'oldest' }],
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
									text: 'самый старший в семье',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [{ type: 'text', color: 'black', weight: 'normal', text: 'eldest' }],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 1.' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Требуется пример 2.' }],
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
}

export default adjectivesDegreesOfComparison
