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
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'громко', engWord: 'loudly' },
			],
		},
	],
}

export default exercises_1
