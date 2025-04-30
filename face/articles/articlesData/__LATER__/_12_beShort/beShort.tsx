// import ArticleType from '../../articleType'

/*const beShort: ArticleType.Art = {
	meta: {
		number: 14,
		slug: 'be-short',
		caption: 'Глава 12',
		articleName: 'Сокращённая запись be и will',
		articleDescription:
			'Научимся использовать сокращённые формы глагола be и will. Это часто используется в повседневной речи.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',

					text: 'До этого мы использовали полную запись глагола ',
				},
				{ type: 'text',  weight: 'bold', text: 'be и will' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'I am... He is... They are not... You will be...',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',

					text: 'Но такой вариант в основном только используют в навигационных табличках, дорожных знаках, объявлениях, заголовках и прочих местах где надпись должна быть заметна и хорошо читаема.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',

					text: 'В остальных случаях используют не полную, а сокращённую запись ',
				},
				{
					type: 'text',

					weight: 'bold',
					text: 'be, will и других глаголов, которые изучим далее',
				},
				{ type: 'text',  text: '.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Be в прошедшем' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',

					text: 'У was/were сокращённая запись есть только при отрицании. Вместо not к was/were вплотую ставится ',
				},
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Ты не был болен.' },

				{ type: 'text',  text: 'You ' },
				{ type: 'text', color: 'gray', text: '(were not)' },
				{ type: 'text',  text: ' were' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' sick.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это было не просто.' },

				{ type: 'text',  text: 'It ' },
				{ type: 'text', color: 'gray', text: '(was not)' },
				{ type: 'text',  text: ' was' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' simply.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',

					text: 'Постарайтесь при переводе упражнений использовать сокращённый вариант.',
				},
			],
		},
		{
			type: 'exercises',
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
			children: [
				{
					type: 'text',

					text: 'Принцип прост: пробел и первую букву am/are/is заменяют на апостроф.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я уверенный человек.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(I am)' },
				{ type: 'text',  text: ' I' },
				{ type: 'text', color: 'blue', text: '’m' },
				{ type: 'text',  text: ' a confident person.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они инжерены.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(They are)' },
				{ type: 'text',  text: ' They' },
				{ type: 'text', color: 'blue', text: '’re' },
				{ type: 'text',  text: ' engineers.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это восхитительно.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(It is)' },
				{ type: 'text',  text: ' It' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' fascinating.' },
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

							text: 'Вместо местоимений можно подставлять другие части речи и сокращённая форма будет работать точно так же для них.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Моя мама учитель.',
						},

						{ type: 'text',  text: 'My ' },
						{ type: 'text', color: 'gray', text: '(mum is)' },
						{ type: 'text',  text: ' mum' },
						{ type: 'text', color: 'blue', text: "'s" },
						{ type: 'text',  text: ' a teacher.' },
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Вся еда на кухне.',
						},

						{ type: 'text',  text: 'All the ' },
						{ type: 'text', color: 'gray', text: '(food is)' },
						{ type: 'text',  text: ' food' },
						{ type: 'text', color: 'blue', text: "'s" },
						{ type: 'text',  text: ' in the kitchen' },
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

					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'В русском языке слово «высокий» универсально. Но в английском есть несколько синонимов, которые используются в разных контекстах. ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'Tall',
										},
										{
											type: 'text',

											text: ' используют когда персонаж или предмет по высоте больше, чем по ширине. А если ширина больше высоты, но нужно сказать, что высота большая, например Высокий забор, то применяют слово ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'high',
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

											text: 'Сложно представить чтобы человек по высоте был меньше, чем по ширине, поэтому про высоких людей всегда говорят ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'tall',
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

											text: 'Если это не знали, то ничего страшного. Мы тут ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Правильно использовать глагол to be в форме ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'are',
										},
										{
											type: 'text',

											text: ' так как он ставится после местоимений ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'we',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'В русском предложении сообщается о свойстве персонажа. Поэтому в английском без вставки ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

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
							engSentences: ["They're here! Becky and Tom are here!"],
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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Сокращённая запись с отрицанием. Тут отрицательная частица ',
				},
				{ type: 'text',  weight: 'bold', text: 'not' },
				{ type: 'text',  text: ' сливается с be, а ' },
				{ type: 'text', color: 'blue', text: 'o' },
				{ type: 'text',  text: ' в ' },
				{ type: 'text', color: 'blue', text: 'not' },
				{
					type: 'text',

					text: ' заменяется на апостроф.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я не совершенен.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(I am)' },
				{ type: 'text',  text: ' I' },
				{ type: 'text', color: 'blue', text: '’m' },
				{ type: 'text',  text: ' not perfect.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', text: 'Сокращённой формы ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'am not' },
				{
					type: 'text',
					color: 'gray',

					text: ' нет. Тут сокращается только ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'I am' },
				{ type: 'text', color: 'gray', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Вы не взволнованы.' },

				{ type: 'text',  text: 'You ' },
				{ type: 'text', color: 'gray', text: '(are not)' },
				{ type: 'text',  text: ' are' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' worried.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это не секрет.' },

				{ type: 'text',  text: 'It ' },
				{ type: 'text', color: 'gray', text: '(is not)' },
				{ type: 'text',  text: ' is' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' a secret.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
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

			children: [
				{
					type: 'text',

					text: 'В сокращённой записи от ',
				},
				{ type: 'text',  weight: 'bold', text: 'will' },
				{ type: 'text',  text: ' остаётся только ' },
				{ type: 'text', color: 'blue', text: '‘ll' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я буду королём.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(I will)' },
				{ type: 'text',  text: ' I' },
				{ type: 'text', color: 'blue', text: '’ll' },
				{ type: 'text',  text: ' be late.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Он будет наследником.' },

				{ type: 'text',  text: '' },
				{ type: 'text', color: 'gray', text: '(He will)' },
				{ type: 'text',  text: ' He' },
				{ type: 'text', color: 'blue', text: '’ll' },
				{ type: 'text',  text: ' be the heir.' },
			],
		},
		{
			type: 'exercises',
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

			children: [
				{ type: 'text',  weight: 'bold', text: 'Will not' },
				{ type: 'text',  text: ' сокращается до ' },
				{ type: 'text', color: 'blue', text: 'won’t' },
				{ type: 'text',  text: ':' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я не опоздаю.' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'gray', text: '(will not)' },
				{ type: 'text',  text: ' wo' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' be late.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Таня не скоро будет там.',
				},

				{ type: 'text',  text: 'Tanya ' },
				{ type: 'text', color: 'gray', text: '(will not)' },
				{ type: 'text',  text: ' wo' },
				{ type: 'text', color: 'blue', text: 'n’t' },
				{ type: 'text',  text: ' be there soon.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'При выполнении упражнения постарайтесь использовать сокращённую форму.',
				},
			],
		},
		{
			type: 'exercises',
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

			children: [
				{
					type: 'text',

					text: 'Сокращённая форма и слово до него сливаются вместе и на письме и в речи. И для некоторых слов она не уместна потому что сказать такое сочитание звуков затруднительно. Например сочитание guys и are. Сокращение guys’re правильное, но в реальном разговоре такого избегают.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Hey, these guys are professionals.',
				},

				{ type: 'text',  text: 'Hey, these ' },
				{ type: 'text', color: 'error', text: 'guys’re' },
				{ type: 'text',  text: ' professionals.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В будущих главая будет использоваться полная форма чтобы вас не запутывать.',
				},
			],
		},
	],
}*/

// export default beShort
