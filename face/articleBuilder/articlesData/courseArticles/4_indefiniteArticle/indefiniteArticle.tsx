import ArticleType from '../../articleType'
import ArticleA from './ArticleA'
import ArticleMany from './ArticleMany'
import ArticleThe from './ArticleThe'
import ArticleMy from './ArticleMy'
import ArticleThis from './ArticleThis'

const indefiniteArticle: ArticleType.Art = {
	meta: {
		number: 6,
		slug: 'indefinite-article',
		caption: 'Глава 4',
		articleName: 'Неопределённый артикль a',
		articleDescription:
			'Кратко рассмотрено для чего перед каждым существительным ставят определитель и разберём неопределённый артикль a/an.',
		isPaid: false,
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Что такое определители' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Существительное может быть ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'определённым' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' или ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'неопределённым' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Купи, пожалуйста, мяч.' }],
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
					text: 'Если про мяч сообщается впервые, то будет обозначать просьбу купить любой мяч. А если упоминался ранее, то конкретный  мяч. В русском языке это понимают по контексту. Но нередко перед определёнными существительными ставим местоимения «тот», «этот» чтобы сделать отсылку на объект упомянутый ранее.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Купи, пожалуйста, ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'тот' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' мяч.' },
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
					text: 'Англоговорящие явно указывают неопределённость или определённость существительного ставя перед ним ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'определитель' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Есть несколько групп определителей.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед неопределёнными существительными' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Неопределённый артикль a' },
		{ type: 'customComponent', component: <ArticleA /> },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Неопределённый артикль a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' используется с неопределёнными существительными в единственном числе.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Количественные определители' },
		{ type: 'customComponent', component: <ArticleMany /> },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'blue',
					weight: 'normal',
					text: 'Количественные определители',
				},
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' some, any, many и другие используются перед неопределёнными существительными во множественном числе. ',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Нулевой артикль' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Нулевым артиклем называют отсутствие артикля. В частности перед существительными во множественным числе.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Перед определёнными существительными' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Определённый артикль the' },
		{ type: 'customComponent', component: <ArticleThe /> },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Определённый артикль the' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' сообщает, что следом идёт определённое, конкретное существительное. То есть указывается на то, что собеседник знает о каком именно предмете идёт речь.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Притяжательные местоимения' },
		{ type: 'customComponent', component: <ArticleMy /> },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это ' },
				{
					type: 'text',
					color: 'blue',
					weight: 'normal',
					text: 'притяжательные местоимения',
				},
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' как и в русском языке. Само собой когда говорят о чьём-то персонаже или предмете, то подразумевают нечто конкретное. Если есть возможность обозначить принадлежность, то предпочтут одно из притяжательных местоимений, а не определённый артикль the.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указательные местоимения' },
		{ type: 'customComponent', component: <ArticleThis /> },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'И ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'указательные местоимения' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' как у нас. И если указывают на предмет, то указывают на конкретный.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Существительные в притяжательном падеже' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Выше дано упрощённое представление работы артиклей и других определителей. На самом деле есть большое количество правил когда какой используется. Они будут рассмотрены по ходу курса.',
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
				{ type: 'text', color: 'black', weight: 'normal', text: 'Вы уже ставили ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' упражнениях предыдущих глав. Давайте разберём его в деталях. А с другими определителями познакомимся ближе по ходу курса.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Неопределённый артикль a' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указывает на неопределённый объект' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Неопределённый артикль ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ставится перед неопределёнными существительными. То есть когда говорят об одном из объектов без разницы каком.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' car' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'машина' },
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
					text: 'Любая машина из всех машин. Не важно какая.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' carrot' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'морковь' },
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
					text: 'Любая морковь из всех в мире, а не конкретная.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Только для единственного числа' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Артикль a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' произошёл от древнеанглийского числительного an (один), поэтому его используют только для существительных в единственном числе.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Только для исчисляемых' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Исчисляемое существительное — это существительное, обозначающее название лиц или предметов поддающихся счету: студент — ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a student' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', кактус — ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a cactus' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Чтобы определить исчисляемое ли это существительное добавьте к нему любое число и посмотрите можно ли так сказать:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Три знания' }],
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
					text: 'Так говорить нельзя, поэтому «знание» — это неисчисляемое существительное. Артикль не ставится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Два стакана воды' }],
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
					text: 'Вода — неисчисляемое существительное. Но число относится не к воде, а к стаканам. Стаканы исчисляемое. Поэтому артикль ставится.',
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
							text: 'Это правило снова отсылает к изначальному значению артикля ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
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
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Перед неопределёнными исчисляемыми существительными в единственном числе артикль ',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' ставится.',
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
									text: 'Это пакет.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'It is a bag.',
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
									text: 'Это столовая ложка.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Перед неопределёнными неисчисляемыми не ставится.',
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
									text: 'Это рис.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'It is rice.',
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
									text: 'Не может быть «2 риса» или «5 рисов».',
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
									text: 'Это деньги.',
								},

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'It is money.',
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
									text: 'Нет 3 деньги или 12 денег.',
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
			id: 0,
			exercises: [
				{
					rusSentence: 'Я Кельвин.',
					engSentences: [
						{ engSentences: ['I am Calvin.'], isCorrect: true },
						{
							engSentences: ['I am Kelvin'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Кельвин пишется через ',
										},
										{ type: 'text', color: 'black', weight: 'bold', text: 'C' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ': Calvin. А так предложение правильное.',
										},
									],
								},
							],
						},
						{
							engSentences: ['I am Celvin'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Кельвин пишется через ',
										},
										{ type: 'text', color: 'black', weight: 'bold', text: 'a' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ', а не ',
										},
										{ type: 'text', color: 'black', weight: 'bold', text: 'e' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ': C',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'a',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'lvin. А так предложение правильное.',
										},
									],
								},
							],
						},
					],
					words: [],
				},
				{
					rusSentence: 'Он дикарь.',
					engSentences: [
						{ engSentences: ['He is a savage.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Местоимение he стоит в третьем лице. А to be в третьем лице настоящего времени будет в форме is. В остальном предложение правильное.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'дикарь', engWord: 'savage' }],
				},
				{
					rusSentence: 'Он полицейский.',
					engSentences: [{ engSentences: ['He is a policeman.'], isCorrect: true }],
					words: [{ rusWord: 'полицейский', engWord: 'policeman' }],
				},
				{
					rusSentence: 'Майкл — настоящий мужчина.',
					engSentences: [
						{ engSentences: ['Michael is a real man.'], isCorrect: true },
						{
							engSentences: ['Michael is the real man.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Если бы в контексте разговора упоминался какой-то настоящий мужчина и потом сообщили, что Майкл и он есть, то предложение было бы правильным. Но про это ничего не сказано. И смысл предложения в том, что Майкл один из настоящих мужчин. Поэтому перед связкой ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'real man',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' нужно поставить неопределённый артикль ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'a',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Michael is real a man.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Неопределённый артикль a должен стоять перед связкой прилагательного + существительного.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'настоящий', engWord: 'real' },
						{ rusWord: 'мужчина', engWord: 'man' },
					],
				},
				{
					rusSentence: 'Даша симпатичная девушка.',
					engSentences: [
						{ engSentences: ['Dasha is a pretty girl.'], isCorrect: true },
						{
							engSentences: ['Dasha is are pretty girl.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В предложении ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' должен быть в один. А тут их два: в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' и ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'are',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. И артикля a не хватает. Даша ведь одна из симпатичных девушек, а не та самая.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Dasha is pretty a girl.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В связке прилагательного и существительного первым идёт неопределённый артикль a. Поставьте его перед прилагательным.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'симпатичный', engWord: 'pretty' },
						{ rusWord: 'девушка', engWord: 'girl' },
					],
				},
				{
					rusSentence: 'Это чёрный телефон.',
					engSentences: [
						{ engSentences: ['It is a black phone.'], isCorrect: true },
						{
							engSentences: ['It is black a phone.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Неопределённый артикль a должен стоять перед связкой прилагательного + существительного. Считайте black phone одной сущностью перед которой нужно показать определённость или неопределённость через определяющее слово.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It phone is black.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Тут одновременно есть два подлежащих: it и phone. Так быть не должно.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'чёрный', engWord: 'black' },
						{ rusWord: 'телефон', engWord: 'phone' },
					],
				},
				{
					rusSentence: 'Это просто любопытный факт.',
					engSentences: [
						{ engSentences: [], isCorrect: false },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Если перед существительным есть прилагательное, относящиеся к этому существительному, то артикль a должен стоять перед этим словом, а не после.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'просто', engWord: 'just' },
						{ rusWord: 'любопытный', engWord: 'fun' },
						{ rusWord: 'факт', engWord: 'fact' },
					],
				},
				{
					rusSentence: 'Кстати, он очень хороший врач.',
					engSentences: [
						{ engSentences: ['He\'s a very good doctor, by the way.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Сообщается кем он является — очень хорошим врачом. Поэтому после подлежащего должен быть to be. B один один из «очень хороших докторов». Поэтому перед этим словосочетанием должен быть неопределённый артикль a.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Грамматически правильно, но забыли слово «очень».',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'кстати', engWord: 'by the way' },
						{ rusWord: 'очень', engWord: 'good' },
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'врач', engWord: 'doctor' },
					],
				},
				{
					rusSentence: 'Маша просто истеричная дура, а Саша самовлюблённый болван.',
					engSentences: [
						{
							engSentences: ['Masha is just a hysterical fool and Sasha is a narcissistic idiot.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'просто', engWord: 'just' },
						{ rusWord: 'истеричный', engWord: 'hysterical' },
						{ rusWord: 'дурак', engWord: 'fool' },
						{ rusWord: 'самовлюблённый', engWord: 'narcissistic' },
						{ rusWord: 'болван', engWord: 'idiot' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Перевод неисчисляемых в исчисляемые' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ко многим неисчисляемым существительным обозначающие вещества можно добавить неопределённый артикль. Тогда они станут исчисляемыми и приобретут значение порции этого вещества.',
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
					text: 'Это чай. Это стакан чая.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is tea. It is ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' tea.' },
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
					text: 'Артикль перед неисчисляемым сделал его исчисляемым в значении порции этого вещества. Порция чая подразумевается под стаканом чая.',
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
					text: 'В русском языке вынуждены использовать разные слова для обозначения разных сущностей. А в английском слово приобретает другое значение после добавления неопределённого артикля.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это бумага. Это газета.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is paper. It is ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' paper.' },
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
					text: 'paper без артикля будет в значении «бумага», а с добавление артикля «газета».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Ещё примеры:' }],
		},
		{
			type: 'grid',
			offset: false,
			gridId: 'grid-34910',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'wood' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'лес' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'iron' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'железо' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'coal' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'уголь' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'hair' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'волосы' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a wood' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'дерево' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'an iron' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'утюг' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a coal' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'уголёк' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a hair' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'волосок' },
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
					text: 'Некоторые абстрактные понятия можно сделать исчисляемыми.',
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
					text: 'Это красота. Она красотка.',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is beauty. She is ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' beauty.' },
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
					text: 'Красота и красотка переводятся одинаковым словом beauty. Но «красота» неисчисляемое, а «красотка» исчисляемое. Поэтому в первом случае артикль не ставится, а во втором ставится. В отношении красивого мужчины используют слово handsome.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Ещё примеры:' }],
		},
		{
			type: 'grid',
			offset: false,
			gridId: 'grid-21718',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'life' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'жизнь' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'time' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'время' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'play' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'игра' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'fire' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'огонь' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a life' },

								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'жизненный путь',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a time' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'раз' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a play' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'пьеса' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'a fire' },

								{ type: 'text', color: 'black', weight: 'normal', text: 'пожар' },
							],
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Это (бокал) вина.',
					engSentences: [{ engSentences: ['It is vine.'], isCorrect: true }],
					words: [{ rusWord: 'вино', engWord: 'vine' }],
				},
				{
					rusSentence: 'Это железо, а это утюг.',
					engSentences: [{ engSentences: ['It is iron, but it is an iron.'], isCorrect: true }],
					words: [{ rusWord: 'железо/утюг', engWord: 'iron' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Ввод существительного в контекст' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Вы узнали, что существительные в английском могут быть определёнными или неопределёнными. Определённые — это те, которые уже находятся в контексте разговора. Но до этого их нужно в контекст ввести. Поэтому сначала упоминают неопределённое существительное помечая его артиклем a, а затем оно становится одним из определённых.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Огромный слон.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is a huge elephant.' },
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
					text: 'В первый раз ввели в повествование слона. Он пока неопределённый. При последующих упоминаниях будет определённым с подходящим определителем.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это дверь.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'It is a door.' },
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
					text: 'В первый раз упомянута дверь.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Указывает на типичное поведение' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'Неопределённый артикль a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' могут применять не в значении «один из объектов», а в обобщённом значении как типичное поведение любого объекта этого класса.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Врач лечит людей.' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'A doctor treats people.' },
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
					text: 'Не какой-то врач лечит людей, а в целом любой врач это делает. Это их характерное поведение.',
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
					weight: 'normal',
					text: 'Кролик — домашнее животное.',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'A rabbit is a domestic animal.',
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
					text: 'Заметьте, что артикль стоит и перед rabbit и перед domestic animal потому что это два неопределённых существительных.',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Металлическая скамейка менее популярна, чем деревянная.',
					engSentences: [
						{
							engSentences: ['A metal bench is less popular than a wooden bench.'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Не th',
										},
										{ type: 'text', color: 'black', weight: 'bold', text: 'e' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'n, а th',
										},
										{ type: 'text', color: 'black', weight: 'bold', text: 'a' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'n.',
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
											text: 'Перед ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'wooden bench',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' тоже нужен артикль.',
										},
									],
								},
							],
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
					rusSentence: 'Мобильный криптокошелёк отличается высокой безопасностью.',
					engSentences: [
						{
							engSentences: ['A mobile crypto wallet is very secure.'],
							isCorrect: true,
						},
						{
							engSentences: ['Mobile crypto wallet is very secure'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'Mobile crypto',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' забыли неопределённый артикль ',
										},
										{ type: 'text', color: 'blue', weight: 'bold', text: 'a' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. Он нужен когда сообщают о типичном поведении объекта.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'мобильный', engWord: 'mobile' },
						{ rusWord: 'криптокошелёк', engWord: 'crypto wallet' },
						{
							note: 'В контексте данного предложения слово «отличается» можно перевести через very.',
							rusWord: 'очень',
							engWord: 'very',
						},
						{ rusWord: 'безопасный', engWord: 'secure' },
					],
				},
				{
					rusSentence: 'Собака — верный питомец.',
					engSentences: [
						{ engSentences: ['A dog is a loyal pet.'], isCorrect: true },
						{
							engSentences: ['A dog is loyal pet.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед loyal pet должен быть неопределённый артикль a потому что подразумевают типичное поведение: любая собака по поведению — это верный питомец.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'собака', engWord: 'dog' },
						{ rusWord: 'верный', engWord: 'loyal' },
						{ rusWord: 'домашнее животное', engWord: 'pet' },
					],
				},
				{
					rusSentence: 'Человеческий младенец полностью беспомощен.',
					engSentences: [
						{ engSentences: ['A human baby is totally helpless.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом пр',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'человеческий', engWord: 'human' },
						{ rusWord: 'младенец', engWord: 'baby' },
						{ rusWord: 'полностью', engWord: 'totally' },
						{ rusWord: 'беспомощен', engWord: 'helpless' },
					],
				},
				{
					note: 'Если место обозначается по роду деятельности (больница — место где лечат, тюрьма — место где отбывают наказание), то артикль не ставится.',
					rusSentence: 'Преступник должен быть в тюрьме.',
					engSentences: [
						{ engSentences: ['A criminal must be in prison.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В этом пр',
										},
									],
								},
							],
						},
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
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Изменение артикля на an' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если исчисляемое существительное в единственном числе ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'при произношении' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' (не на письме!) начинается с гласной буквы, то перед ним ставят артикль ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'an' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', а если с согласной, то ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Это нужно для гармонии чтобы не произносить гласные друг за другом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'an apple' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — произносится ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '[эпл]' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' и пишется с гласной. Поэтому ставится ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'an' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'an honest boy' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — хотя в письме начинается с согласной, но произносится с гласной ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '[онист]' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Поэтому тут также стоит артикль ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'an' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Обратите внимание, что нужно смотреть не на существительное, а на слово, которое стоит после артикля. В этом примере это прилагательное ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'honest' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' потому что прилагательные вклиниваются между артиклем и существительным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a table' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — произносится и пишется ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '[теибл]' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' с согласной. Поэтому стоит артикль ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a unity' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — хотя в письме начинается с гласной, но произносится с согласной ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '[джунэти]' },
				{ type: 'text', color: 'black', weight: 'normal', text: '. Поэтому ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
							text: 'Чтобы лучше запоминать произношения слов нужно развивать насмотренность и наслушанность. А это делается через постоянное чтение и прослушивание рассказов. Лучший эффект даст материал где вы понимаете 80% слов. Так будите и понимать смысл и не уставать часто прибегая к словарю.',
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
					text: 'В русском языке мы также изменяем слова для благозвучности. Например предлог «в» изменим на «во» если после него стоит слово начинающееся на «в»: «в цирке», но «во время исполнения».',
				},
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Вы идиот.',
					engSentences: [{ engSentences: ['You are an idiot '], isCorrect: true }],
					words: [{ rusWord: 'идиот', engWord: 'idiot' }],
				},
				{
					rusSentence: 'Это конверт.',
					engSentences: [
						{ engSentences: ['It is an envelop.'], isCorrect: true },
						{
							engSentences: ['It is a envelope.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Неопределённый артикль ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'a',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' пишется перед словами начинающиеся с согласной для благозвучности. А envelop начинается с гласной. Поэтому тут используйте ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'an',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is envelop.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Перед существительным должно быть определяющее слово. О каком конверте идёт речь: об определённом или одном из? Если отдельно не сказано, то об одном из множества.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'конверт', engWord: 'envelope' }],
				},
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Если бы слово adult было прилагательным, то такой вариант был бы правильный. Перед прилагательными артикли не ставятся. Но это должно быть неопределённым существительным. Поэтому ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'an',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
				{
					rusSentence: 'Она художница.',
					engSentences: [
						{ engSentences: ['She is an artist.'], isCorrect: true },
						{
							engSentences: ['She a artist is.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'В английских предложениях есть чёткий порядок слов: за подлежащим следует сказуемое в повествовательных предложениях. Тут сказуемое убежало в конец предложения.',
										},
									],
								},
							],
						},
						{
							engSentences: ['She am a famous artist.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'После местоимения ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'she',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' следует ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'to be',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' в форме ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'is',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'знаменитый', engWord: 'famous' },
						{ rusWord: 'художник', engWord: 'artist' },
					],
				},
				{
					rusSentence: 'Это заметно и является проблемой.',
					engSentences: [
						{
							engSentences: ['It is noticed and is an issue.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: '-ed',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' описывают эмоции человека.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is noticed and is a problem.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: '-ed',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' описывают эмоции человека.',
										},
									],
								},
							],
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Глагол ',
										},
										{ type: 'text', color: 'blue', weight: 'bold', text: 'be' },
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' должен стоять перед каждым дополнением: и перед ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'noticed',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' и перед ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'problem',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'заметный', engWord: 'noticed' },
						{ rusWord: 'проблема', engWord: 'issue' },
					],
				},
				{
					rusSentence: 'Я единственный ребенок и очень балованная.',
					engSentences: [{ engSentences: ['I am an only child and very spoiled.'], isCorrect: true }],
					words: [
						{ rusWord: 'единственный', engWord: 'only' },
						{ rusWord: 'ребенок', engWord: 'child' },
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'балованный', engWord: 'spoiled' },
					],
				},
				{
					rusSentence: 'Это было захватывающее шоу.',
					engSentences: [
						{
							engSentences: ['It was an exciting show.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Верно! Прилагательные с окончанием ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: '-ing',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' описывают впечатление оказываемое на человека.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'захватывающее', engWord: 'exciting' },
						{ rusWord: 'шоу', engWord: 'show' },
					],
				},
				{
					rusSentence: 'Он был безграмотным человеком.',
					engSentences: [
						{ engSentences: ['He was an illiterate person.'], isCorrect: true },
						{ engSentences: ['He was an illiterate man.'], isCorrect: true },
					],
					words: [
						{
							note: 'Происходит от literate — грамотный',
							rusWord: 'безграмотный',
							engWord: 'illiterate',
						},
						{ rusWord: 'человек', engWord: 'person' },
					],
				},
				{
					rusSentence: 'Валера — главный редактор.',
					engSentences: [
						{ engSentences: ['Valera is an editor-in-chief.'], isCorrect: true },
						{
							engSentences: ['Valera is editor-in-chief.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'editor-in-chief — это существительное. А перед ними мы договорились всегда ставить определяющее слово. Валера один из главных редакторов, поэтому стоит поставить неопределённый артикль a.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Valera is an editor-in-chief.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Неопределённый артикль a не может стоять в форме an потому что следом не стоит слово начинающееся на согласную.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'главный редактор', engWord: 'editor-in-chief' }],
				},
				{
					rusSentence: 'Это старая деревня.',
					engSentences: [
						{ engSentences: ['It is an old village.'], isCorrect: true },
						{
							engSentences: ['It is old village.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Воспринимайте old village как одну сущность: старая деревня. Но англичанам важно знать это одна из множества старых деревень или та самая конкретная деревня. Это одна из множества. Поэтому перед ней ставьте неопределённый артикль a потому что «деревня» — это исчисляемое существительное в единственном числе. А перед ними ставится артикль ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'a',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. Но так как перед артиклем стоит слово начинающееся на гласную, то используйте артикль ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'an',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' для благозвучности.',
										},
									],
								},
							],
						},
						{
							engSentences: ['It is a old village.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Слово ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'old',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' пишется и произносится через гласную ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'o',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: '. А a используется когда следом идёт слово начинающуюся на согласную. ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'an',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' с согласной сделано для удобства речи потому что язык спотыкается когде есть подряд две гласные.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'старый', engWord: 'old' },
						{ rusWord: 'деревня', engWord: 'village' },
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Что такое ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'определитель',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Какие условия должны сойтись чтобы поставить ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'неопределённый артикль a',
									},
									{ type: 'text', color: 'black', weight: 'normal', text: '?' },
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'В каком члене предложения указывается ',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'bold',
										text: 'время совершения действия',
									},
									{ type: 'text', color: 'black', weight: 'normal', text: '?' },
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
										text: 'Время совершения действия указывается на ',
									},
									{
										type: 'text',
										color: 'blue',
										weight: 'normal',
										text: 'сказуемом',
									},
									{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
										text: 'Они умные.',
									},

									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'They ',
									},
									{ type: 'text', color: 'blue', weight: 'normal', text: 'are' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' smart.',
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
										text: 'В будущем времени ',
									},
									{
										type: 'text',
										color: 'blue',
										weight: 'normal',
										text: 'сказуемым',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' становится модальный глагол ',
									},
									{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: '. На него ложится время. А так как ',
									},
									{ type: 'text', color: 'gold', weight: 'normal', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' уже не сказуемое, а дополнение, то находится в ',
									},
									{
										type: 'text',
										color: 'gold',
										weight: 'normal',
										text: 'инфинитивной',
									},
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' форме.',
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
										text: 'Они будут умными.',
									},

									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'They ',
									},
									{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
									{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
									{ type: 'text', color: 'gold', weight: 'normal', text: 'be' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
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
}

export default indefiniteArticle
