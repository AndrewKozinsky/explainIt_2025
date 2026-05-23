// import ArticleType from '../../articleTypes/articleType'
// import exercises_1 from './exercises-1'
// import exercises_2 from './exercises-2'
// import exercises_3 from './exercises-3'
// import exercises_4 from './exercises-4'

/*const indefiniteArticle: ArticleType.Art = {
	meta: {
		number: 4,
		slug: 'a',
		name: 'Неопределённый артикль a',
		description: 'Разберёмся как писать исчисляемые существительные в единственном числе.',
		keywords: 'исчисляемые существительные, неопределённый артикль a',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В предыдущих главах вы уже сталкивались с существительными:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Это приносит ему хорошие ' },
						{ type: 'text', text: 'деньги', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'It brings him good ' },
						{ type: 'text', text: 'money', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Я имею много свободного ' },
						{ type: 'text', text: 'времени', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'I have much free ' },
						{ type: 'text', text: 'time', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Они были неисчисляемые.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

							text: 'Неисчисляемое существительное — это существительное не поддающееся счёту. Для проверки добавлю число:',
						},
					],
				},
				{
					type: 'paragraph',
					textSize: 'giant',
					children: [{ type: 'text', text: 'Две воды' }],
				},
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',
							text: 'Так говорить нельзя, поэтому «',
						},
						{
							type: 'text',

							text: 'вода',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '» — это неисчисляемое существительное.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'giant',
					children: [{ type: 'text', text: 'Три стакана' }],
				},
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Так сказать можно. Поэтому ',
						},
						{
							type: 'text',
							text: 'стакан',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ' — это исчисляемое существительное.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'giant',
					children: [{ type: 'text', text: 'Четыре стакана воды' }],
				},
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Предложение составлено верно. Количество относится к стаканам. Поэтому они исчисляемые. А вода не исчисляемое как выяснили ранее.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если существительное исчисляемое и в единственном числе, то перед ним ставится неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
				},
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я вижу учителя.' }] },
				{
					eng: [
						{ type: 'text', text: 'I see ' },
						{ type: 'text', text: 'a', color: 'blue', weight: 'bold' },
						{ type: 'text', text: ' teacher.' },
					],
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
					text: 'Учитель — исчисляемое существительное, поэтому перед ним нужно ставить неопределённый артикль a.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			parts: [
				{ rus: [{ type: 'text', text: 'Он живёт в доме.' }] },
				{
					eng: [
						{ type: 'text', text: 'He lives in ' },
						{ type: 'text', text: 'a', color: 'blue', weight: 'bold' },
						{ type: 'text', text: ' house.' },
					],
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
					text: 'Дом — исчисляемое существительное, поэтому перед ним неопределённый артикль a.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Это упрощённое представление неопределённого артикля. Ниже детальнее поговорим что конкретно он обозначает. Пока попробуйте перевести предложения.',
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Изменение артикля на an' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					text: 'Если исчисляемое существительное в единственном числе ',
				},
				{ type: 'text', weight: 'bold', text: 'при произношении' },
				{
					type: 'text',
					text: ' (не на письме!) начинается с гласной буквы, то перед ним ставят артикль ',
				},
				{ type: 'text', color: 'blue', text: 'an', weight: 'bold' },
				{
					type: 'text',
					text: ', а если с согласной, то ',
				},
				{ type: 'text', color: 'blue', text: 'a', weight: 'bold' },
				{
					type: 'text',
					text: '. Это нужно для гармонии чтобы гласные не стояли друг за другом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', weight: 'bold', text: 'an apple' },
				{ type: 'text', text: ' — произносится ' },
				{ type: 'text', color: 'gold', text: '[эпл]' },
				{
					type: 'text',
					text: ' и пишется с гласной. Поэтому ставится ',
				},
				{ type: 'text', color: 'blue', text: 'an', weight: 'bold' },
				{ type: 'text', text: ' вместо ' },
				{ type: 'text', weight: 'bold', text: 'a' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', weight: 'bold', text: 'an honest boy' },
				{
					type: 'text',
					text: ' — хотя в письме начинается с согласной, но произносится с гласной ',
				},
				{ type: 'text', color: 'gold', text: '[онэст]' },
				{
					type: 'text',
					text: '. Поэтому тут также стоит артикль ',
				},
				{ type: 'text', color: 'blue', text: 'an', weight: 'bold' },
				{
					type: 'text',
					text: '. Обратите внимание, что нужно смотреть не на существительное, а на слово, которое стоит после артикля. В этом примере это прилагательное ',
				},
				{ type: 'text', color: 'blue', text: 'honest' },
				{
					type: 'text',
					text: ' потому что прилагательные вклиниваются между артиклем и существительным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', weight: 'bold', text: 'a table' },
				{
					type: 'text',
					text: ' — произносится и пишется ',
				},
				{ type: 'text', color: 'gold', text: '[тэйбл]' },
				{
					type: 'text',
					text: ' с согласной. Поэтому стоит артикль ',
				},
				{ type: 'text', color: 'blue', text: 'a', weight: 'bold' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', weight: 'bold', text: 'a unity' },
				{
					type: 'text',
					text: ' — хотя в письме начинается с гласной, но произносится с согласной ',
				},
				{ type: 'text', color: 'gold', text: '[джунэти]' },
				{ type: 'text', text: '. Поэтому ' },
				{ type: 'text', color: 'blue', text: 'a', weight: 'bold' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',
							text: 'В русском языке мы также изменяем предлоги для удобства произношения. Например предлог «',
						},
						{
							type: 'text',
							text: 'в',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '» изменим на «',
						},
						{
							type: 'text',
							text: 'во',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '» если после него стоит слово начинающееся на «',
						},
						{
							type: 'text',
							text: 'в',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '»: «',
						},
						{
							type: 'text',
							text: 'в цирке',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '», но «',
						},
						{
							type: 'text',
							text: 'во время исполнения',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '».',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Потренирутесь:',
				},
			],
		},
		exercises_2,

		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прилагательное перед существительным' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если перед существительным стоит прилагательное, то неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a/an',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' ставится до него.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Кожаная куртка' }] },
				{
					eng: [
						{ type: 'text', text: 'A ' },
						{ type: 'text', text: 'leather', color: 'blue' },
						{ type: 'text', text: ' jacket' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Джинсовая рубашка' }] },
				{
					eng: [
						{ type: 'text', text: 'A ' },
						{ type: 'text', text: 'denim', color: 'blue' },
						{ type: 'text', text: ' shirt' },
					],
				},
			],
		},
		exercises_3,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Смешанная практика' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' произошёл от слова ',
				},
				{
					type: 'text',
					text: 'one',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' (один)',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. Именно поэтому его и ставят перед исчисляемых существительных в единственном числе. Если поставить его перед неисчисляемыми существительными или перед существительными во множественном числе, то это будет выглядеть странно. Давайте сделаем смешанную практику и попереводим предложения с любыми типами существительных.',
				},
			],
		},
		exercises_4,

		{ type: 'header', tag: 'h2', style: 'h2', text: 'Какие свойства даёт артикль a/an существительному' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Выше я писал, что неопределённый артикль ставится перед исчисляемыми в единственном числе. Это упрощённое представление. Давайте в деталях рассмотрим что он даёт.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указывает на единственное число' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' происходит от слова «',
				},
				{
					type: 'text',
					text: 'один',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '». Поэтому можно или использовать его или существительное ',
				},
				{
					type: 'text',
					text: 'one',
					color: 'blue',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' чтобы сообщить об одном объекте.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Они видят птицу на дереве.' }] },
				{
					eng: [
						{ type: 'text', text: 'They see ' },
						{ type: 'text', text: 'a', color: 'blue' },
						{ type: 'text', text: ' bird in the tree.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Они видят ' },
						{ type: 'text', text: '(одну)', color: 'gray' },
						{ type: 'text', text: ' птицу на дереве.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'They see ' },
						{ type: 'text', text: 'one', color: 'blue' },
						{ type: 'text', text: ' bird in the tree.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Одновременно ставить ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' и ',
				},
				{
					type: 'text',
					text: 'one',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' не нужно.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если существительное неисчисляемое, то числа ставить нельзя как и артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' потому что это синоним числа «',
				},
				{
					type: 'text',
					text: 'один',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '».',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Дай мне чай.' }] },
				{ eng: [{ type: 'text', text: 'Give me tea.' }] },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Чай — неисчисляемое существительное, поэтому неопределённый артикль не ставится.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Одна порция' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но если поставить ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в значении некоторых продуктов, то это будет означать порцию этого продукта:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Дай мне чашку чая.' }] },
				{ eng: [{ type: 'text', text: 'Give me a tea.' }] },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Под порцией чая обычно подразумевается чашка.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Другие продукты:',
				},
			],
		},
		{
			type: 'grid',
			gridId: 'grid-21718',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'water',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'вода',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'beer',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'пиво',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'cheese',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'сыр',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'A water',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'стакан воды',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'A beer',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'бутылка или стакан пива',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'A cheese',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									text: 'один кусочек или сорт сыра',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё примеры:',
				},
			],
		},
		{
			type: 'grid',
			gridId: 'grid-21718',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'life' },
								{ type: 'arrow' },
								{ type: 'text', text: 'жизнь' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'time' },
								{ type: 'arrow' },
								{ type: 'text', text: 'время' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'play' },
								{ type: 'arrow' },
								{ type: 'text', text: 'игра' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'fire' },
								{ type: 'arrow' },
								{ type: 'text', text: 'огонь' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'a life' },
								{ type: 'arrow' },
								{
									type: 'text',

									text: 'жизненный путь',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'a time' },
								{ type: 'arrow' },
								{ type: 'text', text: 'раз' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'a play' },
								{ type: 'arrow' },
								{ type: 'text', text: 'пьеса' },
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{ type: 'text', text: 'a fire' },
								{ type: 'arrow' },
								{ type: 'text', text: 'пожар' },
							],
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Определяет существительное' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В отличии от русского в английском одна и та же форма слова может быть и существительным и прилагательным и глаголом:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'beauty',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'красивый ',
				},
				{
					type: 'text',
					color: 'gray',
					text: '(как прилагательное)',
				},
				{
					type: 'text',
					text: ', красота ',
				},
				{
					type: 'text',
					color: 'gray',
					text: '(как существительное)',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'invite',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'приглашать ',
				},
				{
					type: 'text',
					color: 'gray',
					text: '(как глагол)',
				},
				{
					type: 'text',
					text: ', приглашение ',
				},
				{
					type: 'text',
					color: 'gray',
					text: '(как существительное)',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a',
					weight: 'bold',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' всегда указывает на существительное или на прилагательное с существительным.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'a beauty',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'красота ',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'an invite',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'приглашение ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Разберу такое предложение:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Она простужается каждую зиму.' }] },
				{ eng: [{ type: 'text', text: 'She catches a cold every winter.' }] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Фраза ',
				},
				{
					type: 'text',
					text: 'catch a cold',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' дословно обозначает «',
				},
				{
					type: 'text',
					text: 'поймать простуду',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '». А на русский язык переводится глаголом «',
				},
				{
					type: 'text',
					text: 'простужаться',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '». Слово ',
				},
				{
					type: 'text',
					text: 'cold',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' используется как существительное «',
				},
				{
					type: 'text',
					text: 'простуда',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '», так и прилагательное «',
				},
				{
					type: 'text',
					text: 'холодный',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '». И неопределённый артикль сообщает, что дальше идёт именно существительное.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',
							text: 'В русском языке слово «простуда» неисчисляемое. А в английском считается исчисляемым потому что человек может переболеть простудой несколько раз в год. Поэтому в английском переводе перед ',
						},
						{
							type: 'text',
							text: 'cold',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ' стоит неопределённый артикль ',
						},
						{
							type: 'text',
							text: 'a',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					text: 'Если убрать ',
				},
				{
					type: 'text',
					text: 'a',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', то просто ',
				},
				{
					type: 'text',
					text: 'cold',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' будет восприниматься как прилагательное и предложение лишается смысла.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Она ловит холодный 🫤 каждая зима.' }] },
				{ eng: [{ type: 'text', text: 'She catches cold every winter.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Другой пример:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Вам нужен ковбойский образ.' }] },
				{ eng: [{ type: 'text', text: 'You need a cowboy look.' }] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Слово ',
				},
				{
					type: 'text',
					text: 'look',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' используется как глагол «',
				},
				{
					type: 'text',
					text: 'смотреть',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» или существительное — ',
				},
				{
					type: 'text',
					text: 'образ',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'взгляд',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'выражение лица',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. Так как ',
				},
				{
					type: 'text',
					text: 'look',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' тут должно использоваться как существительное, то ставится неопределённый артикль. Но он стоит не перед самим существительным, а перед прилагательным относящимся к этому существительному.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указывает на типичное поведение' },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', weight: 'bold', text: 'Неопределённый артикль a' },
				{
					type: 'text',
					text: ' могут применять не в значении «один из объектов», а в обобщённом значении как типичное поведение любого объекта этого класса.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Врач лечит людей.' }] },
				{ eng: [{ type: 'text', text: 'A doctor treats people.' }] },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Не какой-то врач лечит людей, а в целом любой врач это делает. Это их характерное поведение.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Кролик — домашнее животное.' }] },
				{ eng: [{ type: 'text', text: 'A rabbit is a domestic animal.' }] },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Заметьте, что артикль стоит и перед rabbit и перед domestic animal потому что это два неопределённых существительных.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Делает существительное одним из объектов класса' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Самое важное назначение неопределённого артикля a — указание на то, что это существительное или предмет относится к любому объекту этого класса. Но давайте лучше я объясню это в сравнении с определённым артиклем ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
					color: 'blue',
				},
				{
					type: 'text',
					text: '. Это будет в следующей главе.',
				},
			],
		},
	],
}*/

// export default indefiniteArticle
