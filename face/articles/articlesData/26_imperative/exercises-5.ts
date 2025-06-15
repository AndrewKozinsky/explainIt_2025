import ExercisesType from '../../articleTypes/exercisesType'

const exercises_5: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Дай мне заглянуть в мой хрустальный шар.',
			engSentences: [
				{
					engSentences: ['Let my look into my crystal ball.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'капитаны', engWord: 'captains' },
				{ rusWord: 'уже', engWord: 'already' },
			],
		},
		{
			// TODO
			rusSentence: 'Давайте начнем снова.',
			engSentences: [
				{
					engSentences: ['Let\'s begin again.'],
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

export default exercises_5
