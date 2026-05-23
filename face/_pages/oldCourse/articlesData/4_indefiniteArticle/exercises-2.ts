import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Мы заказываем омлет на завтрак.',
			engSentences: [{ engSentences: ['We order an omelet for breakfast.'], isCorrect: true }],
			words: [
				{ rusWord: 'заказывать', engWord: 'order' },
				{ rusWord: 'омлет', engWord: 'omelet' },
				{ rusWord: 'на завтрак', engWord: 'for breakfast' },
			],
		},
		{
			rusSentence: 'Они приносят зонт когда идёт дождь.',
			engSentences: [{ engSentences: ['They bring an umbrella when it rains.'], isCorrect: true }],
			words: [
				{ rusWord: 'приносить', engWord: 'bring' },
				{ rusWord: 'зонт', engWord: 'umbrella' },
				{ rusWord: 'когда', engWord: 'when' },
				{ rusWord: 'дождить', engWord: 'it rains' },
			],
		},
		{
			rusSentence: 'Мы видим университет.',
			engSentences: [
				{
					engSentences: ['We see a university.'],
					isCorrect: true,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Тут странная ситуация когда university произносится с гласной, но в транскрипции начинается с j. Поэтому стоит артикль a, а не an.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'университет', engWord: 'university' },
			],
		},
		{
			rusSentence: 'Он назначает встречу каждый понедельник.',
			engSentences: [{ engSentences: ['He makes an appointment every Monday.'], isCorrect: true }],
			words: [
				{ rusWord: 'назначать встречу', engWord: 'make an appointment' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'понедельник', engWord: 'Monday' },
			],
		},
		{
			rusSentence: 'Ты отправляешь приглашение на каждое событие.',
			engSentences: [{ engSentences: ['You send an invitation for each event.'], isCorrect: true }],
			words: [
				{ rusWord: 'отправлять', engWord: 'send' },
				{ rusWord: 'приглашение', engWord: 'invitation' },
				{ rusWord: 'на каждое событие', engWord: 'for each event' },
			],
		},
		{
			rusSentence: 'Он видит аэропорт.',
			engSentences: [{ engSentences: ['He sees an airport.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'аэропорт', engWord: 'airport' },
			],
		},
		{
			rusSentence: 'Я вижу яблоко.',
			engSentences: [
				{
					engSentences: ['I see an apple.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'яблоко', engWord: 'apple' },
			],
		},
		{
			rusSentence: 'Мы видим аэропорт.',
			engSentences: [
				{
					engSentences: ['We see an airport.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'аэропорт', engWord: 'airport' },
			],
		},
		{
			rusSentence: 'Этот урок длится час.',
			engSentences: [
				{
					engSentences: ['This lesson lasts an hour.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'урок', engWord: 'lesson' },
				{ rusWord: 'длиться', engWord: 'last' },
				{ rusWord: 'час', engWord: 'hour' },
			],
		},
		{
			rusSentence: 'Он арендует квартиру.',
			engSentences: [
				{
					engSentences: ['He rents an apartment.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'арендовать', engWord: 'rent' },
				{ rusWord: 'квартира', engWord: 'apartment' },
			],
		},
	],
}

export default exercises_2
