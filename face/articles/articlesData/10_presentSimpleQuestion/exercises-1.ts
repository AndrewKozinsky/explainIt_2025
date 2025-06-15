import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты понимаешь?',
			engSentences: [{ engSentences: ['Do you understand?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Она предочитает только чёрный чай?',
			engSentences: [{ engSentences: ['Does she prefer only black tea?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			rusSentence: 'Я хорошо выгляжу?',
			engSentences: [{ engSentences: ['Do I look good?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'В твоём чае есть сахар?',
			engSentences: [{ engSentences: ['Do you have sugar in your tea?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			rusSentence: 'Оля часто бегает?',
			engSentences: [
				{ engSentences: ['Does Olya often run?'], isCorrect: true },
				{
					engSentences: ['Do Olya often run?'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Имя Olya можно превратить в местоимение she. А если вспомогательный глагол do стоит перед she, to он превращается в does.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'бегать', engWord: 'run' },
			],
		},
		{
			rusSentence: 'Ты помогаешь своим родителям?',
			engSentences: [{ engSentences: ['Do you help your parents?'], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
		{
			rusSentence: 'Он работает здесь?',
			engSentences: [{ engSentences: ['Does he work here? '], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
		{
			rusSentence: 'Тебе нравится те туфли?',
			engSentences: [{ engSentences: ['Do you like those shoes?'], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
		{
			// TODO
			rusSentence: 'Вы в верите гороскопы?',
			engSentences: [{ engSentences: ['Do you believe in horoscopes?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Тебе нравится эта музыка?',
			engSentences: [{ engSentences: ['Do you like this music?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Вы работаете в разных зданиях?',
			engSentences: [{ engSentences: ['Do you wort in different buildings?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты поддерживаешь эту идею?',
			engSentences: [{ engSentences: ['Do you support this idea?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Тебе нравится этот фильм?',
			engSentences: [{ engSentences: ['Do you like this movie?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Они обычно покупают дешёвую еду?',
			engSentences: [{ engSentences: ['Do they usually buy cheap food?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты получаешь достаточно денег?',
			engSentences: [{ engSentences: ['Do you get enough money?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Он поддерживает местный футбольный клуб?',
			engSentences: [
				{ engSentences: ['Does he support the local football club?'], isCorrect: true },
				{ engSentences: ['Does he support the local soccer club?'], isCorrect: true },
			],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Я доверяю её вкусу – она рекомендует это заведение?',
			engSentences: [{ engSentences: ['I trust her taste – does she recommend this place?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Они всё ещё кормят бездомных котов?',
			engSentences: [{ engSentences: ['Do they still feed stray cats?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты любишь кофе?',
			engSentences: [{ engSentences: ['Do you like coffee?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты смотришь Netflix?',
			engSentences: [{ engSentences: ['Do you watch Netflix?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты играешь на гитаре?',
			engSentences: [{ engSentences: ['Do you play the guitar?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Она пьёт чай по утрам?',
			engSentences: [{ engSentences: ['Does she drink tea in the morning?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Они знают о собрании?',
			engSentences: [{ engSentences: ['Do they know about the meeting?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ира предпочитает колу или минералку?',
			engSentences: [{ engSentences: ['Does Ira prefer cola or mineral water?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'У них есть кот?',
			engSentences: [{ engSentences: ['Do they have a cat?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты водишь машину?',
			engSentences: [{ engSentences: ['Do you drive a car?'], isCorrect: true }],
			words: [
				{ rusWord: 'многие', engWord: 'many' },
				{ rusWord: 'многие', engWord: 'many' },
			],
		},
	],
}

export default exercises_1
