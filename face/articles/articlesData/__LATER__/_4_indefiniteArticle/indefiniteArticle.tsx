// import ArticleType from '../../articleType'
// import ArticleA from './ArticleA'
// import ArticleMany from './ArticleMany'
// import ArticleThe from './ArticleThe'
// import ArticleMy from './ArticleMy'
// import ArticleThis from './ArticleThis'

/*const indefiniteArticle: ArticleType.Art = {
	meta: {
		number: 6,
		slug: 'indefinite-article',
		caption: 'Глава 4',
		articleName: 'Неопределённый артикль a',
		articleDescription:
			'Кратко рассмотрено для чего перед каждым существительным ставят определитель и разберём неопределённый артикль a/an.',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Что такое определители' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Существительное может быть ',
				},
				{ type: 'text', color: 'blue', text: 'определённым' },
				{ type: 'text',  text: ' или ' },
				{ type: 'text', color: 'blue', text: 'неопределённым' },
				{
					type: 'text',

					text: '. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Купи, пожалуйста, ' },
				{ type: 'text', color: 'blue', text: 'тот' },
				{ type: 'text',  text: ' мяч.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',

					text: 'Англоговорящие явно указывают неопределённость или определённость существительного ставя перед ним ',
				},
				{ type: 'text', color: 'blue', text: 'определитель' },
				{
					type: 'text',

					text: '. Есть несколько групп определителей.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед неопределёнными существительными' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Неопределённый артикль a' },
		{ type: 'customComponent', component: <ArticleA /> },
		{
			type: 'paragraph',

			children: [
				{ type: 'text', color: 'blue', text: 'Неопределённый артикль a' },
				{
					type: 'text',

					text: ' используется с неопределёнными существительными в единственном числе.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Количественные определители' },
		{ type: 'customComponent', component: <ArticleMany /> },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					color: 'blue',

					text: 'Количественные определители',
				},
				{
					type: 'text',

					text: ' some, any, many и другие используются перед неопределёнными существительными во множественном числе. ',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Нулевой артикль' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Нулевым артиклем называют отсутствие артикля. В частности перед существительными во множественным числе.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед определёнными существительными' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Определённый артикль the' },
		{ type: 'customComponent', component: <ArticleThe /> },
		{
			type: 'paragraph',

			children: [
				{ type: 'text', color: 'blue', text: 'Определённый артикль the' },
				{
					type: 'text',

					text: ' сообщает, что следом идёт определённое, конкретное существительное. То есть указывается на то, что собеседник знает о каком именно предмете идёт речь.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Притяжательные местоимения' },
		{ type: 'customComponent', component: <ArticleMy /> },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',  text: 'Это ' },
				{
					type: 'text',
					color: 'blue',

					text: 'притяжательные местоимения',
				},
				{
					type: 'text',

					text: ' как и в русском языке. Само собой когда говорят о чьём-то персонаже или предмете, то подразумевают нечто конкретное. Если есть возможность обозначить принадлежность, то предпочтут одно из притяжательных местоимений, а не определённый артикль the.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указательные местоимения' },
		{ type: 'customComponent', component: <ArticleThis /> },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',  text: 'И ' },
				{ type: 'text', color: 'blue', text: 'указательные местоимения' },
				{
					type: 'text',

					text: ' как у нас. И если указывают на предмет, то указывают на конкретный.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Существительные в притяжательном падеже' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'По смыслу как притяжательное местоимение, но можно указать принадлежность любым предметом или персонажем.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'yellow',
			children: [
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

							text: 'Выше дано упрощённое представление работы артиклей и других определителей. На самом деле есть большое количество правил когда какой используется. Они будут рассмотрены по ходу курса.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  text: 'Вы уже ставили ' },
				{ type: 'text',  weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',

					text: ' упражнениях предыдущих глав. Давайте разберём его в деталях. А с другими определителями познакомимся ближе по ходу курса.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Неопределённый артикль a' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указывает на неопределённый объект' },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',  text: 'Неопределённый артикль ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',

					text: ' ставится перед неопределёнными существительными. То есть когда говорят об одном из объектов без разницы каком.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' car' },

				{ type: 'text',  text: 'машина' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Любая машина из всех машин. Не важно какая.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' carrot' },

				{ type: 'text',  text: 'морковь' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Любая морковь из всех в мире, а не конкретная.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Только для единственного числа' },
		{
			type: 'paragraph',

			children: [
				{ type: 'text', color: 'blue', text: 'Артикль a' },
				{
					type: 'text',

					text: ' произошёл от древнеанглийского числительного an (один), поэтому его используют только для существительных в единственном числе.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Только для исчисляемых' },
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

							text: 'Это правило снова отсылает к изначальному значению артикля ',
						},
						{ type: 'text', color: 'blue', text: 'a' },
						{
							type: 'text',

							text: '. Зачем говорить «один» для существительных не поддающихся счёту?',
						},
					],
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-28036',
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

									text: 'Перед неопределёнными исчисляемыми существительными в единственном числе артикль ',
								},
								{ type: 'text', color: 'blue', text: 'a' },
								{
									type: 'text',

									text: ' ставится.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Это пакет.',
								},

								{
									type: 'text',

									text: 'It is a bag.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Это столовая ложка.',
								},

								{
									type: 'text',

									text: 'It is a tablespoon.',
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

									text: 'Перед неопределёнными неисчисляемыми не ставится.',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Это рис.',
								},

								{
									type: 'text',

									text: 'It is rice.',
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

									text: 'Не может быть «2 риса» или «5 рисов».',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',

									text: 'Это деньги.',
								},

								{
									type: 'text',

									text: 'It is money.',
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

									text: 'Нет 3 деньги или 12 денег.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,

							children: [
								{
									type: 'text',

									text: 'Вы можете возразить, что рис состоит из рисинок, а деньги из купюр. Это можно посчитать. Но мы же говорим про существительное рис, и не рисинки. И про деньги, а не купюры. Поэтому это посчитать нельзя.',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			exercises: [

			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Перевод неисчисляемых в исчисляемые' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Ко многим неисчисляемым существительным обозначающие вещества можно добавить неопределённый артикль. Тогда они станут исчисляемыми и приобретут значение порции этого вещества.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Это чай. Это стакан чая.',
				},

				{ type: 'text',  text: 'It is tea. It is ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' tea.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Артикль перед неисчисляемым сделал его исчисляемым в значении порции этого вещества. Порция чая подразумевается под стаканом чая.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В русском языке вынуждены использовать разные слова для обозначения разных сущностей. А в английском слово приобретает другое значение после добавления неопределённого артикля.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это бумага. Это газета.' },

				{ type: 'text',  text: 'It is paper. It is ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' paper.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'paper без артикля будет в значении «бумага», а с добавление артикля «газета».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Ещё примеры:' }],
		},
		{
			type: 'grid',

			gridId: 'grid-34910',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'wood' },

								{ type: 'text',  text: 'лес' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'iron' },

								{ type: 'text',  text: 'железо' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'coal' },

								{ type: 'text',  text: 'уголь' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'hair' },

								{ type: 'text',  text: 'волосы' },
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
								{ type: 'text',  text: 'a wood' },

								{ type: 'text',  text: 'дерево' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'an iron' },

								{ type: 'text',  text: 'утюг' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'a coal' },

								{ type: 'text',  text: 'уголёк' },
							],
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{ type: 'text',  text: 'a hair' },

								{ type: 'text',  text: 'волосок' },
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

					text: 'Некоторые абстрактные понятия можно сделать исчисляемыми.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Это красота. Она красотка.',
				},

				{ type: 'text',  text: 'It is beauty. She is ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text',  text: ' beauty.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Красота и красотка переводятся одинаковым словом beauty. Но «красота» неисчисляемое, а «красотка» исчисляемое. Поэтому в первом случае артикль не ставится, а во втором ставится. В отношении красивого мужчины используют слово handsome.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Ещё примеры:' }],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Ввод существительного в контекст' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Вы узнали, что существительные в английском могут быть определёнными или неопределёнными. Определённые — это те, которые уже находятся в контексте разговора. Но до этого их нужно в контекст ввести. Поэтому сначала упоминают неопределённое существительное помечая его артиклем a, а затем оно становится одним из определённых.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Огромный слон.' },

				{ type: 'text',  text: 'It is a huge elephant.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'В первый раз ввели в повествование слона. Он пока неопределённый. При последующих упоминаниях будет определённым с подходящим определителем.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Это дверь.' },
				{ type: 'text',  text: 'It is a door.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'В первый раз упомянута дверь.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Металлическая скамейка менее популярна, чем деревянная.',
					engSentences: [
						{
							engSentences: ['A metal bench is less popular than a wooden bench.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'металлический', engWord: 'metal' },
						{ rusWord: 'скамейка', engWord: 'bench' },
						{ rusWord: 'деревянный', engWord: 'bench' },
						{ rusWord: 'менее', engWord: 'less' },
						{ rusWord: 'популярный', engWord: 'popular' },
						{ rusWord: 'чем', engWord: 'than' },
						{ rusWord: 'деревянный', engWord: 'wooden' },
					],
				},
				{
					note: 'Если место обозначается по роду деятельности (больница — место где лечат, тюрьма — место где отбывают наказание), то артикль не ставится.',
					rusSentence: 'Преступник должен быть в тюрьме.',
					engSentences: [
						{ engSentences: ['A criminal must be in prison.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'преступник', engWord: 'criminal' },
						{ rusWord: 'должен', engWord: 'must' },
						{ rusWord: 'должен', engWord: 'must' },
						{
							note: 'Перед prison артикль не ставится. Подробнее про это будет в главе про нулевой артикль.',
							rusWord: 'в тюрьме',
							engWord: 'in prison',
						},
					],
				},
			],
			offset: true,
		},
		{
			type: 'exercises',
			exercises: [
				{
					note: 'В русском языке «взрослый» — это прилагательное. В английском используется существительное.',
					rusSentence: 'Скоро ты будешь взрослой.',
					engSentences: [
						{ engSentences: ['Soon you will be an adult'], isCorrect: true },
						{ engSentences: ['You will be an adult soon.'], isCorrect: true },
						{
							engSentences: ['You will be adult soon.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Если бы слово adult было прилагательным, то такой вариант был бы правильный. Перед прилагательными артикли не ставятся. Но это должно быть неопределённым существительным. Поэтому ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'an',
										},
										{
											type: 'text',

											text: ' требуется.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'скоро', engWord: 'soon' },
						{ rusWord: 'взрослый', engWord: 'adult' },
					],
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

										text: 'Что такое ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'определитель',
									},
									{
										type: 'text',

										text: ' и для чего нужен?',
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

										text: 'Определитель ставится перед существительным обозначая неопределённый или определённый объект. Английский более точный и конкретный язык в отличии от русского. Тут и чёткий порядок членов предложения и указание на конкретные существительные не на уровне контекста и общего смысла разговора, а на уровне грамматики.',
									},
								],
							},
						],
					},
				},
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',

								children: [
									{
										type: 'text',

										text: 'Какие условия должны сойтись чтобы поставить ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'неопределённый артикль a',
									},
									{ type: 'text',  text: '?' },
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

										text: 'Должно сойтись три условия: существительное должно быть неопределённым, в единственном числе и исчисляемое.',
									},
								],
							},
						],
					},
				},
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',

								children: [
									{
										type: 'text',

										text: 'В каком члене предложения указывается ',
									},
									{
										type: 'text',

										weight: 'bold',
										text: 'время совершения действия',
									},
									{ type: 'text',  text: '?' },
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

										text: 'Время совершения действия указывается на ',
									},
									{
										type: 'text',
										color: 'blue',

										text: 'сказуемом',
									},
									{ type: 'text',  text: '.' },
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',

										text: 'Они умные.',
									},

									{
										type: 'text',

										text: 'They ',
									},
									{ type: 'text', color: 'blue', text: 'are' },
									{
										type: 'text',

										text: ' smart.',
									},
								],
							},
							{
								type: 'paragraph',
								offset: true,

								children: [
									{
										type: 'text',

										text: 'В будущем времени ',
									},
									{
										type: 'text',
										color: 'blue',

										text: 'сказуемым',
									},
									{
										type: 'text',

										text: ' становится модальный глагол ',
									},
									{ type: 'text', color: 'blue', text: 'will' },
									{
										type: 'text',

										text: '. На него ложится время. А так как ',
									},
									{ type: 'text', color: 'gold', text: 'be' },
									{
										type: 'text',

										text: ' уже не сказуемое, а дополнение, то находится в ',
									},
									{
										type: 'text',
										color: 'gold',

										text: 'инфинитивной',
									},
									{
										type: 'text',

										text: ' форме.',
									},
								],
							},
							{
								type: 'paragraph',

								textSize: 'big',
								children: [
									{
										type: 'text',

										text: 'Они будут умными.',
									},

									{
										type: 'text',

										text: 'They ',
									},
									{ type: 'text', color: 'blue', text: 'will' },
									{ type: 'text',  text: ' ' },
									{ type: 'text', color: 'gold', text: 'be' },
									{
										type: 'text',

										text: ' smart.',
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

// export default indefiniteArticle
