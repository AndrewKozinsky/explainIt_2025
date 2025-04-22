import ExercisesType from '../../articleTypes/exercisesType'

const exercises_5: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Мы видим двух мужчин.',
			engSentences: [{ engSentences: ['We see two men.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'два', engWord: 'two' },
				{ rusWord: 'мужчина', engWord: 'man' },
			],
		},
		{
			rusSentence: 'Я вижу мужчину и двух женщин.',
			engSentences: [{ engSentences: ['I see a man and two women.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'мужчина', engWord: 'man' },
				{ rusWord: 'два', engWord: 'two' },
				{ rusWord: 'женщина', engWord: 'woman' },
			],
		},
		{
			rusSentence: 'Я вижу пятерых женщин.',
			engSentences: [{ engSentences: ['I see five women.'], isCorrect: true }],
			words: [
				{ rusWord: 'видеть', engWord: 'see' },
				{ rusWord: 'пятеро', engWord: 'five' },
				{ rusWord: 'женщина', engWord: 'woman' },
			],
		},
		{
			rusSentence: 'У неё дети.',
			engSentences: [{ engSentences: ['She has children.'], isCorrect: true }],
			words: [{ rusWord: 'ребёнок', engWord: 'child' }],
		},
		{
			rusSentence: 'Я люблю животных и быстрые машины и красивых женщин.',
			engSentences: [{ engSentences: ['I love animals and fast cars, and beautiful women.'], isCorrect: true }],
			words: [
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'животное', engWord: 'animal' },
				{ rusWord: 'быстрый', engWord: 'fast' },
				{ rusWord: 'машина', engWord: 'car' },
				{ rusWord: 'красивый', engWord: 'beautiful' },
				{ rusWord: 'женщина', engWord: 'woman' },
			],
		},
		{
			rusSentence: 'Женщины любят мужчин в белых халатах.',
			engSentences: [{ engSentences: ['Women love men in white coats.'], isCorrect: true }],
			words: [
				{ rusWord: 'женщина', engWord: 'woman' },
				{ rusWord: 'любить', engWord: 'love' },
				{ rusWord: 'мужчина', engWord: 'man' },
				{ rusWord: 'в', engWord: 'in' },
				{ rusWord: 'белый', engWord: 'white' },
				{ rusWord: 'халат', engWord: 'coat' },
			],
		},
	],
}

export default exercises_5
