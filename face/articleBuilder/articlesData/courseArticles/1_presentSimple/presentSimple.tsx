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
			rus: [{ type: 'text', text: 'Ты ешь вишню.' }],
			eng: [{ type: 'text', text: 'You eat cherry.' }],
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
			rus: [{ type: 'text', text: 'Ты читаешь книги.' }],
			eng: [{ type: 'text', text: 'You read books.' }],
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
					rusSentence: 'Они обожают зелёный чай.',
					engSentences: [
						{ engSentences: ['They love green tea.'], isCorrect: true },
						{ engSentences: ['They adore green tea.'], isCorrect: true },
						{ engSentences: ['They really like green tea.'], isCorrect: true },
						/*{
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
						},*/
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
					words: [{ rusWord: 'обожать', engWord: 'adore' }],
				},
				{
					rusSentence: 'Я путешествую каждое лето.',
					engSentences: [
						{
							engSentences: ['I travel every summer.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'путешествовать', engWord: 'travel' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'лето', engWord: 'summer' },
					],
				},
				{
					rusSentence: 'Ты обычно выигрываешь.',
					engSentences: [
						{
							engSentences: ['You usually win.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'путешествовать', engWord: 'travel' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'лето', engWord: 'summer' },
					],
				},
				{
					rusSentence: 'Я часто готовлю.',
					engSentences: [
						{
							engSentences: ['I often cook.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'часто', engWord: 'often' },
						{ rusWord: 'готовить', engWord: 'cook' },
					],
				},
				{
					rusSentence: 'Они читают медицинские журналы.',
					engSentences: [
						{
							engSentences: ['They read medical journals.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'читать', engWord: 'read' },
						{ rusWord: 'медицинский', engWord: 'medical' },
						{ rusWord: 'журналы', engWord: 'journals' },
					],
				},
				{
					rusSentence: 'Я работаю.',
					engSentences: [
						{
							engSentences: ['I work.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'работать', engWord: 'work' }],
				},
				{
					rusSentence: 'Они всегда играют вместе.',
					engSentences: [
						{
							engSentences: ['They always play together.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'всегда', engWord: 'always' },
						{ rusWord: 'играть', engWord: 'play' },
						{ rusWord: 'together', engWord: 'вместе' },
					],
				},
				{
					rusSentence: 'Мы едим свежие овощи каждый день.',
					engSentences: [
						{
							engSentences: ['We eat fresh vegetables every day.'],
							isCorrect: true,
						},
						{
							engSentences: ['We have fresh veggies every day.'],
							isCorrect: true,
						},
						{
							engSentences: ['We eat fresh greens daily.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'есть', engWord: 'eat' },
						{ rusWord: 'свежий', engWord: 'fresh' },
						{ rusWord: 'овощи', engWord: 'vegetables' },
						{ rusWord: 'день', engWord: 'day' },
					],
				},
				{
					rusSentence: 'Ты обманываешь каждого человека.',
					engSentences: [
						{
							engSentences: ['You deceive every person.'],
							isCorrect: true,
						},
						{
							engSentences: ['You trick everyone.'],
							isCorrect: true,
						},
						{
							engSentences: ['You fool every person.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'есть', engWord: 'eat' },
						{ rusWord: 'свежий', engWord: 'fresh' },
						{ rusWord: 'овощи', engWord: 'vegetables' },
						{ rusWord: 'день', engWord: 'day' },
					],
				},
				{
					rusSentence: 'Они редко пекут пиццу.',
					engSentences: [
						{
							engSentences: ['They rarely bake pizza.'],
							isCorrect: true,
						},
						{
							engSentences: ['They seldom make pizza.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'редко', engWord: 'rarely' },
						{ rusWord: 'редко', engWord: 'seldom' },
						{ rusWord: 'печь', engWord: 'bake' },
						{ rusWord: 'pizza', engWord: 'pizza' },
					],
				},
				{
					rusSentence: 'Я проверяю Твиттер каждые 10 минут.',
					engSentences: [
						{
							engSentences: ['I check Twitter every 10 minutes.'],
							isCorrect: true,
						},
						{
							engSentences: ['I’m on Twitter every 10 minutes.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'проверять', engWord: 'check' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'минуты', engWord: 'minutes' },
					],
				},
				{
					rusSentence: 'Я практикую иностранные языки.',
					engSentences: [
						{
							engSentences: ['I practice foreign languages.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'практиковать', engWord: 'practice' },
						{ rusWord: 'иностранный', engWord: 'foreign' },
						{ rusWord: 'языки', engWord: 'languages' },
					],
				},
				{
					rusSentence: 'Ты говоришь по-английски очень хорошо.',
					engSentences: [
						{
							engSentences: ['You speak English very well.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'практиковать', engWord: 'practice' },
						{ rusWord: 'иностранный', engWord: 'foreign' },
						{ rusWord: 'языки', engWord: 'languages' },
					],
				},
				{
					rusSentence: 'Мы покупаем только необходимые вещи.',
					engSentences: [
						{
							engSentences: ['I practice foreign languages.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'практиковать', engWord: 'practice' },
						{ rusWord: 'иностранный', engWord: 'foreign' },
						{ rusWord: 'языки', engWord: 'languages' },
					],
				},
				{
					rusSentence: 'Они строят дома.',
					engSentences: [
						{
							engSentences: ['I practice foreign languages.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'практиковать', engWord: 'practice' },
						{ rusWord: 'иностранный', engWord: 'foreign' },
						{ rusWord: 'языки', engWord: 'languages' },
					],
				},
				{
					rusSentence: 'Я учусь и тренируюсь каждое утро.',
					engSentences: [
						{
							engSentences: ['I study and train every morning.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'учиться', engWord: 'study' },
						{ rusWord: 'тренироваться', engWord: 'train' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'утро', engWord: 'morning' },
					],
				},
				{
					rusSentence: 'Ты преподаёшь математику.',
					engSentences: [
						{
							engSentences: ['You teach math.'],
							isCorrect: true,
						},
						{
							engSentences: ['You teach mathematics.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'учиться', engWord: 'study' },
						{ rusWord: 'тренироваться', engWord: 'train' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'утро', engWord: 'morning' },
					],
				},
				{
					rusSentence: 'Они красят стены.',
					engSentences: [
						{
							engSentences: ['I study and train every morning.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'учиться', engWord: 'study' },
						{ rusWord: 'тренироваться', engWord: 'train' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'утро', engWord: 'morning' },
					],
				},
				{
					rusSentence: 'Мы любим детей.',
					engSentences: [
						{
							engSentences: ['I study and train every morning.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'учиться', engWord: 'study' },
						{ rusWord: 'тренироваться', engWord: 'train' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'утро', engWord: 'morning' },
					],
				},
				{
					rusSentence: 'Ты выглядишь таким грустным.',
					engSentences: [
						{
							engSentences: ['You look so sad.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'учиться', engWord: 'study' },
						{ rusWord: 'тренироваться', engWord: 'train' },
						{ rusWord: 'каждый', engWord: 'every' },
						{ rusWord: 'утро', engWord: 'morning' },
					],
				},
			],
			offset: true,
		},
	],
}

export default presentSimple
