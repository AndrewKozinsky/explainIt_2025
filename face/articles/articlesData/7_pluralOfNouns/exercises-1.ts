import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Я хочу яблоки.',
			engSentences: [{ engSentences: ['I want apples.'], isCorrect: true }],
			words: [
				{ rusWord: 'хотеть', engWord: 'want' },
				{ rusWord: 'яблоко', engWord: 'apple' },
			],
		},
		{
			rusSentence: 'Я понимаю эти вещи.',
			engSentences: [{ engSentences: ['I understand these things.'], isCorrect: true }],
			words: [
				{ rusWord: 'понимать', engWord: 'understand' },
				{ rusWord: 'эти', engWord: 'these' },
				{ rusWord: 'вещь', engWord: 'things' },
			],
		},
		{
			rusSentence: 'Он знает два иностранных языка.',
			engSentences: [{ engSentences: ['He knows two foreign languages.'], isCorrect: true }],
			words: [
				{ rusWord: 'знать', engWord: 'know' },
				{ rusWord: 'два', engWord: 'two' },
				{ rusWord: 'иностранный', engWord: 'foreign' },
				{ rusWord: 'язык', engWord: 'language' },
			],
		},
		{
			rusSentence: 'Они строят дома.',
			engSentences: [{ engSentences: ['They build houses.'], isCorrect: true }],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'дом', engWord: 'house' },
			],
		},
		{
			rusSentence: 'У неё есть другие проблемы.',
			engSentences: [{ engSentences: ['She has other problems.'], isCorrect: true }],
			words: [
				{ rusWord: 'другие', engWord: 'other' },
				{ rusWord: 'проблема', engWord: 'problem' },
			],
		},
		{
			rusSentence: 'Он строит очень хорошие дома.',
			engSentences: [{ engSentences: ['He builds very good houses.'], isCorrect: true }],
			words: [
				{ rusWord: 'строить', engWord: 'build' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'дом', engWord: 'house' },
			],
		},
		{
			rusSentence: 'Она показывает очень хорошие результаты.',
			engSentences: [{ engSentences: ['She shows very good results.'], isCorrect: true }],
			words: [
				{ rusWord: 'показывать', engWord: 'show' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'результат', engWord: 'result' },
			],
		},
		{
			rusSentence: 'Она делает свою домашнюю работу без её родителей.',
			engSentences: [{ engSentences: ['She does her home work without her parents.'], isCorrect: true }],
			words: [
				{ rusWord: 'делать', engWord: 'do' },
				{ rusWord: 'её', engWord: 'her' },
				{ rusWord: 'домашняя работа', engWord: 'home work' },
				{ rusWord: 'без', engWord: 'without' },
				{ rusWord: 'её', engWord: 'her' },
				{ rusWord: 'родитель', engWord: 'parent' },
			],
		},
		{
			rusSentence: 'Мне нравятся эти экзамены.',
			engSentences: [{ engSentences: ['I like these exams.'], isCorrect: true }],
			words: [
				{ rusWord: 'нравиться', engWord: 'like' },
				{ rusWord: 'эти', engWord: 'these' },
				{ rusWord: 'экзамен', engWord: 'exam' },
			],
		},
		{
			rusSentence: 'У нее есть кошки.',
			engSentences: [{ engSentences: ['She has cats.'], isCorrect: true }],
			words: [{ rusWord: 'кошка/кот', engWord: 'cat' }],
		},
		{
			rusSentence: 'Она всегда читает инструкции первым делом.',
			engSentences: [{ engSentences: ['She always reads instructions first.'], isCorrect: true }],
			words: [
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'читать', engWord: 'read' },
				{ rusWord: 'инструкция', engWord: 'instruction' },
				{ rusWord: 'первым делом', engWord: 'first' },
			],
		},
		{
			rusSentence: 'Она продаёт дешёвые вещи.',
			engSentences: [{ engSentences: ['She sells cheap things.'], isCorrect: true }],
			words: [
				{ rusWord: 'продавать', engWord: 'sell' },
				{ rusWord: 'дешёвый', engWord: 'cheap' },
				{ rusWord: 'вещь', engWord: 'thing' },
			],
		},
		{
			rusSentence: 'Я использую эти правила.',
			engSentences: [{ engSentences: ['I use these rules.'], isCorrect: true }],
			words: [
				{ rusWord: 'использовать', engWord: 'use' },
				{ rusWord: 'эти', engWord: 'these' },
				{ rusWord: 'правило', engWord: 'rule' },
			],
		},
		{
			rusSentence: 'Он пишет это на бумаге.',
			engSentences: [{ engSentences: ['He writes it on paper.'], isCorrect: true }],
			words: [
				{ rusWord: 'писать', engWord: 'write' },
				{ rusWord: 'это', engWord: 'it' },
				{ rusWord: 'на бумаге', engWord: 'on paper' },
			],
		},
		{
			rusSentence: 'Это стоит четыреста долларов.',
			engSentences: [{ engSentences: ['It costs four hundred dollars.'], isCorrect: true }],
			words: [
				{ rusWord: 'стоить', engWord: 'cost' },
				{ rusWord: 'четыреста', engWord: 'four hundred' },
				{ rusWord: 'доллар', engWord: 'dollar' },
			],
		},
		{
			rusSentence: 'Это очень большая коробка.',
			engSentences: [
				{
					engSentences: ['It is a very big box.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'большой', engWord: 'big' },
				{ rusWord: 'коробка', engWord: 'box' },
			],
		},
	],
}

export default exercises_1
