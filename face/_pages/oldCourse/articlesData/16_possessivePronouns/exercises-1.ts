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
			engSentences: [
				{ engSentences: ['My mental health is not good.'], isCorrect: true },
				{ engSentences: ['My mental health is bad.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'психологическое состояние', engWord: 'mental health' },
				{ rusWord: 'плохой', engWord: 'bad' },
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
		{
			rusSentence: 'На мой взгляд, мыши — довольно милые существа.',
			engSentences: [
				{ engSentences: ['From my point of view mice are pretty nice creatures.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'на мой взгляд', engWord: 'from my point of view' },
				{ rusWord: 'мышь', engWord: 'mouse' },
				{ rusWord: 'довольно', engWord: 'pretty' },
				{ rusWord: 'милый', engWord: 'nice' },
				{ rusWord: 'существо', engWord: 'creature' },
			],
		},
		{
			rusSentence: 'Все, что они делают, отражает их любовь к внукам.',
			engSentences: [
				{ engSentences: ['Everything they do reflects their love for their grandchildren.'], isCorrect: true },
			],
			words: [
				{ rusWord: 'всё', engWord: 'everything' },
				{ rusWord: 'отражать', engWord: 'reflect' },
				{ rusWord: 'любовь', engWord: 'love' },
				{ rusWord: 'внук', engWord: 'grandchild' },
			],
		},
		{
			rusSentence: 'Мой сын приходит рано.',
			engSentences: [{ engSentences: ['My son arrives early.'], isCorrect: true }],
			words: [
				{ rusWord: 'сын', engWord: 'son' },
				{ rusWord: 'приходить', engWord: 'arrive' },
				{ rusWord: 'рано', engWord: 'early' },
			],
		},
		{
			rusSentence: 'Мы ненавидим наших соседей.',
			engSentences: [{ engSentences: ['We hate our neighbors.'], isCorrect: true }],
			words: [
				{ rusWord: 'ненавидеть', engWord: 'hate' },
				{ rusWord: 'сосед', engWord: 'neighbor' },
			],
		},
		{
			rusSentence: 'Ее губная помада в ванной.',
			engSentences: [{ engSentences: ['Her garden spray is in the bathroom.'], isCorrect: true }],
			words: [
				{ rusWord: 'губная помада', engWord: 'lipstick' },
				{ rusWord: 'ванная', engWord: 'bathroom' },
			],
		},
		{
			rusSentence: 'Это твои яйца?',
			engSentences: [{ engSentences: ['Are they your eggs?'], isCorrect: true }],
			words: [{ rusWord: 'яйцо', engWord: 'egg' }],
		},
		{
			rusSentence: 'Он мой друг по переписке.',
			engSentences: [{ engSentences: ['He is my pen friend.'], isCorrect: true }],
			words: [{ rusWord: 'друг по переписке', engWord: 'pen friend' }],
		},
		{
			rusSentence: 'Твоё такси здесь.',
			engSentences: [{ engSentences: ['Your taxi is here.'], isCorrect: true }],
			words: [
				{ rusWord: 'такси', engWord: 'taxi' },
				{ rusWord: 'здесь', engWord: 'here' },
			],
		},
		{
			rusSentence: 'Единственная проблема в том, что ей не нравятся мои манеры, моя прическа и моя одежда.',
			engSentences: [
				{
					engSentences: [
						'The only problem is, she does not like my manners and my hairstyle and my clothes.',
					],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'единственный', engWord: 'only' },
				{ rusWord: 'проблема', engWord: 'popular' },
				{ rusWord: 'нравиться', engWord: 'like' },
				{ rusWord: 'манеры', engWord: 'manners' },
				{ rusWord: 'причёска', engWord: 'hairstyle' },
				{ rusWord: 'одежда', engWord: 'clothes' },
			],
		},
		{
			rusSentence: 'Они не мои друзья.',
			engSentences: [
				{
					engSentences: ['They are not my friends.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'друг', engWord: 'friend' }],
		},
		{
			rusSentence: 'Вы наш клиент.',
			engSentences: [
				{
					engSentences: ['You are our customer.'],
					isCorrect: true,
				},
			],
			words: [{ rusWord: 'клиент', engWord: 'customer' }],
		},
		{
			rusSentence: 'Моя мама не понимает меня.',
			engSentences: [
				{
					engSentences: ['My mum does not understand me.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'мама', engWord: 'mum' },
				{ rusWord: 'понимать', engWord: 'understand' },
			],
		},
		{
			rusSentence: 'Вам нравится мой морковный торт?',
			engSentences: [
				{
					engSentences: ['Do you like my carrot cake?'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'нравиться', engWord: 'like' },
				{ rusWord: 'морковь', engWord: 'carrot' },
				{ rusWord: 'торт', engWord: 'cake' },
			],
		},
		{
			rusSentence: 'Вам нравится моя новая одежда?',
			engSentences: [
				{
					engSentences: ['Do you like my new clothes?'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'новый', engWord: 'new' },
				{ rusWord: 'одежда', engWord: 'clothes' },
			],
		},
		{
			rusSentence: 'Твоя мама очень добрая, но мы хотим скромную свадьбу.',
			engSentences: [
				{
					engSentences: ['Your mother is very kind, but we want a small wedding.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'яйцо', engWord: 'egg' },
				{ rusWord: 'популярный', engWord: 'popular' },
			],
		},
	],
}

export default exercises_1
