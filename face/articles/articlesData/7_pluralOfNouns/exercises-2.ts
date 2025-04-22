import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'У тебя хорошие рефлексы.',
			engSentences: [{ engSentences: ['You have good reflexes.'], isCorrect: true }],
			words: [
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'рефлекс', engWord: 'reflex' },
			],
		},
	],
}

export default exercises_2
