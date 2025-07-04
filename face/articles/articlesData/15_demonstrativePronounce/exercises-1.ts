import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Этот салат вкусный, а тот слишком острый.',
			engSentences: [
				{
					engSentences: ['This salad is delicious, but that is too spicy.'],
					isCorrect: true,
				},
				{
					engSentences: ['This salad is delicious, but this is too spicy.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',

									text: 'Грамматически правильно, но когда указывается на несколько предметов для одного будут использовать this, а для другого that. Выбор указательного местоимения ещё зависит от расстояния (this ближе, that дальше), эмоциональной окраски (this положительная, that отрицательная).',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'салат', engWord: 'a salad' },
				{ rusWord: 'вкусный', engWord: 'delicious' },
				{ rusWord: 'слишком', engWord: 'too' },
				{ rusWord: 'острый', engWord: 'spicy' },
			],
		},
		{
			rusSentence: 'Однако это не простой остров.',
			engSentences: [{ engSentences: ['This is not a simple island.'], isCorrect: true }],
			words: [
				{ rusWord: 'однако', engWord: 'however' },
				{ rusWord: 'простой', engWord: 'simple' },
				{ rusWord: 'остров', engWord: 'an island' },
			],
		},
		{
			rusSentence: 'Это ручка, а то – карандаш.',
			engSentences: [{ engSentences: ['This is a pen, and that is a pencil.'], isCorrect: true }],
			words: [
				{ rusWord: 'суп', engWord: 'soup' },
				{ rusWord: 'солёный', engWord: 'salty' },
				{ rusWord: 'вкусный', engWord: 'tasty' },
			],
		},
		{
			rusSentence: 'Это не так уж и безумно.',
			engSentences: [{ engSentences: ['This is not so crazy.'], isCorrect: true }],
			words: [{ rusWord: 'безумный', engWord: 'crazy' }],
		},
		{
			rusSentence: 'Возможно, это не подходящие выходные.',
			engSentences: [
				{
					engSentences: ['Maybe this is not a suitable weekend.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'возможно', engWord: 'maybe' },
				{ rusWord: 'подходящий', engWord: 'suitable' },
			],
		},
		{
			rusSentence: 'Это великолепная идея!',
			engSentences: [{ engSentences: ['This is a great idea!'], isCorrect: true }],
			words: [
				{ rusWord: 'великолепный', engWord: 'great' },
				{ rusWord: 'идея', engWord: 'an idea' },
			],
		},
		{
			rusSentence: 'Это не ответ!',
			engSentences: [{ engSentences: ['That is not an answer!'], isCorrect: true }],
			words: [
				{ rusWord: 'очки', engWord: 'glasses' },
				{ rusWord: 'ужасный', engWord: 'terrible' },
			],
		},
		{
			rusSentence: 'Это глупо.',
			engSentences: [{ engSentences: ['That is stupid.'], isCorrect: true }],
			words: [
				{ rusWord: 'очки', engWord: 'glasses' },
				{ rusWord: 'ужасный', engWord: 'terrible' },
			],
		},
		{
			rusSentence: 'Это Катя, моя сводная сестра.',
			engSentences: [{ engSentences: ['This is Katya, my stepsister.'], isCorrect: true }],
			words: [{ rusWord: 'сводная сестра', engWord: 'a stepsister' }],
		},
		{
			rusSentence: 'Это не ваши следы.',
			engSentences: [{ engSentences: ['This is not your footsteps. '], isCorrect: true }],
			words: [{ rusWord: 'след', engWord: 'a footstep' }],
		},
		{
			rusSentence: 'Это не моя основная профессия.',
			engSentences: [{ engSentences: ['This is not my main occupation.'], isCorrect: true }],
			words: [
				{ rusWord: 'основной', engWord: 'main' },
				{ rusWord: 'профессия', engWord: 'occupation' },
			],
		},
		{
			rusSentence: 'Эта книга была великолепной.',
			engSentences: [{ engSentences: ['That book was excellent.'], isCorrect: true }],
			words: [
				{ rusWord: 'книга', engWord: 'a book' },
				{ rusWord: 'великолепный', engWord: 'excellent' },
			],
		},
		{
			rusSentence: 'В этой квартире очень многолюдно.',
			engSentences: [{ engSentences: ['This apartment is very busy.'], isCorrect: true }],
			words: [
				{ rusWord: 'квартира', engWord: 'apartment' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'многолюдный', engWord: 'busy' },
			],
		},
		{
			rusSentence: 'Эмма в очень хорошем настроении сегодня.',
			engSentences: [{ engSentences: ['Emma is in a really good mood today.'], isCorrect: true }],
			words: [
				{ rusWord: 'Эмма', engWord: 'Emma' },
				{ rusWord: 'действительно', engWord: 'really' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'настоение', engWord: 'mood' },
				{ rusWord: 'сегодня', engWord: 'today' },
			],
		},
		{
			rusSentence: 'Этот клуб очень модный! Очень эксклюзивный!',
			engSentences: [{ engSentences: ['This club is very trendy! Very exclusive!'], isCorrect: true }],
			words: [
				{ rusWord: 'клуб', engWord: 'club' },
				{ rusWord: 'модный', engWord: 'trendy' },
				{ rusWord: 'эксклюзивный', engWord: 'exclusive' },
			],
		},
		{
			rusSentence: 'Это футбольный матч?',
			engSentences: [{ engSentences: ['Is this the football match?'], isCorrect: true }],
			words: [
				{ rusWord: 'клуб', engWord: 'club' },
				{ rusWord: 'модный', engWord: 'trendy' },
				{ rusWord: 'эксклюзивный', engWord: 'exclusive' },
			],
		},
		{
			rusSentence: 'Это простая юбка.',
			engSentences: [{ engSentences: ['This is a plain skirt.'], isCorrect: true }],
			words: [
				{ rusWord: 'простой', engWord: 'plain' },
				{ rusWord: 'юбка', engWord: 'skirt' },
			],
		},
		{
			rusSentence: 'Это оливковое масло.',
			engSentences: [{ engSentences: ['This is olive oil.'], isCorrect: true }],
			words: [
				{ rusWord: 'оливковый', engWord: 'olive' },
				{ rusWord: 'масло', engWord: 'oil' },
			],
		},
	],
}

export default exercises_1
