import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Ты понимаешь?',
			engSentences: [{ engSentences: ['Do you understand?'], isCorrect: true }],
			words: [{ rusWord: 'готов', engWord: 'ready' }],
		},
	],
}

export default exercises_1
