import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Мои родители часто смотрят вестерны.',
			engSentences: [
				{
					engSentences: ['My parents often watch westerns.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
	],
}

export default exercises_3
