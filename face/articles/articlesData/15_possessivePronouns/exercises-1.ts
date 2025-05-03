import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Моё положение бедственное.',
			engSentences: [{ engSentences: ['My situation is awful.'], isCorrect: true }],
			words: [
				{ rusWord: 'положение', engWord: 'situation' },
				{ rusWord: 'бедственный', engWord: 'awful' },
			],
		},
		{
			rusSentence: 'Мое психологическое состояние плохое.',
			engSentences: [{ engSentences: ['My psychology is not well.'], isCorrect: true }],
			words: [
				{ rusWord: 'психологическое состояние', engWord: 'psychology' },
				{ rusWord: 'здоровый, в удовлетворительном состоянии', engWord: 'well' },
			],
		},
		{
			rusSentence: 'Его рукопись была очень старой и грязной.',
			engSentences: [
				{
					engSentences: ['His manuscript was very old and durty.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'рукопись', engWord: 'a manuscript ' },
				{ rusWord: 'старый', engWord: 'old' },
				{ rusWord: 'грязный', engWord: 'durty' },
			],
		},
		{
			rusSentence: 'В настоящее время он является его агентом.',
			engSentences: [{ engSentences: ['He is currently his agent.'], isCorrect: true }],
			words: [
				{ rusWord: 'в настоящее время', engWord: 'currently' },
				{ rusWord: 'агент', engWord: 'agent' },
			],
		},
		{
			rusSentence: 'Английский их второй или иногда даже третий язык.',
			engSentences: [
				{
					engSentences: ['English is their second and sometimes their third language.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'английский', engWord: 'English' },
				{ rusWord: 'второй', engWord: 'second' },
				{ rusWord: 'третий', engWord: 'third' },
				{ rusWord: 'иногда', engWord: 'sometimes' },
				{ rusWord: 'язык', engWord: 'language' },
			],
		},
		{
			rusSentence: 'Он ваш брат? Нет.',
			engSentences: [{ engSentences: ['Is he your brother? No, he is not.'], isCorrect: true }],
			words: [{ rusWord: 'брат', engWord: 'brother' }],
		},
		{
			rusSentence: 'Мои руки чистые.',
			engSentences: [{ engSentences: ['My hands are clear.'], isCorrect: true }],
			words: [{ rusWord: 'брат', engWord: 'brother' }],
		},
	],
}

export default exercises_1
