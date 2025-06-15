import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Музыку, пожалуйста, Энни.',
			engSentences: [
				{
					engSentences: ['Music, please, Annie.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'капитаны', engWord: 'captains' },
				{ rusWord: 'уже', engWord: 'already' },
			],
		},
	],
	offset: true,
}

export default exercises_2
