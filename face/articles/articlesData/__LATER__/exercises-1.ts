import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Это работает очень громко.',
			engSentences: [
				{
					engSentences: ['It works very loudly.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'работать', engWord: 'travel' },
				{ rusWord: 'очень', engWord: 'every' },
				{ rusWord: 'громко', engWord: 'summer' },
			],
		},
	],
}

export default exercises_1
