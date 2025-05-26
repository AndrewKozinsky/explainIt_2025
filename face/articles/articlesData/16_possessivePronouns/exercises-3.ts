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
			rusSentence: 'Ты помогаешь своим родителям?',
			engSentences: [{ engSentences: ['Do you help your parents?'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'результат', engWord: 'result' },
			],
		},
		{
			// TODO
			rusSentence: 'Я был в Дубае со своей девушкой.',
			engSentences: [
				{
					engSentences: ['I was in Dubai with my girlfriend.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
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
		{
			rusSentence: 'Он никогда не ходит без своих друзей.',
			engSentences: [{ engSentences: ['He never goes without his friends.'], isCorrect: true }],
			words: [
				{ rusWord: 'никогда не', engWord: 'never' },
				{ rusWord: 'ходить', engWord: 'go' },
				{ rusWord: 'без', engWord: 'without' },
				{ rusWord: 'друг', engWord: 'friend' },
			],
		},
	],
}

export default exercises_3
