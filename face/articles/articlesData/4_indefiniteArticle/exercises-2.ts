import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты пишешь письма',
			engSentences: [{ engSentences: ['You write letters'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
	],
}

export default exercises_2
