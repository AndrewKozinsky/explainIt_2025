import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Он не в комнате.',
			engSentences: [{ engSentences: ['He is not in the room.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			rusSentence: 'Я имею в виду, он не такой хороший мальчик, как Том.',
			engSentences: [
				{ engSentences: ['I mean, he is not a good boy as Tom.'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Забыли про ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: '. Он должен стоять после подлежащего.',
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
									text: 'Отрицательную частицу ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'not',
								},
								{
									type: 'text',
									text: ' можно ставить после вспомогательного глагола. Сейчас он стоит перед ним.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'Я имею в виду', engWord: 'I mean' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'мальчик', engWord: 'boy' },
				{ rusWord: 'такой как', engWord: 'as' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не такой старый.',
			engSentences: [{ engSentences: ['He is not so old.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Это не так плохо.',
			engSentences: [{ engSentences: ['It is not so bad.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не молодой.',
			engSentences: [{ engSentences: ['He is not young.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Это абсолютно бесплатно.',
			engSentences: [{ engSentences: ['It is absolutely free.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Она не замужем.',
			engSentences: [{ engSentences: ['She is not married.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не доктор.',
			engSentences: [{ engSentences: ['He is not a doctor.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Этого не достаточно.',
			engSentences: [{ engSentences: ['It is not enough.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Я действительно голоден.',
			engSentences: [{ engSentences: ['I am really hungry.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не танцор.',
			engSentences: [{ engSentences: ['He is not a dancer.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Это не так вкусно.',
			engSentences: [{ engSentences: ['It is not so tasty.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Это не опасная ситуация.',
			engSentences: [{ engSentences: ['It is not so tasty.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Это не дорого.',
			engSentences: [{ engSentences: ['It is not expensive.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Ты не прав.',
			engSentences: [{ engSentences: ['You are not right.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не женат.',
			engSentences: [{ engSentences: ['He is not married.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он не зубной врач.',
			engSentences: [{ engSentences: ['He is not a dentist.'], isCorrect: true }],
			words: [
				{ rusWord: 'готов', engWord: 'ready' },
				{ rusWord: 'готов', engWord: 'ready' },
			],
		},
	],
}

export default exercises_1
