import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты пьёшь энергетический напиток перед тренировкой.',
			engSentences: [{ engSentences: ['You drink an energy drink before training.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
		{
			rusSentence: 'Ты читаешь интересную статью каждый день.',
			engSentences: [{ engSentences: ['You read an interesting article every day.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
		{
			rusSentence: 'Мы смотрим захватывающую серию каждые выходные.',
			engSentences: [{ engSentences: ['We watch an exciting episode every weekend.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'сырой', engWord: 'raw' },
				{ rusWord: 'овощи', engWord: 'vegetables' },
			],
		},
	],
}

export default exercises_3
