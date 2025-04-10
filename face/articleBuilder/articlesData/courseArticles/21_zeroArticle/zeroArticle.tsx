import ArticleType from '../../articleType'

const zeroArticle: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 23,
		slug: 'zero-article',
		caption: 'Глава 21',
		articleName: 'Нулевой артикль',
		articleDescription:
			'Окончательно разберёмся когда использовать нулевой артикль и как не спутать его с другими случаями.',
		isPaid: false,
	},
	content: [
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'У русского языка есть суперспособность — система родов благодаря которой мы знаем пол персонажа даже без прямого указания имени или местоимения.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: '— Ты звонил адвокату?' }],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '— Сказала придёт завтра.',
				},
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
					text: 'Благодаря роду в первом предложении мы понимаем, что обращаются к мужчине, а во втором, что адвокат женщина.',
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
					text: 'В английском этого нет. Поэтому чтобы указать женский род они вынуждены к существительным добавлять дополнительные слова. Английский тут выглядит менее информативным. Но англичане этого особо не замечают.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'a translator (переводчик)',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'a woman-translator (переводчица)',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'a wolf (волк)' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'a she-wolf (волчица)' },
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
					text: 'Зато в английском есть определители существительных. Английские существительные ничем не отличаются от русских. Но вместе с определителями способны изменить смысл. И теперь в русское предложение приходится подпирать дополнительными словами чтобы точно его передать.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ordered coffee.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Я заказал кофе ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(в зёрнах)' },
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
					text: 'Так как кофе — это неисчисляемое существительное и неопределённый артикль не ставится, то тут кофе выступает в качестве вещества. Конкретно кофейные зёрна.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ordered ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' coffee.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Я заказал ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(чашку)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' кофе.' },
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
					text: 'Если перед неисчисляемым существительным поставить неопределённый артикль, то это станет обозначать порцию вещества. Обычно порция кофе — это чашка заваренного кофе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ordered ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'the' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' coffee.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'Я заказал ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(то самое)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' кофе.' },
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
					text: 'Определённый артикль the подразумевает, что собеседник понимает о каком кофе идёт речь. Может о зёрнах, может о готовом продукте.',
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
					text: 'И поэтому русскоязычным трудно даётся понимание когда и какой ставить определитель при переводе с русского языка. Наш язык менее выразителен в этом плане. Это как на мониторе не поддерживащим HDR смотреть фотографии с большой глубиной цвета. И ладно бы был бинарный выбор между неопределённым артиклем a или определённым the. Но в английском есть множество случаев когда перед существительным ставят нулевой артикль. И там вообще другие правила когда он используется.',
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
							text: 'Нулевым артиклем называют отсутствие артикля перед существительным.',
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
					text: 'Поэтому чтобы не перечислять все эти случаи (а ещё к каждому случаю будет куча исключений) предлагаю такой подход:',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'yellow',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'giant',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Сначала прикидываем подходит ли к существительному по смыслу один из определителей, и если нет, то ставим нулевой.',
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
					text: 'Давайте попробуем его в деле и переведём предложение:',
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
					text: 'Мой папа вечно пропадает в гараже.',
				},
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
					text: 'Выражение «вечно пропадает» можно привести к «тратить всё время». И у нас получились 3 существительных: папа, время и гараж. У каждого должен быть определитель.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '... dad spend all ... time in ... garage.',
				},
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
					text: 'Около «папа» будет притяжательное местоимение «мой». Оно явно присутствует в русскоязычном варианте. Около времени  можно поставить «его» потому что время папы принадлежит папе. А перед гаражом тоже может быть это местоимение потому что гараж принадлежит папе.',
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
					text: 'My dad spend all his time in his garage.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Следующее предложение.' }],
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
					text: 'Слон — самое большое четвероногое животное.',
				},
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
					text: 'В данном контексте «слон» — это не конкретное животное, а в целом любой представитель этого класса. Это второй случай когда используется неопределённый артиль a. Первый — это когда говорят про отдельный экземпляр класса.',
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
					text: 'А существительное «самое большое четвероногое животное» содержит превосходную степень прилагательного поэтому перед ним всегда будет определённый артикль the.',
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
					text: 'An elephant is the biggest four-legged animal.',
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
					text: 'Следующее предложение аналогично по смыслу предыдущему.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Я люблю морковь.' }],
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
					text: 'Я люблю любую морковь, любой представитель этого класса. Поэтому морковь отделяется артиклем a.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'I like a carrot.' }],
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
					text: 'В русском языке в названии класса принято использовать существительное в единственном числе. Но в английском ещё используется вариант со множественным числом: Я люблю моркови. Неопределённый артикль a может стоять только с существительными в единственном числе, поэтому тут поставить нельзя. Определённый тоже не подходит потому что я люблю не конкретные моркови, а любые. И так как ни один определитель не подходит, то будет нулевой.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'I like carrots.' }],
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
					text: 'Следующее предложение похоже на предыдущее.',
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
					text: 'У собак есть хозяева, у кошек — персонал.',
				},
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
					text: 'Можно перевести существительными как в единственном числе, так и во множественном как в русском, так и в английском.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'У собаки есть хозяин, у кошки служащий.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'A dog has an owner, a cat has an employee.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'У собак есть хозяева, у кошек — персонал.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Dogs have owners, cats have staff.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Следующее предложение:' }],
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
					text: 'Симптомы высокого кровяного давления не очень специфичны.',
				},
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
					text: 'Существительное «симптомы» во множественном числе. Неопределённый артикль сразу отпадает. Симптомы конкретные, определённые? Да, симптомы высокого кровяного давления. Поэтому через the. Ещё есть существительное «давление». Оно неисчисляемое. Поэтому неопределённый артикль не подходит. Высокое кровяное давление — это название класса, а не что-то конкретное. Поэтому перед ним нулевой артикль.',
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
					text: 'The symptoms of high blood pressure are not very specific.',
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
					text: 'В этом предложении сказано про два неконкретных круассана и неконкретную чашку молока. Неопределённый артикль не поставишь для существительного во множественном числе, поэтому нулевой. А чашка кофе можно было бы перевести a cup of coffee, но артикль a перед веществами обозначает порцию. Для кофе это чашка. Поэтому можно сократить до a coffee. Существительное «молоко» обозначает любое молоко. Так как но не исчисляемое, то неопределённый артикль поставить нельзя, как и определённый. Поэтому нулевой.',
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
					text: 'Два круассана и чашка кофе с молоком.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Two croissants and a coffee with milk.',
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
					text: 'Попробуйте на практике подумать какие артикли использовать при переводе. А потом посмотрим случаи употребления нулевого артикля не походящие под правило приведённое выше.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Храбрость и неразумность не одно и то же.',
					engSentences: [
						{
							engSentences: ['Courage and unreason are not the same.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Она верит, что приведений не существует.',
					engSentences: [
						{
							engSentences: ['She believes that ghosts do not exist.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ребенок', engWord: 'a child' }],
				},
				{
					rusSentence: 'Каждый принёс хот-доги и картофельные чипсы.',
					engSentences: [
						{
							engSentences: ['Everyone brought hot dogs and potato chips.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'нуждаться', engWord: 'need' },
						{ rusWord: 'бумага', engWord: 'paper' },
					],
				},
				{
					rusSentence: 'Мы работаем не полный рабочий день.',
					engSentences: [{ engSentences: ['We work part-time.\u0003'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Вы обычно смотрите телевизор.',
					engSentences: [{ engSentences: ['You usually watch TV.'], isCorrect: true }],
					words: [
						{ rusWord: 'смотреть', engWord: 'watch' },
						{ rusWord: 'телевизор', engWord: 'TV' },
					],
				},
				{
					rusSentence: 'Они разрешают детям играть в видеоигры.',
					engSentences: [{ engSentences: ['They let children play video games.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Из храма я вышла другим человеком.',
					engSentences: [{ engSentences: ['I left the church a different man.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					note: 'Похоже это тема про нулевой артикль. Нужно изучить. Вот, что ответил ЧатГПТ на вопрос почему тут нет артиклей: In English grammar, the indefinite article "a" is typically used before singular countable nouns that are not specific or previously mentioned. When listing items in a general sense or as part of a category, the indefinite article is often omitted, especially when the items are being grouped together as a collective or category.\nIn your example, "potato," "tomato," and "onion" are being presented as general examples of soup ingredients. Since they are listed as part of a category of usual soup ingredients, the indefinite article "a" is not necessary before each item. The omission of the article helps to suggest that these items are examples or representatives of a larger group rather than specific individual instances.',
					rusSentence: 'Картошка, помидоры и лук — обычные ингредиенты супа.',
					engSentences: [
						{
							engSentences: ['Potatoes, tomatoes and onions are common soup ingredients.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'картошка', engWord: 'potatoes' },
						{ rusWord: 'помидоры', engWord: 'tomatoes' },
						{ rusWord: 'лук', engWord: 'onions' },
						{ rusWord: 'обычный', engWord: 'common' },
						{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' },
					],
				},
				{
					rusSentence: 'Мы всегда пьём чай.',
					engSentences: [{ engSentences: ['We always drink tea.'], isCorrect: true }],
					words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
				},
				{
					rusSentence: 'Я готовлю рыбу каждый четверг.',
					engSentences: [{ engSentences: ['I cook fish every Thursday.'], isCorrect: true }],
					words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
				},
				{
					rusSentence: 'Хотдоги, чизбургеры и диетическая Кола — вредная пища.',
					engSentences: [
						{
							engSentences: ['Hotdogs, cheeseburgers and diet Cola are junk food.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
				},
			],
			offset: true,
		},
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Существительные обозначающие функциональное значение',
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
					text: 'Существительное «тюрьма» в этом предложении обозначает любую тюрьму. Оно исчисляемое и в единственном числе. Поэтому можно перевести через неопределённый артикль a.',
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
					text: 'Грабитель теперь в тюрьме.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The robber is in prison now.',
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
					text: 'Но и в русском и в английском нередко в качестве места подразумевается не физический объект, а его функцию: школа',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'учёба, больница или врач',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'лечение, церковь' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'богослужение, каникулы' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'отдых. То есть в качестве цели ради которых они были созданы. Перед такими словами должен быть нулевой артикль.',
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
					text: 'The robber is in prison now.',
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
					text: 'Тюрьма в данном переводе обозначает отбытие наказания. Грабитель отбывает наказание. А каким именно способом не важно.',
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
					text: 'Похожий пример. Так как перед hospital не указан неопределённый артикль, то значит существительное находится в значении функции. И само предложение обозначает, что восемь пострадавших остаются на лечении.',
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
					text: 'Восемь из них остаются в больницах.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Eight of them remain in hospital.',
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
					text: 'Слова breakfast, supper, lunch можно обозначить и как событие и как функцию приёма пищи. В этом значении неопределённый артикль не пишется.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Она спит после обеда.' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'She sleeps after dinner.',
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
					text: 'Она спит после того как поела.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я напишу тебе про ланч.' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I will text you about lunch.',
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
					text: 'Он напишет когда будем есть.',
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
							text: 'Американцы перед функциональными значениями употребляют the.',
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
					text: 'Ещё раз оговорюсь, что если в предложении мы подразумеваем не функцию, а реальный физический объект, то конечно нужно использовать один из определителей:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Каждый городок имеет больницу.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Every small city has a hospital.',
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
					text: 'Тут «больница» подразумевается не в смысле лечения, а как здание. Поэтому тут стоит неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ты только что съела огромный обед.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'You just ate an enormous lunch.',
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
					text: 'Тут «обед» подразумевается не в смысле приёма пищи, а как большая порция. Поэтому стоит неопределённый артикль.',
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
					text: 'Слово bed тоже может использовать в функциональном значении обозначая лежать в постели, отдыхать.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Ты играл в теннис в детстве?',
					engSentences: [
						{
							engSentences: ['Did you play tennis in your childhood?'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Существительное + цифра' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Цифра перед существительными обозначает количество объектов. Это всегда множественное число. Такие цифры называются количественными числительными. Про них будет отдельная глава.',
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
					text: 'Но если цифра стоит после существительного, то это обозначает его номер: школа 54, Порше 911. И хотя такое существительное стоит в еденственном числе, но употребляется с нулевым артиклем.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-55990',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Я никогда не езжу на автобусе.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I never take a bus.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Перед bus стоит неопределённый артикль потому что что это неопределённое существительное, исчисляемые в единственном числе.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Он никогда не ездит на 13-м автобусе.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'He never take bus 13.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Если после существительного номер, то перед ним будет нулевой артикль.',
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если подразумевается конкретный объект, то перед ним должен стоять один из определённых определителей.',
				},
			],
		},
		{ type: 'exercises', id: 2, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед именами собственными' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Перед именами собственными определитель не ставится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я люблю русский язык.' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I love Russian language.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я ненавижу математику.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'I hate Math.' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Существительное в функции обращения' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'При обращении к человеку по занимаемой должности тоже ставится нулевой артикль потому что в оно рассматривается как имя собственное.',
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
					text: 'Спасибо за прошлый вечер, матрос.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Thanks for last night, sailor.',
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
					text: 'Просто ответьте на вопрос, профессор.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Just answer the question, professor.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В этом есть смысл потому что было бы странно обращаться к профессору через a professor потому что по смыслу было бы «Эй, ты, один из профессоров...». А если бы через the, то «Эй, тот самый профессор...».',
				},
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Наверняка он был моряком или рыбаком.',
					engSentences: [
						{
							engSentences: ['He was probably a fisherman or sailor.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ингрединты супа', engWord: 'soup ingredients' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перечисление типов' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если идёт перечисление типов объектов без уточнения количества, то обычно количество и неопределённый артикль опускают. Так звучит натуральнее и проще. Сравните два варианта:',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-59767',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I have food in the fridge: a banana, a pear, an apple, and milk!',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Через неопределённый артикль a тут прямо указывается количество продуктов в холодильнике: один банан, одна груша и молоко.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'I have food in the fridge: banana, pear, apple, and milk!',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'А тут неопределённый артикль опущен и поэтому такой список воспринимается как типы продуктов без привязки к количеству. Может быть там один банан, а может и несколько. Такое предложение даже нельзя перевести на русский язык с сохранением таких нюансов.',
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Эти предложения грамматически правильные, но первое используют чтобы акцентировать внимание на количестве (всех продуктов по одной штуке), а второе чтобы только указать типы продуктов.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прочие случаи' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Нулевой артикль используется с частям дня: morning, night, afternoon и времён года: autumn, summer, winter.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Уже ночь!' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is night already!' },
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
					text: 'Но если часть дня причисляют к какому-то классу, то должен стоять неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Я пошел на вечер поэзии.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I went to a poetry night.',
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
					text: 'Пошёл на один из вечеров поэзии.',
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
					text: 'В некоторых устойчивых выражениях где по логике должен быть неопределённый артикль, его опускают.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'for instance/example' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'например' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'by credit card' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'кредитной картой' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'by accident' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'из-за несчастного случая',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'by car/train/bus...' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'на машине/поезде/автобусе ',
				},
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'и с другими видами транспорта',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'on foot' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'пешком' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'big',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'at/to/from work' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'на/из работы' },
			],
		},
		{ type: 'exercises', id: 4, exercises: [], offset: true },
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
										text: 'Может ли перед существительным находиться больше одного определителя?',
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
										text: 'ОТВЕТЬ!!!!',
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

export default zeroArticle
