import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
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
		{
			rusSentence: 'Ты и Палмер такие тупые!',
			engSentences: [
				{
					engSentences: ['You and Palmer are so stupid!'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Палмер', engWord: 'Palmer' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'тупой', engWord: 'stupid' },
			],
		},
	],
}

export default exercises_1
