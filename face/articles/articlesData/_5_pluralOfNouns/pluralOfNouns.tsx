// import ArticleType from '../../articleType'

/*const pluralOfNouns: ArticleType.Art = {
	meta: {
		number: 7,
		slug: 'plural-of-nouns',
		caption: 'Глава 5',
		articleName: 'Множественное число существительных',
		articleDescription:
			'Разберём способы образования множественного числа существительных от часто используемых до исключений.',
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

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

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Перед неопределённым существительным;',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [{ type: 'text', color: 'black', text: 'Исчисляемым;' }],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

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

					text: 'В этих же самых случаях только для существительного во множественном числе ставится ',
				},
				{ type: 'text', color: 'blue', text: 'нулевой артикль' },
				{
					type: 'text',
					color: 'black',

					text: '. Нулевой артикль — это отсутствие видимого определителя перед существительным. Это странное название, но такое имя.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Жёлтые помидоры — сладкие.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Yellow tomatoes are sweet.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

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

					text: 'Небоскрёбы всегда высокие.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Skyscrapers are always tall.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

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

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'В большинстве случаев для образования множественного числа к слову прибавляется окончание ',
				},
				{ type: 'text', color: 'blue', text: '-s' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Мяч — мячи' },

				{ type: 'text', color: 'black', text: 'A ball — ball' },
				{ type: 'text', color: 'blue', text: 's' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Дерево — Деревья' },

				{ type: 'text', color: 'black', text: 'A tree — Tree' },
				{ type: 'text', color: 'blue', text: 's' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я и Миша — друзья.' },

				{ type: 'text', color: 'black', text: 'I and Misha are friend' },
				{ type: 'text', color: 'blue', text: 's' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Вместе I and Misha обозначают одно подлежащее. Так как это множественное число, то ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray', text: ' будет в форме ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'are' },
				{
					type: 'text',
					color: 'gray',

					text: '. Это можно ещё проверить заменив I and Misha местоимением we (мы). И тоже после него ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray', text: ' будет в форме are.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Крокодилы очень опасны.' },

				{ type: 'text', color: 'black', text: 'Crocodile' },
				{ type: 'text', color: 'blue', text: 's' },
				{ type: 'text', color: 'black', text: ' are very dangerous.' },
			],
		},
		{
			type: 'exercises',
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'К некоторым словам для образования множественного числа добавляют окончание ',
				},
				{ type: 'text', color: 'blue', text: '-es' },
				{
					type: 'text',
					color: 'black',

					text: ' потому что несколько согласных подряд  затрудняют проговаривание. Такие слова заканчиваются на следующие буквы:',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ch' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Скамейка' },

				{ type: 'text', color: 'black', text: 'A ben' },
				{ type: 'text', color: 'gold', text: 'ch' },
				{ type: 'text', color: 'black', text: ' — ben' },
				{ type: 'text', color: 'gold', text: 'ch' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-s' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Автобус' },

				{ type: 'text', color: 'black', text: 'A bu' },
				{ type: 'text', color: 'gold', text: 's' },
				{ type: 'text', color: 'black', text: ' — bu' },
				{ type: 'text', color: 'gold', text: 's' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ss' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Класс' },

				{ type: 'text', color: 'black', text: 'A cla' },
				{ type: 'text', color: 'gold', text: 'ss ' },
				{ type: 'text', color: 'black', text: '— cla' },
				{ type: 'text', color: 'gold', text: 'ss' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-sh' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Желание' },

				{ type: 'text', color: 'black', text: 'A wi' },
				{ type: 'text', color: 'gold', text: 'sh' },
				{ type: 'text', color: 'black', text: ' — wi' },
				{ type: 'text', color: 'gold', text: 'sh' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-x' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Лиса' },

				{ type: 'text', color: 'black', text: 'A fo' },
				{ type: 'text', color: 'gold', text: 'x' },
				{ type: 'text', color: 'black', text: ' — fo' },
				{ type: 'text', color: 'gold', text: 'x' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-o' },
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Картошка' },

				{ type: 'text', color: 'black', text: 'a potat' },
				{ type: 'text', color: 'gold', text: 'o' },
				{ type: 'text', color: 'black', text: ' — potat' },
				{ type: 'text', color: 'gold', text: 'o' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

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

							text: 'Но если этого пока нет, то в случае сомнений попробуйте добавить к слову ',
						},
						{ type: 'text', color: 'blue', text: '-s' },
						{
							type: 'text',
							color: 'black',

							text: '. Если язык не спотыкается от добавления ',
						},
						{ type: 'text', color: 'blue', text: '-s' },
						{
							type: 'text',
							color: 'black',

							text: ', то скорее всего форма слова определена верно. В противном случае попробуйте ',
						},
						{ type: 'text', color: 'blue', text: '-es' },
						{ type: 'text', color: 'black', text: '.' },
					],
				},
			],
		},
		{
			type: 'exercises',
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', color: 'gold', text: '-y' },
				{ type: 'text', color: 'black', text: ', то последняя ' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', color: 'black', text: ' меняется на ' },
				{ type: 'text', color: 'blue', text: 'ies' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Дитя' },

				{ type: 'text', color: 'black', text: 'A bab' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', color: 'black', text: ' — bab' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Город' },

				{ type: 'text', color: 'black', text: 'A cit' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', color: 'black', text: ' — cit' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Мелодия' },

				{ type: 'text', color: 'black', text: 'A melod' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', color: 'black', text: ' — melod' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{
			type: 'exercises',
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', color: 'gold', text: 'f' },
				{ type: 'text', color: 'black', text: '/' },
				{ type: 'text', color: 'gold', text: 'fe' },
				{ type: 'text', color: 'black', text: ', то заменяется на ' },
				{ type: 'text', color: 'blue', text: 'ves' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Волк' },

				{ type: 'text', color: 'black', text: 'A wol' },
				{ type: 'text', color: 'gold', text: 'f' },
				{ type: 'text', color: 'black', text: ' — wol' },
				{ type: 'text', color: 'blue', text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Лист' },

				{ type: 'text', color: 'black', text: 'A lea' },
				{ type: 'text', color: 'gold', text: 'f' },
				{ type: 'text', color: 'black', text: ' — lea' },
				{ type: 'text', color: 'blue', text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Булка' },

				{ type: 'text', color: 'black', text: 'a loa' },
				{ type: 'text', color: 'gold', text: 'f' },
				{ type: 'text', color: 'black', text: ' — loa' },
				{ type: 'text', color: 'blue', text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', text: 'Половина' },

				{ type: 'text', color: 'black', text: 'a hal' },
				{ type: 'text', color: 'gold', text: 'f' },
				{ type: 'text', color: 'black', text: ' — hal' },
				{ type: 'text', color: 'blue', text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Лист ' },
				{ type: 'text', color: 'gray',  text: '(дерева)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'a lea' },
				{ type: 'text', color: 'gold',  text: 'f' },
				{ type: 'text', color: 'black',  text: ' — lea' },
				{ type: 'text', color: 'blue',  text: 'ves' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Жизнь' },

				{ type: 'text', color: 'black',  text: 'A li' },
				{ type: 'text', color: 'gold',  text: 'fe' },
				{ type: 'text', color: 'black',  text: ' — li' },
				{ type: 'text', color: 'blue',  text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Мяч' },

				{ type: 'text', color: 'black',  text: 'A kni' },
				{ type: 'text', color: 'gold',  text: 'fe' },
				{ type: 'text', color: 'black',  text: ' — kni' },
				{ type: 'text', color: 'blue',  text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Жизнь' },

				{ type: 'text', color: 'black',  text: 'a li' },
				{ type: 'text', color: 'gold',  text: 'fe' },
				{ type: 'text', color: 'black',  text: ' — li' },
				{ type: 'text', color: 'blue',  text: 'ves' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Жена' },

				{ type: 'text', color: 'black',  text: 'a wi' },
				{ type: 'text', color: 'gold',  text: 'fe' },
				{ type: 'text', color: 'black',  text: ' — wi' },
				{ type: 'text', color: 'blue',  text: 'ves' },
			],
		},
		{
			type: 'exercises',
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

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'В английском у некоторых существительных форма множественного числа образуется через изменении основы. Кстати некоторые те же самые русские слова тоже во множественном числе изменяют основу слова. Такие слова нужно запомнить:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Ребёнок' },

				{ type: 'text', color: 'black',  text: 'a child — children' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Стопа' },

				{ type: 'text', color: 'black',  text: 'a foot — feet' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Гусь' },

				{ type: 'text', color: 'black',  text: 'a goose — geese' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Мужчина' },

				{ type: 'text', color: 'black',  text: 'a man — men' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Существительное a man/men обозначает не только для мужчину, но человека/людей. Также входит в состав других слов. Например postman (почтальон).',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Женщина' },

				{ type: 'text', color: 'black',  text: 'a woman — women' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Мышь' },

				{ type: 'text', color: 'black',  text: 'a mouse — mice' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Человек' },

				{ type: 'text', color: 'black',  text: 'a person — people' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text', color: 'black',  text: 'Зуб' },

				{ type: 'text', color: 'black',  text: 'a tooth — teeth' },
			],
		},
		{
			type: 'exercises',
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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

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
}*/

// export default pluralOfNouns
