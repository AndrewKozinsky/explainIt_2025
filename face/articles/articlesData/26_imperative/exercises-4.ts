import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Не потеряйся в лесу.',
			engSentences: [
				{
					engSentences: ['Don’t get lost in the woods.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'теряться', engWord: 'get lost' },
				{ rusWord: 'лес', engWord: 'woods' },
			],
		},
		{
			rusSentence: 'Не клади пакет на стол!',
			engSentences: [
				{
					engSentences: ['Do not put the bag on the table!'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'класть', engWord: 'put' },
				{ rusWord: 'пакет', engWord: 'bag' },
				{ rusWord: 'на', engWord: 'on' },
				{ rusWord: 'стол', engWord: 'table' },
			],
		},
		{
			rusSentence: 'Не хлопайте дверью.',
			engSentences: [
				{
					engSentences: ['Do not slam the door.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'хлопать', engWord: 'slam' },
				{ rusWord: 'дверь', engWord: 'door' },
			],
		},
		{
			rusSentence: 'Не трогай мои вещи.',
			engSentences: [
				{
					engSentences: ['Do not touch my things.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'трогать', engWord: 'touch' },
				{ rusWord: 'вещь', engWord: 'thing' },
			],
		},
		{
			rusSentence: 'Энни, пожалуйста, не будь глупой. Останься и будь с ней мила.',
			engSentences: [
				{
					engSentences: ['Annie, please do not be silly. Stay and be nice to her.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Энни', engWord: 'Annie' },
				{ rusWord: 'пожалуйста', engWord: 'please' },
				{ rusWord: 'глупый', engWord: 'silly' },
				{ rusWord: 'оставаться', engWord: 'stay' },
				{ rusWord: 'милый', engWord: 'nice' },
			],
		},
		{
			rusSentence: 'Не ешь это яблоко.',
			engSentences: [
				{
					engSentences: ['Do not eat that apple.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'яблоко', engWord: 'apple' },
			],
		},
	],
}

export default exercises_4
