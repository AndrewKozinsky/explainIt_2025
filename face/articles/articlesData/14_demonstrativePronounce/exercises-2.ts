import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Это яблоко гнилое.',
			engSentences: [{ engSentences: ['This apple is rotten.'], isCorrect: true }],
			words: [
				{ rusWord: 'яблоко', engWord: 'an apple' },
				{ rusWord: 'гнилой', engWord: 'rotten' },
			],
		},
		{
			rusSentence: 'Тот человек очень злой.',
			engSentences: [{ engSentences: ['That man is very angry.'], isCorrect: true }],
			words: [
				{ rusWord: 'человек', engWord: 'man' },
				{ rusWord: 'злой', engWord: 'angry' },
			],
		},
		{
			rusSentence: 'Та змея очень ядовитая, а это обычный уж.',
			engSentences: [
				{
					engSentences: ['That snake is very toxic, and this is an common grass snake.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'змея', engWord: 'snake' },
				{ rusWord: 'ядовитый', engWord: 'toxic' },
				{ rusWord: 'обычный', engWord: 'usual' },
				{ rusWord: 'уж', engWord: 'a grass snake' },
			],
		},
		{
			rusSentence: 'Этот суп вкусный, а тот слишком солёный',
			engSentences: [
				{
					engSentences: ['This soup is tasty, but that one is too salty.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'суп', engWord: 'soup' },
				{ rusWord: 'солёный', engWord: 'salty' },
				{ rusWord: 'вкусный', engWord: 'tasty' },
			],
		},
		{
			rusSentence: 'Это побережье очень опасно.',
			engSentences: [{ engSentences: ['This coast is very dangerous.'], isCorrect: true }],
			words: [
				{ rusWord: 'побережье', engWord: 'a coast' },
				{ rusWord: 'опасный', engWord: 'a dangerous' },
			],
		},
		{
			rusSentence: 'Этот аромат нереальный, а те обычные дешёвые духи.',
			engSentences: [
				{
					engSentences: ['This fragrance is unreal, and those ordinary cheap perfume'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'аромат', engWord: 'fragranc' },
				{ rusWord: 'нереальный', engWord: 'unreal' },
				{ rusWord: 'обычный', engWord: 'ordinary' },
				{ rusWord: 'дешёвый', engWord: 'cheap' },
				{ rusWord: 'духи', engWord: 'perfume' },
			],
		},
		{
			rusSentence: 'Эта любовь сложная, но настоящая.',
			engSentences: [
				{
					engSentences: ["This love is difficult, but it's real."],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'аромат', engWord: 'fragrance' },
				{ rusWord: 'нереальный', engWord: 'unreal' },
				{ rusWord: 'обычный', engWord: 'ordinary' },
				{ rusWord: 'дешёвый', engWord: 'cheap' },
				{ rusWord: 'духи', engWord: 'perfume' },
			],
		},
		{
			rusSentence: 'К сожалению этот человек ненадежен.',
			engSentences: [
				{
					engSentences: ['Unfortunately, that person is unreliable.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'человек', engWord: 'a person' },
				{ rusWord: 'ненадежен', engWord: 'unreliable' },
			],
		},
		{
			rusSentence: 'Эта книга гораздо более интересная, чем та.',
			engSentences: [
				{
					engSentences: ['This book is much more interesting than that.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'очки', engWord: 'glasses' },
				{ rusWord: 'ужасный', engWord: 'terrible' },
			],
		},
		{
			rusSentence: 'Тот фильм не был замечательным.',
			engSentences: [{ engSentences: ['That movie wasn’t wonderful.'], isCorrect: true }],
			words: [
				{ rusWord: 'фильм', engWord: 'a movie' },
				{ rusWord: 'замечательный', engWord: 'wonderful' },
			],
		},
		{
			// TODO
			rusSentence: 'Этот магазин знаменит на весь мир.',
			engSentences: [{ engSentences: ['This store is famous all over the world.'], isCorrect: true }],
			words: [
				{ rusWord: 'фильм', engWord: 'a movie' },
				{ rusWord: 'замечательный', engWord: 'wonderful' },
			],
		},
	],
}

export default exercises_2
