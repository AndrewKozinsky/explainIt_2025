import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Интересно, он богат?',
			engSentences: [
				{ engSentences: ['I wonder, is he rich?'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									color: 'blue',
									text: 'Rich',
								},
								{
									type: 'text',
									text: ' — это не существительное. Поэтому перед ним не нужно ставить неопределённый артикль.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'интересно', engWord: 'I wonder ' },
				{ rusWord: 'богат', engWord: 'rich' },
			],
		},
		{
			rusSentence: 'Вас зовут Сергей?',
			engSentences: [
				{ engSentences: ['Are you Sergey?'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									text: 'Перед именами неопределённый артикль a не ставится. Ставьте перед неопределёнными существительными.',
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
									text: 'Форма глагола to be зависит от подлежащего, потому что в повествовательном оно стоит после него. И в вопросе перескакивает на место перед ним. После местоимения you будет использоваться to be в форме are.',
								},
							],
						},
					],
				},
			],
			words: [],
		},
	],
	offset: true,
}

export default exercises_1
