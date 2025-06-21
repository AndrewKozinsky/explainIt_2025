import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я хочу побыть одна.',
			engSentences: [{ engSentences: ['I want to be alone.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'быть одной', engWord: 'alone' },
			],
		},
		{
			rusSentence: 'Вика хочет стать голливудской кинозвездой.',
			engSentences: [{ engSentences: ['Vika wants to be a Hollywood movie star.'], isCorrect: true }],
			words: [
				{ rusWord: 'Вика', engWord: 'Vika' },
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'Голливуд', engWord: 'Hollywood' },
				{ rusWord: 'кинозвезда', engWord: 'movie star' },
			],
		},
		{
			rusSentence: 'Не хочу быть нахлебником.',
			engSentences: [{ engSentences: ['I do not want to be a freeloader.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'go' },
				{ rusWord: 'нахлебник', engWord: 'freeloader' },
			],
		},
		{
			rusSentence: 'Я не был готов услышать это.',
			engSentences: [{ engSentences: ['I was not ready to hear it.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'слышать', engWord: 'hear' },
			],
		},
	],
}

export default exercises_2
