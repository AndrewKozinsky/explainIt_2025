import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я действительно поверил ему.',
			engSentences: [
				{
					engSentences: ['I really believed him.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'верить', engWord: 'believe' },
			],
		},
		{
			rusSentence: 'Он помыл своё тело.',
			engSentences: [
				{
					engSentences: ['He washed his body.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'мыть', engWord: 'wash' },
				{ rusWord: 'тело', engWord: 'body' },
			],
		},
		{
			rusSentence: 'Это казалось таким странным.',
			engSentences: [
				{
					engSentences: ['It seemed so strange.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'казаться', engWord: 'seem' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'странный', engWord: 'strange' },
			],
		},
		{
			rusSentence: 'Я сдал тот тест.',
			engSentences: [
				{
					engSentences: ['I passed that test.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'сдать (тест, экзамен)', engWord: 'pass' },
				{ rusWord: 'тест', engWord: 'test' },
			],
		},
		{
			rusSentence: 'Я работал вчера.',
			engSentences: [
				{
					engSentences: ['I worked yesterday.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'работать', engWord: 'work' },
				{ rusWord: 'вчера', engWord: 'yesterday' },
			],
		},
		{
			rusSentence: 'Я разложила подушки в своем особом порядке.',
			engSentences: [
				{
					engSentences: ['I arranged the cushions in my special order.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'раскладывать', engWord: 'arrange' },
				{ rusWord: 'подушка', engWord: 'cushion' },
				{ rusWord: 'в', engWord: 'in' },
				{ rusWord: 'особый', engWord: 'special' },
				{ rusWord: 'порядок', engWord: 'order' },
			],
		},
		{
			rusSentence: 'Вчера утром мне стало плохо.',
			engSentences: [{ engSentences: ['I felt sick yesterday morning'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'больной', engWord: 'sick' },
				{ rusWord: 'вчерашний день', engWord: 'yesterday' },
				{ rusWord: 'утро', engWord: 'morning' },
				{ rusWord: 'плохо', engWord: 'плохо' },
			],
		},
	],
}

export default exercises_1
