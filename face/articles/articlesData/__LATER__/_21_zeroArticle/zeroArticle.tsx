// import ArticleType from '../../articleType'

/*const zeroArticle: ArticleType.Art = {
	meta: {
		number: 23,
		slug: 'zero-article',
		caption: 'Глава 21',
		articleName: 'Нулевой артикль',
		articleDescription:
			'Окончательно разберёмся когда использовать нулевой артикль и как не спутать его с другими случаями.',

	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'У русского языка есть суперспособность — система родов благодаря которой мы знаем пол персонажа даже без прямого указания имени или местоимения.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',  text: '— Ты звонил адвокату?' }],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: '— Сказала придёт завтра.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Благодаря роду в первом предложении мы понимаем, что обращаются к мужчине, а во втором, что адвокат женщина.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В английском этого нет. Поэтому чтобы указать женский род они вынуждены к существительным добавлять дополнительные слова. Английский тут выглядит менее информативным. Но англичане этого особо не замечают.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'a translator (переводчик)',
				},

				{
					type: 'text',

					text: 'a woman-translator (переводчица)',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'a wolf (волк)' },

				{ type: 'text',  text: 'a she-wolf (волчица)' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Зато в английском есть определители существительных. Английские существительные ничем не отличаются от русских. Но вместе с определителями способны изменить смысл. И теперь в русское предложение приходится подпирать дополнительными словами чтобы точно его передать.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'I ordered coffee.' },

				{ type: 'text',  text: 'Я заказал кофе ' },
				{ type: 'text', color: 'gray', text: '(в зёрнах)' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Так как кофе — это неисчисляемое существительное и неопределённый артикль не ставится, то тут кофе выступает в качестве вещества. Конкретно кофейные зёрна.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text',  text: 'I ordered ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' coffee.' },

				{ type: 'text',  text: 'Я заказал ' },
				{ type: 'text', color: 'gray', text: '(чашку)' },
				{ type: 'text',  text: ' кофе.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Если перед неисчисляемым существительным поставить неопределённый артикль, то это станет обозначать порцию вещества. Обычно порция кофе — это чашка заваренного кофе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text',  text: 'I ordered ' },
				{ type: 'text', color: 'blue', text: 'the' },
				{ type: 'text',  text: ' coffee.' },

				{ type: 'text',  text: 'Я заказал ' },
				{ type: 'text', color: 'gray', text: '(то самое)' },
				{ type: 'text',  text: ' кофе.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Определённый артикль the подразумевает, что собеседник понимает о каком кофе идёт речь. Может о зёрнах, может о готовом продукте.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

					children: [
						{
							type: 'text',

							text: 'Нулевым артиклем называют отсутствие артикля перед существительным.',
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

					textSize: 'giant',
					children: [
						{
							type: 'text',

							text: 'Сначала прикидываем подходит ли к существительному по смыслу один из определителей, и если нет, то ставим нулевой.',
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

					text: 'Давайте попробуем его в деле и переведём предложение:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Мой папа вечно пропадает в гараже.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Выражение «вечно пропадает» можно привести к «тратить всё время». И у нас получились 3 существительных: папа, время и гараж. У каждого должен быть определитель.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: '... dad spend all ... time in ... garage.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Около «папа» будет притяжательное местоимение «мой». Оно явно присутствует в русскоязычном варианте. Около времени  можно поставить «его» потому что время папы принадлежит папе. А перед гаражом тоже может быть это местоимение потому что гараж принадлежит папе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'My dad spend all his time in his garage.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Следующее предложение.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Слон — самое большое четвероногое животное.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В данном контексте «слон» — это не конкретное животное, а в целом любой представитель этого класса. Это второй случай когда используется неопределённый артиль a. Первый — это когда говорят про отдельный экземпляр класса.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'А существительное «самое большое четвероногое животное» содержит превосходную степень прилагательного поэтому перед ним всегда будет определённый артикль the.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'An elephant is the biggest four-legged animal.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Следующее предложение аналогично по смыслу предыдущему.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',  text: 'Я люблю морковь.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Я люблю любую морковь, любой представитель этого класса. Поэтому морковь отделяется артиклем a.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',  text: 'I like a carrot.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В русском языке в названии класса принято использовать существительное в единственном числе. Но в английском ещё используется вариант со множественным числом: Я люблю моркови. Неопределённый артикль a может стоять только с существительными в единственном числе, поэтому тут поставить нельзя. Определённый тоже не подходит потому что я люблю не конкретные моркови, а любые. И так как ни один определитель не подходит, то будет нулевой.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',  text: 'I like carrots.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Следующее предложение похоже на предыдущее.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'У собак есть хозяева, у кошек — персонал.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Можно перевести существительными как в единственном числе, так и во множественном как в русском, так и в английском.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'У собаки есть хозяин, у кошки служащий.',
				},

				{
					type: 'text',

					text: 'A dog has an owner, a cat has an employee.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'У собак есть хозяева, у кошек — персонал.',
				},

				{
					type: 'text',

					text: 'Dogs have owners, cats have staff.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Следующее предложение:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Симптомы высокого кровяного давления не очень специфичны.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Существительное «симптомы» во множественном числе. Неопределённый артикль сразу отпадает. Симптомы конкретные, определённые? Да, симптомы высокого кровяного давления. Поэтому через the. Ещё есть существительное «давление». Оно неисчисляемое. Поэтому неопределённый артикль не подходит. Высокое кровяное давление — это название класса, а не что-то конкретное. Поэтому перед ним нулевой артикль.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'The symptoms of high blood pressure are not very specific.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В этом предложении сказано про два неконкретных круассана и неконкретную чашку молока. Неопределённый артикль не поставишь для существительного во множественном числе, поэтому нулевой. А чашка кофе можно было бы перевести a cup of coffee, но артикль a перед веществами обозначает порцию. Для кофе это чашка. Поэтому можно сократить до a coffee. Существительное «молоко» обозначает любое молоко. Так как но не исчисляемое, то неопределённый артикль поставить нельзя, как и определённый. Поэтому нулевой.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Два круассана и чашка кофе с молоком.',
				},

				{
					type: 'text',

					text: 'Two croissants and a coffee with milk.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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
					rusSentence: 'Из храма я вышла другим человеком.',
					engSentences: [{ engSentences: ['I left the church a different man.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
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

			children: [
				{
					type: 'text',

					text: 'Существительное «тюрьма» в этом предложении обозначает любую тюрьму. Оно исчисляемое и в единственном числе. Поэтому можно перевести через неопределённый артикль a.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Грабитель теперь в тюрьме.',
				},

				{
					type: 'text',

					text: 'The robber is in prison now.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но и в русском и в английском нередко в качестве места подразумевается не физический объект, а его функцию: школа',
				},

				{
					type: 'text',

					text: 'учёба, больница или врач',
				},

				{ type: 'text',  text: 'лечение, церковь' },

				{ type: 'text',  text: 'богослужение, каникулы' },

				{
					type: 'text',

					text: 'отдых. То есть в качестве цели ради которых они были созданы. Перед такими словами должен быть нулевой артикль.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'The robber is in prison now.',
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

					text: 'Тюрьма в данном переводе обозначает отбытие наказания. Грабитель отбывает наказание. А каким именно способом не важно.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Похожий пример. Так как перед hospital не указан неопределённый артикль, то значит существительное находится в значении функции. И само предложение обозначает, что восемь пострадавших остаются на лечении.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Восемь из них остаются в больницах.',
				},

				{
					type: 'text',

					text: 'Eight of them remain in hospital.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Слова breakfast, supper, lunch можно обозначить и как событие и как функцию приёма пищи. В этом значении неопределённый артикль не пишется.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Она спит после обеда.' },

				{
					type: 'text',

					text: 'She sleeps after dinner.',
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

					text: 'Она спит после того как поела.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я напишу тебе про ланч.' },

				{
					type: 'text',

					text: 'I will text you about lunch.',
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

					children: [
						{
							type: 'text',

							text: 'Американцы перед функциональными значениями употребляют the.',
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

					text: 'Ещё раз оговорюсь, что если в предложении мы подразумеваем не функцию, а реальный физический объект, то конечно нужно использовать один из определителей:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'Каждый городок имеет больницу.',
				},

				{
					type: 'text',

					text: 'Every small city has a hospital.',
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

					text: 'Ты только что съела огромный обед.',
				},

				{
					type: 'text',

					text: 'You just ate an enormous lunch.',
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

					text: 'Тут «обед» подразумевается не в смысле приёма пищи, а как большая порция. Поэтому стоит неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Цифра перед существительными обозначает количество объектов. Это всегда множественное число. Такие цифры называются количественными числительными. Про них будет отдельная глава.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Я никогда не езжу на автобусе.',
								},

								{
									type: 'text',

									text: 'I never take a bus.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Он никогда не ездит на 13-м автобусе.',
								},

								{
									type: 'text',

									text: 'He never take bus 13.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

					text: 'Если подразумевается конкретный объект, то перед ним должен стоять один из определённых определителей.',
				},
			],
		},
		{ type: 'exercises', id: 2, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед именами собственными' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Перед именами собственными определитель не ставится.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я люблю русский язык.' },

				{
					type: 'text',

					text: 'I love Russian language.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ненавижу математику.' },

				{ type: 'text',  text: 'I hate Math.' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Существительное в функции обращения' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'При обращении к человеку по занимаемой должности тоже ставится нулевой артикль потому что в оно рассматривается как имя собственное.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Спасибо за прошлый вечер, матрос.',
				},

				{
					type: 'text',

					text: 'Thanks for last night, sailor.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Просто ответьте на вопрос, профессор.',
				},

				{
					type: 'text',

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

					text: 'В этом есть смысл потому что было бы странно обращаться к профессору через a professor потому что по смыслу было бы «Эй, ты, один из профессоров...». А если бы через the, то «Эй, тот самый профессор...».',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перечисление типов' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'I have food in the fridge: a banana, a pear, an apple, and milk!',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'I have food in the fridge: banana, pear, apple, and milk!',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

					text: 'Эти предложения грамматически правильные, но первое используют чтобы акцентировать внимание на количестве (всех продуктов по одной штуке), а второе чтобы только указать типы продуктов.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прочие случаи' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Нулевой артикль используется с частям дня: morning, night, afternoon и времён года: autumn, summer, winter.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Уже ночь!' },

				{ type: 'text',  text: 'It is night already!' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но если часть дня причисляют к какому-то классу, то должен стоять неопределённый артикль.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'Я пошел на вечер поэзии.',
				},

				{
					type: 'text',

					text: 'I went to a poetry night.',
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

					text: 'Пошёл на один из вечеров поэзии.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В некоторых устойчивых выражениях где по логике должен быть неопределённый артикль, его опускают.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'for instance/example' },

				{ type: 'text',  text: 'например' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'by credit card' },

				{ type: 'text',  text: 'кредитной картой' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'by accident' },

				{
					type: 'text',

					text: 'из-за несчастного случая',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'by car/train/bus...' },

				{
					type: 'text',

					text: 'на машине/поезде/автобусе ',
				},
				{
					type: 'text',
					color: 'gray',

					text: 'и с другими видами транспорта',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'on foot' },

				{ type: 'text',  text: 'пешком' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'at/to/from work' },

				{ type: 'text',  text: 'на/из работы' },
			],
		},
		{ type: 'exercises', id: 4, exercises: [], offset: true },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

								children: [
									{
										type: 'text',

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

								children: [
									{
										type: 'text',

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
}*/

// export default zeroArticle
