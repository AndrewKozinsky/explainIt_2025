import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Джейн предпочитает другую еду.',
			engSentences: [{ engSentences: ['Jane prefers another food.'], isCorrect: true }],
			words: [
				{ rusWord: 'Джейн', engWord: 'Jane' },
				{ rusWord: 'предпочитать', engWord: 'prefer' },
				{ rusWord: 'еда', engWord: 'food' },
			],
		},
		{
			rusSentence: 'Он живёт в другой стране.',
			engSentences: [{ engSentences: ['He lives in another country.'], isCorrect: true }],
			words: [
				{ rusWord: 'жить', engWord: 'live' },
				{ rusWord: 'страна', engWord: 'country' },
			],
		},
		{
			rusSentence: 'Они преподают другие предметы.',
			engSentences: [{ engSentences: ['They teach other subjects.'], isCorrect: true }],
			words: [
				{ rusWord: 'преподавать', engWord: 'teach' },
				{ rusWord: 'предмет (для изучения)', engWord: 'subject' },
			],
		},
		{
			rusSentence: 'Он учится в другой группе.',
			engSentences: [{ engSentences: ['He studies in another group.'], isCorrect: true }],
			words: [
				{ rusWord: 'учиться', engWord: 'study' },
				{ rusWord: 'другой', engWord: 'another' },
				{ rusWord: 'группа', engWord: 'group' },
			],
		},
	],
}

export default exercises_2
