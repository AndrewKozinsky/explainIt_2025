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
