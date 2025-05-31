import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты был счастливым вчера?',
			engSentences: [{ engSentences: ['Was you happy yesterday?'], isCorrect: true }],
			words: [
				{ rusWord: 'счастливый', engWord: 'happy' },
				{ rusWord: 'вчера', engWord: 'yesterday' },
			],
		},
	],
	offset: true,
}

export default exercises_1
