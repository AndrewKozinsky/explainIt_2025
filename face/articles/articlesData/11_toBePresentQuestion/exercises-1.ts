import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Вы готовы?',
			engSentences: [{ engSentences: ['Are you ready?'], isCorrect: true }],
			words: [{ rusWord: 'готов', engWord: 'ready' }],
		},
		{
			rusSentence: 'Он счастливый?',
			engSentences: [{ engSentences: ['Is he happy?'], isCorrect: true }],
			words: [{ rusWord: 'счастливый', engWord: 'happy' }],
		},
		{
			rusSentence: 'Они заняты?',
			engSentences: [{ engSentences: ['Are they busy?'], isCorrect: true }],
			words: [{ rusWord: 'занят', engWord: 'busy' }],
		},
		{
			rusSentence: 'Оля не популярная певица.',
			engSentences: [{ engSentences: ['Olya is not a popular singer.'], isCorrect: true }],
			words: [
				{ rusWord: 'популярный', engWord: 'popular' },
				{ rusWord: 'певица', engWord: 'a singer' },
			],
		},
		{
			rusSentence: 'Я не ребенок, мне 44 года.',
			engSentences: [{ engSentences: ['I am not a child I am 44.'], isCorrect: true }],
			words: [
				{ rusWord: 'ребёнок', engWord: 'child' },
				{ rusWord: '44 года', engWord: '44 years old' },
			],
		},
		{
			rusSentence: 'Я не ребёнок, я замужняя женщина.',
			engSentences: [
				{
					engSentences: ['I am not a child, I am a married woman.', 'I am not a kid, I am a married woman.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'ребёнок', engWord: 'a child' },
				{ rusWord: 'замужняя', engWord: 'married' },
				{ rusWord: 'женщина', engWord: 'a woman' },
			],
		},
		{
			rusSentence: 'Семинар — это не простое обсуждение.',
			engSentences: [
				{
					engSentences: ['The workshop is not a simple discussion.'],
					isCorrect: true,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Вариант с The workshop возможен потому что могут иметь конкретный семинар.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'семинар', engWord: 'workshop' },
				{ rusWord: 'простой', engWord: 'simple' },
				{ rusWord: 'обсуждение', engWord: 'a discussion' },
			],
		},
		{
			rusSentence: 'Он не болен.',
			engSentences: [{ engSentences: ['He isn’t sick.'], isCorrect: true }],
			words: [{ rusWord: 'болен', engWord: 'sick' }],
		},
		{
			rusSentence: 'Я не уставший.',
			engSentences: [{ engSentences: ['I am not tired.'], isCorrect: true }],
			words: [{ rusWord: 'уставший', engWord: 'tired' }],
		},
		{
			rusSentence: 'Европейские блюда не всегда полезные.',
			engSentences: [
				{
					engSentences: ['European dishes are not always healthy'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'европейский', engWord: 'european' },
				{ rusWord: 'блюдо', engWord: 'dish' },
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'полезный', engWord: 'healthy' },
			],
		},
		{
			rusSentence: 'Приведений не существует.',
			engSentences: [{ engSentences: ['Ghosts are not real.'], isCorrect: true }],
			words: [
				{ rusWord: 'приведение', engWord: 'a ghost' },
				{ rusWord: 'настоящий', engWord: 'real' },
			],
		},
		{
			rusSentence: 'Он хороший водопроводчик?',
			engSentences: [{ engSentences: ['Is he a good plumber?'], isCorrect: true }],
			words: [{ rusWord: 'водопроводчик', engWord: 'a plumber' }],
		},
		{
			rusSentence: 'Профессиональные спортсмены не всегда здоровы.',
			engSentences: [
				{
					engSentences: ['Professional sportsmen are not always healthy.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'профессиональный', engWord: 'professional' },
				{ rusWord: 'спортсмен', engWord: 'sportsmen' },
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'здоровый', engWord: 'healthy' },
			],
		},
		{
			rusSentence: 'Он внутри?',
			engSentences: [{ engSentences: ['Is he inside?'], isCorrect: true }],
			words: [{ rusWord: 'внутри', engWord: 'inside' }],
		},
		{
			rusSentence: 'Йога опасный спорт?',
			engSentences: [{ engSentences: ['Is yoga a dangerous sport?'], isCorrect: true }],
			words: [
				{ rusWord: 'йога', engWord: 'yoga' },
				{ rusWord: 'опасный', engWord: 'dangerous' },
			],
		},
		{
			rusSentence: 'Это дети.',
			engSentences: [{ engSentences: ['They are children.'], isCorrect: true }],
			words: [{ rusWord: 'ребёнок', engWord: 'child' }],
		},
		{
			rusSentence: 'Это очень забавно?',
			engSentences: [{ engSentences: ['Is it very funny?'], isCorrect: true }],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'забавно', engWord: 'funny' },
			],
		},
		{
			rusSentence: 'Это маскарадный костюм?',
			engSentences: [{ engSentences: ['Is it fancy dress?'], isCorrect: true }],
			words: [{ rusWord: 'маскарадный костюм', engWord: 'fancy dress' }],
		},
		{
			rusSentence: 'Открытая Россия — не политическая партия.',
			engSentences: [
				{
					engSentences: ['Open Russia is not a political party.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'открытый', engWord: 'open' },
				{ rusWord: 'Россия', engWord: 'Russia' },
				{ rusWord: 'политический', engWord: 'political' },
				{ rusWord: 'партия', engWord: 'party' },
			],
		},
	],
}

export default exercises_1
