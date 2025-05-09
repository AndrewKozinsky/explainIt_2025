import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я учился очень усердно.',
			engSentences: [
				{
					engSentences: ['I studied very hard.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'учиться', engWord: 'study' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'усердно', engWord: 'hard' },
			],
		},
		{
			rusSentence: 'Он любил её, и она любила его.',
			engSentences: [
				{
					engSentences: ['He loved her and she loved him.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'любить', engWord: 'love' }],
		},
		{
			rusSentence: 'Я всегда верила ему.',
			engSentences: [
				{
					engSentences: ['I always believed him.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'верить', engWord: 'believe' },
			],
		},
	],
}

export default exercises_2
