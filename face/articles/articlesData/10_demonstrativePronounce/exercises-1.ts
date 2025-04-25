import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Это книга.',
			engSentences: [
				{ engSentences: ['It is a book.'], isCorrect: true },
				{
					engSentences: ['It a book.'],
					isCorrect: false,
				},
				{
					engSentences: ['It is the book.'],
					isCorrect: false,
				},
			],
			words: [{ rusWord: 'книга', engWord: 'book' }],
		},
	],
}

export default exercises_1
