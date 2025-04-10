import ArticleType from '../../articleType'

const muchAndMany: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 25,
		slug: 'much-and-many',
		caption: 'Глава 23',
		articleName: 'Much и many',
		articleDescription: 'Научи',
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
					text: 'much и many используются чтобы сказать о большом количестве объектов. Они могут выступать в качестве местоимений-существительных или местоимений-прилагательных.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-79337',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Как прилагательное',
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
									text: 'Если после much и many стоит существительное, то они становятся прилагательными и переводятся одинаково.',
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
									text: 'much/many',
								},

								{ type: 'text', color: 'black', weight: 'normal', text: 'много' },
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
									text: 'Много людей стояло возле моего дома.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Many men were outside my house.',
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
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Как существительное',
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
									text: 'Если после much и many существительного нет, то они становятся существительными.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'much' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'многое ' },
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: '(для ед. ч.)',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'many' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'многие ' },
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: '(для мн. ч.)',
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
									text: 'Многие стояли возле моего дома.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Many were outside my house.',
								},
							],
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как прилагательное' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Как прилагательное many используется перед исчисляемыми существительными, а much перед неисчисляемыми.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-16777',
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
									text: 'У нас у всех есть много грехов.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'We all have many sins.',
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
									text: 'Грех — это исчисляемое существительное, поэтому чтобы сказать о большом количестве нужно использовать местоимение many.',
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
									text: 'У нас много снаряжения.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'We have much gear.',
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
									text: 'Снаряжение — это неисчисляемое существительное, поэтому чтобы сказать о большом количестве нужно использовать местоимение much.',
								},
							],
						},
					],
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
							text: 'Much и many можно использовать в любых типах предложений. Но выбор зависит от исчисляемости существительного перед ним. Напротив определители ',
						},
						{ type: 'text', color: 'black', weight: 'bold', text: 'a lot of' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
						{ type: 'text', color: 'black', weight: 'bold', text: 'plenty of' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '  от существительного не зависит. Но можно использовать только в утверждении.',
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
							text: 'Вода содержит много кислорода.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Water contains a lot of oxygen.',
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
							text: 'У нас будет очень много практики.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'We will have plenty of practice.',
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
							text: 'A lot of более нейтральное выражение обозначающее большое количество чего-то. Используется и в позитивном и в негативном ключе. A plenty of похоже по значению, но выражает количество, которое более чем достаточно и выражается больше в положительном ключе.',
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
							text: 'Если сделать из него вопрос, то придётся заменить на much.',
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
							text: 'Does water contain much oxygen?',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Я думаю, что заработаю здесь больше денег.',
					engSentences: [
						{
							engSentences: ['I think I will make a lot of money here.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Люди говорили на другом языке, но многие слова были простыми.',
					engSentences: [
						{
							engSentences: ['The people spoke a different language, but many of the words were easy.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Смит говорил много и я знал, что он был хорошим продавцом.',
					engSentences: [
						{
							engSentences: ['Smith talked a lot and I knew he was a good trader.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Спортсмены проводят немало времени в спортзалах.',
					engSentences: [
						{
							engSentences: ['Sportsmen spend a lot of time in gyms.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я ещё слышал родные слова, которое он повторял множество раз.',
					engSentences: [
						{
							engSentences: ['I also heard a native word that he repeated many times.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								"Keola did not know much about his wife's father, but one thing troubled him.",
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								'Keola asked the people of the tribe a lot of questions and learned a lot of new things.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								'Many parts of Hawaii are still wild, with beautiful green valleys, tall mountains, waterfalls, tropical flowers and deserted beaches.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Сравнительная степень' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Из главы про сравнительную степень прилагательного вы знаете, что сравнительная степень прилательного much/many будет more. Аналогичная форма будет и для местоимений much/many. Но переводиться такие предложения будут по-разному.',
				},
			],
		},
		{
			type: 'grid',
			offset: false,
			gridId: 'grid-76568',
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
									text: 'Более мощные радиостанции имеют больший диапазон.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'More powerful radios have a larger range.',
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
									text: 'Тут говорится о большей степени мощности радиостанции.',
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
									text: 'Это даст больше пространства для необходимых вещей.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'This will get more space for the necessary things.',
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
									text: 'Тут говорится про большее количество пространств.',
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
					text: 'До many можно добавить число чтобы указать сколько есть дополнительных объектов. А к так как much употребляется только для неисчисляемых существительных, то и число ставить нельзя. В этом случае можно использовать слово some (некое количество).',
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
					text: 'Если после more стоит исчисляемое существительное, то к нему можно поставить число.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'У меня еще две сестры.' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I have two more sisters.',
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
					text: 'Сестра — исчисляемое. Поэтому перед more можно поставить число.',
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
					text: 'К неисчисляемым число поставить нельзя, но можно добавить слово some обозначающее небольшое количество.',
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
					text: 'У меня будет немного больше времени.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I will have some more time.',
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'И вот мы имеем еще два фильма.',
					engSentences: [{ engSentences: ['So we have two more movies.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Медицинские тесты используют гораздо меньшие дозы радиации.',
					engSentences: [
						{
							engSentences: ['Medical tests use much, much smaller doses of radiation.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'А писать я начал намного раньше.',
					engSentences: [{ engSentences: ['But I started writing much earlier.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мы были намного сильнее чем они .',
					engSentences: [{ engSentences: ['We were much stronger than them.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'В этот раз все было гораздо хуже.',
					engSentences: [{ engSentences: ['This time it was much worse.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Превосходная степень' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Из главы про превосходную степень прилагательного вы знаете, что превосходная степень прилательного much/many будет the most. Но если превосходная степень будет в значении числительного, то the опускают. Сравните:',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-85007',
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
									text: 'Это самый важный документ в твоей жизни.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'This is the most important document of your life.',
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
									text: 'Тут most находится в превосходной степени потому что говорится о свойстве документа.',
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
									text: 'Большинство детей пробовали эти фрукты.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Most kids tried these fruits.',
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
									text: 'Тут most выступает в роли числителя потому что сообщается о количестве детей.',
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
					text: 'Интересный пример когда в предложении не указано что именно сравнивается, но неявно сравнение есть. Тут опущена информация о том, что сравнивается количество денег, которые трятят китайские туристы по сравнению с таристами из других стран.',
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
					text: 'Китайские туристы тратят больше всех.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Chinese tourists spend the most.',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Пер',
					engSentences: [{ engSentences: ['Nick C'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как существительное' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Как существительное much ссылается на большое количество неисчисляемых объектов, а many исчисляемых.',
				},
			],
		},
		{
			type: 'grid',
			offset: false,
			gridId: 'grid-50433',
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
									text: 'Многое будет зависеть от их подхода.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Much will depend on their approach.',
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
									text: 'Much подразумевает что-то неисчисляемое: здоровье, положение, исход.',
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
									text: 'Многие потеряли свои дома и работы.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Many lost their homes and jobs.',
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
									text: 'Many подразумевает что-то исчисляемое: людей в данном случае.',
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
					text: 'Отрицание большого количества можно сделать двумя способами: добавив not к much или many или через вспомогательный do как в обычном Simple.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-60801',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Не многие знают это природное средство.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Not many people know this natural remedy.',
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
									text: 'Поставив not к many мы обращаем внимание на небольшом количество людей, которым средство известно.',
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
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Многие не знают это природное средство.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Many people do not know this natural remedy.',
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
									text: 'А построив отрицание через Simple мы подчёркиваем, что большинству средство не известно.',
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
					text: 'Much и many могут выступать не только в качестве подлежащего, но и дополнения.',
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
					text: 'I never though much about my future.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Никогда не думал много о своём будущем.',
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
					text: 'Они мало работают и много едят.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'They work little and eat much.',
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
						{ type: 'text', color: 'black', weight: 'normal', text: 'A' },
						{ type: 'text', color: 'black', weight: 'bold', text: ' lot of' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
						{ type: 'text', color: 'black', weight: 'bold', text: 'plenty of' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '  нельзя использовать в качестве подлежащего как much и many. После них всегда должно быть указано существительное.',
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
							text: 'Множество интересных фактов в одной статье.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'A lot of interesting things in one post.',
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
							text: 'Но в остальных случаях встречается повсеместно.',
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
							text: 'Джеймс и Гарри много ругались о религии в прошлом.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'James and Harry argued a lot about religion in the past.',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Пер',
					engSentences: [{ engSentences: ['Nick C'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
	],
}

export default muchAndMany
