import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Вам нужно иметь карту чтобы купить билет.',
			engSentences: [{ engSentences: ['You need to have a card to buy a ticket.'], isCorrect: true }],
			words: [
				{ rusWord: 'нужно', engWord: 'need' },
				{ rusWord: 'карта', engWord: 'card' },
				{ rusWord: 'покупать', engWord: 'buy' },
				{ rusWord: 'билет', engWord: 'ticket' },
			],
		},
		{
			rusSentence: 'Мой брат любит есть апельсины.',
			engSentences: [{ engSentences: ['My brother likes eating oranges.'], isCorrect: true }],
			words: [
				{ rusWord: 'брат', engWord: 'brother' },
				{ rusWord: 'любить', engWord: 'like' },
				{ rusWord: 'есть', engWord: 'eat' },
				{ rusWord: 'апельсин', engWord: 'orange' },
			],
		},
		{
			rusSentence: 'Я хочу побыть одна.',
			engSentences: [{ engSentences: ['I want to be alone.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'быть одной', engWord: 'alone' },
			],
		},
		{
			rusSentence: 'Мне нужно найти еду.',
			engSentences: [{ engSentences: ['I need to find food.'], isCorrect: true }],
			words: [
				{ rusWord: 'нуждаться', engWord: 'need' },
				{ rusWord: 'находить', engWord: 'find' },
				{ rusWord: 'еда', engWord: 'food' },
			],
		},
		{
			rusSentence: 'Я согласился им помочь, но на самом деле я не знал, что делать.',
			engSentences: [
				{ engSentences: ['I agreed to help them, but really I did not know what to do.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'соглашаться', engWord: 'agreed' },
				{ rusWord: 'помогать', engWord: 'help' },
				{ rusWord: 'но', engWord: 'but' },
				{ rusWord: 'на самом деле', engWord: 'really' },
				{ rusWord: 'знать', engWord: 'know' },
				{ rusWord: 'что', engWord: 'what' },
				{ rusWord: 'делать', engWord: 'do' },
			],
		},
		{
			rusSentence: 'Я хотел спросить дядю о моем отце.',
			engSentences: [{ engSentences: ['I wanted to ask my uncle about my father.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'просить', engWord: 'ask' },
				{ rusWord: 'дядя', engWord: 'uncle' },
				{ rusWord: 'о чём-то', engWord: 'about' },
				{ rusWord: 'отец', engWord: 'father' },
			],
		},
		{
			rusSentence: 'Мы обещаем Нику не сообщать ему счет.',
			engSentences: [{ engSentences: ['We promise Nick not to tell him the score.'], isCorrect: true }],
			words: [
				{ rusWord: 'обещать', engWord: 'promise' },
				{ rusWord: 'сообщать', engWord: 'tell' },
				{ rusWord: 'счет игры', engWord: 'score' },
			],
		},
		{
			rusSentence: 'Анна попросила Софью забрать ее вещи из химчистки.',
			engSentences: [{ engSentences: ['Bridget asked Hector to collect her dry cleaning.'], isCorrect: true }],
			words: [
				{ rusWord: 'Анна', engWord: 'Ann' },
				{ rusWord: 'просить', engWord: 'ask' },
				{ rusWord: 'Софья', engWord: 'Sofia' },
				{ rusWord: 'забирать вещи из химчистики', engWord: 'collect dry cleaning' },
			],
		},
		{
			rusSentence: 'Вика хочет стать голливудской кинозвездой.',
			engSentences: [{ engSentences: ['Vika wants to be a Hollywood movie star.'], isCorrect: true }],
			words: [
				{ rusWord: 'Вика', engWord: 'Vika' },
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'Голливуд', engWord: 'Hollywood' },
				{ rusWord: 'кинозвезда', engWord: 'movie star' },
			],
		},
		{
			rusSentence: 'Не хочу быть нахлебником.',
			engSentences: [{ engSentences: ['I do not want to be a freeloader.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'go' },
				{ rusWord: 'нахлебник', engWord: 'freeloader' },
			],
		},
	],
	offset: true,
}

export default exercises_1
