import ExercisesType from '../../articleTypes/exercisesType'

const exercises_3: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Он не чувствует себя счастливым.',
			engSentences: [{ engSentences: ['He does not feel happy.'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'счастливый', engWord: 'prefer' },
			],
		},
		{
			rusSentence: 'Она чувствует себя действительно счастливым?',
			engSentences: [{ engSentences: ['Does she feel really happy?'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'счастливый', engWord: 'happy' },
			],
		},
		{
			rusSentence: 'Он чувствует, что это действительно помогает ему?',
			engSentences: [{ engSentences: ['Does he feel that it really help him?'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'помогать', engWord: 'help' },
			],
		},
		{
			rusSentence: 'Ты чувствуешь прогресс?',
			engSentences: [{ engSentences: ['Do you feel progress?'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'прогресс', engWord: 'progress' },
			],
		},
		{
			rusSentence: 'Я не чувствую себя счастливым потому что у меня плохие результаты.',
			engSentences: [{ engSentences: ['I do not feel happy because I have bad results.'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'счастливый', engWord: 'happy' },
				{ rusWord: 'потому что', engWord: 'because' },
				{ rusWord: 'плохой', engWord: 'bad' },
				{ rusWord: 'результат', engWord: 'result' },
			],
		},
		{
			rusSentence: 'Я чувствую себя счастливым.',
			engSentences: [{ engSentences: ['I feel happy.'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'счастливый', engWord: 'happy' },
			],
		},
		{
			rusSentence: 'Вчера утром мне стало плохо.',
			engSentences: [{ engSentences: ['I felt sick yesterday morning'], isCorrect: true }],
			words: [
				{ rusWord: 'чувствовать', engWord: 'feel' },
				{ rusWord: 'больной', engWord: 'sick' },
				{ rusWord: 'вчерашний день', engWord: 'yesterday' },
				{ rusWord: 'утро', engWord: 'morning' },
				{ rusWord: 'плохо', engWord: 'плохо' },
			],
		},
	],
}

export default exercises_3
