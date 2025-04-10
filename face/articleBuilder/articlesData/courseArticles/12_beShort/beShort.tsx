import ArticleType from '../../articleType'

const beShort: ArticleType.Art = {
	meta: {
		number: 14,
		slug: 'be-short',
		caption: 'Глава 12',
		articleName: 'Сокращённая запись be и will',
		articleDescription:
			'Научимся использовать сокращённые формы глагола be и will. Это часто используется в повседневной речи.',
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
					text: 'До этого мы использовали полную запись глагола ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be и will' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
					text: 'I am... He is... They are not... You will be...',
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
					text: 'Но такой вариант в основном только используют в навигационных табличках, дорожных знаках, объявлениях, заголовках и прочих местах где надпись должна быть заметна и хорошо читаема.',
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
					text: 'В остальных случаях используют не полную, а сокращённую запись ',
				},
				{
					type: 'text',
					color: 'black',
					weight: 'bold',
					text: 'be, will и других глаголов, которые изучим далее',
				},
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Be в прошедшем' },
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
					text: 'У was/were сокращённая запись есть только при отрицании. Вместо not к was/were вплотую ставится ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ты не был болен.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'You ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(were not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' were' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' sick.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это было не просто.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(was not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' was' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' simply.' },
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
					text: 'Постарайтесь при переводе упражнений использовать сокращённый вариант.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Это было не легко.',
					engSentences: [{ engSentences: ['It was not easy.'], isCorrect: true }],
					words: [{ rusWord: 'легко', engWord: 'easy' }],
				},
				{
					rusSentence: 'Это не было близко.',
					engSentences: [{ engSentences: ['It was not nearby.'], isCorrect: true }],
					words: [{ rusWord: 'легко', engWord: 'easy' }],
				},
				{
					rusSentence: 'Он не был богатым и успешным человеком.',
					engSentences: [
						{
							engSentences: ['He was not a very rich and successful man.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'легко', engWord: 'easy' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Be в настоящем' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Утверждение' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Принцип прост: пробел и первую букву am/are/is заменяют на апостроф.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я уверенный человек.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(I am)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’m' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' a confident person.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Они инжерены.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(They are)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' They' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’re' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' engineers.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это восхитительно.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(It is)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' It' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' fascinating.' },
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
							text: 'Вместо местоимений можно подставлять другие части речи и сокращённая форма будет работать точно так же для них.',
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
							text: 'Моя мама учитель.',
						},

						{ type: 'text', color: 'black', weight: 'normal', text: 'My ' },
						{ type: 'text', color: 'gray', weight: 'normal', text: '(mum is)' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' mum' },
						{ type: 'text', color: 'blue', weight: 'normal', text: '\'s' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' a teacher.' },
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
							text: 'Вся еда на кухне.',
						},

						{ type: 'text', color: 'black', weight: 'normal', text: 'All the ' },
						{ type: 'text', color: 'gray', weight: 'normal', text: '(food is)' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' food' },
						{ type: 'text', color: 'blue', weight: 'normal', text: '\'s' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' in the kitchen' },
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
					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'На самом деле HTML не очень сложный язык.',
					engSentences: [
						{
							engSentences: ['Actually HTML is not so difficult language.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Вика нетерпеливая.',
					engSentences: [{ engSentences: ['Vicky is not patient.'], isCorrect: true }],
					words: [{ rusWord: 'терпеливый', engWord: 'patient' }],
				},
				{
					rusSentence: 'Он высокий.',
					engSentences: [
						{
							engSentences: ['He is tall.'],
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
											text: 'Вы правильно ответили, что по отношению к человеку используется tall, а не high. Говорят tall когда персонаж или предмет по высоте больше, чем по ширине. А high когда ширина больше высоты, но нужно сказать, что высота большая. Например «Высокий забор». Высота забора не может быть больше ширины. Но заборы бывают высокими.',
										},
									],
								},
							],
						},
						{
							engSentences: ['He is high.'],
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
											text: 'В русском языке слово «высокий» универсально. Но в английском есть несколько синонимов, которые используются в разных контекстах. ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Tall',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' используют когда персонаж или предмет по высоте больше, чем по ширине. А если ширина больше высоты, но нужно сказать, что высота большая, например Высокий забор, то применяют слово ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'high',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
											weight: 'normal',
											text: 'Сложно представить чтобы человек по высоте был меньше, чем по ширине, поэтому про высоких людей всегда говорят ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'tall',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
											weight: 'normal',
											text: 'Если это не знали, то ничего страшного. Мы тут ',
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
											text: ' изучали, а не тонкости английских прилагательных.',
										},
									],
								},
							],
						},
					],
					words: [
						{
							note: 'Применяется для персонажей или предметов которые по высоте больше, чем по ширине чтобы подчеркнуть высоту.',
							rusWord: 'высокий',
							engWord: 'tall',
						},
						{
							note: 'Применяется для персонажей или предметов которые по ширине больше, чем по высоте чтобы подчеркнуть высоту.',
							rusWord: 'высокий',
							engWord: 'high',
						},
					],
				},
				{
					rusSentence: 'Мы ответственные.',
					engSentences: [
						{ engSentences: ['We are responsible.'], isCorrect: true },
						{
							engSentences: ['We is responsible.'],
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
											text: 'Правильно использовать глагол to be в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'are',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' так как он ставится после местоимений ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'we',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' и прочих местоимений во втором лице.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'ответственные', engWord: 'responsible' }],
				},
				{
					rusSentence: 'Я очень голоден.',
					engSentences: [
						{ engSentences: ['I am very hungry.'], isCorrect: true },
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
											text: 'В русском предложении сообщается о свойстве персонажа. Поэтому в английском без вставки ',
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
											text: ' не обойтись.',
										},
									],
								},
							],
						},
					],
					words: [
						{
							note: 'Примечание к слову',
							rusWord: 'очень',
							engWord: 'very',
							transcription: 'ˈverɪ',
						},
						{ rusWord: 'голодный', engWord: 'hungry', transcription: 'ˈhʌŋɡrɪ' },
					],
				},
				{
					rusSentence: 'Алиса злая и напуганная.',
					engSentences: [{ engSentences: ['Alissa is angry and afraid.'], isCorrect: true }],
					words: [
						{
							note: 'Примечание к слову',
							rusWord: 'очень',
							engWord: 'very',
							transcription: 'ˈverɪ',
						},
						{ rusWord: 'голодный', engWord: 'hungry', transcription: 'ˈhʌŋɡrɪ' },
					],
				},
				{
					rusSentence: 'Я уверен, он тот же самый человек.',
					engSentences: [{ engSentences: ['I am sure he is the same person.'], isCorrect: true }],
					words: [
						{
							note: 'Примечание к слову',
							rusWord: 'очень',
							engWord: 'very',
							transcription: 'ˈverɪ',
						},
						{ rusWord: 'голодный', engWord: 'hungry', transcription: 'ˈhʌŋɡrɪ' },
					],
				},
				{
					rusSentence: 'Они здесь! Бэки и Том здесь!',
					engSentences: [
						{
							engSentences: ['They\'re here! Becky and Tom are here!'],
							isCorrect: true,
						},
					],
					words: [
						{
							note: 'Примечание к слову',
							rusWord: 'очень',
							engWord: 'very',
							transcription: 'ˈverɪ',
						},
						{ rusWord: 'голодный', engWord: 'hungry', transcription: 'ˈhʌŋɡrɪ' },
					],
				},
				{
					rusSentence: 'Она очень добрая и милая девушка.',
					engSentences: [
						{ engSentences: ['She’s a sweet girl, a kind girl.'], isCorrect: true },
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
											text: 'Правильно, но многословно. Так говорят если хотят подчернуть её хорошие качества.',
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
											text: 'После местоимения she должен стоять is, а не are.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'добрый', engWord: 'kind' },
						{ rusWord: 'милый', engWord: 'sweet' },
						{ rusWord: 'девушка', engWord: 'girl' },
					],
				},
				{
					rusSentence: 'Это Майк.',
					engSentences: [{ engSentences: ['He is Mike.'], isCorrect: true }],
					words: [],
				},
			],
			offset: true,
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
					text: 'Сокращённая запись с отрицанием. Тут отрицательная частица ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' сливается с be, а ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'o' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' в ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' заменяется на апостроф.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не совершенен.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(I am)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’m' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' not perfect.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Сокращённой формы ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'am not' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' нет. Тут сокращается только ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'I am' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Вы не взволнованы.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'You ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(are not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' are' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' worried.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это не секрет.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(is not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' a secret.' },
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
					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Глобальные решения недороги, но и не бесплатны.',
					engSentences: [
						{
							engSentences: ['Global solutions are not expensive, but they are not free, either.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Разве ты здесь несчастен?',
					engSentences: [{ engSentences: ['Aren’t you happy here?'], isCorrect: true }],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Те яблоки не для тебя.',
					engSentences: [{ engSentences: ['Those apples are not for you.'], isCorrect: true }],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Однако этого результата не достаточно.',
					engSentences: [{ engSentences: ['But this progress is not enough'], isCorrect: true }],
					words: [
						{ rusWord: 'однако', engWord: 'but' },
						{ rusWord: 'результат', engWord: 'progress' },
						{ rusWord: 'достаточно', engWord: 'enough' },
					],
				},
				{
					rusSentence: 'Виталий не умный.',
					engSentences: [{ engSentences: ['Vitaly is not smart.'], isCorrect: true }],
					words: [{ rusWord: 'умный', engWord: 'smart' }],
				},
				{
					rusSentence: 'Английский не мой родной язык.',
					engSentences: [{ engSentences: ['English is not my native language.'], isCorrect: true }],
					words: [{ rusWord: 'умный', engWord: 'smart' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Will' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Утверждение' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В сокращённой записи от ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' остаётся только ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '‘ll' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я буду королём.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(I will)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' I' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’ll' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be late.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Он будет наследником.' },

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(He will)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' He' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’ll' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be the heir.' },
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Другими словами, это будет действительно хорошим фильмом ужасов.',
					engSentences: [
						{
							engSentences: ['In other words, it will be a really good horror movie.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Они будут лучшими.',
					engSentences: [{ engSentences: ['They will be the best.'], isCorrect: true }],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'Это будет великолепно!',
					engSentences: [{ engSentences: ['That will be awesome!'], isCorrect: true }],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'Will not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' сокращается до ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'won’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я не опоздаю.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(will not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' wo' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be late.' },
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
					text: 'Таня не скоро будет там.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'Tanya ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(will not)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' wo' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'n’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' be there soon.' },
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
					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
			id: 4,
			exercises: [
				{
					rusSentence: 'Я не буду счастлив.',
					engSentences: [{ engSentences: ['I will not be happy.'], isCorrect: true }],
					words: [{ rusWord: 'дикарь', engWord: 'a savage', transcription: 'ə ˈsævɪdʒ' }],
				},
				{
					rusSentence: 'После размолвки они останутся друзьями.',
					engSentences: [
						{
							engSentences: ['They will be friends after their disagreement.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'друг', engWord: 'friend' },
						{ rusWord: 'после', engWord: 'after' },
						{ rusWord: 'разлад', engWord: 'disagreement' },
					],
				},
				{
					rusSentence: 'Суббота не будте прекрасным днём.',
					engSentences: [{ engSentences: ['Saturday will not be a nice day.'], isCorrect: true }],
					words: [
						{ rusWord: 'друг', engWord: 'friend' },
						{ rusWord: 'после', engWord: 'after' },
						{ rusWord: 'разлад', engWord: 'disagreement' },
					],
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
					text: 'Сокращённая форма и слово до него сливаются вместе и на письме и в речи. И для некоторых слов она не уместна потому что сказать такое сочитание звуков затруднительно. Например сочитание guys и are. Сокращение guys’re правильное, но в реальном разговоре такого избегают.',
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
					text: 'Hey, these guys are professionals.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'Hey, these ' },
				{ type: 'text', color: 'error', weight: 'normal', text: 'guys’re' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' professionals.' },
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
					text: 'В будущих главая будет использоваться полная форма чтобы вас не запутывать.',
				},
			],
		},
	],
}

export default beShort
