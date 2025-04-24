// import ArticleType from '../../articleType'

/*const muchAndMany: ArticleType.Art = {
	meta: {
		number: 25,
		slug: 'much-and-many',
		caption: 'Глава 23',
		articleName: 'Much и many',
		articleDescription: 'Научи',
	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

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

							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Как прилагательное',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Если после much и many стоит существительное, то они становятся прилагательными и переводятся одинаково.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'much/many',
								},

								{ type: 'text',  text: 'много' },
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Много людей стояло возле моего дома.',
								},

								{
									type: 'text',

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

							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Как существительное',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Если после much и many существительного нет, то они становятся существительными.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'much' },

								{ type: 'text',  text: 'многое ' },
								{
									type: 'text',
									color: 'gray',

									text: '(для ед. ч.)',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'many' },

								{ type: 'text',  text: 'многие ' },
								{
									type: 'text',
									color: 'gray',

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

									text: 'Многие стояли возле моего дома.',
								},

								{
									type: 'text',

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

			children: [
				{
					type: 'text',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'У нас у всех есть много грехов.',
								},

								{
									type: 'text',

									text: 'We all have many sins.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'У нас много снаряжения.',
								},

								{
									type: 'text',

									text: 'We have much gear.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

					children: [
						{
							type: 'text',

							text: 'Much и many можно использовать в любых типах предложений. Но выбор зависит от исчисляемости существительного перед ним. Напротив определители ',
						},
						{ type: 'text',  weight: 'bold', text: 'a lot of' },
						{ type: 'text',  text: ' и ' },
						{ type: 'text',  weight: 'bold', text: 'plenty of' },
						{
							type: 'text',

							text: '  от существительного не зависит. Но можно использовать только в утверждении.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Вода содержит много кислорода.',
						},

						{
							type: 'text',

							text: 'Water contains a lot of oxygen.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'У нас будет очень много практики.',
						},

						{
							type: 'text',

							text: 'We will have plenty of practice.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [
						{
							type: 'text',

							text: 'A lot of более нейтральное выражение обозначающее большое количество чего-то. Используется и в позитивном и в негативном ключе. A plenty of похоже по значению, но выражает количество, которое более чем достаточно и выражается больше в положительном ключе.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [
						{
							type: 'text',

							text: 'Если сделать из него вопрос, то придётся заменить на much.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Does water contain much oxygen?',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
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

			children: [
				{
					type: 'text',

					text: 'Из главы про сравнительную степень прилагательного вы знаете, что сравнительная степень прилательного much/many будет more. Аналогичная форма будет и для местоимений much/many. Но переводиться такие предложения будут по-разному.',
				},
			],
		},
		{
			type: 'grid',

			gridId: 'grid-76568',
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

									text: 'Более мощные радиостанции имеют больший диапазон.',
								},

								{
									type: 'text',

									text: 'More powerful radios have a larger range.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Это даст больше пространства для необходимых вещей.',
								},

								{
									type: 'text',

									text: 'This will get more space for the necessary things.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

					text: 'До many можно добавить число чтобы указать сколько есть дополнительных объектов. А к так как much употребляется только для неисчисляемых существительных, то и число ставить нельзя. В этом случае можно использовать слово some (некое количество).',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если после more стоит исчисляемое существительное, то к нему можно поставить число.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'У меня еще две сестры.' },

				{
					type: 'text',

					text: 'I have two more sisters.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Сестра — исчисляемое. Поэтому перед more можно поставить число.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'К неисчисляемым число поставить нельзя, но можно добавить слово some обозначающее небольшое количество.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'У меня будет немного больше времени.',
				},

				{
					type: 'text',

					text: 'I will have some more time.',
				},
			],
		},
		{
			type: 'exercises',
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

			children: [
				{
					type: 'text',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Это самый важный документ в твоей жизни.',
								},

								{
									type: 'text',

									text: 'This is the most important document of your life.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Большинство детей пробовали эти фрукты.',
								},

								{
									type: 'text',

									text: 'Most kids tried these fruits.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

					text: 'Интересный пример когда в предложении не указано что именно сравнивается, но неявно сравнение есть. Тут опущена информация о том, что сравнивается количество денег, которые трятят китайские туристы по сравнению с таристами из других стран.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Китайские туристы тратят больше всех.',
				},

				{
					type: 'text',

					text: 'Chinese tourists spend the most.',
				},
			],
		},
		{
			type: 'exercises',
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

			children: [
				{
					type: 'text',

					text: 'Как существительное much ссылается на большое количество неисчисляемых объектов, а many исчисляемых.',
				},
			],
		},
		{
			type: 'grid',

			gridId: 'grid-50433',
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

									text: 'Многое будет зависеть от их подхода.',
								},

								{
									type: 'text',

									text: 'Much will depend on their approach.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Многие потеряли свои дома и работы.',
								},

								{
									type: 'text',

									text: 'Many lost their homes and jobs.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

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

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Не многие знают это природное средство.',
								},

								{
									type: 'text',

									text: 'Not many people know this natural remedy.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Многие не знают это природное средство.',
								},

								{
									type: 'text',

									text: 'Many people do not know this natural remedy.',
								},
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									color: 'gray',

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

			children: [
				{
					type: 'text',

					text: 'Much и many могут выступать не только в качестве подлежащего, но и дополнения.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'I never though much about my future.',
				},

				{
					type: 'text',

					text: 'Никогда не думал много о своём будущем.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Они мало работают и много едят.',
				},

				{
					type: 'text',

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

					children: [
						{ type: 'text',  text: 'A' },
						{ type: 'text',  weight: 'bold', text: ' lot of' },
						{ type: 'text',  text: ' и ' },
						{ type: 'text',  weight: 'bold', text: 'plenty of' },
						{
							type: 'text',

							text: '  нельзя использовать в качестве подлежащего как much и many. После них всегда должно быть указано существительное.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Множество интересных фактов в одной статье.',
						},

						{
							type: 'text',

							text: 'A lot of interesting things in one post.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [
						{
							type: 'text',

							text: 'Но в остальных случаях встречается повсеместно.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Джеймс и Гарри много ругались о религии в прошлом.',
						},

						{
							type: 'text',

							text: 'James and Harry argued a lot about religion in the past.',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
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
}*/

// export default muchAndMany
