import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Он пьёт вино.',
			engSentences: [
				{
					engSentences: ['He drinks vine.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'вино', engWord: 'vine' },
			],
		},
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
			words: [{ rusWord: 'верить в НЛО', engWord: 'believe UFO' }],
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
				{ rusWord: 'и', engWord: 'and' },
				{ rusWord: 'удача', engWord: 'luck' },
			],
		},
		{
			rusSentence: 'Он пьёт чай.',
			engSentences: [{ engSentences: ['He drinks tea.'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
		{
			rusSentence: 'Это стоит 60 рублей.',
			engSentences: [
				{
					engSentences: ['It costs sixty rubles.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'стоить', engWord: 'cost' },
				{ rusWord: 'шестьдесят', engWord: 'sixty' },
				{ rusWord: 'рубли', engWord: 'rubles' },
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
			rusSentence: 'Это часто возникает.',
			engSentences: [
				{
					engSentences: ['It often happens.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'возникать', engWord: 'happen' },
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
				{ rusWord: 'предпочитать', engWord: 'prefer' },
				{ rusWord: 'кофе', engWord: 'coffee' },
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
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'заказывать', engWord: 'order' },
				{ rusWord: 'техника', engWord: 'appliances' },
				{ rusWord: 'онлайн', engWord: 'online' },
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
				{ rusWord: 'выглядеть', engWord: 'look' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'эффективный', engWord: 'effective' },
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
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'с', engWord: 'from' },
				{ rusWord: 'понедельник', engWord: 'Monday' },
				{ rusWord: 'по', engWord: 'to' },
				{ rusWord: 'пятница', engWord: 'Friday' },
			],
		},
		{
			rusSentence: 'Он слышит шум.',
			engSentences: [
				{
					engSentences: ['He hears noise.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'слышать', engWord: 'hear' },
				{ rusWord: 'шум', engWord: 'noise' },
			],
		},
		{
			rusSentence: 'Он пьёт молоко.',
			engSentences: [
				{
					engSentences: ['He drinks milk.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'молоко', engWord: 'milk' },
			],
		},

		{
			rusSentence: 'На обед Эмма готовит салат.',
			engSentences: [
				{
					engSentences: ['For lunch Emma cooks the salad.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'на обед', engWord: 'for lunch' },
				{ rusWord: 'Эмма', engWord: 'Emma' },
				{ rusWord: 'готовить', engWord: 'cook' },
				{ rusWord: 'салат', engWord: 'salad' },
			],
		},
		{
			rusSentence: 'Она кладет овощи в чашку.',
			engSentences: [
				{
					engSentences: ['She puts the vegetables into the bowl.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'класть', engWord: 'put' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
				{ rusWord: 'в', engWord: 'into' },
				{ rusWord: 'чашка', engWord: 'bowl' },
			],
		},
	],
}

export default exercises_1
