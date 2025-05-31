import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Мобильный криптокошелёк отличается высокой безопасностью.',
			engSentences: [
				{
					engSentences: ['A mobile crypto wallet is very secure.'],
					isCorrect: true,
				},
				{
					engSentences: ['Mobile crypto wallet is very secure'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Перед ',
								},
								{
									type: 'text',
									weight: 'bold',
									text: 'Mobile crypto',
								},
								{
									type: 'text',
									text: ' забыли неопределённый артикль ',
								},
								{ type: 'text', color: 'blue', weight: 'bold', text: 'a' },
								{
									type: 'text',
									text: '. Он нужен когда сообщают о типичном поведении объекта.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'мобильный', engWord: 'mobile' },
				{ rusWord: 'криптокошелёк', engWord: 'crypto wallet' },
				{
					note: 'В контексте данного предложения слово «отличается» можно перевести через very.',
					rusWord: 'очень',
					engWord: 'very',
				},
				{ rusWord: 'безопасный', engWord: 'secure' },
			],
		},
		{
			rusSentence: 'Это заметно и является проблемой.',
			engSentences: [
				{
					engSentences: ['It is noticed and is an issue.'],
					isCorrect: true,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Верно! Прилагательные с окончанием ',
								},
								{
									type: 'text',
									color: 'blue',
									text: '-ed',
								},
								{
									type: 'text',
									text: ' описывают эмоции человека.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It is noticed and is a problem.'],
					isCorrect: true,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Верно! Прилагательные с окончанием ',
								},
								{
									type: 'text',
									color: 'blue',
									text: '-ed',
								},
								{
									type: 'text',
									text: ' описывают эмоции человека.',
								},
							],
						},
					],
				},
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Глагол ',
								},
								{ type: 'text', color: 'blue', weight: 'bold', text: 'be' },
								{
									type: 'text',
									text: ' должен стоять перед каждым дополнением: и перед ',
								},
								{
									type: 'text',
									weight: 'bold',
									text: 'noticed',
								},
								{
									type: 'text',
									text: ' и перед ',
								},
								{
									type: 'text',
									weight: 'bold',
									text: 'problem',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'заметный', engWord: 'noticed' },
				{ rusWord: 'проблема', engWord: 'issue' },
			],
		},
		{
			rusSentence: 'Они разрешают детям играть в видеоигры.',
			engSentences: [{ engSentences: ['They let children play video games.'], isCorrect: true }],
			words: [
				{ rusWord: 'позволять', engWord: 'let' },
				{ rusWord: 'дети', engWord: 'let' },
				{ rusWord: 'играть', engWord: 'play' },
				{ rusWord: 'видеоигры', engWord: 'video games' },
			],
		},
		{
			note: 'Похоже это тема про нулевой артикль. Нужно изучить. Вот, что ответил ЧатГПТ на вопрос почему тут нет артиклей: In English grammar, the indefinite article "a" is typically used before singular countable nouns that are not specific or previously mentioned. When listing items in a general sense or as part of a category, the indefinite article is often omitted, especially when the items are being grouped together as a collective or category.\nIn your example, "potato," "tomato," and "onion" are being presented as general examples of soup ingredients. Since they are listed as part of a category of usual soup ingredients, the indefinite article "a" is not necessary before each item. The omission of the article helps to suggest that these items are examples or representatives of a larger group rather than specific individual instances.',
			rusSentence: 'Картошка, помидоры и лук — обычные ингредиенты супа.',
			engSentences: [
				{
					engSentences: ['Potatoes, tomatoes and onions are common soup ingredients.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'картошка', engWord: 'potatoes' },
				{ rusWord: 'помидоры', engWord: 'tomatoes' },
				{ rusWord: 'лук', engWord: 'onions' },
				{ rusWord: 'обычный', engWord: 'common' },
				{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' },
			],
		},
	],
}

export default exercises_3
