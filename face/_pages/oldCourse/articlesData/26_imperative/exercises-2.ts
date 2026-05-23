import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Музыку, пожалуйста, Энни.',
			engSentences: [
				{
					engSentences: ['Music, please, Annie.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'музыка', engWord: 'music' },
				{ rusWord: 'пожалуйста', engWord: 'please' },
				{ rusWord: 'Энни', engWord: 'Annie' },
			],
		},
	],
	offset: true,
}

export default exercises_2
