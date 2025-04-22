import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
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

								children: [
									{
										type: 'text',

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
				{ rusWord: 'вместе', engWord: 'together' },
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
				{ rusWord: 'каждый', engWord: 'every' },
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
					engSentences: ['I’m on Twitter every ten minutes.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'проверять', engWord: 'check' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'десять', engWord: 'ten' },
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
			rusSentence: 'Я действительно люблю тебя.',
			engSentences: [
				{
					engSentences: ['I really love you.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'тебя', engWord: 'you' },
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
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'не полный рабочий день', engWord: 'part-time' },
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
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'смотреть', engWord: 'watch' },
				{ rusWord: 'телевизор', engWord: 'TV' },
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
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'чай', engWord: 'tea' },
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
				{ rusWord: 'готовить', engWord: 'cook' },
				{ rusWord: 'рыба', engWord: 'fish' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'четверг', engWord: 'Thursday' },
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
		{
			rusSentence: 'Я люблю книги о природе.',
			engSentences: [
				{
					engSentences: ['I like books about nature.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'книги', engWord: 'books' },
				{ rusWord: 'о чем-то', engWord: 'about' },
				{ rusWord: 'природа', engWord: 'nature' },
			],
		},
		{
			rusSentence: 'Он очень часто плавает.',
			engSentences: [
				{
					engSentences: ['He swims very often.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'часто', engWord: 'about often' },
				{ rusWord: 'плавать', engWord: 'swim' },
			],
		},
		{
			rusSentence: 'Я продаю, ты покупаешь.',
			engSentences: [
				{
					engSentences: ['I sell, you buy.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'продавать', engWord: 'sell' },
				{ rusWord: 'покупать', engWord: 'buy' },
			],
		},
		{
			rusSentence: 'Они едят мясо и рыбу.',
			engSentences: [{ engSentences: ['They eat meat and fish.'], isCorrect: true }],
			words: [
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'мясо', engWord: 'meat' },
				{ rusWord: 'и', engWord: 'and' },
				{ rusWord: 'рыба', engWord: 'fish' },
			],
		},
		{
			rusSentence: 'Они пьют сок.',
			engSentences: [{ engSentences: ['They drink juice.'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'сок', engWord: 'juice' },
			],
		},
	],
}

export default exercises_1
