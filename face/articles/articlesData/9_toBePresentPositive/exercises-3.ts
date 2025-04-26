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
	],
}

export default exercises_3
