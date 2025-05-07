import ExercisesType from '../../articleTypes/exercisesType'

const exercises_4: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Те —  мои ключи.',
			engSentences: [{ engSentences: ['Those are my keys.'], isCorrect: true }],
			words: [{ rusWord: 'ключ', engWord: 'key' }],
		},
		{
			rusSentence: 'Большинство людей не знают своих прав.',
			engSentences: [
				{
					engSentences: ['Many people are not aware about these rights.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'люди', engWord: 'people' },
				{ rusWord: 'знать', engWord: 'aware' },
				{ rusWord: 'права', engWord: 'rights' },
			],
		},
		{
			rusSentence: 'Эти двое мои соседи: Пауль и Кэрол.',
			engSentences: [
				{
					engSentences: ['These two people are my neighbors, Paul and Carol.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'двое', engWord: 'two' },
				{ rusWord: 'сосед', engWord: 'a neighbor' },
			],
		},
		{
			rusSentence: 'Это огурцы.',
			engSentences: [{ engSentences: ['Those are cucumbers.'], isCorrect: true }],
			words: [{ rusWord: 'огурец', engWord: 'a cucumber' }],
		},
		{
			rusSentence: 'Это не настоящие кошки.',
			engSentences: [{ engSentences: ['Those aren’t real cats.'], isCorrect: true }],
			words: [
				{ rusWord: 'настоящий', engWord: 'real' },
				{ rusWord: 'кот', engWord: 'cat' },
			],
		},
		{
			rusSentence: 'Эти шоколадки вкусные.',
			engSentences: [{ engSentences: ['These chocolates are delicious.'], isCorrect: true }],
			words: [
				{ rusWord: 'шоколадка', engWord: 'a chocolate' },
				{ rusWord: 'вкусный', engWord: 'delicious' },
			],
		},
		{
			rusSentence: 'Их сыновья определённо не являются преступниками.',
			engSentences: [
				{
					engSentences: ['Their children certainly are not criminals.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'сын', engWord: 'a son' },
				{ rusWord: 'определённо', engWord: 'certainly' },
				{ rusWord: 'преступник', engWord: 'criminal' },
			],
		},
		{
			rusSentence: 'Эти карандаши, а те ручки.',
			engSentences: [
				{
					engSentences: ['These are pencils and those are pens.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'карандаш', engWord: 'a pencil' },
				{ rusWord: 'ручка', engWord: 'a pen' },
			],
		},
		{
			rusSentence: 'Эти очки ужасные.',
			engSentences: [{ engSentences: ['This glasses are terrible.'], isCorrect: true }],
			words: [
				{ rusWord: 'очки', engWord: 'glasses' },
				{ rusWord: 'ужасный', engWord: 'terrible' },
			],
		},
		{
			// TODO
			rusSentence: 'Я не знаю этих людей.',
			engSentences: [{ engSentences: ['I do not know these people!'], isCorrect: true }],
			words: [
				{ rusWord: 'очки', engWord: 'glasses' },
				{ rusWord: 'ужасный', engWord: 'terrible' },
			],
		},
	],
}

export default exercises_4
