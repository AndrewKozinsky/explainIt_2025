import ArticleType from '../../articleType'

const pluralOfNouns: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 7,
		slug: 'plural-of-nouns',
		caption: 'Глава 5',
		articleName: 'Множественное число существительных',
		articleDescription:
			'Разберём способы образования множественного числа существительных от часто используемых до исключений.',
		isPaid: false,
	},
	content: [
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Нулевой артикль перед множественным числом',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В прошлой главе я говорил, что англичане делят существительные на определённый и неопределённые. На это указывает один из определителей.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'Неопределённый артикль a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ставится в трёх случаях:',
				},
			],
		},
		{
			type: 'list',
			listType: 'dots',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Перед неопределённым существительным;',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Исчисляемым;' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'В единственном числе.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В этих же самых случаях только для существительного во множественном числе ставится ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'нулевой артикль' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Нулевой артикль — это отсутствие видимого определителя перед существительным. Это странное название, но такое имя.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Жёлтые помидоры — сладкие.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Yellow tomatoes are sweet.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Имеют в виду неопределённые помидоры, а не конкретные, помидоры исчисляемые и во множественном числе. Поэтому перед ними будет нулевой артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Небоскрёбы всегда высокие.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Skyscrapers are always tall.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Любые небоскрёбы высокие. Существительное неопределённое во множественном числе и исчисляемое. Поэтому перед ними будет нулевой артикль.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Тема про нулевой артикль ещё не закончена. Но этого пока хватит. В другой главе вы узнаете другие случаи когда он используется.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Образование множественного числа' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Окончание -s' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В большинстве случаев для образования множественного числа к слову прибавляется окончание ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мяч — мячи' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A ball — ball' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Дерево — Деревья' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A tree — Tree' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я и Миша — друзья.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I and Misha are friend' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Вместе I and Misha обозначают одно подлежащее. Так как это множественное число, то ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray', weight: 'normal', text: ' будет в форме ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'are' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: '. Это можно ещё проверить заменив I and Misha местоимением we (мы). И тоже после него ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray', weight: 'normal', text: ' будет в форме are.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Крокодилы очень опасны.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Crocodile' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' are very dangerous.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'На мой',
					engSentences: [{ engSentences: ['From'], isCorrect: true }],
					words: [{ rusWord: 'на мой взгляд', engWord: 'from my point of view' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Окончание -es' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'К некоторым словам для образования множественного числа добавляют окончание ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '-es' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' потому что несколько согласных подряд  затрудняют проговаривание. Такие слова заканчиваются на следующие буквы:',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ch' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Скамейка' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A ben' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'ch' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — ben' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'ch' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-s' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Автобус' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A bu' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — bu' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 's' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ss' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Класс' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A cla' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'ss ' },
				{ type: 'text', color: 'black', weight: 'normal', text: '— cla' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'ss' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-sh' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Желание' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A wi' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'sh' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — wi' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'sh' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-x' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Лиса' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A fo' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'x' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — fo' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'x' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-o' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Картошка' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a potat' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'o' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — potat' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'o' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Такое запомнить сложно, поэтому не заучивайте. Понимание какое окончание ставить будет интуитивным после чтения английских текстов.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Но если этого пока нет, то в случае сомнений попробуйте добавить к слову ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Если язык не спотыкается от добавления ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ', то скорее всего форма слова определена верно. В противном случае попробуйте ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: '-es' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Все счастливые семьи счастливы одинаково.',
					engSentences: [
						{
							engSentences: ['All happy families are happy in the same way.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'все', engWord: 'all' },
						{ rusWord: 'счастливый', engWord: 'happy' },
						{ rusWord: 'семья', engWord: 'family' },
						{ rusWord: 'одинаково', engWord: 'in the same way' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Окончание -ies' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: '-y' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', то последняя ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' меняется на ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ies' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Дитя' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A bab' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — bab' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ies' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Город' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A cit' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — cit' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ies' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мелодия' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A melod' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — melod' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ies' },
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Эт',
					engSentences: [{ engSentences: ['The'], isCorrect: true }],
					words: [],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Окончание -ves' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: '/' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'fe' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', то заменяется на ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Волк' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A wol' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — wol' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Лист' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A lea' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — lea' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Булка' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a loa' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — loa' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Половина' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a hal' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — hal' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Лист ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дерева)' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a lea' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'f' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — lea' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Жизнь' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A li' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'fe' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — li' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мяч' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A kni' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'fe' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — kni' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Жизнь' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a li' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'fe' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — li' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Жена' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a wi' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'fe' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — wi' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'ves' },
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Эт',
					engSentences: [{ engSentences: ['The'], isCorrect: true }],
					words: [],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Изменение основы слова' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В английском у некоторых существительных форма множественного числа образуется через изменении основы. Кстати некоторые те же самые русские слова тоже во множественном числе изменяют основу слова. Такие слова нужно запомнить:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ребёнок' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a child — children' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Стопа' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a foot — feet' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Гусь' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a goose — geese' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мужчина' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a man — men' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Существительное a man/men обозначает не только для мужчину, но человека/людей. Также входит в состав других слов. Например postman (почтальон).',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Женщина' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a woman — women' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мышь' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a mouse — mice' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Человек' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a person — people' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Зуб' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'a tooth — teeth' },
			],
		},
		{
			type: 'exercises',
			id: 4,
			exercises: [
				{
					rusSentence: 'Это дети.',
					engSentences: [{ engSentences: ['They are children.'], isCorrect: true }],
					words: [],
				},
				{
					rusSentence: 'На мой взгляд, мыши — довольно милые существа.',
					engSentences: [
						{
							engSentences: ['From my point of view mice are pretty nice creatures.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'на мой взгляд', engWord: 'from my point of view' },
						{ rusWord: 'довольно', engWord: 'pretty' },
						{ rusWord: 'милый', engWord: 'nice' },
						{ rusWord: 'создание', engWord: 'creature' },
					],
				},
			],
			offset: true,
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ответьте на вопросы чтобы проверить насколько хорошо поняли материал.',
				},
			],
		},
		{
			type: 'faq',
			items: [
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Зачем используют так много вариантов окончаний для образования множественного числа? Почему для всех случаев бы использовать окончание -s?',
									},
								],
							},
						],
					},
					answer: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Если к существительным оканчивающимся на некоторые согласные добавлять окончание -s, то их будет трудно произнести в речи. И чтобы достичь гармоничности для некоторых слов добавляют другие окончания.',
									},
								],
							},
						],
					},
				},
			],
		},
	],
}

export default pluralOfNouns
