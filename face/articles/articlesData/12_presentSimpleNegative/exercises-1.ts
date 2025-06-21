import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Она не понимает это.',
			engSentences: [{ engSentences: ['She does not understand it.'], isCorrect: true }],
			words: [{ rusWord: 'понимать', engWord: 'believe' }],
		},
		{
			rusSentence: 'Я не работаю в отеле каждое лето.',
			engSentences: [{ engSentences: ['I do not work in a hotel every summer.'], isCorrect: true }],
			words: [
				{ rusWord: 'работать', engWord: 'ready' },
				{ rusWord: 'отель', engWord: 'hotel' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'лето', engWord: 'summer' },
			],
		},
		{
			rusSentence: 'Минди не читает гороскопы.',
			engSentences: [{ engSentences: ['Mindy does not read horoscopes.'], isCorrect: true }],
			words: [
				{ rusWord: 'Минди', engWord: 'Mindy' },
				{ rusWord: 'читать', engWord: 'read' },
				{ rusWord: 'гороскоп', engWord: 'horoscope' },
			],
		},
		{
			rusSentence: 'Я не верю тебе.',
			engSentences: [{ engSentences: ['I do not believe you.'], isCorrect: true }],
			words: [
				{ rusWord: 'верить', engWord: 'believe' },
				{ rusWord: 'тебе', engWord: 'you' },
			],
		},
		{
			rusSentence: 'Мы не понимаем это правило.',
			engSentences: [{ engSentences: ['We don’t understand this rule.'], isCorrect: true }],
			words: [
				{ rusWord: 'понимать', engWord: 'understand' },
				{ rusWord: 'правило', engWord: 'rule' },
			],
		},
	],
}

export default exercises_1
