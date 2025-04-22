import ExercisesType from '../../articleTypes/exercisesType'

const exercises_6: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Они производят очень дорогие товары.',
			engSentences: [{ engSentences: ['They produce very expensive goods.'], isCorrect: true }],
			words: [
				{ rusWord: 'производить', engWord: 'produce' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'дорогой', engWord: 'expensive' },
				{ rusWord: 'товар', engWord: 'goods' },
			],
		},
		{
			rusSentence: 'Она производит дешёвые товары.',
			engSentences: [{ engSentences: ['She produces cheap goods.'], isCorrect: true }],
			words: [
				{ rusWord: 'производить', engWord: 'produce' },
				{ rusWord: 'дешёвый', engWord: 'cheap' },
				{ rusWord: 'товар', engWord: 'goods' },
			],
		},
		{
			rusSentence: 'Ты смотришь новости.',
			engSentences: [{ engSentences: ['You watch news.'], isCorrect: true }],
			words: [
				{ rusWord: 'смотреть', engWord: 'watch' },
				{ rusWord: 'новость', engWord: 'news' },
			],
		},
		{
			rusSentence: 'Тебе нравится эта новость.',
			engSentences: [{ engSentences: ['You like this news.'], isCorrect: true }],
			words: [
				{ rusWord: 'нравиться', engWord: 'like' },
				{ rusWord: 'эта', engWord: 'this' },
				{ rusWord: 'новость', engWord: 'news' },
			],
		},
		{
			rusSentence: 'Он пачкает мою одежду',
			engSentences: [{ engSentences: ['He stains my clothes.'], isCorrect: true }],
			words: [
				{ rusWord: 'пачкать', engWord: 'stain' },
				{ rusWord: 'моя', engWord: 'my' },
				{ rusWord: 'одежда', engWord: 'clothes' },
			],
		},
		{
			rusSentence: 'Он делится этими видео.',
			engSentences: [{ engSentences: ['He shares these videos.'], isCorrect: true }],
			words: [
				{ rusWord: 'делиться', engWord: 'shares' },
				{ rusWord: 'эти', engWord: 'these' },
				{ rusWord: 'видео', engWord: 'videos' },
			],
		},
		{
			rusSentence: 'Они продают очень дорогие товары.',
			engSentences: [
				{
					engSentences: ['They sell very expensive goods.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'продавать', engWord: 'sell' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'дорогой', engWord: 'expensive' },
				{ rusWord: 'товар', engWord: 'goods' },
			],
		},
	],
}

export default exercises_6
