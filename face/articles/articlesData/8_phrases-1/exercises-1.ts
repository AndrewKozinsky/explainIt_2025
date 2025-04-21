import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Придумай.',
			engSentences: [{ engSentences: ['Imagine.'], isCorrect: true }],
			words: [
				{ rusWord: 'открыть', engWord: 'open' },
				{ rusWord: 'окно', engWord: 'window' },
			],
		},
	],
}

export default exercises_1
