import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Мой брат любит есть апельсины.',
			engSentences: [{ engSentences: ['My brother likes eating oranges.'], isCorrect: true }],
			words: [
				{ rusWord: 'брат', engWord: 'brother' },
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'апельсин', engWord: 'orange' },
			],
		},
	],
}

export default exercises_4
