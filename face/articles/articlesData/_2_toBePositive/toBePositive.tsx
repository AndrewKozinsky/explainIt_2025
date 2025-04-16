// import ArticleType from '../../articleType'
// import ToBePresentTable from './ToBePresentTable'
// import ToBePastTable from './ToBePastTable'
// import ToBeFutureTable from './ToBeFutureTable'

/*const toBePositive: ArticleType.Art = {
	meta: {
		number: 4,
		slug: 'to-be-positive',
		caption: 'Глава 2',
		articleName: 'Глагол be',
		articleDescription: 'Глагол be используется для описания состояния, местоположения или принадлежности.',

	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'В настоящем времени' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Давайте попробуем дословно перевести следующие предложения:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я космонавт.' },

				{ type: 'text',  text: 'I spaceman.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они клоуны.' },

				{ type: 'text',  text: 'They clowns.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это щенок.' },

				{ type: 'text',  text: 'It puppy.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Предложение на английском языке должно содержать в себе как минимум подлежащее и сказуемое. ',
				},
				{ type: 'text',  weight: 'bold', text: 'Подлежащее' },
				{
					type: 'text',

					text: ' — это объект совершающий действие. Он может быть выражен местоимением, именем, существительным. А ',
				},
				{ type: 'text',  weight: 'bold', text: 'сказуемое' },
				{
					type: 'text',

					text: ' — это само действие. Выражается глаголом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В предложениях выше подлежащие в виде местоимения. Но в моих переводах нет сказуемого, то есть самого действия. Когда-то давно в русском языке оно ставилось. На современный манер звучало бы как «',
				},
				{ type: 'text', color: 'blue', text: 'есть' },
				{
					type: 'text',

					text: '». В болгарском оно существует до сих пор. И в английском тоже. Это глагол ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text',  text: '. Поставлю в перевод:' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' космонавт.' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text',  text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' клоуны.' },

				{ type: 'text',  text: 'They ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text',  text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' щенок.' },

				{ type: 'text',  text: 'It ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text',  text: ' puppy.' },
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

							text: 'Иногда и в современном русском языке явно используем глагол «есть» в разных видах:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Незаконным ' },
						{ type: 'text', color: 'blue', text: 'является' },
						{
							type: 'text',

							text: ' способ получения этих средств.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Что вы из себя ' },
						{ type: 'text', color: 'blue', text: 'представляете' },
						{ type: 'text',  text: '?' },
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Там ' },
						{ type: 'text', color: 'blue', text: 'есть' },
						{ type: 'text',  text: ' стол.' },
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [
						{
							type: 'text',

							text: 'Тире также аналог слова «есть»:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Борис ' },
						{ type: 'text', color: 'blue', text: '—' },
						{
							type: 'text',

							text: ' сильный мужчина.',
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

					text: 'Английские глаголы могут находиться в одной из трёх форм:',
				},
			],
		},
		{
			type: 'list',
			listType: 'numbers',
			children: [
				{
					type: 'paragraph',

					children: [
						{ type: 'text',  text: 'В ' },
						{ type: 'text',  weight: 'bold', text: 'неопределённой' },
						{
							type: 'text',

							text: ' форме (инфинитиве). Это глагол отвечающий на вопрос «что делать?». Это действие в чистом виде по которому нельзя сказать о времени. Глагол «есть» в неопределённой форме будет ',
						},
						{ type: 'text', color: 'blue', text: 'be' },
						{
							type: 'text',

							text: '. Как я и поставил.',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{ type: 'text',  text: 'В форме ' },
						{ type: 'text',  weight: 'bold', text: 'настоящего' },
						{ type: 'text',  text: ' времени.' },
					],
				},
				{
					type: 'paragraph',

					children: [
						{ type: 'text',  text: 'В форме ' },
						{ type: 'text',  weight: 'bold', text: 'прошедшего' },
						{ type: 'text',  text: ' времени.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  text: 'Форма глагола ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',

					text: ' в настоящем времени зависит от лица подлежащего.',
				},
			],
		},
		{ type: 'customComponent', component: <ToBePresentTable /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Сказуемое всегда должно показывать время совершения действия. Давайте ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',

					text: ' переделаем в форму настоящего времени.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' космонавт.' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text',  text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' клоуны.' },

				{ type: 'text',  text: 'They ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text',  text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text',  text: ' щенок.' },

				{ type: 'text',  text: 'It ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text',  text: ' puppy.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Последним шагом перед существительными в единственном числе поставлю неопределённый артикль ',
				},
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',

					text: '. Его назначение будет объяснено в в одной из следующих глав. ',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я космонавт.' },

				{ type: 'text',  text: 'I am ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они клоуны.' },

				{ type: 'text',  text: 'They are clowns.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это щенок.' },

				{ type: 'text',  text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' puppy.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Чтобы закрепить новые значения выполните упражнения на перевод.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Это книга.',
					engSentences: [
						{ engSentences: ['It is a book.'], isCorrect: true },
						{
							engSentences: ['It a book.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'В предложении сообщается чем является подлежащее «Это». Поэтому после него ставиться to be в одной из своих форм зависящей от лица подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is the book.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Книга упоминается в первый раз. Поэтому существительное «книга» будет в значении «одна из книг». Чтобы это показать поставьте неопределённый артикль ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',

											text: ' вместо ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'the',
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
					words: [{ rusWord: 'книга', engWord: 'book' }],
				},
				{
					rusSentence: 'Я строитель',
					engSentences: [
						{ engSentences: ['I am a builder.'], isCorrect: true },
						{
							engSentences: ['I am builder.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Перед существительными в единственном числе нужно ставить артикль ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',

											text: '. Подробнее о его назначении будет рассказано в следующей главе.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'строитель', engWord: 'builder' }],
				},
				{
					rusSentence: 'Это журнал.',
					engSentences: [
						{ engSentences: ['It is a magazine.'], isCorrect: true },
						{
							engSentences: ['It are a magazine.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'После ',
										},
										{
											type: 'text',
											color: 'gold',

											text: 'it',
										},
										{
											type: 'text',

											text: ' ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'be',
										},
										{
											type: 'text',

											text: ' будет в форме ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is',
										},
										{
											type: 'text',

											text: '. Are ставится только после подлежащего второго лица.',
										},
									],
								},
							],
						},
						{
							engSentences: ['They are a magazine.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'They обозначает «они». А в предложении сказано «Это». Поэтому должно быть ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'it',
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
					words: [{ rusWord: 'журнал', engWord: 'magazine' }],
				},
				{
					rusSentence: 'Он учитель.',
					engSentences: [
						{ engSentences: ['He is a teacher.'], isCorrect: true },
						{
							engSentences: ['He teacher.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'В этом предложении сообщается о профессии человека, кем он является. В английском чтобы сообщить и каким является персонаж и кем/чем нужно использовать to be в форме зависящей от лица подлежащего. «Он» — это третье лицо, поэтому to be будет в форме is.',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'Ещё перед любым существительным англоговорящие ставят определяющее слово каким оно является: определённым или неопределённым. Определённые существительные обозначают точный предмет известный собеседнику. А неопределённые любой предмет из класса таких же предметов. В русском предложении говорится о профессии персонажа: он один из учителей. Поэтому существительное будет неопределённым. А чтобы это обозначить перед ним ставится неопределённый артикль a.',
										},
									],
								},
							],
						},
						{
							engSentences: ['He a teacher.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'В этом предложении сообщается о профессии человека, кем он является. В английском чтобы сообщить и каким является персонаж и кем/чем нужно использовать to be в форме зависящей от лица подлежащего. «Он» — это третье лицо, поэтому to be будет в форме is.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'учитель', engWord: 'teacher' }],
				},
				{
					rusSentence: 'Это телефон.',
					engSentences: [
						{ engSentences: ['It is a phone.'], isCorrect: true },
						{
							engSentences: ['It is an phone.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'An используется если следом идёт слово начинающееся на гласную. А phone и на письме и вербально начинается на согласную ph.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It are phone.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',
											color: 'blue',

											text: 'It',
										},
										{
											type: 'text',

											text: ' — это местоимение третьего лица. Поэтому после него должен стоять ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is',
										},
										{
											type: 'text',

											text: '. И перед существительным не написан неопределённый артикль ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',

											text: ' потому что сообщается, что это один из множества старых телефонов, не не какой-то конкретный.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'телефон', engWord: 'phone' }],
				},
				{
					rusSentence: 'Павел студент.',
					engSentences: [
						{ engSentences: ['Pavel is a student.'], isCorrect: true },
						{
							engSentences: ['Pavel be student.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Павел является студентом. Тут правильно использован ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: '. Но ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' в чистом виде используется в других типах предложений. Тут ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: '?',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
						{
							engSentences: ['Pavel is student.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Перед существительными ставится один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
					words: [{ rusWord: 'студент', engWord: 'student' }],
				},
				{
					rusSentence: 'Это дверь.',
					engSentences: [
						{ engSentences: ['It is a door.'], isCorrect: true },
						{
							engSentences: ['Pavel be student.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Павел является студентом. Тут правильно использован ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: '. Но ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' в чистом виде используется в других типах предложений. Тут ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: '?',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
					words: [{ rusWord: 'дверь', engWord: 'door' }],
				},
				{
					rusSentence: 'Они всё ещё дети.',
					engSentences: [{ engSentences: ['They are still children.'], isCorrect: true }],
					words: [
						{ rusWord: 'они', engWord: 'they' },
						{ rusWord: 'всё ещё', engWord: 'still' },
						{ rusWord: 'дети', engWord: 'children' },
					],
				},
				{
					rusSentence: 'Эйприл Фокс танцовщица.',
					engSentences: [{ engSentences: ['April Fox is a dancer.'], isCorrect: true }],
					words: [{ rusWord: 'танцор/танцовщица', engWord: 'dancer' }],
				},
				{
					rusSentence: 'Просто представь себе они уже капитаны!',
					engSentences: [
						{
							engSentences: [
								'Just imagine they are captains already!',
								'Just imagine! They are captains already!',
							],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'просто представь', engWord: 'just imagine' },
						{ rusWord: 'капитаны', engWord: 'captains' },
						{ rusWord: 'уже', engWord: 'already' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'В прошедшем' },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',  text: 'Глагол ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',

					text: ' в прошедшем времени тоже зависит от лица подлежащего. Только тут две формы, а не три как в настоящем времени.',
				},
			],
		},
		/!*{ type: 'customComponent', component: <ToBePastTable /> },*!/
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В русском языке глагол «есть» уже явно присутствует в прошедшем времени в виде формы «был/была/было/были».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text',  text: ' космонавтом.' },
				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'was' },
				{ type: 'text',  text: ' a spaceman.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они ' },
				{ type: 'text', color: 'blue', text: 'были' },
				{ type: 'text',  text: ' клоунами.' },

				{ type: 'text',  text: 'They ' },
				{ type: 'text', color: 'blue', text: 'were' },
				{ type: 'text',  text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Он ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text',  text: ' щенком.' },

				{ type: 'text',   text: 'It ' },
				{ type: 'text', color: 'blue',  text: 'was' },
				{ type: 'text',   text: ' a puppy.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Предложение «Это был щенком» на русском звучит неестественно. Поэтому заменил на «он». Но в английском всё равно будет переводиться через it потому что he и she используются как местоимения для людей. Животные и неодушевлённые предметы называются через it.',
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
						{ type: 'text', color: 'blue',  text: 'Was' },
						{
							type: 'text',

							text: ' ставится перед подлежащим единственного числа, а ',
						},
						{ type: 'text', color: 'blue',  text: 'were' },
						{
							type: 'text',

							text: ' множественного. Как и в русском для единственного говорим «был», а для множественного «были». Даже по количеству букв слова совпадают.',
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

					text: 'Попробуйте перевести предложения в прошедшем времени.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Она была врачом.',
					engSentences: [{ engSentences: ['She was a doctor.'], isCorrect: true }],
					words: [{ rusWord: 'врач', engWord: 'doctor' }],
				},
				{
					rusSentence: 'Он был слесарем.',
					engSentences: [{ engSentences: ['He was a mechanic.'], isCorrect: true }],
					words: [{ rusWord: 'слесарь', engWord: 'mechanic' }],
				},
				{
					rusSentence: 'В то время я был ученым.',
					engSentences: [{ engSentences: ['At that time, I was a scientist.'], isCorrect: true }],
					words: [
						{ rusWord: 'в то время', engWord: 'at that time' },
						{ rusWord: 'ученый', engWord: 'scientist' },
					],
				},
				{
					rusSentence: 'Они были детьми.',
					engSentences: [{ engSentences: ['They were children.'], isCorrect: true }],
					words: [{ rusWord: 'дети', engWord: 'children' }],
				},
				{
					rusSentence: 'Это было испытанием.',
					engSentences: [{ engSentences: ['It was a challenge.'], isCorrect: true }],
					words: [{ rusWord: 'испытание', engWord: 'challenge' }],
				},
				{
					rusSentence: 'Я был ребёнком в глубине души.',
					engSentences: [{ engSentences: ['I was a child at heart.'], isCorrect: true }],
					words: [
						{ rusWord: 'ребёнок', engWord: 'child' },
						{
							note: 'Буквально переводится «в сердце»',
							rusWord: 'в глубине души',
							engWord: 'at heart',
						},
					],
				},
				{
					rusSentence: 'Он был совершенно один.',
					engSentences: [{ engSentences: ['He was completely alone.'], isCorrect: true }],
					words: [
						{ rusWord: 'совершенно', engWord: 'completely' },
						{
							note: 'В значении «быть в одиночестве», а не число 1.',
							rusWord: 'один',
							engWord: 'alone',
						},
					],
				},
				{
					rusSentence: 'Она была профессионалом.',
					engSentences: [
						{ engSentences: ['She was a professional.'], isCorrect: true },
						{
							engSentences: ['She was professional.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Перед существительными в единственном числе нужно ставить артикль ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'a',
										},
										{
											type: 'text',

											text: '. Подробнее о его назначении будет рассказано в следующей главе.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'профессионал', engWord: 'professional' }],
				},
				{
					rusSentence: 'Я был трудоголиком в лучшие времена.',
					engSentences: [
						{
							engSentences: ['I was a workaholic in the best of times.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'трудоголик', engWord: 'workaholic' },
						{ rusWord: 'в лучшие времена', engWord: 'in the best of times' },
					],
				},
				{
					rusSentence: 'Они были строителями днём, и грабителями ночью.',
					engSentences: [
						{
							engSentences: ['They were builders at day and robbers at night.'],
							isCorrect: true,
						},
						{
							engSentences: ['They were builders by day and robbers by night.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Предложение составлено правильно за исключением предлогов ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'by',
										},
										{
											type: 'text',

											text: '. Предлог ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'by',
										},
										{
											type: 'text',

											text: ' употребляется когда указывают время ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'до которого ',
										},
										{
											type: 'text',

											text: 'событие произошло или произойдёт.',
										},
									],
								},
								{
									type: 'paragraph',

									textSize: 'big',
									children: [
										{
											type: 'text',

											text: 'Он уйдёт к утру',
										},
										{
											type: 'text',
											color: 'gray',

											text: ' (утром его уже не будет)',
										},
										{
											type: 'text',

											text: '.',
										},

										{
											type: 'text',

											text: 'He will go by morning.',
										},
									],
								},
								{
									type: 'paragraph',
									offset: true,

									children: [
										{
											type: 'text',

											text: 'А у нас указывается время когда событие произойдёт. Тут лучше подходить предлог at.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'строители', engWord: 'builders' },
						{ rusWord: 'грабители', engWord: 'robbers' },
						{ rusWord: 'днём', engWord: 'at day' },
						{ rusWord: 'ночью', engWord: 'at night' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'В будущем' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Английские глаголы не имеет формы будущего времени. Поэтому предложения строят в форме настоящего времени, но применяют некоторые средства чтобы указать на будущие действия. Одно из них — ',
				},
				{ type: 'text', color: 'blue',  text: 'модальный глагол will' },
				{ type: 'text',   text: '.' },
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
							color: 'gold',

							text: 'Смысловые глаголы',
						},
						{
							type: 'text',

							text: ' выражают действие (летать, прыгать, падать), а ',
						},
						{ type: 'text', color: 'blue',  text: 'модальные' },
						{
							type: 'text',

							text: ' выражают отношение к действию (могу, буду, должен).',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'giant',
					children: [
						{ type: 'text',   text: 'Я ' },
						{ type: 'text', color: 'blue',  text: 'могу' },
						{ type: 'text',   text: ' ' },
						{ type: 'text', color: 'gold',  text: 'летать' },
						{ type: 'text',   text: '.' },
					],
				},
				{
					type: 'paragraph',

					textSize: 'giant',
					children: [
						{ type: 'text',   text: 'Я ' },
						{ type: 'text', color: 'blue',  text: 'буду' },
						{ type: 'text',   text: ' ' },
						{ type: 'text', color: 'gold',  text: 'прыгать' },
						{ type: 'text',   text: '.' },
					],
				},
				{
					type: 'paragraph',

					textSize: 'giant',
					children: [
						{ type: 'text',   text: 'Я ' },
						{ type: 'text', color: 'blue',  text: 'должен' },
						{ type: 'text',   text: ' ' },
						{ type: 'text', color: 'gold',  text: 'взобраться' },
						{ type: 'text',   text: '.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'Модальный глагол ' },
				{ type: 'text', color: 'blue',  text: 'will' },
				{
					type: 'text',

					text: ' означает «изволить что-то сделать».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Переведу предложение:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я буду космонавтом.' },

				{ type: 'text',   text: 'I ' },
				{ type: 'text', color: 'blue',  text: 'will' },
				{ type: 'text',   text: ' ' },
				{ type: 'text', color: 'gold',  text: 'be' },
				{ type: 'text',   text: ' a spaceman.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Сказуемое тут — это глагол ',
				},
				{ type: 'text', color: 'gold',  text: 'will' },
				{
					type: 'text',

					text: '. Сказуемое всегда должно стоять во временной форме, вы это уже видели при разборе предложений в настоящем и прошедшем времени. Так как предложение в настоящем времени, то will будет в форме настоящего времени. И дальше должно идти действие, которе я изволяю совершить: ',
				},
				{ type: 'text', color: 'gold',  text: 'бытие' },
				{
					type: 'text',

					text: '. Это дополнение. Дословно можно перевести как «Я ',
				},
				{ type: 'text', color: 'blue',  text: 'изволю' },
				{ type: 'text',   text: ' ' },
				{ type: 'text', color: 'gold',  text: 'быть' },
				{
					type: 'text',

					text: ' космонавтом». На дополнение не ложится нагрузка времени, поэтому оно стоит в инфинитивной форме ',
				},
				{ type: 'text', color: 'gold',  text: 'be' },
				{ type: 'text',   text: '.' },
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

							text: 'В русском языке тоже после модального глагола стоит глагол в неопределённой форме.',
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

					text: 'Формула будущего действия самая простая.',
				},
			],
		},
		/!*{ type: 'customComponent', component: <ToBeFutureTable /> },*!/
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Попробуйте перевести предложения в будущем времени.',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Мы скоро будем готовы.',
					engSentences: [{ engSentences: ['We will be ready soon.'], isCorrect: true }],
					words: [
						{ rusWord: 'готовый', engWord: 'ready' },
						{ rusWord: 'скоро', engWord: 'soon' },
					],
				},
				{
					rusSentence: 'Скоро я буду дома.',
					engSentences: [{ engSentences: ['I will be home soon.'], isCorrect: true }],
					words: [
						{ rusWord: 'дом', engWord: 'home' },
						{ rusWord: 'скоро', engWord: 'soon' },
					],
				},
				{
					rusSentence: 'Однажды он станет врачом.',
					engSentences: [
						{ engSentences: ['He will be a doctor one day.'], isCorrect: true },
						{ engSentences: ['One day he will be a doctor.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'однажды', engWord: 'one day' },
						{ rusWord: 'врач', engWord: 'doctor' },
					],
				},
				{
					rusSentence: 'Завтра будет новый день.',
					engSentences: [
						{ engSentences: ['Tomorrow will be a new day.'], isCorrect: true },
						{ engSentences: ['A new day will be tomorrow.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'завтра', engWord: 'tomorrow' },
						{ rusWord: 'новый', engWord: 'new' },
						{ rusWord: 'день', engWord: 'day' },
					],
				},
				{
					rusSentence: 'Он будет лидером команды.',
					engSentences: [{ engSentences: ['He will be a team leader.'], isCorrect: true }],
					words: [{ rusWord: 'лидер команды', engWord: 'team leader' }],
				},
				{
					rusSentence: 'Я буду одновременно продавцом и кассиром.',
					engSentences: [
						{
							engSentences: ['I will be a salesman and a cashier at the same time.'],
							isCorrect: true,
						},
						{
							engSentences: ['At the same time I will be a salesman and a cashier.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'одновременно', engWord: 'at the same time' },
						{ rusWord: 'продавец', engWord: 'salesman' },
						{ rusWord: 'кассир', engWord: 'cashier' },
					],
				},
				{
					rusSentence: 'Я лягушка, но ночью буду принцессой.',
					engSentences: [
						{
							engSentences: ['I am a frog, but I will be a princess tonight.'],
							isCorrect: true,
						},
						{
							engSentences: ['I am a frog, but I will be a princess at night.'],
							isCorrect: true,
						},
						{
							engSentences: ['I am a frog, but at night I will be a princess.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'лягушка', engWord: 'frog' },
						{ rusWord: 'принцесса', engWord: 'princess' },
						{ rusWord: 'ночью', engWord: 'at night' },
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

					text: 'Ответьте на вопросы чтобы убедиться, что правильно поняли материал.',
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

										text: 'Что такое подлежащее и сказуемое?',
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

										weight: 'bold',
										text: 'Подлежащее',
									},
									{
										type: 'text',

										text: ' — это член предложения обозначающий объект совершающий действие. Мы пока изучили личные местоимения, но подлежащим может быть существительное, имя.',
									},
								],
							},
							{
								type: 'paragraph',
								offset: true,

								children: [
									{
										type: 'text',

										weight: 'bold',
										text: 'Сказуемое',
									},
									{
										type: 'text',

										text: ' — это член предложения обозначающий действие совершаемое подлежащим. Выражается глаголом. Так как в английском предложении всегда должно быть явно обозначено действие, то в таких предложениях где на русском мы указываем свойство объекта, и глагол обычно не ставится, в английском явно есть глагол ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

										text: ' в одной из временных форм: am, are, is, was, were или be после will для выражения будущего времени.',
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

										text: 'Почему в заголовке главы говорится про ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

										text: ', но в предложениях почему-то используется am, are, is, was и were?',
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

										text: 'Be — это неопределённая форма глагола «быть». По такому глаголу нельзя определить время. Это как сказать «Саша ',
									},
									{ type: 'text',  weight: 'bold', text: 'печь' },
									{
										type: 'text',

										text: ' печенье». Это действие в чистом виде. Поэтому глагол нагружают каким-то временем изменяя его форму: пёк (прошедшее), печёт (настоящее), испечёт (будущее). То же самое и с ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

										text: '. В настоящем времени он будет в форме am, are или is. А в прошедшем was или were. Формы будущего времени ни у одного английского глагола нет.',
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

										text: 'В каком времени стоит глагол ',
									},
									{ type: 'text',  weight: 'bold', text: 'will' },
									{
										type: 'text',

										text: ' в этом предложении? И почему именно в нём?',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',

										text: 'Это будет кораблём.',
									},

									{
										type: 'text',

										text: 'It will be a ship.',
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

										text: 'После подлежащего должен стоять глагол нагруженный временем совершения действия. Так как английский глагол не имеет формы будущего времени, то стоит в настоящем. Поэтому will будут в настоящем.',
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

												text: 'Модальный глагол will в форме настоящего времени и в инфинитивной форме выглядит одинаково.',
											},
										],
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

										text: 'Почему в предложениях про будущее время глагол ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

										text: ' выглядит как инфинитив? Мы же знаем, что такие предложения стоят в настоящем времени, следовательно ',
									},
									{ type: 'text',  weight: 'bold', text: 'be' },
									{
										type: 'text',

										text: ' должен быть в форме am, are или is.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',

										text: 'Это будет дворец.',
									},

									{
										type: 'text',

										text: 'It will be a palace.',
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

										text: 'Потому что время совершения действия находится на сказуемом. Сказуемым является модальный глагол will. Он и стоит в форме настоящего времени. А be тут дополнение, через него время не передаётся, поэтому стоит в инфинитивной форме.',
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

// export default toBePositive
