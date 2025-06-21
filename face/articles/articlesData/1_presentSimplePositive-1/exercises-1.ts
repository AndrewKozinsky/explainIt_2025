import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Они строят дома.',
			engSentences: [
				{
					engSentences: ['They build houses.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дома', engWord: 'houses' },
			],
		},
		{
			rusSentence: 'Я часто готовлю.',
			engSentences: [
				{
					engSentences: ['I often cook.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'готовить', engWord: 'cook' },
			],
		},
		{
			rusSentence: 'Они пьют сок.',
			engSentences: [{ engSentences: ['They drink juice.'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'сок', engWord: 'juice' },
			],
		},
		{
			rusSentence: 'Мы любим детей.',
			engSentences: [
				{
					engSentences: ['We love children.'],
					isCorrect: true,
				},
				{
					engSentences: ['We love kids.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'дети', engWord: 'children' },
				{ rusWord: 'дети', engWord: 'kids' },
			],
		},
		{
			rusSentence: 'Они красят стены.',
			engSentences: [
				{
					engSentences: ['They paint walls.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'красить', engWord: 'paint' },
				{ rusWord: 'стены', engWord: 'walls' },
			],
		},
		{
			rusSentence: 'Ты обычно выигрываешь.',
			engSentences: [
				{
					engSentences: ['You usually win.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'выигрывать', engWord: 'win' },
			],
		},
		{
			rusSentence: 'Мы всегда пьём чай.',
			engSentences: [
				{
					engSentences: ['We always drink tea.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
		{
			rusSentence: 'Я продаю, ты покупаешь.',
			engSentences: [
				{
					engSentences: ['I sell, you buy.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'продавать', engWord: 'sell' },
				{ rusWord: 'покупать', engWord: 'buy' },
			],
		},
		{
			rusSentence: 'Вы обычно смотрите телевизор.',
			engSentences: [
				{
					engSentences: ['You usually watch TV.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'обычно', engWord: 'usually' },
				{ rusWord: 'смотреть', engWord: 'watch' },
				{ rusWord: 'телевизор', engWord: 'TV' },
			],
		},
		{
			rusSentence: 'Я путешествую каждое лето.',
			engSentences: [
				{
					engSentences: ['I travel every summer.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'путешествовать', engWord: 'travel' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'лето', engWord: 'summer' },
			],
		},
		{
			rusSentence: 'Они едят мясо и рыбу.',
			engSentences: [{ engSentences: ['They eat meat and fish.'], isCorrect: true }],
			words: [
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'мясо', engWord: 'meat' },
				{ rusWord: 'и', engWord: 'and' },
				{ rusWord: 'рыба', engWord: 'fish' },
			],
		},
		{
			rusSentence: 'Ты преподаёшь математику.',
			engSentences: [
				{
					engSentences: ['You teach math.'],
					isCorrect: true,
				},
				{
					engSentences: ['You teach mathematics.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'преподавать', engWord: 'teach' },
				{ rusWord: 'математика', engWord: 'math' },
				{ rusWord: 'математика', engWord: 'mathematics' },
			],
		},
		{
			rusSentence: 'Они редко пекут пиццу.',
			engSentences: [
				{
					engSentences: ['They rarely bake pizza.'],
					isCorrect: true,
				},
				{
					engSentences: ['They seldom make pizza.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'редко', engWord: 'rarely' },
				{ rusWord: 'редко', engWord: 'seldom' },
				{ rusWord: 'печь', engWord: 'bake' },
				{ rusWord: 'pizza', engWord: 'pizza' },
			],
		},
		{
			rusSentence: 'Я ненавижу насилие.',
			engSentences: [
				{
					engSentences: ['I hate violence.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'ненавидеть', engWord: 'hate' },
				{ rusWord: 'насилие', engWord: 'violence' },
			],
		},
		{
			rusSentence: 'Кошки любят молоко.',
			engSentences: [
				{
					engSentences: ['Cats love milk.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'кошки', engWord: 'cats' },
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'молоко', engWord: 'milk' },
			],
		},
		{
			rusSentence: 'Я люблю дождливую погоду.',
			engSentences: [
				{
					engSentences: ['I love rainy weather.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'дождливый', engWord: 'rainy' },
				{ rusWord: 'погода', engWord: 'weather' },
			],
		},
	],
}

export default exercises_1
