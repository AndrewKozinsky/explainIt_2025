// import ArticleType from '../../articleType'
// import ToBePresentPositiveScheme from './ToBePresentPositiveScheme'
// import ToBePresentNegativeScheme from './ToBePresentNegativeScheme'
// import ToBePresentQuestionScheme from './ToBePresentQuestionScheme'

/*const beNegativeAndQuestion: ArticleType.Art = {
	meta: {
		number: 8,
		slug: 'be-negative-and-question',
		caption: 'Глава 6',
		articleName: 'Вопрос и отрицание в предложениях с be',
		articleDescription:
			'Научимся предложения с глаголом be делать вопросительными и отрицательными во всех временах.',

	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прошедшее и настоящее время' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Чтобы сделать отрицание для глагола ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' нужно после него поставить отрицательную частицу ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Сам глагол должен быть нагружен подходящим временем.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-2915',
			cells: [
				{
					children: [{ type: 'customComponent', component: <ToBePresentPositiveScheme /> }],
				},
				{
					children: [{ type: 'customComponent', component: <ToBePresentNegativeScheme /> }],
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
					text: 'Отрицание в прошедшем времени.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не был напуган.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'was not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' afraid.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Вы не были милым.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'You ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'were not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' cute.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Она не была красивой.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'She ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'was not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' beautiful.' },
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
					text: 'Отрицание в настоящем времени.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не смелый.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'am not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' brave.' },
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
					text: 'Вы не очень сильный мужчина.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'You ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'are not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' a very strong man.' },
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
					text: 'Инжирное дерево не высокое.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'A fig tree ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'is not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' tall.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Я не ребенок, мне 44 года.',
					engSentences: [{ engSentences: ['I am not a child I am 44.'], isCorrect: true }],
					words: [{ rusWord: '44 года', engWord: '44 years old' }],
				},
				{
					rusSentence: 'Оля не популярная певица.',
					engSentences: [
						{ engSentences: ['Olya is not a popular singer.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Забыли про to be. Он должен стоять после подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Not должен стоять после вспомогательного глагола, а не после отрицаемого слова.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'популярный', engWord: 'popular' },
						{ rusWord: 'певица', engWord: 'a singer' },
					],
				},
				{
					rusSentence: 'Я не ребёнок, я замужняя женщина.',
					engSentences: [
						{
							engSentences: ['I am not a child, I am a married woman.'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом предложении to be будет в форме am.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'После подлежащего I нужно поставить to be потому что дальше стоит предлог с существительным.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'ребёнок', engWord: 'a child' },
						{ rusWord: 'замужняя', engWord: 'married' },
						{ rusWord: 'женщина', engWord: 'a woman' },
					],
				},
				{
					rusSentence: 'Я имею в виду, он не такой хороший мальчик, как Том.',
					engSentences: [
						{ engSentences: ['I mean, he is not a good boy as Tom.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Забыли про ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. Он должен стоять после подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Отрицательную частицу ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'not',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' можно ставить после вспомогательного глагола. Сейчас он стоит перед ним.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'Я имею в виду', engWord: 'I mean' },
						{ rusWord: 'хороший', engWord: 'good' },
						{ rusWord: 'мальчик', engWord: 'boy' },
						{ rusWord: 'такой как', engWord: 'as' },
					],
				},
				{
					rusSentence: 'Семинар — это не простое обсуждение.',
					engSentences: [
						{
							engSentences: ['The workshop is not a simple discussion.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Вариант с The workshop возможен потому что могут иметь конкретный семинар.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Вариант с A workshop возможен потому что могут иметь любой семинар.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед Workshop требуется поставить определитель существительног. Тут подходит или ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'a',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' или ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'the',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. Какой выбрать?',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'семинар', engWord: 'the workshop' },
						{ rusWord: 'простой', engWord: 'simple' },
						{ rusWord: 'обсуждение', engWord: 'a discussion' },
					],
				},
				{
					rusSentence: 'Европейские блюда не всегда полезные.',
					engSentences: [
						{
							engSentences: ['European dishes are not always healthy'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом пр',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом п',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'два', engWord: 'two ' }],
				},
				{
					rusSentence: 'Он не был болен.',
					engSentences: [{ engSentences: ['He wasn’t sick.'], isCorrect: true }],
					words: [{ rusWord: 'болен', engWord: 'sick' }],
				},
				{
					rusSentence: 'Приведений не существует.',
					engSentences: [{ engSentences: ['Ghosts are not real.'], isCorrect: true }],
					words: [
						{ rusWord: 'приведение', engWord: 'a ghost' },
						{ rusWord: 'настоящий', engWord: 'real' },
					],
				},
				{
					rusSentence: 'Профессиональные спортсмены не всегда здоровы.',
					engSentences: [
						{
							engSentences: ['Professional sportsmen are not always healthy.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'всегда', engWord: 'always' },
						{ rusWord: 'здоровый', engWord: 'healthy' },
					],
				},
				{
					rusSentence: 'Открытая Россия — не политическая партия.',
					engSentences: [
						{
							engSentences: ['Open Russia is not a political party.'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Не стоит неопределённый артикль a перед political party. Его нужно поставить потому что подразумевается, что Открытая Россия не является одной из множества политических партий. Англичанам важно знать какое существительное перед ними: неопределённое или конкретное.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'открытый', engWord: 'open' },
						{ rusWord: 'Россия', engWord: 'Russia' },
						{ rusWord: 'политический', engWord: 'political' },
						{ rusWord: 'партия', engWord: 'party' },
					],
				},
				{
					rusSentence: 'Она не блондинка, а брюнетка.',
					engSentences: [{ engSentences: ['She\'s not blonde, she\'s brunette.'], isCorrect: true }],
					words: [
						{ rusWord: 'блондин', engWord: 'blonde' },
						{ rusWord: 'брюнет', engWord: 'brunette' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Чтобы задать вопрос глагол ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ставят перед подлежащим. В примере ниже ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' перелетает из позиции «после подлежащего» в «до подлежащего».',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-35530',
			cells: [
				{
					children: [{ type: 'customComponent', component: <ToBePresentPositiveScheme /> }],
				},
				{
					children: [{ type: 'customComponent', component: <ToBePresentQuestionScheme /> }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Примеры:' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не был напуган?' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Was' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I afraid?' },
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
					text: 'С тобой вчера было всё в порядке?',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Was' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' you alright yesterday?' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я совсем один?' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Am' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I completely alone?' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Сегодня пятница?' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Is' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' it Friday today?' },
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
					text: 'Хотя Friday — это существительное, но перед днями недели определяющее слово не ставится. И названия дней недели всегда с заглавной буквы.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Он счастливый?',
					engSentences: [
						{ engSentences: ['Is he happy?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В вопросе глагол to be ставится перед подлежащим.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'счастливый', engWord: 'happy' }],
				},
				{
					rusSentence: 'Интересно, он богат?',
					engSentences: [
						{ engSentences: ['I wonder, is he rich?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Rich',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' — это не существительное. Поэтому перед ним не нужно ставить неопределённый артикль.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'интересно', engWord: 'I wonder ' },
						{ rusWord: 'богат', engWord: 'rich' },
					],
				},
				{
					rusSentence: 'Вы готовы?',
					engSentences: [
						{ engSentences: ['Are you ready?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Напутан порядок слов. Из-за этого получилось вопрос типа «Готов — это ты?». Но даже так грамматически неверно.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'готов', engWord: 'ready' }],
				},
				{
					rusSentence: 'Они заняты?',
					engSentences: [
						{ engSentences: ['Are they busy?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В английском нельзя строить вопросы как в русском. Are должен стоять перед подлежащем. Тут же порядок как в повествовательном предложении, но стоит знак вопроса.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Am может стоять только если бы следом стояло местоимение I.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'занят', engWord: 'busy' }],
				},
				{
					rusSentence: 'Вас зовут Сергей?',
					engSentences: [
						{ engSentences: ['Are you Sergey?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед именами неопределённый артикль a не ставится. Ставьте перед неопределёнными существительными.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Форма глагола to be зависит от подлежащего, потому что в повествовательном оно стоит после него. И в вопросе перескакивает на место перед ним. После местоимения you будет использоваться to be в форме are.',
										},
									],
								},
							],
						},
					],
					words: [],
				},
				{
					rusSentence: 'Он хороший водопроводчик?',
					engSentences: [
						{ engSentences: ['Is he a good plumber?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед good plumber должен стоять один из определителей существительного.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В английском нельзя строить вопросы как в русском. ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' должен стоять перед подлежащем. Тут же порядок как в повествовательном предложении, но стоит знак вопроса.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'водопроводчик', engWord: 'a plumber' }],
				},
				{
					rusSentence: 'Он внутри?',
					engSentences: [
						{ engSentences: ['Is he inside?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'good plumber',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' должен стоять один из определителей существительного.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В английском нельзя строить вопросы как в русском. ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' должен стоять перед подлежащем. Тут же порядок как в повествовательном предложении, но стоит знак вопроса.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'водопроводчик', engWord: 'a plumber' }],
				},
				{
					rusSentence: 'Йога опасный спорт?',
					engSentences: [{ engSentences: ['Is yoga a dangerous sport?'], isCorrect: true }],
					words: [
						{ rusWord: 'йога', engWord: 'yoga' },
						{ rusWord: 'опасный', engWord: 'dangerous' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Будущее время' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В английском языке отсутствует отдельная форма глагола для выражения будущего времени, поэтому оно выражается через использование модального глагола ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (изъявлять волю).' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Когда мы хотим отрицать будущее время, отрицание применяется к самому глаголу ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', а не к глаголу ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Таким образом, мы объявляем отсутствие воли совершить действие, а затем указываем, к чему это отсутствие воли относится. Поэтому ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ставится после ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не буду счастливым.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I will ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be happy.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не буду счастливым.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I will ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be happy.' },
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Мы не будем вместе.',
					engSentences: [{ engSentences: ['We will not be together.'], isCorrect: true }],
					words: [],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'При вопросе ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' переносится в позицию «до подлежащего». А глагол ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' остается без изменений.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я буду счастливый?' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I be happy?' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я буду счастливый?' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I be happy?' },
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Эт',
					engSentences: [{ engSentences: ['The'], isCorrect: true }],
					words: [],
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
					text: 'Ответьте на вопросы чтобы проверить насколько хорошо поняли материал.',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Что означает окончания -',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'ing' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' и -',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'ed' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' в прилагательных?',
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
										text: 'ОТВЕТЬ!!!!',
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

// export default beNegativeAndQuestion
