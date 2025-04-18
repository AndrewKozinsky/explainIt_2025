import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
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
	],
}

export default exercises_2
