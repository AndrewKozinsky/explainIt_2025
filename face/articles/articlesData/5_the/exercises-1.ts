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
				{ rusWord: 'брать такси', engWord: 'get a taxi' },
				{ rusWord: 'из', engWord: 'from' },
				{ rusWord: 'аэропорт', engWord: 'airport' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'раз', engWord: 'time' },
			],
		},
		{
			rusSentence: 'Камин — дорогая вещь.',
			engSentences: [{ engSentences: ['A fireplace is an expensive thing.'], isCorrect: true }],
			words: [
				{ rusWord: 'камин', engWord: 'fireplace' },
				{ rusWord: 'дорогой', engWord: 'expensive' },
				{ rusWord: 'вещь', engWord: 'thing' },
			],
		},
		{
			// TODO
			rusSentence: 'Девочка ест вкусное печенье.',
			engSentences: [{ engSentences: ['The girl eats tasty cookies.'], isCorrect: true }],
			words: [
				{ rusWord: 'камин', engWord: 'fireplace' },
				{ rusWord: 'дорогой', engWord: 'expensive' },
				{ rusWord: 'вещь', engWord: 'thing' },
			],
		},
		{
			rusSentence: 'Она ставит чашку на журнальный столик.',
			engSentences: [{ engSentences: ['She puts the cup on the coffee table.'], isCorrect: true }],
			words: [
				{ rusWord: 'класть', engWord: 'put' },
				{ rusWord: 'чашка', engWord: 'cup' },
				{ rusWord: 'журнальный столик', engWord: 'coffee table' },
			],
		},
	],
}

export default exercises_1
