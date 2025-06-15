import ExercisesType from '../../articleTypes/exercisesType'

const exercises_6: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Позвольте мне повторить правила.',
			engSentences: [
				{
					engSentences: ['Let me repeat the rules.'],
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

export default exercises_6
