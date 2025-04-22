import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты пьёшь энергетический напиток перед тренировкой.',
			engSentences: [{ engSentences: ['You drink an energy drink before training.'], isCorrect: true }],
			words: [
				{ rusWord: 'пить', engWord: 'drink' },
				{ rusWord: 'энергетический', engWord: 'energy' },
				{ rusWord: 'напиток', engWord: 'a drink' },
				{ rusWord: 'перед', engWord: 'before' },
				{ rusWord: 'тренировка', engWord: 'training' },
			],
		},
		{
			rusSentence: 'Ты читаешь интересную статью каждый день.',
			engSentences: [{ engSentences: ['You read an interesting article every day.'], isCorrect: true }],
			words: [
				{ rusWord: 'читать', engWord: 'read' },
				{ rusWord: 'интересный', engWord: 'interesting' },
				{ rusWord: 'статья', engWord: 'article' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'день', engWord: 'day' },
			],
		},
		{
			rusSentence: 'Мы смотрим захватывающую серию каждые выходные.',
			engSentences: [{ engSentences: ['We watch an exciting episode every weekend.'], isCorrect: true }],
			words: [
				{ rusWord: 'смотреть', engWord: 'watch' },
				{ rusWord: 'захватывающий', engWord: 'exciting' },
				{ rusWord: 'серия', engWord: 'episode' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'выходные', engWord: 'weekend' },
			],
		},
	],
}

export default exercises_3
