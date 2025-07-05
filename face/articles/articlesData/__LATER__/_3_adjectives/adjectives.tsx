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
			children: [
				{ type: 'text',  text: 'После глагола ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					text: ' может стоять не только существительное, но и прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' весёлый.' },
				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text',  text: ' jolly.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мы ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' любопытные.' },
				{ type: 'text',  text: 'We ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text',  text: ' curious.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Она ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' добрая.' },

				{ type: 'text',  text: 'She ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text',  text: ' kind.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если к существительному добавлено прилагательное, то ',
				},
				{ type: 'text',  weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',
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
				{ type: 'text',  text: 'Это помидор.' },

				{ type: 'text',  text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a tomato' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это спелый помидор.' },

				{ type: 'text',  text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a ripe tomato' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это подвал.' },

				{ type: 'text',  text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a basement' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это тёмный подвал.' },

				{ type: 'text',  text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a dark basement' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'Как прилагательное + существительное является одной сущностью, так и несколько действующих лиц являются одним подлежащим во множественном числе. От этого зависит форма глагола ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Я и Дженни — два лучших друга.',
				},

				{ type: 'text',  text: 'I and Jenny ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text',  text: ' two best-friends.' },
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
									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'Katya is twenty',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'Katya is twenty years old',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Двадцать лет — это свойство персонажа. Поэтому ставится ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
											text: '. Кроме того в русском предложении нет глагола. А это признак того, что в английском нужно ставить ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
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

									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
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

									children: [
										{
											type: 'text',
											text: 'Если сообщается о качестве или свойстве, то требуется глагол ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Чтобы определить в какой форме должен быть глагол ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
											text: ' нужно понять в каком лице находится подлежащее. В этом предложении подлежащее Амелия. Имена всегда являются третьими лицами. А после третьего лица используется ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
											text: ' в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'is',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',

											text: 'Ещё вместо ',
										},
										{
											type: 'text',
											weight: 'bold',
											text: 'path',
										},
										{
											type: 'text',
											text: ' можно использовать слово ',
										},
										{
											type: 'text',
											weight: 'bold',
											text: 'way',
										},
										{
											type: 'text',
											text: '. ',
										},
										{
											type: 'text',
											weight: 'bold',
											text: 'Path',
										},
										{
											type: 'text',
											text: ' по смыслу обозначает путь, который можно пройти сделав определённые шаги чтобы достичь какой-то цели. А ',
										},
										{
											type: 'text',
											weight: 'bold',
											text: 'way',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Определённый артикль тут использовать не нужно потому что подразумевается один неправильный путь из класса неправильных путей. Поэтому определённый артикль the лучше заменить на ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'a',
										},
										{
											type: 'text',
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
					rusSentence: 'Мы часто занятые.',
					engSentences: [
						{ engSentences: ['We are often busy.'], isCorrect: true },
						{
							engSentences: ['We often busy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: 'Не ',
										},
										{
											type: 'text',
											weight: 'bold',
											text: 'busy',
										},
										{
											type: 'text',
											text: ', а ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'busy',
										},
										{
											type: 'text',
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
							children: [
								{
									type: 'text',
									text: 'Прилагательные с окончанием ',
								},
								{ type: 'text', color: 'blue', text: '–ing' },
								{
									type: 'text',
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
									text: 'confusing',
								},

								{
									type: 'text',
									text: 'смущающий',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text',  text: 'tiring' },

								{
									type: 'text',
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
									text: 'exciting',
								},

								{
									type: 'text',
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
									text: 'surprising',
								},

								{
									type: 'text',
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
									text: 'interesting',
								},

								{
									type: 'text',
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
							children: [
								{
									type: 'text',
									text: 'А заканчивающиеся на ',
								},
								{ type: 'text', color: 'blue', text: '-ed' },
								{
									type: 'text',
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
									text: 'confused',
								},

								{
									type: 'text',
									text: 'смущённый',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text',  text: 'tired' },

								{ type: 'text',  text: 'усталый' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text',  text: 'excited' },

								{
									type: 'text',

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
									text: 'surprised',
								},

								{
									type: 'text',
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
									text: 'interested',
								},

								{
									type: 'text',
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
					text: 'Мои дети были так взволнованы.',
				},

				{
					type: 'text',
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
					text: 'Это действительно интересная книга.',
				},

				{
					type: 'text',
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

									children: [
										{
											type: 'text',
											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',
											text: '-ed',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Если сообщаете о свойстве, то при переводе используйте глагол to be в форме настоящего времени. Поэтому он будет выглядеть в одной из трёх форм в зависимости от лица подлежащего: ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'am',
										},
										{
											type: 'text',
											text: ', ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'are',
										},
										{
											type: 'text',
											text: ' или ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'is',
										},
										{
											type: 'text',
											text: '. После подлежащего первого лица используется ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'am',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',
											text: '-ed',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Воспринимайте talented singer как одну сущность: талантливая певица. Но англичанам важно знать это одна из множества талантливых певиц или та самая. Одна из множества. Поэтому перед ней ставьте неопределённый артикль a потому что «певица» — это исчисляемое существительное в единственном числе. А артикль ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'a',
										},
										{
											type: 'text',
											text: ' ставится перед ними.',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',
											text: 'Так как сообщается кем является персонаж, то ставится ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'to be',
										},
										{
											type: 'text',
											text: ' в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'is',
										},
										{
											type: 'text',
											text: '. И следом сама конструкция ',
										},
										{
											type: 'text',
											color: 'blue',
											text: 'a talented singer',
										},
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
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

									children: [
										{
											type: 'text',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ing',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Инструкции во множественном числе. Поэтому ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'be',
										},
										{
											type: 'text',

											text: ' будет не в форме ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'is',
										},
										{
											type: 'text',

											text: ', а в ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'are',
										},
										{
											type: 'text',

											text: '.',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-ed',
										},
										{
											type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Некоторые префиксы изменяют смысл прилагательного на противоположное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue', text: 'un' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Обычный, необычный' },

				{ type: 'text',  text: 'Usual, ' },
				{ type: 'text', color: 'blue', text: 'un' },
				{ type: 'text',  text: 'usual' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Знакомый, незнакомый' },

				{ type: 'text',  text: 'Familiar, ' },
				{ type: 'text', color: 'blue', text: 'un' },
				{ type: 'text',  text: 'familiar' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue', text: 'in' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Правильный, неправильный',
				},

				{ type: 'text',  text: 'Correct, ' },
				{ type: 'text', color: 'blue', text: 'in' },
				{ type: 'text',  text: 'correct' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Полный, неполный' },

				{ type: 'text',  text: 'Complete, ' },
				{ type: 'text', color: 'blue', text: 'In' },
				{ type: 'text',  text: 'complete' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text',  text: ' перед ' },
				{ type: 'text', color: 'gold', text: 'I' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Законный, незаконный' },

				{ type: 'text',  text: 'Legal, ' },
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text',  text: 'legal' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Грамотный, неграмотный' },

				{ type: 'text',  text: 'Illiterate, ' },
				{ type: 'text', color: 'blue', text: 'il' },
				{ type: 'text',  text: 'literate' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text',  text: ' перед ' },
				{ type: 'text', color: 'gold', text: 'r' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Уместный, неуместный' },

				{ type: 'text',  text: 'Relevant, ' },
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text',  text: 'relevant' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ответственный, безответственный',
				},

				{ type: 'text',  text: 'Responsible, ' },
				{ type: 'text', color: 'blue', text: 'ir' },
				{ type: 'text',  text: 'responsible' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', color: 'blue', text: 'im' },
				{ type: 'text',  text: ' перед ' },
				{ type: 'text', color: 'gold',  text: 'm' },
				{ type: 'text',   text: ' и ' },
				{ type: 'text', color: 'gold',  text: 'p' },
				{ type: 'text',   text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Вежливый, невежливый' },

				{ type: 'text',   text: 'Polite, ' },
				{ type: 'text', color: 'blue',  text: 'im' },
				{ type: 'text',   text: 'polite' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Возможный, невозможный' },

				{ type: 'text',   text: 'Possible, ' },
				{ type: 'text', color: 'blue',  text: 'im' },
				{ type: 'text',   text: 'possible' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Грамматически правильно, но не ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'irreplaceble',
										},
										{
											type: 'text',

											text: ', а ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'irreplaceable',
										},
										{
											type: 'text',

											text: '. Забыли добавить a.',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'Прилагательное irreplaceable интересно тем, что образовано от глагола ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'replace',
										},
										{
											type: 'text',

											text: ' (заменить). К нему добавлен суффикс ',
										},
										{
											type: 'text',
											color: 'blue',

											text: '-able',
										},
										{
											type: 'text',

											text: ' далающей из него прилагательное характеризующее  свойство либо доступность для какого-либо действия. В данном случае «заменимый».',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'А префикс ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'ir-',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Если в предложении сообщаете о свойстве или качестве не забывайте про ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'be',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Правильно! Прилагательное ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'accurate',
										},
										{
											type: 'text',

											text: ' переводится «точный». А приставка ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'in-',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Не Джейс, а Джек. Jace',
										},

										{
											type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Прилагательное можно сделать из существительного через добавления суффикса.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'y' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Здоровье, здоровый' },

				{ type: 'text',   text: 'Health, health' },
				{ type: 'text', color: 'blue',  text: 'y' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'ly' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Друг, дружеский' },

				{ type: 'text',   text: 'Friend, friend' },
				{ type: 'text', color: 'blue',  text: 'ly' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'al' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Политика, политический' },

				{ type: 'text',   text: 'Politic, politic' },
				{ type: 'text', color: 'blue',  text: 'al' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'ful' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Красота, красивый' },

				{ type: 'text',   text: 'Beauty, beauti' },
				{ type: 'text', color: 'blue',  text: 'ful' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'ous' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Опасность, опасный' },

				{ type: 'text',   text: 'Danger, danger' },
				{ type: 'text', color: 'blue',  text: 'ous' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'ish' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Швед, шведский' },

				{ type: 'text',   text: 'Swede, Swed' },
				{ type: 'text', color: 'blue',  text: 'ish' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text', color: 'blue',  text: 'ive' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Действие, действительный',
				},

				{ type: 'text',   text: 'Effect, effect' },
				{ type: 'text', color: 'blue',  text: 'ive' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'Суффикс ' },
				{ type: 'text', color: 'blue',  text: 'less' },
				{
					type: 'text',

					text: ' указывает на отсутствие свойства или качества.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Дом, бездомный' },

				{ type: 'text',   text: 'Home, home' },
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

									children: [
										{
											type: 'text',

											text: 'В предложении говорится чем является это, поэтому должен присутствовать ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'В переводе забыто слово «это». И после ',
										},
										{
											type: 'text',
											color: 'gold',

											text: 'the',
										},
										{
											type: 'text',

											text: ' ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Такие образования прилагательных из существительных не характерны в основной массе. В большинстве случаев не только прилагательные, но и другие слова выглядят одинаково для разных частей речи. Например слово ',
				},
				{ type: 'text',  weight: 'bold', text: 'professional' },
				{
					type: 'text',

					text: ' может быть или существительным «профессионал» и прилагательным «профессиональный». Часть речи зависит от положения слова в предложении.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Все эти префиксы и суффиксы сразу запомнить невозможно. Но я хочу чтобы эта информация просто осела и при переводе с английского вы это замечали. Также можно сократить количество запоминаемых слов если, например, учить существительные, а на их основе формировать прилагательное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

								children: [
									{
										type: 'text',

										text: 'Что такое ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'инфинитив',
									},
									{ type: 'text',   text: '?' },
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

										text: ' Отдыхать.',
									},
								],
							},
							{
								type: 'paragraph',
								offset: true,

								children: [
									{
										type: 'text',

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

								children: [
									{
										type: 'text',

										text: 'Что будет если ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

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

								children: [
									{
										type: 'text',

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

										text: 'Осёл ',
									},
									{
										type: 'text',
										color: 'gray',

										text: 'выпил',
									},
									{
										type: 'text',

										text: ' воду.',
									},
								],
							},
							{
								type: 'paragraph',

								children: [
									{
										type: 'text',

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

								children: [
									{
										type: 'text',

										text: 'Для чего ставить глагол ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

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

								children: [
									{ type: 'text',  weight: 'bold', text: 'Be' },
									{
										type: 'text',

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

								children: [
									{
										type: 'text',

										text: 'Чем ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'инфинитивная',
									},
									{
										type: 'text',

										text: ' форма глагола отличается от ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'неопределённой',
									},
									{ type: 'text',   text: '?' },
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
