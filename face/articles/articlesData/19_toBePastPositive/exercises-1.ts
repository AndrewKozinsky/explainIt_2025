import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Она была врачом.',
			engSentences: [{ engSentences: ['She was a doctor.'], isCorrect: true }],
			words: [{ rusWord: 'врач', engWord: 'doctor' }],
		},
		{
			rusSentence: 'Он был слесарем.',
			engSentences: [{ engSentences: ['He was a mechanic.'], isCorrect: true }],
			words: [{ rusWord: 'слесарь', engWord: 'mechanic' }],
		},
		{
			rusSentence: 'В то время я был ученым.',
			engSentences: [{ engSentences: ['At that time, I was a scientist.'], isCorrect: true }],
			words: [
				{ rusWord: 'в то время', engWord: 'at that time' },
				{ rusWord: 'ученый', engWord: 'scientist' },
			],
		},
		{
			rusSentence: 'Они были детьми.',
			engSentences: [{ engSentences: ['They were children.'], isCorrect: true }],
			words: [{ rusWord: 'дети', engWord: 'children' }],
		},
		{
			rusSentence: 'Это было испытанием.',
			engSentences: [{ engSentences: ['It was a challenge.'], isCorrect: true }],
			words: [{ rusWord: 'испытание', engWord: 'challenge' }],
		},
		{
			rusSentence: 'Я был ребёнком в глубине души.',
			engSentences: [{ engSentences: ['I was a child at heart.'], isCorrect: true }],
			words: [
				{ rusWord: 'ребёнок', engWord: 'child' },
				{
					note: 'Буквально переводится «в сердце»',
					rusWord: 'в глубине души',
					engWord: 'at heart',
				},
			],
		},
		{
			rusSentence: 'Он был совершенно один.',
			engSentences: [{ engSentences: ['He was completely alone.'], isCorrect: true }],
			words: [
				{ rusWord: 'совершенно', engWord: 'completely' },
				{
					note: 'В значении «быть в одиночестве», а не число 1.',
					rusWord: 'один',
					engWord: 'alone',
				},
			],
		},
		{
			rusSentence: 'Она была профессионалом.',
			engSentences: [
				{ engSentences: ['She was a professional.'], isCorrect: true },
				{
					engSentences: ['She was professional.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Перед существительными в единственном числе нужно ставить артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '. Подробнее о его назначении будет рассказано в следующей главе.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'профессионал', engWord: 'professional' }],
		},
		{
			rusSentence: 'Я был трудоголиком в лучшие времена.',
			engSentences: [
				{
					engSentences: ['I was a workaholic in the best of times.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'трудоголик', engWord: 'workaholic' },
				{ rusWord: 'в лучшие времена', engWord: 'in the best of times' },
			],
		},
		{
			rusSentence: 'Они были строителями днём, и грабителями ночью.',
			engSentences: [
				{
					engSentences: ['They were builders at day and robbers at night.'],
					isCorrect: true,
				},
				{
					engSentences: ['They were builders by day and robbers by night.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Предложение составлено правильно за исключением предлогов ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'by',
								},
								{
									type: 'text',
									text: '. Предлог ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'by',
								},
								{
									type: 'text',
									text: ' употребляется когда указывают время ',
								},
								{
									type: 'text',
									weight: 'bold',
									text: 'до которого ',
								},
								{
									type: 'text',
									text: 'событие произошло или произойдёт.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'Он уйдёт к утру',
								},
								{
									type: 'text',
									color: 'gray',
									text: ' (утром его уже не будет)',
								},
								{
									type: 'text',
									text: '.',
								},
								{
									type: 'text',
									text: 'He will go by morning.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,

							children: [
								{
									type: 'text',
									text: 'А у нас указывается время когда событие произойдёт. Тут лучше подходить предлог at.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'строители', engWord: 'builders' },
				{ rusWord: 'грабители', engWord: 'robbers' },
				{ rusWord: 'днём', engWord: 'at day' },
				{ rusWord: 'ночью', engWord: 'at night' },
			],
		},
		{
			rusSentence: 'Он был безграмотным человеком.',
			engSentences: [
				{ engSentences: ['He was an illiterate person.'], isCorrect: true },
				{ engSentences: ['He was an illiterate man.'], isCorrect: true },
			],
			words: [
				{
					note: 'Происходит от literate — грамотный',
					rusWord: 'безграмотный',
					engWord: 'illiterate',
				},
				{ rusWord: 'человек', engWord: 'person' },
			],
		},
		{
			rusSentence: 'Это было захватывающее шоу.',
			engSentences: [
				{
					engSentences: ['It was an exciting show.'],
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
									text: '-ing',
								},
								{
									type: 'text',
									text: ' описывают впечатление оказываемое на человека.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'захватывающее', engWord: 'exciting' },
				{ rusWord: 'шоу', engWord: 'show' },
			],
		},
		{
			rusSentence: 'Я был где-то внутри корабля.',
			engSentences: [{ engSentences: ['I was somewhere inside the ship.'], isCorrect: true }],
			words: [
				{ rusWord: 'быть уверенным', engWord: 'to be sure' },
				{ rusWord: 'быть готовым', engWord: 'to be ready' },
			],
		},
		{
			rusSentence: 'Наверняка он был моряком или рыбаком.',
			engSentences: [
				{
					engSentences: ['He was probably a fisherman or sailor.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
		},
		{
			rusSentence: 'Я был единственным студентом и это было ужасно.',
			engSentences: [
				{
					engSentences: ['I was the only student, and it was terrible.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'единственный', engWord: 'only' },
				{ rusWord: 'ужасно', engWord: 'terrible' },
			],
		},
		{
			// TODO
			rusSentence: 'Капитан был жестоким и не очень хорошим моряком.',
			engSentences: [
				{
					engSentences: ['The captain was violent and not a very good sailor.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'быть уверенным', engWord: 'to be sure' },
				{ rusWord: 'быть готовым', engWord: 'to be ready' },
			],
		},
		{
			// TODO
			rusSentence: 'Он был хорошим учеником.',
			engSentences: [{ engSentences: ['He was a good pupil.'], isCorrect: true }],
			words: [{ rusWord: 'популярный', engWord: 'popular' }],
		},
		{
			// TODO
			rusSentence: 'Парад был первым событием.',
			engSentences: [{ engSentences: ['The parade was the first event.'], isCorrect: true }],
			words: [{ rusWord: 'положение', engWord: 'situation' }],
		},
	],
}

export default exercises_1
