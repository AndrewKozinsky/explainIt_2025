import ExercisesType from '../../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
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
		{
			rusSentence: 'Вы работаете.',
			engSentences: [
				{
					engSentences: ['You work.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
		{
			rusSentence: 'Ты работаем.',
			engSentences: [
				{
					engSentences: ['We work.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
		{
			rusSentence: 'Он работает.',
			engSentences: [
				{
					engSentences: ['He works.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
		{
			rusSentence: 'Она работает.',
			engSentences: [
				{
					engSentences: ['She works.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'работать', engWord: 'work' }],
		},
	],
}

export default exercises_2
