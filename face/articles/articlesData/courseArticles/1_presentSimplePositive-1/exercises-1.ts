import ExercisesType from '../../exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	id: 1,
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
			],
			words: [
				{ rusWord: 'обожать', engWord: 'adore' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
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
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'выигрывать', engWord: 'win' },
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
				{ rusWord: 'обманываешь', engWord: 'deceive' },
				{ rusWord: 'обманываешь', engWord: 'trick' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'человек', engWord: 'person' },
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
				{ rusWord: 'говорить', engWord: 'speak' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'хорошо', engWord: 'well' },
			],
		},
		{
			rusSentence: 'Мы покупаем только необходимые вещи.',
			engSentences: [
				{
					engSentences: ['We buy only necessary things.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'покупать', engWord: 'buy' },
				{ rusWord: 'только', engWord: 'only' },
				{ rusWord: 'необходимый', engWord: 'necessary' },
				{ rusWord: 'вещи', engWord: 'things' },
			],
		},
		{
			rusSentence: 'Они строят дома.',
			engSentences: [
				{
					engSentences: ['They build houses.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Я действительно тебя люблю.',
			engSentences: [
				{
					engSentences: ['I really love you.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Мы работаем не полный рабочий день.',
			engSentences: [
				{
					engSentences: ['We work part-time.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Вы обычно смотрите телевизор.',
			engSentences: [
				{
					engSentences: ['You usually watch TV.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Мы всегда пьём чай.',
			engSentences: [
				{
					engSentences: ['We always drink tea.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Я готовлю рыбу каждый четверг.',
			engSentences: [
				{
					engSentences: ['I cook fish every Thursday.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
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
				{ rusWord: 'преподавать', engWord: 'teach' },
				{ rusWord: 'математика', engWord: 'math' },
				{ rusWord: 'математика', engWord: 'mathematics' },
			],
		},
		{
			rusSentence: 'Они красят стены.',
			engSentences: [
				{
					engSentences: ['They paint walls.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'красить', engWord: 'paint' },
				{ rusWord: 'стены', engWord: 'walls' },
			],
		},
		{
			rusSentence: 'Мы любим детей.',
			engSentences: [
				{
					engSentences: ['We love children.'],
					isCorrect: true,
				},
				{
					engSentences: ['We love kids.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'дети', engWord: 'children' },
				{ rusWord: 'дети', engWord: 'kids' },
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
				{ rusWord: 'выглядеть', engWord: 'look' },
				{ rusWord: 'грустный', engWord: 'sad' },
			],
		},
	],
}

export default exercises_1
