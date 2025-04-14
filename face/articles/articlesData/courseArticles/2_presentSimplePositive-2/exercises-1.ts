import ExercisesType from '../../exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	id: 1,
	exercises: [
		{
			rusSentence: 'Она носит белую одежду.',
			engSentences: [
				{
					engSentences: ['She wears white clothes.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'носить', engWord: 'wear' },
				{ rusWord: 'белый', engWord: 'white' },
				{ rusWord: 'одежда', engWord: 'clothes' },
			],
		},
		{
			rusSentence: 'Он доставляет еду.',
			engSentences: [
				{
					engSentences: ['He delivers food.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'доставлять', engWord: 'deliver' },
				{ rusWord: 'еда', engWord: 'food' },
			],
		},
		{
			rusSentence: 'Он предпочитает морепродукты.',
			engSentences: [
				{
					engSentences: ['He prefers seafood.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'предпочитать', engWord: 'prefer' },
				{ rusWord: 'морепродукты', engWord: 'seafood' },
			],
		},
		{
			rusSentence: 'Он верит в НЛО.',
			engSentences: [
				{
					engSentences: ['He believes UFO.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'верить', engWord: 'believe' },
				{ rusWord: 'НЛО', engWord: 'UFO' },
			],
		},
		{
			rusSentence: 'Он получает большие деньги.',
			engSentences: [
				{
					engSentences: ['He gets big money.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'получать', engWord: 'get' },
				{ rusWord: 'большой', engWord: 'big' },
				{ rusWord: 'деньги', engWord: 'money' },
			],
		},
		{
			rusSentence: 'Она курит и пьёт.',
			engSentences: [
				{
					engSentences: ['She smokes and drinks.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'купить', engWord: 'smoke' },
				{ rusWord: 'пить алкоголь', engWord: 'drink' },
			],
		},
		{
			rusSentence: 'Это приносит успех и удачу.',
			engSentences: [
				{
					engSentences: ['It brings success and luck.'],
					isCorrect: true,
				},
				{
					engSentences: ['It brings success and good luck.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'приносить', engWord: 'bring' },
				{ rusWord: 'успех', engWord: 'success' },
				{ rusWord: 'удача', engWord: 'luck' },
			],
		},

		{
			rusSentence: 'Он пьёт чай.',
			engSentences: [{ engSentences: ['He drinks tea.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
		{
			rusSentence: 'Она заказывает еду онлайн.',
			engSentences: [
				{
					engSentences: ['She orders food online.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'заказывать', engWord: 'order' },
				{ rusWord: 'еда', engWord: 'food' },
				{ rusWord: 'онлайн', engWord: 'online' },
			],
		},
		{
			rusSentence: 'Это действительно помогает.',
			engSentences: [
				{
					engSentences: ['It really helps.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Это часто случается.',
			engSentences: [
				{
					engSentences: ['It often happens.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Он предпочитает кофе.',
			engSentences: [
				{
					engSentences: ['He prefers coffee.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Он обычно заказывает технику онлайн.',
			engSentences: [
				{
					engSentences: ['He usually orders appliances online.'],
					isCorrect: true,
				},
				{
					engSentences: ['He usually orders gadgets online.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Это выглядит таким эффективным.',
			engSentences: [
				{
					engSentences: ['It looks so effective.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Она работает с понедельника по пятницу.',
			engSentences: [
				{
					engSentences: ['She works from Monday to Friday.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
	],
}

export default exercises_1
