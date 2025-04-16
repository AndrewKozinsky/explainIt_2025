// import ArticleType from '../../articleType'

/*const prepositionInPlace: ArticleType.Art = {
	meta: {
		number: 29,
		slug: 'preposition-in-place',
		caption: 'Глава 27',
		articleName: 'Предлог места in',
		articleDescription: 'Предлог in используется чтобы рассказать внутри какого пространства находится человек.',
	},
	content: [
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Вы уже познакомились с предлогами на примере ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'of' },
				{ type: 'text', color: 'black',  text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'to' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'Предлог ' },
				{ type: 'text', color: 'blue',  text: 'in' },
				{
					type: 'text',
					color: 'black',

					text: ' указывает на нахождение объекта ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'внутри' },
				{
					type: 'text',
					color: 'black',

					text: ' ограниченного пространства. Ниже я даю некоторые сгрупированные примеры, но это условное разделение. Нужно только понять идею назначения предлога ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'in' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Внутри объёмного объекта' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Под такими объектами может выступать всё, что угодно: коробка, детская площадка, трава.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Женя в своей комнате.' },

				{ type: 'text', color: 'black',  text: 'Jane is in her room.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Комнату можно назвать объёмным объктом внутри которого находится Женя.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Я езжу на машине.' },

				{ type: 'text', color: 'black',  text: 'I drive in a car.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Это касается только личного транспорта. Читайте подробности в главе про предлог on.',
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

					text: 'Он увидел каких-то людей в костюмах.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'He saw some people in costumes.',
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

					text: 'Можно находиться внутри одежды.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Мы положили книги в коробку.',
					engSentences: [{ engSentences: ['We put the books in a box.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я в бассейне.',
					engSentences: [{ engSentences: ['I am in a pool.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Моя черепаха живёт в аквариуме.',
					engSentences: [{ engSentences: ['My turtle lives in the fish tank.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Сгущённого молока не было в пакете.',
					engSentences: [
						{
							engSentences: ['Condensed milk was not in the package.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [{ engSentences: ['Joe had an apple in his hand.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ['Her costume is yellow and red and she has feathers in her hair.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Том нашёл в своём супе волос.',
					engSentences: [{ engSentences: ['Tom found a hair in his soup. — '], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ["Yes, all the food's in the kitchen, and the drinks are in the front room."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ['Her temperature was very low and she had liquid in her lungs.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ['In the vet clinic, we realized how bad she actually looks.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ['Injun Joe was not in jail, and he was a dangerous man.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Внутри плоского объекта' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Такие объекты напоминают лист с видимыми границами.',
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

					text: 'Я вижу дом на фотографии.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'I see a house in the photo.',
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

					text: 'Фотография — плоский двумерный объект.',
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

					text: 'Она уставилась в зеркало.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'She stared in the mirror.',
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

					text: 'Зеркало тоже является плоским объектом.',
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

					text: 'Тут важно, что объект находится «внутри» плоскости, как бы является её частью, а не стоит на ней. ',
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

					text: 'Он узнал знакомый силуэт в газете.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'He recognized the familiar silhouette in the newspaper.',
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

					text: 'Знакомый силуэт внутри газеты. Предложение «Он поставил стакан на газету» будут переводиться через другой предлог.',
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

					text: 'Географические объекты тоже можно назвать плоскими. Особенно когда летите на самолёте или смотреть карту местности.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Сейчас он в Лондоне.' },

				{ type: 'text', color: 'black',  text: 'Now he is in London.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Перед названиями городов артикль the не ставится.',
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

					text: 'Кактусы, в основном, растут в пустыне.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Cactus usually grows in the desert.',
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

							text: 'Слова в повествовательном предложении выстраиваются по принципу «Сначала идёт самое главное». Самым главным является подлежащее, сказуемое, дополнение. А уже затем указывается место совершения действия.',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Мне казалось, что я остался один в пустыне.',
					engSentences: [{ engSentences: ['I thought I was alone in the desert.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Их дочери сегодня живут в Швейцарии.',
					engSentences: [
						{
							engSentences: ['Their daughters now live in Switzerland.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я встретила своего будущего мужа в Москве.',
					engSentences: [{ engSentences: ['I met my future husband in Moscow.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [
						{
							engSentences: ['Keola opened the windows and saw the ship in the bay.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Перевести...',
					engSentences: [{ engSentences: ['And he works in a bank in London.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я был в Египте прошлым летом, но так и не покатался на верблюде.',
					engSentences: [{ engSentences: ['And'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я был',
					engSentences: [
						{
							engSentences: ['Earthquakes are very common in California.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я был',
					engSentences: [
						{
							engSentences: [
								'the smog remains in the air and so Los Angeles is the most polluted city in America.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Они прибыли в Европу как туристы.',
					engSentences: [{ engSentences: ['They arrived in Europe as tourists.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Внутри группы людей' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Можно быть «внутри» группы людей.',
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

					text: 'Он работает в финансовой группе.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'He works in the finance team.',
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

					text: 'Она «внутри» финансовой группы.',
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

					text: 'Я работаю в салоне красоты.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'I work in a beauty salon.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Сестра работает в торговле.',
					engSentences: [{ engSentences: ['My sister works in commerce.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Люди не хотят терять время в очереди.',
					engSentences: [
						{
							engSentences: ["People don't want to waste time in a queue."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Она не хочет интегрироваться в общество.',
					engSentences: [{ engSentences: ['People'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прочие случаи' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Вдали тоже можно понимать как некое пространство где находится наездник.',
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

					text: 'Вдали он увидел наездника на чёрной лошиди.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'In the distance he saw a rider on a black horse.',
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

					text: 'Можно быть в какой-то форме или состоянии.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Она в хорошей форме.' },

				{ type: 'text', color: 'black',  text: 'She is in a good state.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Дом был очень старый и в плохом состоянии.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'The house was very old and in bad condition.',
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

					text: 'Выражение «на углу» переводится in the corner. Это не согласуется с изначальным спыслом предлога in, то так принято говорить.',
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

					text: 'Вход расположен на углу.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'The entrance is in the corner.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black',  text: 'Абстрактные вещи.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Я видел твоё лицо в сумраке ночи.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'I saw your face in the darkness of the night.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h3', text: 'Существительное inside' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Когда хотите подчеркнуть нахождение объекта внутри закрытого пространства, то вместо предлога in можно использовать существительное inside.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Документы внутри папки.' },

				{
					type: 'text',
					color: 'black',

					text: 'The documents are inside the folder.',
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

					text: 'Оставайтесь внутри здания во время шторма.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Stay inside the building during the storm.',
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

					text: 'Предлог in более универсальный и распространённый способ сказать о месте нахождения объекта. Поэтому если сомневаетесь будет ли inside подходить по смыслу, то лучше замените на in.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Предлог into' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если скрестить предлог to, использующийся для указания направления движения и предлог in, то получится предлог into. Он обозначает движение внутрь закрытого пространства.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-59882',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'to' },
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Показывает направление движения в сторону комнаты. Но при этом не факт, что они в итоге прибегут в эту комнату.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Дети бегут в комнату.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Children run to the room.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'into' },
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Показывает, что дети забегают в комнату. Похоже на to, но делается акцент на том, что они уже вбежали туда, произошло движение снаружи внутрь.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Дети вбегают в комнату.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Children run into the room.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'in' },
						{
							type: 'paragraph',

							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Используется если персонаж уже находится в замкнутом пространстве.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Дети в комнате.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Children are in the room.',
								},
							],
						},
					],
				},
			],
		},
	],
}*/

// export default prepositionInPlace
