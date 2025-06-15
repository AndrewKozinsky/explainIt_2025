import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
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
							children: [
								{
									type: 'text',
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
			rusSentence: 'Он счастливый?',
			engSentences: [
				{ engSentences: ['Is he happy?'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
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
			rusSentence: 'Они заняты?',
			engSentences: [
				{ engSentences: ['Are they busy?'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
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
			rusSentence: 'Оля не популярная певица.',
			engSentences: [
				{ engSentences: ['Olya is not a popular singer.'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
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
			rusSentence: 'Я не ребенок, мне 44 года.',
			engSentences: [{ engSentences: ['I am not a child I am 44.'], isCorrect: true }],
			words: [
				{ rusWord: 'ребёнок', engWord: 'child' },
				{ rusWord: '44 года', engWord: '44 years old' },
			],
		},
		{
			rusSentence: 'Я не ребёнок, я замужняя женщина.',
			engSentences: [
				{
					engSentences: ['I am not a child, I am a married woman.', 'I am not a kid, I am a married woman.'],
					isCorrect: true,
				},
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
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
			rusSentence: 'Семинар — это не простое обсуждение.',
			engSentences: [
				{
					engSentences: ['The workshop is not a simple discussion.'],
					isCorrect: true,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
									text: 'Перед Workshop требуется поставить определитель существительног. Тут подходит или ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: ' или ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'the',
								},
								{
									type: 'text',
									text: '. Какой выбрать?',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'семинар', engWord: 'workshop' },
				{ rusWord: 'простой', engWord: 'simple' },
				{ rusWord: 'обсуждение', engWord: 'a discussion' },
			],
		},
		{
			rusSentence: 'Он не болен.',
			engSentences: [{ engSentences: ['He isn’t sick.'], isCorrect: true }],
			words: [{ rusWord: 'болен', engWord: 'sick' }],
		},
		{
			// TODO
			rusSentence: 'Я не уставший.',
			engSentences: [{ engSentences: ['I am not tired.'], isCorrect: true }],
			words: [{ rusWord: 'болен', engWord: 'sick' }],
		},
		{
			// TODO
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
							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
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
			rusSentence: 'Приведений не существует.',
			engSentences: [{ engSentences: ['Ghosts are not real.'], isCorrect: true }],
			words: [
				{ rusWord: 'приведение', engWord: 'a ghost' },
				{ rusWord: 'настоящий', engWord: 'real' },
			],
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

							children: [
								{
									type: 'text',
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
							children: [
								{
									type: 'text',
									text: 'В английском нельзя строить вопросы как в русском. ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'Is',
								},
								{
									type: 'text',
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
			rusSentence: 'Профессиональные спортсмены не всегда здоровы.',
			engSentences: [
				{
					engSentences: ['Professional sportsmen are not always healthy.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'профессиональный', engWord: 'professional' },
				{ rusWord: 'спортсмен', engWord: 'sportsmen' },
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'здоровый', engWord: 'healthy' },
			],
		},
		{
			// TODO
			rusSentence: 'Он внутри?',
			engSentences: [
				{ engSentences: ['Is he inside?'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',

									text: 'Перед ',
								},
								{
									type: 'text',
									color: 'blue',

									text: 'good plumber',
								},
								{
									type: 'text',

									text: ' должен стоять один из определителей существительного.',
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
		{
			// TODO
			rusSentence: 'Это дети.',
			engSentences: [{ engSentences: ['They are children.'], isCorrect: true }],
			words: [
				{ rusWord: 'йога', engWord: 'yoga' },
				{ rusWord: 'опасный', engWord: 'dangerous' },
			],
		},
		{
			rusSentence: 'Это очень забавно?',
			engSentences: [{ engSentences: ['Is it very funny?'], isCorrect: true }],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'забавно', engWord: 'funny' },
			],
		},
		{
			// TODO
			rusSentence: 'Это маскарадный костюм?',
			engSentences: [{ engSentences: ['Is it fancy dress?'], isCorrect: true }],
			words: [
				{ rusWord: 'йога', engWord: 'yoga' },
				{ rusWord: 'опасный', engWord: 'dangerous' },
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
							children: [
								{
									type: 'text',
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
	],
}

export default exercises_1
