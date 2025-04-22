import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Она открывает окно.',
			engSentences: [{ engSentences: ['She opens the window.'], isCorrect: true }],
			words: [
				{ rusWord: 'открыть', engWord: 'open' },
				{ rusWord: 'окно', engWord: 'window' },
			],
		},
		{
			rusSentence: 'Путешествие начинается сейчас!',
			engSentences: [{ engSentences: ['The journey begins now!'], isCorrect: true }],
			words: [
				{ rusWord: 'путешествие', engWord: 'journey' },
				{ rusWord: 'начинаться', engWord: 'begin' },
				{ rusWord: 'сейчас', engWord: 'now' },
			],
		},
		{
			rusSentence: 'Учебный год начинается в сентябре.',
			engSentences: [{ engSentences: ['The school year begins in September.'], isCorrect: true }],
			words: [
				{ rusWord: 'учебный', engWord: 'school' },
				{ rusWord: 'год', engWord: 'year' },
				{ rusWord: 'начинаться', engWord: 'begin' },
				{ rusWord: 'в', engWord: 'in' },
				{ rusWord: 'сентябрь', engWord: 'September' },
			],
		},
		{
			rusSentence: 'Мы изучаем математику.',
			engSentences: [{ engSentences: ['We study math.'], isCorrect: true }],
			words: [
				{ rusWord: 'изучать', engWord: 'study' },
				{ rusWord: 'математика', engWord: 'math' },
			],
		},
		{
			rusSentence: 'Дети ездят в деревню каждое лето.',
			engSentences: [
				{ engSentences: ['The children go to the village every summer.'], isCorrect: true },
				{ engSentences: ['The children go to a village every summer.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'дети', engWord: 'children' },
				{ rusWord: 'ездить', engWord: 'go to' },
				{ rusWord: 'деревня', engWord: 'village' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'лето', engWord: 'summer' },
			],
		},
		{
			rusSentence: 'Сотрудники запирают дверь каждый раз.',
			engSentences: [{ engSentences: ['The staff locks the door every time.'], isCorrect: true }],
			words: [
				{ rusWord: 'сотрудники', engWord: 'staff' },
				{ rusWord: 'запирать', engWord: 'lock' },
				{ rusWord: 'дверь', engWord: 'door' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'раз', engWord: 'time' },
			],
		},
		{
			rusSentence: 'Я беру такси из аэропорта каждый раз.',
			engSentences: [
				{ engSentences: ['I get a taxi from the airport every time.'], isCorrect: true },
				{ engSentences: ['I get a taxi from an airport every time.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'сотрудники', engWord: 'staff' },
				{ rusWord: 'запирать', engWord: 'lock' },
				{ rusWord: 'дверь', engWord: 'door' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'раз', engWord: 'time' },
			],
		},
	],
}

export default exercises_1
