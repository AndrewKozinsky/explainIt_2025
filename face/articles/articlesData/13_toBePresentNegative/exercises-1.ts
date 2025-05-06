import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Он не в комнате.',
			engSentences: [{ engSentences: ['He is not in the room.'], isCorrect: true }],
			words: [{ rusWord: 'комната', engWord: 'room' }],
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
			rusSentence: 'Он не такой старый.',
			engSentences: [{ engSentences: ['He is not so old.'], isCorrect: true }],
			words: [
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'старый', engWord: 'old' },
			],
		},
		{
			rusSentence: 'Это не так плохо.',
			engSentences: [{ engSentences: ['It is not so bad.'], isCorrect: true }],
			words: [
				{ rusWord: 'так', engWord: 'so' },
				{ rusWord: 'плохо', engWord: 'bad' },
			],
		},
		{
			rusSentence: 'Он не молодой.',
			engSentences: [{ engSentences: ['He is not young.'], isCorrect: true }],
			words: [{ rusWord: 'молодой', engWord: 'young' }],
		},
		{
			rusSentence: 'Это абсолютно бесплатно.',
			engSentences: [{ engSentences: ['It is absolutely free.'], isCorrect: true }],
			words: [
				{ rusWord: 'абсолютно', engWord: 'absolutely' },
				{ rusWord: 'бесплатно', engWord: 'free' },
			],
		},
		{
			rusSentence: 'Она не замужем.',
			engSentences: [{ engSentences: ['She is not married.'], isCorrect: true }],
			words: [{ rusWord: 'быть замужем', engWord: 'married' }],
		},
		{
			rusSentence: 'Он не доктор.',
			engSentences: [{ engSentences: ['He is not a doctor.'], isCorrect: true }],
			words: [{ rusWord: 'доктор', engWord: 'doctor' }],
		},
		{
			rusSentence: 'Этого не достаточно.',
			engSentences: [{ engSentences: ['It is not enough.'], isCorrect: true }],
			words: [{ rusWord: 'достаточно', engWord: 'enough' }],
		},
		{
			rusSentence: 'Я действительно голоден.',
			engSentences: [{ engSentences: ['I am really hungry.'], isCorrect: true }],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'голоден', engWord: 'hungry' },
			],
		},
		{
			rusSentence: 'Он не танцор.',
			engSentences: [{ engSentences: ['He is not a dancer.'], isCorrect: true }],
			words: [{ rusWord: 'танцор', engWord: 'dancer' }],
		},
		{
			rusSentence: 'Это не так вкусно.',
			engSentences: [{ engSentences: ['It is not so tasty.'], isCorrect: true }],
			words: [
				{ rusWord: 'так', engWord: 'so' },
				{ rusWord: 'вкусно', engWord: 'tasty' },
			],
		},
		{
			rusSentence: 'Это не опасная ситуация.',
			engSentences: [{ engSentences: ['It is not a dangerous situation.'], isCorrect: true }],
			words: [
				{ rusWord: 'опасный', engWord: 'dangerous' },
				{ rusWord: 'ситуация', engWord: 'situation' },
			],
		},
		{
			rusSentence: 'Это не дорого.',
			engSentences: [{ engSentences: ['It is not expensive.'], isCorrect: true }],
			words: [{ rusWord: 'дорого', engWord: 'expensive' }],
		},
		{
			rusSentence: 'Ты не прав.',
			engSentences: [{ engSentences: ['You are not right.'], isCorrect: true }],
			words: [{ rusWord: 'быть правым', engWord: 'right' }],
		},
		{
			rusSentence: 'Он не женат.',
			engSentences: [{ engSentences: ['He is not married.'], isCorrect: true }],
			words: [{ rusWord: 'быть женатым', engWord: 'married' }],
		},
		{
			rusSentence: 'Он не зубной врач.',
			engSentences: [{ engSentences: ['He is not a dentist.'], isCorrect: true }],
			words: [{ rusWord: 'зубной врач', engWord: 'dentist' }],
		},
		{
			rusSentence: 'Это не легко.',
			engSentences: [{ engSentences: ['It is not easy.'], isCorrect: true }],
			words: [{ rusWord: 'легко', engWord: 'easy' }],
		},
		{
			rusSentence: 'Это не популярно сейчас.',
			engSentences: [{ engSentences: ['It is not popular now.'], isCorrect: true }],
			words: [
				{ rusWord: 'популярный', engWord: 'popular' },
				{ rusWord: 'сейчас', engWord: 'now' },
			],
		},
		{
			rusSentence: 'Я вижу, это не легко.',
			engSentences: [{ engSentences: ['I see it is not easy.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'легко', engWord: 'easy' },
			],
		},
		{
			rusSentence: 'Он молодой или старый?',
			engSentences: [{ engSentences: ['Is he young or old?'], isCorrect: true }],
			words: [
				{ rusWord: 'молодой', engWord: 'young' },
				{ rusWord: 'старый', engWord: 'old' },
			],
		},
		{
			rusSentence: 'Я не смелый.',
			engSentences: [{ engSentences: ['I am not brave.'], isCorrect: true }],
			words: [{ rusWord: 'смелый', engWord: 'brave' }],
		},
		{
			rusSentence: 'Вы не очень сильный мужчина.',
			engSentences: [{ engSentences: ['You are not a very strong man.'], isCorrect: true }],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'сильный', engWord: 'strong' },
				{ rusWord: 'мужчина', engWord: 'man' },
			],
		},
		{
			rusSentence: 'Инжирное дерево не высокое.',
			engSentences: [{ engSentences: ['A fig tree is not tall.'], isCorrect: true }],
			words: [
				{ rusWord: 'инжирное дерево', engWord: 'fig tree' },
				{ rusWord: 'высокий', engWord: 'tall' },
			],
		},
		{
			rusSentence: 'Однако это не простой остров',
			engSentences: [{ engSentences: ['However, this is not a simple island'], isCorrect: true }],
			words: [
				{ rusWord: 'однако', engWord: 'however' },
				{ rusWord: 'простой', engWord: 'simple' },
				{ rusWord: 'остров', engWord: 'island' },
			],
		},
	],
}

export default exercises_1
