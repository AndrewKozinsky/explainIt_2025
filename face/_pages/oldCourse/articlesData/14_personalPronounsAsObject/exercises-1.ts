import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я постоянно думаю о тебе.',
			engSentences: [{ engSentences: ['I think about you all the time.'], isCorrect: true }],
			words: [{ rusWord: 'готов', engWord: 'ready' }],
		},
		{
			rusSentence: 'Я действительно тебя люблю.',
			engSentences: [{ engSentences: ['I really love you.'], isCorrect: true }],
			words: [
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'любить', engWord: 'love' },
			],
		},
		{
			rusSentence: 'Я понимаю вас очень хорошо.',
			engSentences: [{ engSentences: ['I understand you very well.'], isCorrect: true }],
			words: [
				{ rusWord: 'нуждаться', engWord: 'need' },
				{ rusWord: 'бумага', engWord: 'paper' },
			],
		},
		{
			rusSentence: 'Я всегда уважаю её мнение, даже если оно отличается от моего.',
			engSentences: [
				{
					engSentences: ['I always respected her opinion even if it differed from mine.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
		},
		{
			rusSentence: 'Эта коллекция принадлежит мне.',
			engSentences: [
				{
					engSentences: ['This collection belongs to me.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
		},
	],
}

export default exercises_1
