import ExercisesType from '../../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я обожаю зелёный чай.',
			engSentences: [
				{ engSentences: ['I love green tea.'], isCorrect: true },
				{ engSentences: ['I adore green tea.'], isCorrect: true },
				{ engSentences: ['I really like green tea.'], isCorrect: true },
				{ engSentences: ['I likes green tea'], isCorrect: false },
			],
			words: [
				{ rusWord: 'обожать', engWord: 'adore' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
		{
			rusSentence: 'Они обожают зелёный чай.',
			engSentences: [{ engSentences: ['They love green tea.'], isCorrect: true }],
			words: [
				{ rusWord: 'обожать', engWord: 'adore' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
		{
			rusSentence: 'Он обожает зелёный чай.',
			engSentences: [{ engSentences: ['He loves green tea.'], isCorrect: true }],
			words: [
				{ rusWord: 'обожать', engWord: 'adore' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
	],
}

export default exercises_1
