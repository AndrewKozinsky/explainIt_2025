import ArticleType from '../../articleType'

const presentSimple: ArticleType.Art = {
	meta: {
		number: 3,
		slug: 'present-simple-1',
		caption: 'Глава 1',
		articleName: 'Present Simple',
		articleDescription:
			'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений первого и второго лица.',
		isPaid: false,
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Present Simple — это грамматическое время обозначающее повседневные и повторяющиеся действия. Я сейчас не буду вдаваться в подробности потому что на данном этапе это не имеет смысла. Про это время лучше рассказать в сравнении с Present Progressive. Это будет в одной из будущих глав. Сейчас просто запомните, что Present Simple строится так же как предложение в настоящем времени на русском языке.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Несколько примеров:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я изучаю английский.' }],
			eng: [{ type: 'text', text: 'I learn English.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мы любим зиму.' }],
			eng: [{ type: 'text', text: 'We love winter.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они готовят ужин вместе.' }],
			eng: [{ type: 'text', text: 'They cook dinner together.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Предложение, отмеченное пунктирной линией, имеет транскрипцию и кнопку воспроизведения для прослушивания. Попробуйте нажать и послушать как оно звучит:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я чувствую себя счастливым.' }],
			eng: [{ type: 'text', text: 'I feel happy.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мы работаем полный рабочий день.' }],
			eng: [{ type: 'text', text: 'We work full-time.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они носят костюмы.' }],
			eng: [{ type: 'text', text: 'They wear suits.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте самостоятельно перевести несколько предложений:',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Мы счастливые.',
					engSentences: [
						{ engSentences: ['We are happy.'], isCorrect: true },
						{
							engSentences: ['We happy.'],
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
											text: 'Пропущен глагол to be в форме настоящего времени второго лица: are. Такое предложение является грамматически неправильным.',
										},
									],
								},
							],
						},
						{
							engSentences: ['She is happy.'],
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
											text: 'They переводится как «они». Мы — это we. А в остальном правильно: после местоимений во втором лице ставится глагол to be в форме are.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'счастливый', engWord: 'happy' }],
				},
				{
					rusSentence: 'Кате двадцать лет.',
					engSentences: [
						{
							engSentences: ['Katya is twenty years old.', 'Katya is 20 years old.'],
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
											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Katya is twenty',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' тоже верен.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya is twenty.'],
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
											text: 'Правильно! Вариант ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'Katya is twenty years old',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' тоже верен.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya is 20.'],
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
											text: 'Правильно! Это сокращённый вариант перевода Katya is 20 years old.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Katya twenty.'],
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
											text: 'Двадцать лет — это свойство персонажа. Поэтому ставится ',
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
											text: '. Кроме того в русском предложении нет глагола. А это признак того, что в английском нужно ставить ',
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
											text: '.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'двадцать лет', engWord: 'twenty years old' }],
				},
			],
			offset: true,
		},
	],
}

export default presentSimple
