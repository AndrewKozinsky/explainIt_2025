import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			// TODO
			rusSentence: 'Ты был счастливым вчера?',
			engSentences: [{ engSentences: ['Was you happy yesterday?'], isCorrect: true }],
			words: [{ rusWord: 'врач', engWord: 'doctor' }],
		},
	],
	offset: true,
}

export default exercises_1
