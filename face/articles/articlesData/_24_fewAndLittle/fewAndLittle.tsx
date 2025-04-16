// import ArticleType from '../../articleType'

/*const fewAndLittle: ArticleType.Art = {
	meta: {
		number: 26,
		slug: 'few-and-little',
		caption: 'Глава 24',
		articleName: 'Few и little',
		articleDescription: 'Научи',
	},
	content: [
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Чтобы показать, что чего-то мало в английском используют слова few и little. Они могут быть прилагательнымы или существительными в зависимости от того стоит ли после них существительное.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как прилагательное' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Как прилагательное few используется вместе с исчисляемыми существительными, а little с неисчисляемыми.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-13271',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [{ type: 'header', tag: 'h4', style: 'h4', text: 'С исчисляемыми (few)' }],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'С неисчисляемыми (little)',
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

					text: 'Cлово «мало» обозначает, что чего-то недостаточно. Для его используется голый few или little.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-26392',
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
									color: 'black',

									text: 'Я получила мало откликов.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'I got a few responses.',
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
									color: 'black',

									text: 'Мы мало знаем о его семье.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'We know a little about his family.',
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

					text: 'А слово «несколько/немного» обозначает малое, но достаточное количество. Чтобы это указать к few или little добавляется неопределённый артикль a.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-38877',
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
									color: 'black',

									text: 'Прямых рейсов из Европы несколько.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Direct flights from Europe are a few.',
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
									color: 'black',

									text: 'Я немного знаю об актерстве.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'I know a little about acting.',
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

					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Артикль a относится к few или little, а не к существительному после них. Считайте это устойчивым выражением, единой конструкцией. Артикль a не может стоять перед существительным множественного числа или неисчисляемым.',
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

					text: 'Few и little без неопределённого артикля несёт отрицательную эмоцию (объектов не хватает). А вместе с артиклем нейтральную или положительную (немного, но достаточно). Поэтому нужно чувствовать какой посыл несёт предложение.',
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

					text: 'Например тут просто в нейтральной форме сообщается, что звонок был несколько часов назад, поэтому a few.',
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

					text: 'Я звонил ему пару часов назад.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'I called him a few hours ago.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если поставить одинокий few, то по смысл исказится до «Я звонил ему малое количество часов назад», что звучит немного абсурдно.',
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

					text: 'А тут предложение уже больше положительное. Поэтому без сомнения a little.',
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

					text: 'Вот этот теперь блестит чуть ярче.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'This one shines a little brighter.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если бы хотели сказать, что блестит мало, то использовали бы отрицание с enough.',
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

					text: 'This one has not shiny enough.',
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

					text: 'Заметьте как в двух русских предложениях выше небольшое количество передают слова не мало/несколько/немного, а «пара часов», «чуть». Нужно писать не дословный перевод, а смысловой.',
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

					text: 'Тут явно отрицательный настрой. Человек недостаточно времени уделил на публичные выступления.',
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

					text: 'Он мало выступал с публичными речами.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'He spoke little at public meetings.',
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

					text: 'Если вы на английском сообщаете свои мысли используя few и little, то определите какой посыл собираетесь донести: про недостаточность или достаточное количество.',
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

							text: 'Прилагательное little в примерах выше количественное. Указывает количество объектов. Это прилагательное может быть качественным. Указывает на маленький рост или размер. Например:',
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

							text: 'This little baby surprised me.',
						},

						{
							type: 'text',
							color: 'black',

							text: 'Этот малыш удивил меня.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'На качественные прилагательные написанное выше не распространяется.',
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

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Если подразумевают какие-то конкретное небольшое количество объектов, то ставят the.',
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

							text: 'Я собираю только несколько любимых жанров.',
						},

						{
							type: 'text',
							color: 'black',

							text: 'I only collect the few genres that I like.',
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

							text: 'Немного информации, которые мы получили было не достаточно чтобы принять решение.',
						},

						{
							type: 'text',
							color: 'black',

							text: 'The little information we got was not enough to make a decision.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Как существительное' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Few и little могут быть независимыми словами в роли подлежащего или дополнения с тем же смыслом достаточного и недостаточного количества что и в роли прилагательных.',
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

					text: 'Few действует как местоимение заменяющее исчисляемое существительное во множественном числе (немногие, некоторые). А little как неисчисляемые (мало, немного).',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-3738',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Как исчисляемое (few)' },
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'И все же немногие осознают риски.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Still, few recognize the risk.',
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

									text: 'У некоторых из них были гитары.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'A few of them have guitars.',
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
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'Как неисчисляемое (little)',
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Про себя он написал очень мало.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'He writes very little about himself.',
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

									text: 'Каждый из них имеет немного всего.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Everyone has a little of everything.',
								},
							],
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Степени сравнения' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Сравнительная' },
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-48865',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'few (мало) → fewer (меньше)',
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'У электрических машин меньше движущихся частей.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Electric cars have fewer moving parts.',
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
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'little (мало) → less (меньше)',
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Такие диагнозы в последние годы звучит всё реже.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Such a diagnosis in recent years sounds less.',
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

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Не путайте количественные прилагательные и качественные. Количественные fewer/less говорят о малом количестве, а качественные о менее выраженном качестве.',
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

							text: 'Менее популярные фильмы стоят дешевле.',
						},

						{
							type: 'text',
							color: 'black',

							text: 'Less popular movies typically cost less.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'gray',

							text: 'Первый less относится к прилагательному «популярные». Поэтому это качественное прилагательное. А второй less уже относится к количественным прилагательным потому что относится к опущенному слову «деньги».',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Превосходная' },
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-71443',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'few (мало) → the fewest (наименьший)',
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'У японцев меньше всего друзей в социальных сетях.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Japanese have the fewest friends on social networks.',
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
							type: 'header',
							tag: 'h4',
							style: 'h4',
							text: 'little (мало) → the least (наименьший)',
						},
						{
							type: 'paragraph',

							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',

									text: 'Меньше всего проблем будет у детей.',
								},

								{
									type: 'text',
									color: 'black',

									text: 'Children will have the least problem.',
								},
							],
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Альтернативы few/little' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Сказать о малом количестве можно и через отрицание большого количества посредством конструкции not many/mach не много = мало. Это распространено в разговорной речи как в английском, так и в русском. Это более вежливая конструкция чтобы не заострять внимание на недостаточное количество.',
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

					text: 'Кандидатов на эту роль не так много.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Not many candidates for that job.',
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

					text: 'Изначальное не многие в это поверили.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Initially, not many people believed it.',
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

					text: 'Реже используют hardly any (едва ли кто/что-либо):',
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

					text: 'А документации о ней почти не сохранилось.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Hardly any documentation of it remains.',
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

					text: 'Далеко не каждый турист отваживается сюда зайти.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Hardly any tourists dare to come here.',
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

					text: 'Но если используют наречия степени (too, so, very), то предпочитают few/little.',
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

					text: 'У таких людей не очень много друзей.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Such persons have very few friends.',
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

					text: 'И мы так мало о них знаем.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'And we know so little about them.',
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

					text: 'Few и little можно заменить более нейтральным some. Оно обозначает «некое количество». Но на русский часто переводится «немного/некоторые». Some используется для любых типов существительных.',
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

					text: 'Ты взяла таблетки и немного воды.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'You took the pills and some water.',
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

					text: 'Некоторые фрукты содержат больше нитратов, чем другие.',
				},

				{
					type: 'text',
					color: 'black',

					text: 'Some fruits contain more nitrates than others.',
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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

										text: 'В теории написано, что (a) few/little переводятся словами мало/несколько/немного. Но во многих русских предложениях таких слов нет. Тогда почему для перевода используются (a) few/little?',
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

								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',

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

// export default fewAndLittle
