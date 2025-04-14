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
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Давайте попробуем дословно перевести следующие предложения:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я космонавт.' },

				{ type: 'text', color: 'black', text: 'I spaceman.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они клоуны.' },

				{ type: 'text', color: 'black', text: 'They clowns.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это щенок.' },

				{ type: 'text', color: 'black', text: 'It puppy.' },
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
					text: 'Предложение на английском языке должно содержать в себе как минимум подлежащее и сказуемое. ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'Подлежащее' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — это объект совершающий действие. Он может быть выражен местоимением, именем, существительным. А ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'сказуемое' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — это само действие. Выражается глаголом.',
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
					text: 'В предложениях выше подлежащие в виде местоимения. Но в моих переводах нет сказуемого, то есть самого действия. Когда-то давно в русском языке оно ставилось. На современный манер звучало бы как «',
				},
				{ type: 'text', color: 'blue', text: 'есть' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '». В болгарском оно существует до сих пор. И в английском тоже. Это глагол ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', color: 'black', text: '. Поставлю в перевод:' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' космонавт.' },

				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', color: 'black', text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' клоуны.' },

				{ type: 'text', color: 'black', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', color: 'black', text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' щенок.' },

				{ type: 'text', color: 'black', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', color: 'black', text: ' puppy.' },
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
							text: 'Иногда и в современном русском языке явно используем глагол «есть» в разных видах:',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', text: 'Незаконным ' },
						{ type: 'text', color: 'blue', text: 'является' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' способ получения этих средств.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', text: 'Что вы из себя ' },
						{ type: 'text', color: 'blue', text: 'представляете' },
						{ type: 'text', color: 'black', text: '?' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', text: 'Там ' },
						{ type: 'text', color: 'blue', text: 'есть' },
						{ type: 'text', color: 'black', text: ' стол.' },
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
							text: 'Тире также аналог слова «есть»:',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', text: 'Борис ' },
						{ type: 'text', color: 'blue', text: '—' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' сильный мужчина.',
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
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', text: 'В ' },
						{ type: 'text', color: 'black', weight: 'bold', text: 'неопределённой' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' форме (инфинитиве). Это глагол отвечающий на вопрос «что делать?». Это действие в чистом виде по которому нельзя сказать о времени. Глагол «есть» в неопределённой форме будет ',
						},
						{ type: 'text', color: 'blue', text: 'be' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Как я и поставил.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', text: 'В форме ' },
						{ type: 'text', color: 'black', weight: 'bold', text: 'настоящего' },
						{ type: 'text', color: 'black', text: ' времени.' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', text: 'В форме ' },
						{ type: 'text', color: 'black', weight: 'bold', text: 'прошедшего' },
						{ type: 'text', color: 'black', text: ' времени.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', text: 'Форма глагола ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' в настоящем времени зависит от лица подлежащего.',
				},
			],
		},
		{ type: 'customComponent', component: <ToBePresentTable /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Сказуемое всегда должно показывать время совершения действия. Давайте ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' переделаем в форму настоящего времени.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' космонавт.' },

				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text', color: 'black', text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' клоуны.' },

				{ type: 'text', color: 'black', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text', color: 'black', text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', color: 'black', text: ' щенок.' },

				{ type: 'text', color: 'black', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text', color: 'black', text: ' puppy.' },
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
					text: 'Последним шагом перед существительными в единственном числе поставлю неопределённый артикль ',
				},
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Его назначение будет объяснено в в одной из следующих глав. ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я космонавт.' },

				{ type: 'text', color: 'black', text: 'I am ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text', color: 'black', text: ' spaceman.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они клоуны.' },

				{ type: 'text', color: 'black', text: 'They are clowns.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это щенок.' },

				{ type: 'text', color: 'black', text: 'It is ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text', color: 'black', text: ' puppy.' },
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Книга упоминается в первый раз. Поэтому существительное «книга» будет в значении «одна из книг». Чтобы это показать поставьте неопределённый артикль ',
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
											text: ' вместо ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед существительными в единственном числе нужно ставить артикль ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'После ',
										},
										{
											type: 'text',
											color: 'gold',
											weight: 'normal',
											text: 'it',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'be',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' будет в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'They обозначает «они». А в предложении сказано «Это». Поэтому должно быть ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'it',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом предложении сообщается о профессии человека, кем он является. В английском чтобы сообщить и каким является персонаж и кем/чем нужно использовать to be в форме зависящей от лица подлежащего. «Он» — это третье лицо, поэтому to be будет в форме is.',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'It',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' — это местоимение третьего лица. Поэтому после него должен стоять ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. И перед существительным не написан неопределённый артикль ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Павел является студентом. Тут правильно использован ',
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
											text: '. Но ',
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
											text: ' в чистом виде используется в других типах предложений. Тут ',
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
											text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
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
											text: '?',
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
											text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед существительными ставится один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Павел является студентом. Тут правильно использован ',
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
											text: '. Но ',
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
											text: ' в чистом виде используется в других типах предложений. Тут ',
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
											text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
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
											text: '?',
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
											text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
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
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', text: 'Глагол ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' в прошедшем времени тоже зависит от лица подлежащего. Только тут две формы, а не три как в настоящем времени.',
				},
			],
		},
		/!*{ type: 'customComponent', component: <ToBePastTable /> },*!/
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В русском языке глагол «есть» уже явно присутствует в прошедшем времени в виде формы «был/была/было/были».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text', color: 'black', text: ' космонавтом.' },
				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'was' },
				{ type: 'text', color: 'black', text: ' a spaceman.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они ' },
				{ type: 'text', color: 'blue', text: 'были' },
				{ type: 'text', color: 'black', text: ' клоунами.' },

				{ type: 'text', color: 'black', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'were' },
				{ type: 'text', color: 'black', text: ' clowns.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Он ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text', color: 'black', text: ' щенком.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'was' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' a puppy.' },
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
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'blue', weight: 'normal', text: 'Was' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' ставится перед подлежащим единственного числа, а ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'were' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' множественного. Как и в русском для единственного говорим «был», а для множественного «были». Даже по количеству букв слова совпадают.',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед существительными в единственном числе нужно ставить артикль ',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Предложение составлено правильно за исключением предлогов ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'by',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. Предлог ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'by',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' употребляется когда указывают время ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'до которого ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'событие произошло или произойдёт.',
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
											text: 'Он уйдёт к утру',
										},
										{
											type: 'text',
											color: 'gray',
											weight: 'normal',
											text: ' (утром его уже не будет)',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '.',
										},

										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'He will go by morning.',
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
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Английские глаголы не имеет формы будущего времени. Поэтому предложения строят в форме настоящего времени, но применяют некоторые средства чтобы указать на будущие действия. Одно из них — ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'модальный глагол will' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
							color: 'gold',
							weight: 'normal',
							text: 'Смысловые глаголы',
						},
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' выражают действие (летать, прыгать, падать), а ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'модальные' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' выражают отношение к действию (могу, буду, должен).',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'giant',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Я ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: 'могу' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: 'летать' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'giant',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Я ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: 'буду' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: 'прыгать' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'giant',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Я ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: 'должен' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: 'взобраться' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Модальный глагол ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' означает «изволить что-то сделать».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Переведу предложение:' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я буду космонавтом.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'be' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' a spaceman.' },
			],
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
					text: 'Сказуемое тут — это глагол ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'will' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Сказуемое всегда должно стоять во временной форме, вы это уже видели при разборе предложений в настоящем и прошедшем времени. Так как предложение в настоящем времени, то will будет в форме настоящего времени. И дальше должно идти действие, которе я изволяю совершить: ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'бытие' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Это дополнение. Дословно можно перевести как «Я ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'изволю' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'быть' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' космонавтом». На дополнение не ложится нагрузка времени, поэтому оно стоит в инфинитивной форме ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'be' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
							text: 'В русском языке тоже после модального глагола стоит глагол в неопределённой форме.',
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
					text: 'Формула будущего действия самая простая.',
				},
			],
		},
		/!*{ type: 'customComponent', component: <ToBeFutureTable /> },*!/
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'Подлежащее',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' — это член предложения обозначающий объект совершающий действие. Мы пока изучили личные местоимения, но подлежащим может быть существительное, имя.',
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
										weight: 'bold',
										text: 'Сказуемое',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' — это член предложения обозначающий действие совершаемое подлежащим. Выражается глаголом. Так как в английском предложении всегда должно быть явно обозначено действие, то в таких предложениях где на русском мы указываем свойство объекта, и глагол обычно не ставится, в английском явно есть глагол ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Почему в заголовке главы говорится про ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Be — это неопределённая форма глагола «быть». По такому глаголу нельзя определить время. Это как сказать «Саша ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'печь' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' печенье». Это действие в чистом виде. Поэтому глагол нагружают каким-то временем изменяя его форму: пёк (прошедшее), печёт (настоящее), испечёт (будущее). То же самое и с ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'В каком времени стоит глагол ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' в этом предложении? И почему именно в нём?',
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
										text: 'Это будет кораблём.',
									},

									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
										offset: false,
										textSize: 'normal',
										children: [
											{
												type: 'text',
												color: 'black',
												weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Почему в предложениях про будущее время глагол ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' выглядит как инфинитив? Мы же знаем, что такие предложения стоят в настоящем времени, следовательно ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' должен быть в форме am, are или is.',
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
										text: 'Это будет дворец.',
									},

									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
