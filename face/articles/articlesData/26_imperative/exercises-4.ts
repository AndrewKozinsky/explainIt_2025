import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Не потеряйся в лесу.',
			engSentences: [
				{
					engSentences: ['Don’t get lost in the woods.'],
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
			rusSentence: 'Не клади пакет на стол!',
			engSentences: [
				{
					engSentences: ['Don\'t put the bag on the table!'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'капитаны', engWord: 'captains' },
				{ rusWord: 'уже', engWord: 'already' },
			],
		},
	],
}

export default exercises_4
