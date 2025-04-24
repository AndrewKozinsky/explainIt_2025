import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: '30 минут каждый день — это идеальный вариант.',
			engSentences: [{ engSentences: ['30 minutes every day is ideal.'], isCorrect: true }],
			words: [
				{ rusWord: 'минута', engWord: 'minute' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'день', engWord: 'day' },
				{ rusWord: 'идеальный вариант', engWord: 'ideal' },
			],
		},
		{
			rusSentence: 'Он очень хороший друг.',
			engSentences: [{ engSentences: ['He is a very good friend'], isCorrect: true }],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'друг', engWord: 'friend' },
			],
		},
		{
			rusSentence: 'Его одежда ужасна. Она такая старомодная.',
			engSentences: [{ engSentences: ['His clothes are awful. They are so old-fashioned.'], isCorrect: true }],
			words: [
				{ rusWord: 'его', engWord: 'his' },
				{ rusWord: 'одежда', engWord: 'clothes' },
				{ rusWord: 'ужасна', engWord: 'awful' },
				{ rusWord: 'старомодный', engWord: 'old-fashioned' },
			],
		},
		{
			rusSentence: 'Я продавец, ты клиент.',
			engSentences: [{ engSentences: ['I am the shopkeeper, you are the customer.'], isCorrect: true }],
			words: [
				{ rusWord: 'продавец', engWord: 'shopkeeper' },
				{ rusWord: 'клиент', engWord: 'customer' },
			],
		},
	],
}

export default exercises_2
