import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я всегда следую рекомендациям.',
			engSentences: [{ engSentences: ['I always follow recommendations'], isCorrect: true }],
			words: [
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'следовать', engWord: 'follow' },
				{ rusWord: 'рекомендации', engWord: 'recommendations' },
			],
		},
		{
			rusSentence: 'Он преподаёт другие предметы.',
			engSentences: [{ engSentences: ['He teaches other subjects.'], isCorrect: true }],
			words: [
				{ rusWord: 'преподавать', engWord: 'teach' },
				{ rusWord: 'другие', engWord: 'other' },
				{ rusWord: 'предметы', engWord: 'subjects' },
			],
		},
		{
			rusSentence: 'Нам нужны яйца, лимоны и собачья еда.',
			engSentences: [{ engSentences: ['We need eggs, lemons and dog food.'], isCorrect: true }],
			words: [
				{ rusWord: 'нуждаться', engWord: 'need' },
				{ rusWord: 'яйца', engWord: 'eggs' },
				{ rusWord: 'лимоны', engWord: 'lemons' },
				{ rusWord: 'собачья', engWord: 'dog' },
				{ rusWord: 'еда', engWord: 'food' },
			],
		},
		{
			rusSentence: 'Она готовит еду для её семьи каждый день.',
			engSentences: [{ engSentences: ['She cooks food for her family every day.'], isCorrect: true }],
			words: [
				{ rusWord: 'готовить', engWord: 'cook' },
				{ rusWord: 'еда', engWord: 'food' },
				{ rusWord: 'для всей её семьи', engWord: 'for her family' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'день', engWord: 'day' },
			],
		},
		{
			rusSentence: 'Ты пишешь письма.',
			engSentences: [{ engSentences: ['You write letters.'], isCorrect: true }],
			words: [
				{ rusWord: 'писать', engWord: 'write' },
				{ rusWord: 'письма', engWord: 'letters' },
			],
		},
	],
}

export default exercises_4
