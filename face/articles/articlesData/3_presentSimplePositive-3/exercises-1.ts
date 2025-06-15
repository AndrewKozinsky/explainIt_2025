import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Даша любит сырые овощи.',
			engSentences: [
				{ engSentences: ['Dasha loves raw vegetables.'], isCorrect: true },
				{ engSentences: ['Dasha love raw vegetables.'], isCorrect: false },
			],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
		{
			rusSentence: 'Маша часто путешествует.',
			engSentences: [{ engSentences: ['Masha often travels.'], isCorrect: true }],
			words: [
				{ rusWord: 'Маша', engWord: 'Masha' },
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'путешествовать', engWord: 'travel' },
			],
		},
		{
			rusSentence: 'Слоны едят траву.',
			engSentences: [{ engSentences: ['Elephants eat grass.'], isCorrect: true }],
			words: [
				{ rusWord: 'слоны', engWord: 'elephants' },
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'трава', engWord: 'grass' },
			],
		},
		{
			rusSentence: 'Джон понимает эту проблему.',
			engSentences: [{ engSentences: ['John understands this problem.'], isCorrect: true }],
			words: [
				{ rusWord: 'Джон', engWord: 'John' },
				{ rusWord: 'понимать', engWord: 'understand' },
				{ rusWord: 'эта', engWord: 'this' },
				{ rusWord: 'проблема', engWord: 'problem' },
			],
		},
		{
			rusSentence: 'Змеи живут на земле.',
			engSentences: [{ engSentences: ['Snakes live on the ground.'], isCorrect: true }],
			words: [
				{ rusWord: 'змеи', engWord: 'snakes' },
				{ rusWord: 'жить', engWord: 'live' },
				{ rusWord: 'на земле', engWord: 'on the ground' },
			],
		},
		{
			rusSentence: 'Лена пьёт кофе.',
			engSentences: [{ engSentences: ['Lena drinks coffee.'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'кофе', engWord: 'coffee' },
			],
		},
		{
			rusSentence: 'Эндрю любит зелёный чай.',
			engSentences: [{ engSentences: ['Andrew loves green tea.'], isCorrect: true }],
			words: [
				{ rusWord: 'Эндрю', engWord: 'Andrew' },
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'зелёный', engWord: 'green' },
				{ rusWord: 'чай', engWord: 'tea' },
			],
		},
		{
			rusSentence: 'Экстренные службы работают круглосуточно.',
			engSentences: [
				{ engSentences: ['Emergency services work 24/7.'], isCorrect: true },
				{ engSentences: ['Emergency services operate 24/7.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'экстренные службы', engWord: 'emergency services' },
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'круглосуточно', engWord: '24/7' },
			],
		},
		{
			rusSentence: 'Виктория выглядит хорошо.',
			engSentences: [{ engSentences: ['Victoria looks good.'], isCorrect: true }],
			words: [
				{ rusWord: 'Виктория', engWord: 'Victoria' },
				{ rusWord: 'выглядеть', engWord: 'look' },
				{ rusWord: 'хорошо', engWord: 'good' },
			],
		},
		{
			rusSentence: 'Я люблю яблоки.',
			engSentences: [{ engSentences: ['I like apples.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'яблоки', engWord: 'apples' },
			],
		},
		{
			rusSentence: 'Дядя Джордж читает английские книги.',
			engSentences: [{ engSentences: ['Uncle George reads English books.'], isCorrect: true }],
			words: [
				{ rusWord: 'дядя', engWord: 'uncle' },
				{ rusWord: 'Джордж', engWord: 'George' },
				{ rusWord: 'читать', engWord: 'read' },
				{ rusWord: 'английские', engWord: 'English' },
				{ rusWord: 'книги', engWord: 'books' },
			],
		},
		{
			rusSentence: 'Света растет активной и позитивной девочкой.',
			engSentences: [
				{
					engSentences: ['Sveta grows active and positive girl.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Света', engWord: 'Sveta' },
				{ rusWord: 'расти', engWord: 'grow' },
				{ rusWord: 'активный', engWord: 'active' },
				{ rusWord: 'позитивный', engWord: 'positive' },
				{ rusWord: 'девочка', engWord: 'girl' },
			],
		},
		{
			rusSentence: 'Дети любят мороженое.',
			engSentences: [
				{ engSentences: ['Children like ice cream.'], isCorrect: true },
				{ engSentences: ['Kids like ice cream.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'дети', engWord: 'children' },
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'мороженое', engWord: 'ice cream' },
			],
		},
		{
			rusSentence: 'Я читаю книги.',
			engSentences: [{ engSentences: ['I read books.'], isCorrect: true }],
			words: [
				{ rusWord: 'читать', engWord: 'read' },
				{ rusWord: 'книги', engWord: 'books' },
			],
		},
		{
			rusSentence: 'Джон ненавидит чеснок.',
			engSentences: [{ engSentences: ['John hates garlic'], isCorrect: true }],
			words: [
				{ rusWord: 'Джон', engWord: 'John' },
				{ rusWord: 'ненавидеть', engWord: 'hate' },
				{ rusWord: 'чеснок', engWord: 'garlic' },
			],
		},
		{
			rusSentence: 'Ежи едят червей.',
			engSentences: [{ engSentences: ['Hedgehogs eat worms.'], isCorrect: true }],
			words: [
				{ rusWord: 'ежи', engWord: 'hedgehogs' },
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'черви', engWord: 'worms' },
			],
		},
		{
			rusSentence: 'Они редко пьют молоко.',
			engSentences: [{ engSentences: ['They seldom drink milk.'], isCorrect: true }],
			words: [
				{ rusWord: 'редко', engWord: 'seldom' },
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'молоко', engWord: 'milk' },
			],
		},
		{
			rusSentence: 'Дональд часто готовит.',
			engSentences: [{ engSentences: ['Donald often cooks.'], isCorrect: true }],
			words: [
				{ rusWord: 'Дональд', engWord: 'Donald' },
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'готовить', engWord: 'cook' },
			],
		},

		{
			rusSentence: 'Солнце встаёт на востоке.',
			engSentences: [
				{
					engSentences: ['The sun rises in the east.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Солнце', engWord: 'the sun' },
				{ rusWord: 'вставать (о Солнце)', engWord: 'rise' },
				{ rusWord: 'на востоке', engWord: 'in the east' },
			],
		},
		{
			rusSentence: 'Попугаи едят яблоки.',
			engSentences: [{ engSentences: ['Parrots eat apples.'], isCorrect: true }],
			words: [
				{ rusWord: 'попугаи', engWord: 'parrots' },
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'яблоки', engWord: 'apples' },
			],
		},
	],
}

export default exercises_2
