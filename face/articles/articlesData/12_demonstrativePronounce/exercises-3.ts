import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			note: 'Примечание к предложению',
			rusSentence: 'Это жук? Нет, это паук.',
			engSentences: [{ engSentences: ['Is this a bug? No, it is a spider.'], isCorrect: true }],
			words: [
				{ rusWord: 'жук', engWord: 'bug' },
				{ rusWord: 'паук', engWord: 'spider' },
			],
		},
		{
			rusSentence: 'Это карандаш? Нет, это ручка.',
			engSentences: [{ engSentences: ['Is this a pencil? No, it\'s a pen.'], isCorrect: true }],
			words: [
				{ rusWord: 'карандаш', engWord: 'pencil' },
				{ rusWord: 'ручка', engWord: 'pen' },
			],
		},
		{
			rusSentence: 'Это океан? Нет, это озеро.',
			engSentences: [{ engSentences: ['Is this an ocean? No, it\'s a lake.'], isCorrect: true }],
			words: [
				{ rusWord: 'океан', engWord: 'ocean' },
				{ rusWord: 'озеро', engWord: 'lake' },
			],
		},
		{
			rusSentence: 'Это мексиканская кухня? Нет, корейская. Но тоже острая.',
			engSentences: [
				{
					engSentences: ['Is this Mexican food? No, Korean. But also spicy.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'мексикансая кухня', engWord: 'Mexican food' },
				{ rusWord: 'корейский', engWord: 'Korean' },
				{ rusWord: 'острый', engWord: 'spicy' },
			],
		},
		{
			rusSentence: 'Это новый компьютер? Да, очень дорогой.',
			engSentences: [
				{
					engSentences: ['Is this a new computer? Yes, it is very expencive.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'мексикансая кухня', engWord: 'Mexican food' },
				{ rusWord: 'корейский', engWord: 'Korean' },
				{ rusWord: 'острый', engWord: 'spicy' },
			],
		},
	],
}

export default exercises_3
