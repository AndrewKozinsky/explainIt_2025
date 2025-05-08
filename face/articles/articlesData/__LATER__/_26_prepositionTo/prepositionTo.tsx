// import ArticleType from '../../articleType'

/*const prepositionTo: ArticleType.Art = {
	meta: {
		number: 28,
		slug: 'preposition-to',
		caption: 'Глава 26',
		articleName: 'Предлог to',
		articleDescription:
			'Предлог to может выразить множество предлогов в русском где требуется сообщить о направлении движения.',
	},
	content: [
		{
			type: 'paragraph',

			children: [
				{ type: 'text', color: 'blue', text: 'To' },
				{
					type: 'text',

					text: ' может быть не только частицей, но и предлогом. Частица придаёт словам дополнительные оттенки и значения. А предлог —  логически связывает слова друг с другом для задания направления, положения в пространстве, времени совершения действия, причины. Он ставится перед существительными, местоимениями и наречиями.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Уличный кот сидел ' },
				{ type: 'text',  weight: 'bold', text: 'на' },
				{ type: 'text',  text: ' тротуаре.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', text: 'Предлог «' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'на' },
				{
					type: 'text',
					color: 'gray',

					text: '» означает, что объект находится на поверхности другого объекта.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Сломанная ветка упала ' },
				{ type: 'text',  weight: 'bold', text: 'в' },
				{ type: 'text',  text: ' лужу.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', text: 'Предлог «' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'в' },
				{
					type: 'text',
					color: 'gray',

					text: '» обозначает, что один объект находится внутри другого.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В русском языке есть несколько способов передать направленность действия по отношению к другому персонажу. Можно через предлоги:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Миша ходит ' },
				{ type: 'text', color: 'blue', text: 'к' },
				{
					type: 'text',

					text: ' стоматологу каждый год.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Он показал ' },
				{ type: 'text', color: 'blue', text: 'на' },
				{ type: 'text',  text: ' ближайшее здание.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Я ездил ' },
				{ type: 'text', color: 'blue', text: 'в' },
				{ type: 'text',  text: ' Москву в 2020 году.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Либо без предлога через склонение глагола в дательном падеже (кому/чему):',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{ type: 'text',  text: 'Мы принесли воду ' },
				{ type: 'text', color: 'gray', text: '(кому?)' },
				{ type: 'text',  text: ' животным.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',

					text: 'В английском направление движения или указание на объект задаёт предлог ',
				},
				{ type: 'text', color: 'blue', text: 'to' },
				{
					type: 'text',

					text: '. Есть несколько распространённых случаев использования.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Движение в какое-то место' },
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Саша подошел к двери.' },

				{ type: 'text',  text: 'Sasha walked ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' the door.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Вика пригласила ' },
				{ type: 'text', color: 'gray', text: '(меня)' },
				{ type: 'text',  text: ' в кино.' },

				{ type: 'text',  text: 'Vika invited me ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' the cinema.' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Каждый день люди приезжают в Лос-Анджелес.',
					engSentences: [
						{
							engSentences: ['Every day people come to Los Angeles.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он сходил  в магазин в прошлом месяце',
					engSentences: [{ engSentences: ['He went to the store last month.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мои родители идут в поликлинику только когда действительно сильно болеют.',
					engSentences: [
						{
							engSentences: ['My parents go to health centre when are really sick.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Как и все дети моего возраста, я хожу в школу.',
					engSentences: [{ engSentences: ['Like kids my age I go to the school.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Дети ездят в деревню каждое лето.',
					engSentences: [
						{
							engSentences: ['The children go to the village every summer.'],
							isCorrect: true,
						},
						{
							engSentences: ['The children go to village every summer.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Это дорога в парк.',
					engSentences: [{ engSentences: ['This the way to the park.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Психиатр предложил мне лечь в больницу.',
					engSentences: [
						{
							engSentences: ['My psychiatrist told me to go to hospital.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Я открыл дверь в подвал.',
					engSentences: [{ engSentences: ['Well, they'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Я пойду с тобой на реку.',
					engSentences: [{ engSentences: ['I will go with you to the river.'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Я отпёр двер в башню.',
					engSentences: [{ engSentences: ['I unlocked the door to the tower.'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Ты часто ходишь в театр?',
					engSentences: [{ engSentences: ['Do you often go to the theater?'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Каждый день я сажусь на поезд в и из Манхеттена.',
					engSentences: [
						{
							engSentences: ['Every day I took the subway trains to and from Manhattan.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Я был готов перебраться на новое место.',
					engSentences: [
						{
							engSentences: ['Then I was ready to move to a new spot.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Я хожу на базар каждое воскресенье.',
					engSentences: [{ engSentences: ['I go to the market every Sunday.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Они сели на автобус до мексиканской границы.',
					engSentences: [
						{
							engSentences: ['They took a bus to the Mexico border.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Указание на объект' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					text: 'Таким объектом может быть всё, что угодно: момент времени, точка на местности, нематериальная сущность и так далее.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Пять дней до представления.',
				},

				{ type: 'text',  text: 'Five days ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' the performance.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Указание на представление.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Я предпочитаю автобус самолёту.',
				},

				{ type: 'text',  text: 'I prefer the bus ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' the plane.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Указание на другой вид транспорта.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'У меня есть вопрос к этой теме.',
				},

				{ type: 'text',  text: 'I have a question ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' that topic.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Указание на нематериальный объект.',
				},
			],
		},
		{ type: 'exercises', exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Действие направлено на человека' },
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мы добры к детям.' },

				{ type: 'text',  text: 'We are kind ' },
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' children.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Эта коллекция принадлежит мне.',
				},

				{
					type: 'text',
					text: 'This collection belongs ',
				},
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' me.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Этот доклад необходим для нас.',
				},

				{
					type: 'text',

					text: 'This report is necessary ',
				},
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' us.' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Я показал журнал преподавателю.',
					engSentences: [
						{
							engSentences: ['I shower the magazine to the teacher.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Его родители пришли поговорить с учителем.',
					engSentences: [
						{
							engSentences: ['His parents went to talk to the teacher'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я слишком устал это доказывать тебе.',
					engSentences: [{ engSentences: ["I'm too tired to prove it to you."], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Великий Дух говорит только с теми, у кого есть чистое сердце.',
					engSentences: [
						{
							engSentences: ['The Great Spirit speaks only to those with a pure heart.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Их язык похож на наш.',
					engSentences: [{ engSentences: ['Their language is simular to ours.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Правила дорожного движения похожи на наши.',
					engSentences: [{ engSentences: ['Traffic rules are similar to ours.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Он таскается за мной всюду.',
					engSentences: [{ engSentences: ['He follows me everywhere.'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
				{
					rusSentence: 'Они будут очень рады увидеть малыша.',
					engSentences: [
						{
							engSentences: ["Well, they'll be so happy to see the baby."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
			],
			offset: true,
		},
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Глаголы, допускающие конструкцию с двойным дополнением',
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В предложении ниже действие отправки прямо направлено на ',
				},
				{ type: 'text', color: 'blue', text: 'деньги' },
				{
					type: 'text',

					text: ' (отправляют деньги), а косвенно на ',
				},
				{ type: 'text', color: 'gold', text: 'тебя' },
				{
					type: 'text',

					text: ' (деньги отправляют тебе).',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я отправлю деньги тебе.' },

				{ type: 'text',  text: 'I will send ' },
				{ type: 'text', color: 'blue', text: 'the money' },
				{ type: 'text',  text: ' to ' },
				{ type: 'text', color: 'gold', text: 'you' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но некоторые глаголы позволяют менять местами ',
				},
				{ type: 'text', color: 'blue', text: 'прямое' },
				{ type: 'text',  text: ' и ' },
				{ type: 'text', color: 'gold', text: 'косвенное' },
				{ type: 'text',  text: ' дополнение.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я отправлю тебе деньги.' },

				{ type: 'text',  text: 'I will send ' },
				{ type: 'text', color: 'gold', text: 'you' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'the money' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Они называются глаголами допускающими конструкцию с двойным дополнением. И если перед таким глаголом стоит косвенное дополнение, то предлог ',
				},
				{ type: 'text', color: 'blue', text: 'to' },
				{ type: 'text',  text: ' не ставится.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Список таких глаголов:' }],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-57859',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Give — дать\nSend — отправить\nShow — показать\nTell — сказать\nOffer — предложить',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Lend — одолжить\nPay — оплатить\nBring — принести\nWrite — написать\nRead (читать кому-то) — читать',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Pass — передать\nHand — передать\nOwe — быть должным\nPromise — обещать\nSell — продать',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Buy — купить\nTeach — научить\nAward — наградить\nGrant — дать\nFeed — кормить',
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

			children: [{ type: 'text',  text: 'Ещё несколько примеров:' }],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-96459',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'to не ставится' },
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'если перед объектом назначения стоит глагол.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text', color: 'gold', text: 'Он дал' },
								{ type: 'text',  text: ' ' },
								{ type: 'text', color: 'blue', text: 'тебе' },
								{
									type: 'text',

									text: ' тот пакет.',
								},

								{
									type: 'text',

									text: 'He gaves you that package.',
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

									text: 'Персонаж, к которому направлено действие, стоит сразу после самого действия, поэтому to не ставится.',
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
									color: 'gold',

									text: 'Я отправлю',
								},
								{ type: 'text',  text: ' ' },
								{ type: 'text', color: 'blue',  text: 'Полине' },
								{
									type: 'text',

									text: ' конверт.',
								},

								{
									type: 'text',

									text: 'I will send Polina an envelope.',
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

									text: 'Если не знать это правило, то английский вариант предложения будет перевести затруднительно.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'to ставится' },
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'если перед объектом назначения стоит не глагол.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text', color: 'gold',  text: 'Я дал' },
								{
									type: 'text',

									text: ' тот пакет ',
								},
								{ type: 'text', color: 'blue',  text: 'тебе' },
								{ type: 'text',   text: '.' },

								{
									type: 'text',

									text: 'I gave that package to you.',
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
									color: 'gold',

									text: 'Я отправлю',
								},
								{
									type: 'text',

									text: ' конверт ',
								},
								{ type: 'text', color: 'blue',  text: 'Полине' },
								{ type: 'text',   text: '.' },

								{
									type: 'text',

									text: 'I will send an envelope to Polina.',
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
				{ type: 'text',   text: 'Предлог ' },
				{ type: 'text', color: 'blue',  text: 'to' },
				{
					type: 'text',

					text: ' всегда ставится после глаголов «',
				},
				{ type: 'text',  weight: 'bold', text: 'объяснять' },
				{ type: 'text',   text: '» (explain) и «' },
				{ type: 'text',  weight: 'bold', text: 'слушать' },
				{ type: 'text',   text: '» (listen).' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'Я всегда это объясняю своим пациентам.',
				},

				{
					type: 'text',

					text: 'I always explain it to my patients.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'big',
			children: [
				{
					type: 'text',

					text: 'Никто не станет тебя слушать.',
				},

				{
					type: 'text',

					text: 'No one will ever listen to you.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Я отправлю тебе деньги послезавтра.',
					engSentences: [
						{
							engSentences: ['I will send you the money the day after tomorrow.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Ты говорил с ним об этом? Да, я говорил.',
					engSentences: [
						{
							engSentences: ['Did you speak to him about it? Yes, I did.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Мама предупредила нас не ждать её.',
					engSentences: [
						{
							engSentences: ['My mother warned us not to expect her.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Режиссёр сказал нам закончить работу.',
					engSentences: [
						{
							engSentences: ['The director told us to finish the job.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Твой отец сказал мне дать тебе письмо.',
					engSentences: [
						{
							engSentences: ['Your father told me to give you the letter.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
			],
			offset: true,
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

										text: 'Чем отличается частица to от предлога to?',
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

										text: 'Частица to используется перед глаголом чтобы показать, что он находится в инфинитивной форме. А предлог to показывает движение в какое-то место в прямом и переносном смысле.',
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

// export default prepositionTo
