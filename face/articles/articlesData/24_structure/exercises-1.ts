import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Она не блондинка, а брюнетка.',
			engSentences: [{ engSentences: ['She is not blonde, she is brunette.'], isCorrect: true }],
			words: [
				{ rusWord: 'блондинка', engWord: 'blonde' },
				{ rusWord: 'брюнетка', engWord: 'brunette' },
			],
		},
		{
			rusSentence: 'Я люблю животных и люблю шоколад.',
			engSentences: [{ engSentences: ['I love animals and I love chocolate.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'животное', engWord: 'animal' },
				{ rusWord: 'шоколад', engWord: 'chocolate' },
			],
		},
		{
			rusSentence: 'Он часто бил меня, когда был пьян.',
			engSentences: [{ engSentences: ['He often hit me when he was drunk.'], isCorrect: true }],
			words: [
				{ rusWord: 'часто', engWord: 'often' },
				{ rusWord: 'бить', engWord: 'hit' },
				{ rusWord: 'когда', engWord: 'when' },
				{ rusWord: 'быть пьяным', engWord: 'drunk' },
			],
		},
		{
			rusSentence: 'Думаю, я знаю, кто ответственный за это.',
			engSentences: [{ engSentences: ['I think I know who is responsible.'], isCorrect: true }],
			words: [
				{ rusWord: 'Считать', engWord: 'think' },
				{ rusWord: 'знать', engWord: 'know' },
				{ rusWord: 'ответственный', engWord: 'responsible' },
			],
		},
		{
			rusSentence: 'Будешь воду?',
			engSentences: [{ engSentences: ['Do you want some water?'], isCorrect: true }],
			words: [{ rusWord: 'вода', engWord: 'water' }],
		},
		{
			rusSentence: 'К этому доступа нет.',
			engSentences: [
				{ engSentences: ['There is no access to it.'], isCorrect: true },
				{ engSentences: ['I don’t have access to it.'], isCorrect: true },
			],
			words: [{ rusWord: 'доступ', engWord: 'access' }],
		},
	],
}

export default exercises_1
