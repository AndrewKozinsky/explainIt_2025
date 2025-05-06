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
		{
			rusSentence: 'Будущее казалось таким ярким.',
			engSentences: [
				{
					engSentences: ['The future seemed so bright.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'будущее', engWord: 'future' },
				{ rusWord: 'казаться', engWord: 'seem' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'яркий', engWord: 'bright' },
			],
		},
		{
			rusSentence: '444',
			engSentences: [
				{
					engSentences: ['666'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'будущее', engWord: 'future' },
				{ rusWord: 'казаться', engWord: 'seem' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'яркий', engWord: 'bright' },
			],
		},
	],
}

export default exercises_3
