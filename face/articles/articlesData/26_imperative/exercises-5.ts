import ExercisesType from '../../articleTypes/exercisesType'

const exercises_5: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Дай мне заглянуть в мой хрустальный шар.',
			engSentences: [
				{
					engSentences: ['Let my look into my crystal ball.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'заглянуть', engWord: 'look into' },
				{ rusWord: 'хрустальный', engWord: 'crystal' },
				{ rusWord: 'шар', engWord: 'ball' },
			],
		},
		{
			rusSentence: 'Давайте начнем снова.',
			engSentences: [
				{
					engSentences: ["Let's begin again."],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: ' начинать', engWord: 'begin' },
				{ rusWord: 'снова', engWord: 'again' },
			],
		},
	],
	offset: true,
}

export default exercises_5
