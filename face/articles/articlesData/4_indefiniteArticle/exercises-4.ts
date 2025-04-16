import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я всегда следую рекомендациям.',
			engSentences: [{ engSentences: ['You write letters'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
		{
			rusSentence: 'Он преподаёт другие предметы.',
			engSentences: [{ engSentences: ['He teaches other subjects.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
	],
}

export default exercises_4
