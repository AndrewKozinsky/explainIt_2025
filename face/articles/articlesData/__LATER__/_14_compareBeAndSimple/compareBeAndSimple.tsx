// import ArticleType from '../../articleType'

/*const compareBeAndSimple: ArticleType.Art = {
	meta: {
		number: 16,
		slug: 'compare-be-and-simple',
		caption: 'Глава 14',
		articleName: 'Отличие be от Simple',
		articleDescription:
			'Научимся отличать be от Simple и окончательно разберёмся что где использовать. А ещё посмотрим несколько случаев как отличаются русский язык от английского.',

	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Когда применяется be' },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Посмотрим частные случаи.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Be используется чтобы сообщить об имени.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я Джон Коннор.' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text',  text: ' John Connor.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Перед «Я» и «Джон» можно поставить «есть». И в русском предложении нет глагола. Поэтому в переводе для связки должен использоваться to be.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Есть более формальный способ сказать своё имя через страдательный залог.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',  text: 'Меня зовут Андрей.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Англичане не прибегают к таким наворотам. Для них имя — это свойство. Поэтому и «Я Андрей» и «Меня зовут Андрей» переводится одиноково.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [{ type: 'text',  text: 'I am Andrew.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: '«Ей» — это местоимение «она» в винительном падеже. А так как в английском падежей нет, то «она/ей» переводятся одним she. И одинадцать лет — это свойство, поэтому be обязателен при переводе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Ей одиннадцать.' },

				{ type: 'text',  text: 'She ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text',  text: ' eleven.' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Ещё русское предложение можно перевести She is eleven years old. Это более официальный вариант.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Be используется когда говорят о национальности.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мы — русские.' },

				{ type: 'text',  text: 'We ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text',  text: ' Russian.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'To be вставляется в предложение если сообщаем о нахождении кого-то где-то.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Яна в университете.' },

				{ type: 'text',  text: 'Jana ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text',  text: ' at university.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Перед подлежащим «Яна» и дополнением «в университете» можно поставить «есть». И в русском предложении нет глагола. Поэтому в переводе для связки должен использоваться be. At — это предлог места. Про них будет рассказано в одном из следующих уроков.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Когда используются другие глаголы' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если подлежащее выполняет другое действие, то используется любой другой глагол кроме ',
				},
				{ type: 'text',  weight: 'bold', text: 'be' },
				{ type: 'text',  text: '. Можно задать вопрос «' },
				{ type: 'text',  weight: 'bold', text: 'Что делает?' },
				{ type: 'text',  text: '».' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Он водит тягач.' },

				{ type: 'text',  text: 'He drives a tractor.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [{ type: 'text', color: 'gray', text: 'Водит тягач.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'Настя плавает каждый четверг.',
				},

				{
					type: 'text',

					text: 'Nastya swims every Thursday.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [{ type: 'text', color: 'gray',  text: 'Плавает.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'big',
			children: [
				{ type: 'text',   text: 'Мы любим сок.' },

				{ type: 'text',   text: 'We like juice.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [{ type: 'text', color: 'gray',  text: 'Любит сок.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'При переводе предложения нужно смотреть не на формальные признаки, а что пытаются сказать. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'У меня есть машина.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Хотя формально в русском предложении явно присутствует слово «есть», но в конкретном случае этот глагол используется в значении обладания предметом. Английский вариант have.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',   text: 'I have a car.' }],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Он японец.',
					engSentences: [
						{ engSentences: ['He is Japanese.'], isCorrect: true },
						{
							engSentences: ['He Japanese.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Если сообщается о качестве или свойстве, то требуется глагол ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' в одной из своих форм. Форма зависит от времени и лица подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: ['He are Japanese.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Чтобы определить в какой форме должен быть глагол ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'to be',
										},
										{
											type: 'text',

											text: ' нужно понять в каком лице находится подлежащее. В этом предложении подлежащее «он». Это третье. А после третьего лица используется to be в форме is.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'японец', engWord: 'Japanese' }],
				},
				{
					rusSentence: 'Птицы летают.',
					engSentences: [{ engSentences: ['Birds fly.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я ненавижу таких, как ты.',
					engSentences: [{ engSentences: ['I hate people like you.'], isCorrect: true }],
					words: [
						{ rusWord: 'ненавидеть', engWord: 'hate' },
						{ rusWord: 'таких, как ты', engWord: 'people like you' },
					],
				},
				{
					rusSentence: 'Я был рад.',
					engSentences: [{ engSentences: ['I was glad.'], isCorrect: true }],
					words: [{ rusWord: 'рад', engWord: 'glad' }],
				},
				{
					rusSentence: 'Жёлтая папка.',
					engSentences: [
						{ engSentences: ['An yellow folder.'], isCorrect: true },
						{
							engSentences: ['Is yellow folder.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Бесмысленное предложение. В повествовательных предложениях глагол to be не может стоять раньше подлежащего.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is an yellow folder.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Грамматически-правильный, но не точный перевод.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Yellow folder.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Перед существительными или прилагательном и существительном должно стоять определяющее слово. Если контекст отсутствует, то при переводе используйте неопределённый артикль.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'жёлтый', engWord: 'yellow' },
						{ rusWord: 'папка', engWord: 'folder' },
					],
				},
				{
					rusSentence: 'Мы свободны, мы ответственны, мы успешны.',
					engSentences: [
						{
							engSentences: ['We’re free, we’re responsible and we’re successful.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'свободный', engWord: 'free' },
						{ rusWord: 'ответственный', engWord: 'responsible' },
						{ rusWord: 'успешный', engWord: 'successful' },
					],
				},
				{
					rusSentence: 'Я живу в Турции.',
					engSentences: [{ engSentences: ['I live in Turkey.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Когда мы поодиночке — мы слабы, но вместе мы — настоящая сила.',
					engSentences: [
						{
							engSentences: ['When we are alone we are weak but together we are strong.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'одиночка', engWord: 'alone' },
						{ rusWord: 'слабый', engWord: 'weak' },
						{ rusWord: 'вместе', engWord: 'together' },
						{ rusWord: 'сильный', engWord: 'strong' },
					],
				},
				{
					rusSentence: 'У моего друга есть интересные видео-игры.',
					engSentences: [
						{
							engSentences: ['My friend has interesting video games.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'друг', engWord: 'friend' },
						{ rusWord: 'интересный', engWord: 'interesting' },
						{ rusWord: 'видеоигра', engWord: 'video game' },
					],
				},
				{
					rusSentence: 'Я был когда-то странной игрушкой безымянной.',
					engSentences: [
						{ engSentences: ['I was once a strange, nameless toy.'], isCorrect: true },
						{
							engSentences: ['I was sometimes a strange, nameless toy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Грамматически правильно. Но «я ... был игрушкой» воспринимается как единственный прошедший отрезок времени. А слово ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'sometimes',
										},
										{
											type: 'text',

											text: ' обозначает «иногда». То есть то, что случалось множество раз. Поэтому тут больше подходит слово ',
										},
										{
											type: 'text',

											weight: 'bold',
											text: 'once',
										},
										{
											type: 'text',

											text: '.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'странный', engWord: 'strange' },
						{ rusWord: 'безымянный', engWord: 'nameless' },
						{ rusWord: 'игрушка', engWord: 'a toy' },
					],
				},
				{
					rusSentence: 'Ему семь лет.',
					engSentences: [{ engSentences: ['He is seven years old. '], isCorrect: true }],
					words: [{ rusWord: 'странный', engWord: 'strange' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Про отсутствующие глаголы' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Русский и английский — разные языки. Поэтому нередко возникают ситуации когда в одно языке нет глаголов присутстущих в другом и наоборот. Поэтому одна и та же фраза будет переводиться разными конструкциями.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Например у англичан нет глагола «рожать». И простое русское предложение «Она родила дочь» англичане выкрутили в «Она дала рождение дочери».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Она родила дочь.' },

				{
					type: 'text',

					text: 'She gave birth to a daughter.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но чаще то, что в русском является глаголом в английском будет существительным. И соответственно для связки используется глагол be.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Например в английском нет глагола «опаздывать». Поэтому его заменяют прилагательным «опоздавший».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Ты опоздал.' },

				{ type: 'text',   text: 'You ' },
				{ type: 'text', color: 'blue',  text: 'are' },
				{ type: 'text',   text: ' late.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Тут интересно то, что в русском предложении глагол стоит в прошедшем времени, а be должен быть в настоящем потому что персонаж является опоздавшим сейчас, а не был ранее.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Болеть на английком нельзя. Можно ',
				},
				{ type: 'text',  weight: 'bold', text: 'быть больным' },
				{ type: 'text',   text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Она болела.' },

				{ type: 'text',   text: 'She was sick.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Глагола «пить» в английском тоже нет. Вместо него используйте прилагательное thirsty обозначающее «испытывающий жажду».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Я хочу пить.' },

				{ type: 'text',   text: 'I ' },
				{ type: 'text', color: 'blue',  text: 'am' },
				{ type: 'text',   text: ' thirsty.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Вы наверное знаете про глагол drink. Но перевод I want to drink обозначает желание выпить алкоголь как в русском предложение «Я хочу выпить». А тут имеется в виду пить воду. Поэтому желание выпить воду англичане оборачивают в фразу «Я есть испытывающий жажду».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Вот шпаргалка со списком таких слов. Их нужно просто запомнить и иметь в виду их часть речи при переводе.',
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

					text: 'Напомню, что be в предложении должен быть в одной из своих временных форм.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-88455',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Увлекаться',
								},

								{
									type: 'text',

									text: 'be keen on',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Опаздывать',
								},

								{
									type: 'text',

									text: 'be late for smth',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Сожалеть о чем-то',
								},

								{
									type: 'text',

									text: 'be sorry about',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Скучать (испытывать скуку)',
								},

								{
									type: 'text',

									text: 'be bored',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Испытывать жажду',
								},

								{
									type: 'text',

									text: 'be thirsty',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',   text: 'Обожать' },

								{
									type: 'text',

									text: 'be crazy about',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',   text: 'Бояться' },

								{
									type: 'text',

									text: 'be afraid of',
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

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Запутаться',
								},

								{
									type: 'text',

									text: 'be confused',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Интересоваться',
								},

								{
									type: 'text',

									text: 'be interested in',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Гордиться',
								},

								{
									type: 'text',

									text: 'be proud',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Иметь способность к чему-то',
								},

								{
									type: 'text',

									text: 'be good at',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Колебаться',
								},

								{
									type: 'text',

									text: 'be in two minds',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',   text: 'Бояться' },

								{
									type: 'text',

									text: 'be afraid of',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Сочувствовать кому-то',
								},

								{
									type: 'text',

									text: 'be sorry',
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

					text: 'Но есть и обратная ситуация когда в русском нет глаголов использующихся в английском. Например taste обозначает «иметь вкус». Производить такое действие.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Пицца — вкусная.' },

				{ type: 'text',   text: 'This pizza tastes good.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В русском дождь и снег «идут». А в английском в ходу специальные глаголы «дождить» и «снежить» по отношению к погодным явлениям. Поэтому при переводе на английский не нужно использовать существительное с глагол «идти».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Дожди идут редко.' },

				{ type: 'text',   text: 'It rains seldom.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Перевод затрагивает тему формального подлежащего. Она будет рассматрена в одном из следующих уроков.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'По отношению к погодным явлениям в русском используется только один глагол «моросить».',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Ее глаза не реагировали.',
					engSentences: [{ engSentences: ['Her eyes were unresponsive.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он вернётся завтра.',
					engSentences: [{ engSentences: ['He will be back tomorrow.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Город указан неверно.',
					engSentences: [{ engSentences: ['The city is incorrect.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Пицца — вкусная.',
					engSentences: [{ engSentences: ['This pizza tastes good.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Так что нет ничего удивительного в том, что мы совершенно запутались.',
					engSentences: [{ engSentences: ['No wonder we are all confused.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Гектор всё ещё спит?',
					engSentences: [{ engSentences: ['Is Hector still asleep?'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Даже родители с двумя детьми до сих пор терпят неудобства.',
					engSentences: [
						{
							engSentences: ['Even parents with two babies are still inconvenient.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Это очень раздражает.',
					engSentences: [{ engSentences: ['It\'s really annoying.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я боюсь Джо. Он опасен. И он убийца.',
					engSentences: [
						{
							engSentences: ['I\'m afraid of Joe. He\'s dangerous. And he\'s a killer.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Ни люди, ни собаки не проснулись.',
					engSentences: [{ engSentences: ['Neither humans nor dogs are awake.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мы настроены оптимистично.',
					engSentences: [{ engSentences: ['We are optimistic.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Ни люди, ни собаки не проснулись.',
					engSentences: [{ engSentences: ['Neither humans nor dogs are awake.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
	],
}*/

// export default compareBeAndSimple
