// import ArticleType from '../../articleType'
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

	],
}*/

// export default toBePositive
