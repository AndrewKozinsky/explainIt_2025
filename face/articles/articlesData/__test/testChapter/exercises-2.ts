import ExercisesType from '../../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Они обожают зелёный чай.',
			engSentences: [
				{ engSentences: ['They love green tea.'], isCorrect: true },
				{ engSentences: ['They adore green tea.'], isCorrect: true },
				{ engSentences: ['They really like green tea.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'обожать', engWord: 'adore' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
	],
}

export default exercises_2
