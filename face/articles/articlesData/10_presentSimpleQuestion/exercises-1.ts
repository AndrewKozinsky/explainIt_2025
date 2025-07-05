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
			rusSentence: 'Она предпочитает только чёрный чай?',
			engSentences: [{ engSentences: ['Does she prefer only black tea?'], isCorrect: true }],
			words: [
				{ rusWord: 'предпочитать', engWord: 'prefer' },
				{ rusWord: 'только', engWord: 'only' },
				{ rusWord: 'чёрный', engWord: 'black' },
				{ rusWord: 'чай', engWord: 'tea' },
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
			rusSentence: 'В твоём чае есть сахар?',
			engSentences: [{ engSentences: ['Do you have sugar in your tea?'], isCorrect: true }],
			words: [
				{ rusWord: 'чай', engWord: 'sugar' },
				{ rusWord: 'в', engWord: 'in' },
				{ rusWord: 'сахар', engWord: 'tea' },
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
			rusSentence: 'Вы в верите гороскопы?',
			engSentences: [{ engSentences: ['Do you believe in horoscopes?'], isCorrect: true }],
			words: [
				{ rusWord: 'верить', engWord: 'believe' },
				{ rusWord: 'в', engWord: 'in' },
				{ rusWord: 'гороскоп', engWord: 'horoscope' },
			],
		},
		{
			rusSentence: 'Тебе нравится эта музыка?',
			engSentences: [{ engSentences: ['Do you like this music?'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'музыка', engWord: 'music' },
			],
		},
		{
			rusSentence: 'Вы работаете в разных зданиях?',
			engSentences: [{ engSentences: ['Do you work in different buildings?'], isCorrect: true }],
			words: [
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'разный', engWord: 'different' },
				{ rusWord: 'здание', engWord: 'building' },
			],
		},
		{
			rusSentence: 'Ты поддерживаешь эту идею?',
			engSentences: [{ engSentences: ['Do you support this idea?'], isCorrect: true }],
			words: [
				{ rusWord: 'поддерживать', engWord: 'support' },
				{ rusWord: 'идея', engWord: 'idea' },
			],
		},
		{
			rusSentence: 'Тебе нравится этот фильм?',
			engSentences: [{ engSentences: ['Do you like this movie?'], isCorrect: true }],
			words: [
				{ rusWord: 'нравиться', engWord: 'like' },
				{ rusWord: 'фильм', engWord: 'movie' },
			],
		},
		{
			rusSentence: 'Они обычно покупают дешёвую еду?',
			engSentences: [{ engSentences: ['Do they usually buy cheap food?'], isCorrect: true }],
			words: [
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'покупать', engWord: 'buy' },
				{ rusWord: 'дешёвый', engWord: 'cheap' },
				{ rusWord: 'еда', engWord: 'food' },
			],
		},
		{
			rusSentence: 'Ты получаешь достаточно денег?',
			engSentences: [{ engSentences: ['Do you get enough money?'], isCorrect: true }],
			words: [
				{ rusWord: 'получать', engWord: 'get' },
				{ rusWord: 'достаточно', engWord: 'enough' },
				{ rusWord: 'деньги', engWord: 'money' },
			],
		},
		{
			rusSentence: 'Он поддерживает местный футбольный клуб?',
			engSentences: [
				{ engSentences: ['Does he support the local football club?'], isCorrect: true },
				{ engSentences: ['Does he support the local soccer club?'], isCorrect: true },
			],
			words: [
				{ rusWord: 'поддерживать', engWord: 'support' },
				{ rusWord: 'местный', engWord: 'local' },
				{ rusWord: 'футбол', engWord: 'football' },
				{ rusWord: 'клуб', engWord: 'club' },
			],
		},
		{
			rusSentence: 'Я доверяю её вкусу – она рекомендует это заведение?',
			engSentences: [{ engSentences: ['I trust her taste – does she recommend this place?'], isCorrect: true }],
			words: [
				{ rusWord: 'доверять', engWord: 'trust' },
				{ rusWord: 'вкус', engWord: 'taste' },
				{ rusWord: 'рекомендовать', engWord: 'recommend' },
				{ rusWord: 'заведение', engWord: 'place' },
			],
		},
		{
			rusSentence: 'Они всё ещё кормят бездомных котов?',
			engSentences: [{ engSentences: ['Do they still feed stray cats?'], isCorrect: true }],
			words: [
				{ rusWord: 'всё ещё', engWord: 'still' },
				{ rusWord: 'кормить', engWord: 'feed' },
				{ rusWord: 'бродячий кот', engWord: 'stray cat' },
			],
		},
		{
			rusSentence: 'Ты любишь кофе?',
			engSentences: [{ engSentences: ['Do you like coffee?'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'кофе', engWord: 'coffee' },
			],
		},
		{
			rusSentence: 'Ты смотришь Netflix?',
			engSentences: [{ engSentences: ['Do you watch Netflix?'], isCorrect: true }],
			words: [{ rusWord: 'смотреть', engWord: 'watch' }],
		},
		{
			rusSentence: 'Ты играешь на гитаре?',
			engSentences: [{ engSentences: ['Do you play the guitar?'], isCorrect: true }],
			words: [
				{ rusWord: 'играть', engWord: 'play' },
				{ rusWord: 'гитара', engWord: 'guitar' },
			],
		},
		{
			rusSentence: 'Она пьёт чай по утрам?',
			engSentences: [{ engSentences: ['Does she drink tea in the morning?'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'чай', engWord: 'tea' },
				{ rusWord: 'по утрам', engWord: 'in the morning' },
			],
		},
		{
			rusSentence: 'Они знают о собрании?',
			engSentences: [{ engSentences: ['Do they know about the meeting?'], isCorrect: true }],
			words: [
				{ rusWord: 'знать о', engWord: 'know about' },
				{ rusWord: 'собрание', engWord: 'meeting' },
			],
		},
		{
			rusSentence: 'Ира предпочитает колу или минералку?',
			engSentences: [{ engSentences: ['Does Ira prefer cola or mineral water?'], isCorrect: true }],
			words: [
				{ rusWord: 'предпочитать', engWord: 'prefer' },
				{ rusWord: 'кола', engWord: 'cola' },
				{ rusWord: 'или', engWord: 'or' },
				{ rusWord: 'минеральная вода', engWord: 'mineral water' },
			],
		},
		{
			rusSentence: 'У них есть кот?',
			engSentences: [{ engSentences: ['Do they have a cat?'], isCorrect: true }],
			words: [{ rusWord: 'кот', engWord: 'cat' }],
		},
		{
			rusSentence: 'Ты водишь машину?',
			engSentences: [{ engSentences: ['Do you drive a car?'], isCorrect: true }],
			words: [
				{ rusWord: 'водить транспортное средство', engWord: 'drive' },
				{ rusWord: 'машина', engWord: 'car' },
			],
		},
		{
			rusSentence: 'Она знает ответ?',
			engSentences: [{ engSentences: ['Does she know the answer?'], isCorrect: true }],
			words: [
				{ rusWord: 'класть', engWord: 'put' },
				{ rusWord: 'чашка', engWord: 'cup' },
				{ rusWord: 'журнальный столик', engWord: 'coffee table' },
			],
		},
	],
}

export default exercises_1
