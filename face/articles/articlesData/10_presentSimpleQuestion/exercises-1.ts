import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты понимаешь?',
			engSentences: [{ engSentences: ['Do you understand?'], isCorrect: true }],
			words: [{ rusWord: 'готов', engWord: 'ready' }],
		},
		{
			rusSentence: 'Я хорошо выгляжу?',
			engSentences: [{ engSentences: ['Do I look good?'], isCorrect: true }],
			words: [{ rusWord: 'готов', engWord: 'ready' }],
		},
		{
			rusSentence: 'В твоём чае есть сахар?',
			engSentences: [{ engSentences: ['Do you have sugar in your tea?'], isCorrect: true }],
			words: [{ rusWord: 'популярный', engWord: 'popular' }],
		},
		{
			rusSentence: 'Оля часто бегает?',
			engSentences: [{ engSentences: ['Does Olya often run?'], isCorrect: true }],
			words: [
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'бегать', engWord: 'run' },
			],
		},
		{
			rusSentence: 'Ты помогаешь своим родителям?',
			engSentences: [{ engSentences: ['Do you help your parents?'], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
		{
			rusSentence: 'Он работает здесь?',
			engSentences: [{ engSentences: ['Does he work here? '], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
		{
			rusSentence: 'Тебе нравится те туфли?',
			engSentences: [{ engSentences: ['Do you like those shoes?'], isCorrect: true }],
			words: [{ rusWord: 'многие', engWord: 'many' }],
		},
	],
}

export default exercises_1
