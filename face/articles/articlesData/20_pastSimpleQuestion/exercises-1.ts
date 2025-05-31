import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'У вас был хороший день?',
			engSentences: [{ engSentences: ['Did you have a good day?'], isCorrect: true }],
			words: [
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'день', engWord: 'day' },
			],
		},
		{
			rusSentence: 'Твой отец звонил?',
			engSentences: [{ engSentences: ['Did your father phone?'], isCorrect: true }],
			words: [
				{ rusWord: 'отец', engWord: 'father' },
				{ rusWord: 'звонить', engWord: 'phone' },
			],
		},
		{
			rusSentence: 'Вы слышали этот крик?',
			engSentences: [{ engSentences: ['Did you hear that scream?'], isCorrect: true }],
			words: [
				{ rusWord: 'слышать', engWord: 'hear' },
				{ rusWord: 'крик', engWord: 'scream' },
			],
		},
		{
			rusSentence: 'Вы отправили это сообщение?',
			engSentences: [{ engSentences: ['Did you send this message?'], isCorrect: true }],
			words: [
				{ rusWord: 'отправить', engWord: 'send' },
				{ rusWord: 'сообщение', engWord: 'message' },
			],
		},
		{
			rusSentence: 'У вас был плохой день?',
			engSentences: [{ engSentences: ['Did you have a bad day?'], isCorrect: true }],
			words: [
				{ rusWord: 'плохой', engWord: 'bad' },
				{ rusWord: 'день', engWord: 'day' },
			],
		},
	],
}

export default exercises_1
