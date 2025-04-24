import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Она танцует как бегемот.',
			engSentences: [{ engSentences: ['She dances like a hippopotamus.'], isCorrect: true }],
			words: [
				{ rusWord: 'танцевать', engWord: 'dance' },
				{ rusWord: 'как', engWord: 'like' },
				{ rusWord: 'бегемот', engWord: 'hippopotamus' },
			],
		},
		{
			rusSentence: 'Её муж такой ужасный.',
			engSentences: [{ engSentences: ['Her husband is so awful.'], isCorrect: true }],
			words: [
				{ rusWord: 'её', engWord: 'her' },
				{ rusWord: 'муж', engWord: 'husband' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'ужасный', engWord: 'awful' },
			],
		},
		{
			rusSentence: 'Она такой хороший друг.',
			engSentences: [{ engSentences: ['She is such a good friend.'], isCorrect: true }],
			words: [
				{ rusWord: 'такой', engWord: 'such' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'друг', engWord: 'friend' },
			],
		},
		{
			rusSentence: 'Вы так мило смотритесь вместе.',
			engSentences: [{ engSentences: ['You look so nice together.'], isCorrect: true }],
			words: [
				{ rusWord: 'так', engWord: 'so' },
				{ rusWord: 'милый', engWord: 'nice' },
				{ rusWord: 'вместе', engWord: 'together' },
			],
		},
	],
}

export default exercises_3
