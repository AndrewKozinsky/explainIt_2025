import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я вижу свой результат.',
			engSentences: [{ engSentences: ['I see my result.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'результат', engWord: 'result' },
			],
		},
		{
			// TODO
			rusSentence: 'Мой двоюродный брат на этой неделе в отпуске.',
			engSentences: [{ engSentences: ['My cousin is on holiday this week.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'результат', engWord: 'result' },
			],
		},
	],
}

export default exercises_3
