import ExercisesType from '../../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я работаю.',
			engSentences: [
				{
					engSentences: ['I work.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
	],
}

export default exercises_1
