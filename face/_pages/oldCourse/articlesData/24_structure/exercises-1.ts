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
			engSentences: [{ engSentences: ['There is no access to it.'], isCorrect: true }],
			words: [{ rusWord: 'доступ', engWord: 'access' }],
		},
		{
			rusSentence: 'Эти решения не дороги, но и не бесплатны.',
			engSentences: [
				{
					engSentences: ['These solutions are not expensive, but they are not free.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'доступ', engWord: 'access' }],
		},
		{
			rusSentence: 'Она расчёсывает волосы.',
			engSentences: [
				{
					engSentences: ['She brushes her hair.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'расчёсывать', engWord: 'brush' },
				{ rusWord: 'волосы', engWord: 'hair' },
			],
		},
		{
			rusSentence: 'Она целует своего ребёнка.',
			engSentences: [
				{
					engSentences: ['She kisses her baby.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'целовать', engWord: 'kiss' },
				{ rusWord: 'ребёнок', engWord: 'baby' },
			],
		},
		{
			rusSentence: 'После школы идёт домой.',
			engSentences: [
				{
					engSentences: ['After school she goes home.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'после', engWord: 'after' },
				{ rusWord: 'школа', engWord: 'school' },
				{ rusWord: 'идти', engWord: 'go' },
				{ rusWord: 'дом', engWord: 'home' },
			],
		},
		{
			rusSentence: 'Она путешествует, потому что любит это.',
			engSentences: [
				{
					engSentences: ['She travels because she likes it.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'после', engWord: 'after' },
				{ rusWord: 'школа', engWord: 'school' },
				{ rusWord: 'идти', engWord: 'go' },
				{ rusWord: 'дом', engWord: 'home' },
			],
		},
		{
			rusSentence: 'Ты арендуешь машину когда путешествуешь.',
			engSentences: [{ engSentences: ['You rent a car when you travel.'], isCorrect: true }],
			words: [
				{ rusWord: 'арендовать', engWord: 'rent' },
				{ rusWord: 'машина', engWord: 'car' },
				{ rusWord: 'когда', engWord: 'when' },
				{ rusWord: 'путешествовать', engWord: 'travel' },
			],
		},
		{
			rusSentence: 'Подростки всегда спорят с родителям.',
			engSentences: [
				{ engSentences: ['Teenagers always argue with parents.'], isCorrect: true },
				{ engSentences: ['Young people constantly debate with parents.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'подростки', engWord: 'teenagers' },
				{ rusWord: 'всегда', engWord: 'always' },
				{ rusWord: 'спорить', engWord: 'argue' },
				{ rusWord: 'с', engWord: 'with' },
				{ rusWord: 'родители', engWord: 'parents' },
			],
		},
		{
			note: 'На английский манер будет звучать «Он делает его домашнюю работу после школы».',
			rusSentence: 'Он делает домашнюю работу после школы.',
			engSentences: [{ engSentences: ['He does his homework after school.'], isCorrect: true }],
			words: [
				{ rusWord: 'его', engWord: 'his' },
				{ rusWord: 'делать', engWord: 'do' },
				{ rusWord: 'домашняя работа', engWord: 'homework' },
				{ rusWord: 'после ', engWord: 'after' },
				{ rusWord: 'школа', engWord: 'school' },
			],
		},
		{
			rusSentence: 'Она готовит еду для семьи каждый день.',
			engSentences: [{ engSentences: ['She cooks food for her family every day.'], isCorrect: true }],
			words: [
				{ rusWord: 'готовить', engWord: 'cook' },
				{ rusWord: 'еда', engWord: 'food' },
				{ rusWord: 'для всей семьи', engWord: 'for her family' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'день', engWord: 'day' },
			],
		},
		{
			rusSentence: 'Она делает домашнюю работу без родителей.',
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
			rusSentence: 'Она здесь работает?',
			engSentences: [{ engSentences: ['Does she work here?'], isCorrect: true }],
			words: [
				{ rusWord: 'здесь', engWord: 'here' },
				{ rusWord: 'работать', engWord: 'work' },
			],
		},
	],
}

export default exercises_1
