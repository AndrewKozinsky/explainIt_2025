// import ArticleType from '../../articleType'
// import ToBePresentPositiveScheme from './ToBePresentPositiveScheme'
// import ToBePresentNegativeScheme from './ToBePresentNegativeScheme'
// import ToBePresentQuestionScheme from './ToBePresentQuestionScheme'

/*const beNegativeAndQuestion: ArticleType.Art = {
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прошедшее и настоящее время' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Отрицание в прошедшем времени.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я не был напуган.' },

				{ type: 'text',   text: 'I ' },
				{ type: 'text', color: 'blue',  text: 'was not' },
				{ type: 'text',   text: ' afraid.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Вы не были милым.' },

				{ type: 'text',   text: 'You ' },
				{ type: 'text', color: 'blue',  text: 'were not' },
				{ type: 'text',   text: ' cute.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Она не была красивой.' },

				{ type: 'text',   text: 'She ' },
				{ type: 'text', color: 'blue',  text: 'was not' },
				{ type: 'text',   text: ' beautiful.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Отрицание в настоящем времени.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я не смелый.' },

				{ type: 'text',   text: 'I ' },
				{ type: 'text', color: 'blue',  text: 'am not' },
				{ type: 'text',   text: ' brave.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Вы не очень сильный мужчина.',
				},

				{ type: 'text',   text: 'You ' },
				{ type: 'text', color: 'blue',  text: 'are not' },
				{ type: 'text',   text: ' a very strong man.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Инжирное дерево не высокое.',
				},

				{ type: 'text',   text: 'A fig tree ' },
				{ type: 'text', color: 'blue',  text: 'is not' },
				{ type: 'text',   text: ' tall.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [

			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос' },
		{
			type: 'exercises',
			id: 1,
			exercises: [
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
									children: [
										{
											type: 'text',
											color: 'blue',
											text: 'Rich',
										},
										{
											type: 'text',
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
					rusSentence: 'Вас зовут Сергей?',
					engSentences: [
						{ engSentences: ['Are you Sergey?'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',
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
									children: [
										{
											type: 'text',
											text: 'Форма глагола to be зависит от подлежащего, потому что в повествовательном оно стоит после него. И в вопросе перескакивает на место перед ним. После местоимения you будет использоваться to be в форме are.',
										},
									],
								},
							],
						},
					],
					words: [],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Будущее время' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В английском языке отсутствует отдельная форма глагола для выражения будущего времени, поэтому оно выражается через использование модального глагола ',
				},
				{ type: 'text', color: 'blue',  text: 'will' },
				{ type: 'text',   text: ' (изъявлять волю).' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отрицание' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Когда мы хотим отрицать будущее время, отрицание применяется к самому глаголу ',
				},
				{ type: 'text',  weight: 'bold', text: 'will' },
				{ type: 'text',   text: ', а не к глаголу ' },
				{ type: 'text',  weight: 'bold', text: 'be' },
				{
					type: 'text',
					text: '. Таким образом, мы объявляем отсутствие воли совершить действие, а затем указываем, к чему это отсутствие воли относится. Поэтому ',
				},
				{ type: 'text',  weight: 'bold', text: 'not' },
				{ type: 'text',   text: ' ставится после ' },
				{ type: 'text',  weight: 'bold', text: 'will' },
				{ type: 'text',   text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я не буду счастливым.' },

				{ type: 'text',   text: 'I will ' },
				{ type: 'text', color: 'blue',  text: 'not' },
				{ type: 'text',   text: ' be happy.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я не буду счастливым.' },

				{ type: 'text',   text: 'I will ' },
				{ type: 'text', color: 'blue',  text: 'not' },
				{ type: 'text',   text: ' be happy.' },
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
			children: [
				{ type: 'text',   text: 'При вопросе ' },
				{ type: 'text',  weight: 'bold', text: 'will' },
				{
					type: 'text',
					text: ' переносится в позицию «до подлежащего». А глагол ',
				},
				{ type: 'text',  weight: 'bold', text: 'be' },
				{
					type: 'text',
					text: ' остается без изменений.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я буду счастливый?' },

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'Will' },
				{ type: 'text',   text: ' I be happy?' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я буду счастливый?' },

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'Will' },
				{ type: 'text',   text: ' I be happy?' },
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
			children: [
				{
					type: 'text',
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
								children: [
									{
										type: 'text',
										text: 'Что означает окончания -',
									},
									{ type: 'text',  weight: 'bold', text: 'ing' },
									{
										type: 'text',
										text: ' и -',
									},
									{ type: 'text',  weight: 'bold', text: 'ed' },
									{
										type: 'text',
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

								children: [
									{
										type: 'text',
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
