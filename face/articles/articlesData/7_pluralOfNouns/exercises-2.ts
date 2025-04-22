import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'У тебя хорошие рефлексы.',
			engSentences: [{ engSentences: ['You have good reflexes.'], isCorrect: true }],
			words: [
				{ rusWord: 'открыть', engWord: 'open' },
				{ rusWord: 'окно', engWord: 'window' },
			],
		},
	],
}

export default exercises_2
