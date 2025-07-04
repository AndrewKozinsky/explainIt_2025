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
		{
			rusSentence: 'Он купил 10 дынь вместо 10 лимонов?',
			engSentences: [
				{
					engSentences: [
						'Did he bought 10 melons instead of 10 lemons?',
						'Did he bought ten melons instead of ten lemons?',
					],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'покупать', engWord: 'buy' },
				{ rusWord: '10', engWord: 'ten' },
				{ rusWord: 'дыня', engWord: 'melon' },
				{ rusWord: 'лимон', engWord: 'lemon' },
			],
		},
		{
			rusSentence: 'Ты получил мой факс?',
			engSentences: [{ engSentences: ['Did you get my fax?'], isCorrect: true }],
			words: [
				{ rusWord: 'получать', engWord: 'get' },
				{ rusWord: 'факс', engWord: 'fax' },
			],
		},
		{
			rusSentence: 'Она надела толстовку?',
			engSentences: [{ engSentences: ['Did she wear a sweatshirt?'], isCorrect: true }],
			words: [
				{ rusWord: 'надевать', engWord: 'wear' },
				{ rusWord: 'толстовка', engWord: 'sweatshirt' },
			],
		},
	],
}

export default exercises_1
