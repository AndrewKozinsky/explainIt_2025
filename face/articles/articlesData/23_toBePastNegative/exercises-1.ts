import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Интересно, он богат?',
			engSentences: [{ engSentences: ['I wonder, is he rich?'], isCorrect: true }],
			words: [
				{ rusWord: 'интересно', engWord: 'I wonder' },
				{ rusWord: 'богат', engWord: 'rich' },
			],
		},
		{
			rusSentence: 'Вас зовут Андрей?',
			engSentences: [{ engSentences: ['Are you Andrey?'], isCorrect: true }],
			words: [{ rusWord: 'Андрей', engWord: 'Andrey' }],
		},
		{
			rusSentence: 'Это не было ошибкой.',
			engSentences: [{ engSentences: ['It was not a mistake.'], isCorrect: true }],
			words: [{ rusWord: 'ошибка', engWord: 'mistake' }],
		},
		{
			rusSentence: 'Он не был управляющем.',
			engSentences: [{ engSentences: ['We was not a manager.'], isCorrect: true }],
			words: [{ rusWord: 'управляющий', engWord: 'manager' }],
		},
		{
			rusSentence: 'Я не был одинок.',
			engSentences: [{ engSentences: ['I was not lonely.'], isCorrect: true }],
			words: [{ rusWord: 'одинок', engWord: 'lonely' }],
		},
	],
	offset: true,
}

export default exercises_1
