import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Его автомобиль чёрный, а её красный.',
			engSentences: [{ engSentences: ['His car is black, but hers is red.'], isCorrect: true }],
			words: [
				{ rusWord: 'автомобиль', engWord: 'a car' },
				{ rusWord: 'чёрный', engWord: 'black' },
				{ rusWord: 'красный', engWord: 'red' },
			],
		},
		{
			rusSentence: 'Такие компании как наша более гибкие.',
			engSentences: [
				{
					engSentences: ['Companies like ours are more flexible.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'компания', engWord: 'a company' },
				{ rusWord: 'гибкий', engWord: 'flexible' },
			],
		},
		{
			rusSentence: 'Его пальто длинное, а её короткое.',
			engSentences: [{ engSentences: ['His coat is long, but hers is short.'], isCorrect: true }],
			words: [
				{ rusWord: 'пальто', engWord: 'coat' },
				{ rusWord: 'длинный', engWord: 'long' },
				{ rusWord: 'короткий', engWord: 'short' },
			],
		},
		{
			rusSentence: 'Те пакеты ваши?',
			engSentences: [{ engSentences: ['Are those packages yours?'], isCorrect: true }],
			words: [{ rusWord: 'пакет', engWord: 'package' }],
		},
		{
			rusSentence: 'Эти дома их?',
			engSentences: [{ engSentences: ['Are those houses theirs?'], isCorrect: true }],
			words: [{ rusWord: 'дом', engWord: 'house' }],
		},
		{
			rusSentence: 'Эта сумка не твоя.',
			engSentences: [{ engSentences: ['This bag isn’t yours.'], isCorrect: true }],
			words: [{ rusWord: 'сумка', engWord: 'bag' }],
		},
		{
			rusSentence: 'Эта диета так же отвратительна, как и ее название.',
			engSentences: [{ engSentences: ['This diet is as disgusting as its name.'], isCorrect: true }],
			words: [{ rusWord: 'сумка', engWord: 'bag' }],
		},
	],
}

export default exercises_2
