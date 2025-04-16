// import ArticleType from '../../articleType'

/*const adjectives: ArticleType.Art = {
	meta: {
		number: 5,
		slug: 'adjectives',
		caption: 'Глава 3',
		articleName: 'Прилагательные',
		articleDescription:
			'Добавим новую часть речи в предложение и научимся описывать объекты и людей. Рассмотрим как окончания прилагательных влияет на перевод.',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Место в предложении' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', text: 'После глагола ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					color: 'black',

					text: ' может стоять не только существительное, но и прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' весёлый.' },
				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text', color: 'black', text: ' jolly.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Мы ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' любопытные.' },
				{ type: 'text', color: 'black', text: 'We ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text', color: 'black', text: ' curious.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Она ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' добрая.' },

				{ type: 'text', color: 'black', text: 'She ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text', color: 'black', text: ' kind.' },
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

					text: 'Если к существительному добавлено прилагательное, то ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',
					color: 'black',

					text: ' ставится перед прилагательным потому что связка прилагательное + существительное по сути является одной сущностью. Например: серая мышь, красивая шляпка. ',
				},
				{
					type: 'text',
					color: 'gray',

					text: 'Про неопределённый артикль будет рассказано в следующей главе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это помидор.' },

				{ type: 'text', color: 'black', text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a tomato' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это спелый помидор.' },

				{ type: 'text', color: 'black', text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a ripe tomato' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это подвал.' },

				{ type: 'text', color: 'black', text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a basement' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это тёмный подвал.' },

				{ type: 'text', color: 'black', text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a dark basement' },
				{ type: 'text', color: 'black', text: '.' },
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

					text: 'Как прилагательное + существительное является одной сущностью, так и несколько действующих лиц являются одним подлежащим во множественном числе. От этого зависит форма глагола ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Я и Дженни — два лучших друга.',
				},

				{ type: 'text', color: 'black', text: 'I and Jenny ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text', color: 'black', text: ' two best-friends.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Я и Дженни — это подлежащее во множественном числе. Поэтому be будет в форме ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'are' },
				{ type: 'text', color: 'gray', text: ', а не ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'is' },
				{ type: 'text', color: 'gray', text: '.' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Мы счастливые.',
					engSentences: [
						{ engSentences: ['We are happy.'], isCorrect: true },
						{
							engSentences: ['We happy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Пропущен глагол to be в форме настоящего времени второго лица: are. Такое предложение является грамматически неправильным.',
										},
									],
								},
							],
						},
						{
							engSentences: ['She is happy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'They переводится как «они». Мы — это we. А в остальном правильно: после местоимений во втором лице ставится глагол to be в форме are.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'счастливый', engWord: 'happy' }],
				},
				{
					rusSentence: 'Кате двадцать лет.',
					engSentences: [
						{
							engSentences: ['Katya is twenty years old.', 'Katya is 20 years old.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'Katya is twenty',
										},
										{
											type: 'text',
											color: 'black',

											text: ' тоже верен.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya is twenty.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'Katya is twenty years old',
										},
										{
											type: 'text',
											color: 'black',

											text: ' тоже верен.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya is 20.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Правильно! Это сокращённый вариант перевода Katya is 20 years old.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya twenty.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Двадцать лет — это свойство персонажа. Поэтому ставится ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: '. Кроме того в русском предложении нет глагола. А это признак того, что в английском нужно ставить ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'двадцать лет', engWord: 'twenty years old' }],
				},
				{
					rusSentence: 'Они любопытные.',
					engSentences: [
						{ engSentences: ['They are curious.'], isCorrect: true },
						{
							engSentences: ['We are curious.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Предложение грамматически правильное, но в русском использовалось местоимение «они», что переводится they.',
										},
									],
								},
							],
						},
						{
							engSentences: ['You are curious.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'В русском использовалось местоимение «они», что переводится they, а не you.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'любопытный', engWord: 'curious' }],
				},
				{
					rusSentence: 'Я уверен, что буду готов.',
					engSentences: [
						{
							engSentences: ['I’m sure that I’ll be ready.', 'I am sure that I will be ready.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'уверенный', engWord: 'sure' },
						{ rusWord: 'готовый', engWord: 'ready' },
						{ rusWord: 'что', engWord: 'that' },
					],
				},
				{
					rusSentence: 'Амелия тихая.',
					engSentences: [
						{ engSentences: ['Amelia is quiet.'], isCorrect: true },
						{
							engSentences: ['Amelia quiet.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Если сообщается о качестве или свойстве, то требуется глагол ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' в одной из своих форм. Форма зависит от времени и лица подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Amelia are quiet.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Чтобы определить в какой форме должен быть глагол ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' нужно понять в каком лице находится подлежащее. В этом предложении подлежащее Амелия. Имена всегда являются третьими лицами. А после третьего лица используется ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' в форме ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'тихий', engWord: 'quiet' }],
				},
				{
					rusSentence: 'Это неправильный путь.',
					engSentences: [
						{ engSentences: ['It is a wrong way.'], isCorrect: true },
						{
							engSentences: ['It is a wrong path.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Ещё вместо ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'path',
										},
										{
											type: 'text',
											color: 'black',

											text: ' можно использовать слово ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'way',
										},
										{
											type: 'text',
											color: 'black',

											text: '. ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'Path',
										},
										{
											type: 'text',
											color: 'black',

											text: ' по смыслу обозначает путь, который можно пройти сделав определённые шаги чтобы достичь какой-то цели. А ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'way',
										},
										{
											type: 'text',
											color: 'black',

											text: ' — это более широкое и абстрактное понятие.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is the wrong way.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Определённый артикль тут использовать не нужно потому что подразумевается один неправильный путь из класса неправильных путей. Поэтому определённый артикль the лучше заменить на ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'неправильный', engWord: 'wrong' },
						{ rusWord: 'путь', engWord: 'way' },
					],
				},
				{
					rusSentence: 'Это тяжелое решение.',
					engSentences: [
						{ engSentences: ['It is a tough decision.'], isCorrect: true },
						{ engSentences: ['It is a hard decision.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'тяжёлое (решение)', engWord: 'tough' },
						{ rusWord: 'решение', engWord: 'decision' },
					],
				},
				{
					rusSentence: 'Он сумасшедший учёный.',
					engSentences: [
						{ engSentences: ['He is a crazy scientist.'], isCorrect: true },
						{
							engSentences: ['He is crazy a scientist.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Неопределённый артикль a должен стоять перед связкой прилагательного + существительного. По смыслу выглядит как он сумасшедний, а после прикручено слово «учёный» не понятно к чему относящиеся.',
										},
									],
								},
							],
						},
						{
							engSentences: ['He be a crazy scientist.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'В настоящем времени глагол to be после местоимений he (он), she (она), it (оно, это) будет в форме is. Ставить чистый be грамматически неправильно потому что это форма голого инфинитива. Из этого не понятно в каком времени происходит действие бытия.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'сумасшедший', engWord: 'crazy' },
						{ rusWord: 'учёный', engWord: 'scientist' },
					],
				},
				{
					rusSentence: 'Горы всегда величественны.',
					engSentences: [{ engSentences: ['Mountains are always majestic.'], isCorrect: true }],
					words: [
						{ rusWord: 'гора', engWord: 'mountain' },
						{ rusWord: 'всегда', engWord: 'always' },
						{ rusWord: 'величественный', engWord: 'majestic' },
					],
				},
				{
					rusSentence: 'Мы часто занятые.',
					engSentences: [
						{ engSentences: ['We are often busy.'], isCorrect: true },
						{
							engSentences: ['We often busy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Не ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'buzy',
										},
										{
											type: 'text',
											color: 'black',

											text: ', а ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'busy',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'часто', engWord: 'often' },
						{ rusWord: 'занятой', engWord: 'busy' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прилагательные на -ing и -ed' },
		{
			type: 'grid',

			gridId: 'grid-2345',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: '-ing' },
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Прилагательные с окончанием ',
								},
								{ type: 'text', color: 'blue', text: '–ing' },
								{
									type: 'text',
									color: 'black',

									text: ' описывают впечатление, которое производят на человека.',
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

									text: 'confusing',
								},

								{
									type: 'text',
									color: 'black',

									text: 'смущающий',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', text: 'tiring' },

								{
									type: 'text',
									color: 'black',

									text: 'утомительный',
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

									text: 'exciting',
								},

								{
									type: 'text',
									color: 'black',

									text: 'волнующий',
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

									text: 'surprising',
								},

								{
									type: 'text',
									color: 'black',

									text: 'удивительный',
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

									text: 'interesting',
								},

								{
									type: 'text',
									color: 'black',

									text: 'интересный',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: '-ed' },
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'А заканчивающиеся на ',
								},
								{ type: 'text', color: 'blue', text: '-ed' },
								{
									type: 'text',
									color: 'black',

									text: ' описывают эмоции человека.',
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

									text: 'confused',
								},

								{
									type: 'text',
									color: 'black',

									text: 'смущённый',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', text: 'tired' },

								{ type: 'text', color: 'black', text: 'усталый' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', text: 'excited' },

								{
									type: 'text',
									color: 'black',

									text: 'взволнованный',
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

									text: 'surprised',
								},

								{
									type: 'text',
									color: 'black',

									text: 'удивленный',
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

									text: 'interested',
								},

								{
									type: 'text',
									color: 'black',

									text: 'заинтересованный',
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

					text: 'Мои дети были так взволнованы.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'My children were so excited.',
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

					text: 'Это действительно интересная книга.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'It is a really interesting book.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Я уставший.',
					engSentences: [
						{
							engSentences: ['I am tired.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ed',
										},
										{
											type: 'text',
											color: 'black',

											text: ' описывают эмоции человека.',
										},
									],
								},
							],
						},
						{
							engSentences: ['I is tired.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Глагол to be в форме is используется в настоящем времени только после подлежащих в третьем лице. Это местоимения he, she, it. А у нас местоимение первого лица, поэтому должен быть am.',
										},
									],
								},
							],
						},
						{
							engSentences: ['I tired.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Если сообщаете о свойстве, то при переводе используйте глагол to be в форме настоящего времени. Поэтому он будет выглядеть в одной из трёх форм в зависимости от лица подлежащего: ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'am',
										},
										{
											type: 'text',
											color: 'black',

											text: ', ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'are',
										},
										{
											type: 'text',
											color: 'black',

											text: ' или ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is',
										},
										{
											type: 'text',
											color: 'black',

											text: '. После подлежащего первого лица используется ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'am',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'уставший', engWord: 'tired' }],
				},
				{
					rusSentence: 'Она талантливая певица.',
					engSentences: [
						{
							engSentences: ['She is a talented singer.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ed',
										},
										{
											type: 'text',
											color: 'black',

											text: ' описывают эмоции человека.',
										},
									],
								},
							],
						},
						{
							engSentences: ['She a is talented singer.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Воспринимайте talented singer как одну сущность: талантливая певица. Но англичанам важно знать это одна из множества талантливых певиц или та самая. Одна из множества. Поэтому перед ней ставьте неопределённый артикль a потому что «певица» — это исчисляемое существительное в единственном числе. А артикль ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',
											color: 'black',

											text: ' ставится перед ними.',
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

											text: 'Так как сообщается кем является персонаж, то ставится ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' в форме ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is',
										},
										{
											type: 'text',
											color: 'black',

											text: '. И следом сама конструкция ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a talented singer',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
						{
							engSentences: ['She are talented singer.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'После she должен стоять to be в форме is, а не are.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'талантливый', engWord: 'talented' },
						{ rusWord: 'певец', engWord: 'singer' },
					],
				},
				{
					rusSentence: 'Это ограниченная серия.',
					engSentences: [{ engSentences: ['It is a limited series.'], isCorrect: true }],
					words: [
						{ rusWord: 'ограниченный', engWord: 'limited' },
						{ rusWord: 'серия', engWord: 'series' },
					],
				},
				{
					rusSentence: 'Эти инструкции дейстительно запутанные.',
					engSentences: [
						{
							engSentences: ['This instructions are really confusing.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ing',
										},
										{
											type: 'text',
											color: 'black',

											text: ' описывают впечатление оказываемое на человека.',
										},
									],
								},
							],
						},
						{
							engSentences: ['This instructions is really confusing.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Инструкции во множественном числе. Поэтому ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' будет не в форме ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'is',
										},
										{
											type: 'text',
											color: 'black',

											text: ', а в ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'are',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
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

											text: 'Посмотрите таблицу в уроке про be. Instructions можно заменить на местоимение they. После they пишется are в настоящем времени.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'эти', engWord: 'this' },
						{ rusWord: 'инструкции', engWord: 'instructions' },
						{ rusWord: 'дейстительно', engWord: 'really' },
						{ rusWord: 'запутанный', engWord: 'confusing' },
					],
				},
				{
					rusSentence: 'Я был разочарован.',
					engSentences: [
						{
							engSentences: ['I was disappointed.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ed',
										},
										{
											type: 'text',
											color: 'black',

											text: ' описывают эмоции человека.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'разочарованный', engWord: 'disappointed' }],
				},
				{
					rusSentence: 'Они были отвратительны и, вероятно, ядовиты.',
					engSentences: [
						{
							engSentences: ['They were disgusting and probably poisonous.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'отвратительный', engWord: 'disgusting' },
						{ rusWord: 'вероятно', engWord: 'probably' },
						{ rusWord: 'ядовит', engWord: 'poisonous' },
					],
				},
				{
					rusSentence: 'Я был очень смущён.',
					engSentences: [{ engSentences: ['I was very confused.'], isCorrect: true }],
					words: [
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'смущён', engWord: 'confused' },
					],
				},
				{
					rusSentence: 'Но сегодня Ника интересовали только сокровища.',
					engSentences: [
						{
							engSentences: ['But tonight Nick was only interested in treasure.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'смущён', engWord: 'confused' },
					],
				},
				{
					rusSentence: 'Они уставшие после их долгого дня.',
					engSentences: [{ engSentences: ['They are tired after their long day.'], isCorrect: true }],
					words: [
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'смущён', engWord: 'confused' },
					],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [{ engSentences: ['He was huge and frightening.'], isCorrect: true }],
					words: [
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'смущён', engWord: 'confused' },
					],
				},
			],

		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Противоположное значение' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Некоторые префиксы изменяют смысл прилагательного на противоположное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue', text: 'un' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Обычный, необычный' },

				{ type: 'text', color: 'black', text: 'Usual, ' },
				{ type: 'text', color: 'blue', text: 'un' },
				{ type: 'text', color: 'black', text: 'usual' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Знакомый, незнакомый' },

				{ type: 'text', color: 'black', text: 'Familiar, ' },
				{ type: 'text', color: 'blue', text: 'un' },
				{ type: 'text', color: 'black', text: 'familiar' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue', text: 'in' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Правильный, неправильный',
				},

				{ type: 'text', color: 'black', text: 'Correct, ' },
				{ type: 'text', color: 'blue', text: 'in' },
				{ type: 'text', color: 'black', text: 'correct' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Полный, неполный' },

				{ type: 'text', color: 'black', text: 'Complete, ' },
				{ type: 'text', color: 'blue', text: 'In' },
				{ type: 'text', color: 'black', text: 'complete' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text', color: 'black', text: ' перед ' },
				{ type: 'text', color: 'gold', text: 'I' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Законный, незаконный' },

				{ type: 'text', color: 'black', text: 'Legal, ' },
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text', color: 'black', text: 'legal' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Грамотный, неграмотный' },

				{ type: 'text', color: 'black', text: 'Illiterate, ' },
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text', color: 'black', text: 'literate' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text', color: 'black', text: ' перед ' },
				{ type: 'text', color: 'gold', text: 'r' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Уместный, неуместный' },

				{ type: 'text', color: 'black', text: 'Relevant, ' },
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text', color: 'black', text: 'relevant' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Ответственный, безответственный',
				},

				{ type: 'text', color: 'black', text: 'Responsible, ' },
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text', color: 'black', text: 'responsible' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'im' },
				{ type: 'text', color: 'black', text: ' перед ' },
				{ type: 'text', color: 'gold',  text: 'm' },
				{ type: 'text', color: 'black',  text: ' и ' },
				{ type: 'text', color: 'gold',  text: 'p' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Вежливый, невежливый' },

				{ type: 'text', color: 'black',  text: 'Polite, ' },
				{ type: 'text', color: 'blue',  text: 'im' },
				{ type: 'text', color: 'black',  text: 'polite' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Возможный, невозможный' },

				{ type: 'text', color: 'black',  text: 'Possible, ' },
				{ type: 'text', color: 'blue',  text: 'im' },
				{ type: 'text', color: 'black',  text: 'possible' },
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

					text: 'К сожалению невозможно вычислить через какой префикс задать прилагательному противоположное значение. Это нужно только знать. Дело усугубляется ещё и тем, что не каждое слово может его иметь. А множеству слов вообще нельзя добавлять эти префиксы.  Для таких случаев есть отрицательная частица которую изучим в одной из следующих глав.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Честер незаменим.',
					engSentences: [
						{ engSentences: ['Chester is irreplaceable.'], isCorrect: true },
						{
							engSentences: ['Chester is irreplaceble'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Грамматически правильно, но не ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'irreplaceble',
										},
										{
											type: 'text',
											color: 'black',

											text: ', а ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'irreplaceable',
										},
										{
											type: 'text',
											color: 'black',

											text: '. Забыли добавить a.',
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

											text: 'Прилагательное irreplaceable интересно тем, что образовано от глагола ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'replace',
										},
										{
											type: 'text',
											color: 'black',

											text: ' (заменить). К нему добавлен суффикс ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-able',
										},
										{
											type: 'text',
											color: 'black',

											text: ' далающей из него прилагательное характеризующее  свойство либо доступность для какого-либо действия. В данном случае «заменимый».',
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

											text: 'А префикс ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'ir-',
										},
										{
											type: 'text',
											color: 'black',

											text: ' меняет значение прилагательного на противоположное.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Chester irreplaceable.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Если в предложении сообщаете о свойстве или качестве не забывайте про ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'be',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'незаменимый', engWord: 'irreplaceable' }],
				},
				{
					rusSentence: 'Она ведёт себя аморально.',
					engSentences: [{ engSentences: ['Her behavior is immoral.'], isCorrect: true }],
					words: [
						{
							note: 'Дословный перевод «её поведение»',
							rusWord: 'она ведёт себя',
							engWord: 'her behavior',
						},
						{
							note: 'Происходит от moral — нравственный',
							rusWord: 'аморально',
							engWord: 'immoral',
						},
					],
				},
				{
					rusSentence: 'Это слишком неточный способ.',
					engSentences: [
						{
							engSentences: ['It is too inaccurate way.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Правильно! Прилагательное ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'accurate',
										},
										{
											type: 'text',
											color: 'black',

											text: ' переводится «точный». А приставка ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'in-',
										},
										{
											type: 'text',
											color: 'black',

											text: ' задаёт противоположное значение.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'неточный', engWord: 'inaccurate' },
						{ note: 'Дословно «путь»', rusWord: 'способ', engWord: 'way' },
					],
				},
				{
					rusSentence: 'Джек очень несчастен.',
					engSentences: [
						{ engSentences: ['Jake is very unhappy.'], isCorrect: true },
						{
							engSentences: ['Jace is very unhappy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'Не Джейс, а Джек. Jace',
										},

										{
											type: 'text',
											color: 'black',

											text: 'Jake.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'несчастен', engWord: 'unhappy' }],
				},
				{
					rusSentence: 'Они были очень несчастливы и очень напуганы.',
					engSentences: [
						{
							engSentences: ['They were very unhappy, and very afraid.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'несчастен', engWord: 'unhappy' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Образование из существительных' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Прилагательное можно сделать из существительного через добавления суффикса.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'y' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Здоровье, здоровый' },

				{ type: 'text', color: 'black',  text: 'Health, health' },
				{ type: 'text', color: 'blue',  text: 'y' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'ly' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Друг, дружеский' },

				{ type: 'text', color: 'black',  text: 'Friend, friend' },
				{ type: 'text', color: 'blue',  text: 'ly' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'al' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Политика, политический' },

				{ type: 'text', color: 'black',  text: 'Politic, politic' },
				{ type: 'text', color: 'blue',  text: 'al' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'ful' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Красота, красивый' },

				{ type: 'text', color: 'black',  text: 'Beauty, beauti' },
				{ type: 'text', color: 'blue',  text: 'ful' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'ous' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Опасность, опасный' },

				{ type: 'text', color: 'black',  text: 'Danger, danger' },
				{ type: 'text', color: 'blue',  text: 'ous' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'ish' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Швед, шведский' },

				{ type: 'text', color: 'black',  text: 'Swede, Swed' },
				{ type: 'text', color: 'blue',  text: 'ish' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'blue',  text: 'ive' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Действие, действительный',
				},

				{ type: 'text', color: 'black',  text: 'Effect, effect' },
				{ type: 'text', color: 'blue',  text: 'ive' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'Суффикс ' },
				{ type: 'text', color: 'blue',  text: 'less' },
				{
					type: 'text',
					color: 'black',

					text: ' указывает на отсутствие свойства или качества.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Дом, бездомный' },

				{ type: 'text', color: 'black',  text: 'Home, home' },
				{ type: 'text', color: 'blue',  text: 'less' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Это прекрасный день.',
					engSentences: [
						{ engSentences: ['It is a beautiful day.'], isCorrect: true },
						{
							engSentences: ['It a beautiful day.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'В предложении говорится чем является это, поэтому должен присутствовать ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: '.',
										},
									],
								},
							],
						},
						{
							engSentences: ['The is beautiful day.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',

											text: 'В переводе забыто слово «это». И после ',
										},
										{
											type: 'text',
											color: 'gold',

											text: 'the',
										},
										{
											type: 'text',
											color: 'black',

											text: ' ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',

											text: ' не ставится.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'прекрасный', engWord: 'beautiful' },
						{ rusWord: 'день', engWord: 'day' },
					],
				},
				{
					rusSentence: 'Несмотря на это, они слишком эмоциональны.',
					engSentences: [
						{ engSentences: ['Despite it, they are too emotional.'], isCorrect: true },
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

											text: 'После подлежащего должен быть to be в форме are.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'несмотря на это', engWord: 'despite it' },
						{ rusWord: 'слишком', engWord: 'too' },
						{ rusWord: 'эмоциональный', engWord: 'emotional' },
					],
				},
				{
					rusSentence: 'Я смелая, я красивая, я замечательная.',
					engSentences: [
						{
							engSentences: ['I am brave, I am beautiful, and I am brilliant.'],
							isCorrect: true,
						},
						{ engSentences: [], isCorrect: false },
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

											text: 'Если в предложении говорится про свойство, то должен быть to be.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'смелый', engWord: 'brave' },
						{ rusWord: 'красивый', engWord: 'beautiful' },
						{ rusWord: 'замечательный', engWord: 'brilliant' },
					],
				},
				{
					rusSentence: 'Мы очень благодарны.',
					engSentences: [{ engSentences: ['We are very grateful.'], isCorrect: true }],
					words: [{ rusWord: 'смелый', engWord: 'brave' }],
				},
				{
					rusSentence: 'Эта книга продуманная и вдохновляющая.',
					engSentences: [
						{
							engSentences: ['This book is thoughtful and inspiring.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'смелый', engWord: 'brave' }],
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

					text: 'Такие образования прилагательных из существительных не характерны в основной массе. В большинстве случаев не только прилагательные, но и другие слова выглядят одинаково для разных частей речи. Например слово ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'professional' },
				{
					type: 'text',
					color: 'black',

					text: ' может быть или существительным «профессионал» и прилагательным «профессиональный». Часть речи зависит от положения слова в предложении.',
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

					text: 'Все эти префиксы и суффиксы сразу запомнить невозможно. Но я хочу чтобы эта информация просто осела и при переводе с английского вы это замечали. Также можно сократить количество запоминаемых слов если, например, учить существительные, а на их основе формировать прилагательное.',
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

					text: 'Ответьте на вопросы чтобы понять как усвоили материал.',
				},
			],
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

										text: 'Что такое ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'инфинитив',
									},
									{ type: 'text', color: 'black',  text: '?' },
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

										text: 'Это форма глагола отвечающая на вопросы «Что делать?», «Что сделать?». По ней невозможно определить время совершения действия, лицо, число. Выражает само действие в чистом виде.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',
										color: 'gray',

										text: 'Что делать?',
									},
									{
										type: 'text',
										color: 'black',

										text: ' Смотреть.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',
										color: 'gray',

										text: 'Что делать?',
									},
									{
										type: 'text',
										color: 'black',

										text: ' Отдыхать.',
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

										text: 'Неинфинитивные формы глагола содержат время.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',
										color: 'gray',

										text: 'Что делал?',
									},
									{
										type: 'text',
										color: 'black',

										text: ' Смотрел.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',
										color: 'gray',

										text: 'Что делаешь?',
									},
									{
										type: 'text',
										color: 'black',

										text: ' Отдыхаешь.',
									},
								],
							},
						],
					},
				},
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

										text: 'Что будет если ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',

										text: ' не ставить?',
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

										text: 'Англичане привыкли, что после подлежащего стоит глагол. Подлежащее выполняет действие направленное на кого-то. Действие связывает подлежащее с остальными частями предложения, устанавливает их взаимоотношения. И если его опустить, то предложение просто лишится смысла. Представьте если вы в предложении',
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

										text: 'Осёл ',
									},
									{
										type: 'text',
										color: 'gray',

										text: 'выпил',
									},
									{
										type: 'text',
										color: 'black',

										text: ' воду.',
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

										text: 'убрать глагол «выпил», то отношения между существительными не понятны.',
									},
								],
							},
						],
					},
				},
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

										text: 'Для чего ставить глагол ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',

										text: ' в одной из временных форм?',
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
									{ type: 'text', color: 'black', weight: 'bold', text: 'Be' },
									{
										type: 'text',
										color: 'black',

										text: ' для англичан обычный глагол как и любой другой смысловой глагол. Глагол обозначает действие. Персонаж всегда выполняет действие в какое-то определённое время: прошлое, настоящее, будущее. Без указания на время предложение будет неполноценным.',
									},
								],
							},
						],
					},
				},
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

										text: 'Чем ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'инфинитивная',
									},
									{
										type: 'text',
										color: 'black',

										text: ' форма глагола отличается от ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'неопределённой',
									},
									{ type: 'text', color: 'black',  text: '?' },
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

										text: 'Ничем. Это синонимы. Глагол не нагруженный временем и выражающий чистое действие в русском языке называется неопределённым, а в английском инфинитивом.',
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

// export default adjectives
