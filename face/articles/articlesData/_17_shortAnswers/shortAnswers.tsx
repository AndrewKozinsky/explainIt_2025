// import ArticleType from '../../articleType'

/*const shortAnswers: ArticleType.Art = {
	meta: {
		number: 19,
		slug: 'short-answers',
		caption: 'Глава 17',
		articleName: 'Короткие ответы',
		articleDescription:
			'Научимся отвечать на закрытые вопросы и узнаем почему в английском не принято отвечать yes или no как в русском.',
	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В английском на закрытый вопрос не принято отвечать голым ',
				},
				{ type: 'text',  weight: 'bold', text: 'yes' },
				{ type: 'text',  text: ' (да) или ' },
				{ type: 'text',  weight: 'bold', text: 'no' },
				{
					type: 'text',

					text: ' (нет) как в русском. Это звучит невежливо. Краткий ответ принято крепить к вспомогательному или модальному глаголу, который использовался в вопросе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В примере в вопросе использовался вспомогательный глагол ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',

					text: '. Поэтому его нужно использовать для ответа: как утвердительного, так отрицательного. Тут ещё нужно заметить, что в ответе подлежащим обычно ставят местоимение.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-98734',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray', text: 'Вопрос' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Ты голоден?',
								},

								{ type: 'text',  text: '' },
								{ type: 'text', color: 'blue', text: 'Are' },
								{
									type: 'text',

									text: ' you hungry?',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'Yes, I ' },
								{ type: 'text', color: 'blue', text: 'am' },
								{ type: 'text',  text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'No, I ' },
								{ type: 'text', color: 'blue', text: 'am' },
								{ type: 'text',  text: ' not.' },
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

					text: 'Другими словами на вопрос «Вы есть голодный» нужно отвечать «Да, я есть» или «Нет, я не есть». Конечно ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',

					text: ' должен иметь форму лица подлежащего.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  text: 'Пример с ' },
				{ type: 'text',  weight: 'bold', text: 'Past Simple' },
				{
					type: 'text',

					text: '. Вспомогательным глаголом тут выступает ',
				},
				{ type: 'text', color: 'blue', text: 'did' },
				{
					type: 'text',

					text: ', поэтому его нужно поставить в ответ.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-56600',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray', text: 'Вопрос' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Ты говорила с отцом?',
								},

								{ type: 'text',  text: '' },
								{ type: 'text', color: 'blue', text: 'Did' },
								{
									type: 'text',

									text: ' you speak with your dad?',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'Yes, I ' },
								{ type: 'text', color: 'blue', text: 'did' },
								{ type: 'text',  text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'No, I ' },
								{ type: 'text', color: 'blue', text: 'did' },
								{ type: 'text',  text: ' not.' },
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

							text: 'No и not переводятся одинаково «нет». Но ',
						},
						{ type: 'text', color: 'blue', text: 'no' },
						{
							type: 'text',

							text: ' ставится для отрицательного ответа, а ',
						},
						{ type: 'text', color: 'blue', text: 'not' },
						{
							type: 'text',

							text: ' стоит после вспомогательного глагола и отрицает слова за ним.',
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

					text: 'Пример будущего времени с модальным глаголом will.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-54750',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray', text: 'Вопрос' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Ответишь на вопрос?',
								},

								{ type: 'text',  text: '' },
								{ type: 'text', color: 'blue', text: 'Will' },
								{
									type: 'text',

									text: ' you answer my question?',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'Yes, I ' },
								{ type: 'text', color: 'blue', text: 'will' },
								{ type: 'text',  text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'No, I ' },
								{ type: 'text', color: 'blue', text: 'will' },
								{ type: 'text',  text: ' not.' },
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

					text: 'Ответ можно сократить ещё больше убрав ',
				},
				{ type: 'text',  weight: 'bold', text: 'yes' },
				{ type: 'text',  text: ' или ' },
				{ type: 'text',  weight: 'bold', text: 'no' },
				{
					type: 'text',

					text: '. В этом случае местоимение с вспомогательным глаголом будет расцениваться как положительный ответ, а с прикреплённым к вспомогательному глаголу отрицанием как отрицательный.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-3089',
			cells: [
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [{ type: 'text', color: 'gray', text: 'Вопрос' }],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{
									type: 'text',

									text: 'Он говорит по-английски?',
								},

								{ type: 'text',  text: '' },
								{ type: 'text', color: 'blue', text: 'Does' },
								{
									type: 'text',

									text: ' he speak English?',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'He ' },
								{ type: 'text', color: 'blue', text: 'does' },
								{ type: 'text',  text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',

							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',

									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',

							textSize: 'giant',
							children: [
								{ type: 'text',  text: 'He ' },
								{ type: 'text', color: 'blue', text: 'does' },
								{ type: 'text',  text: ' not.' },
							],
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Вы его видели вчера? — Да.',
					engSentences: [
						{
							engSentences: ['Did you see him yesterday? — Yes, I did'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Вы готовы? Да.',
					engSentences: [
						{
							engSentences: ['Are you ready? Yes, I am.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Правильный вариант. Ещё можно I am.',
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

									children: [
										{
											type: 'text',

											text: 'Правильный вариант. Ещё можно Yes, I am.',
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

									children: [
										{
											type: 'text',

											text: 'Лучше не отвечать yes или no, а добавлять местоимение и to be в правильной форме: Yes, I am.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'готов', engWord: 'ready' }],
				},
				{
					rusSentence: 'Вы всегда приходите вовремя? Нет, очень редко.',
					engSentences: [
						{
							engSentences: ['Are you always on time? No, very seldom.'],
							isCorrect: true,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Правильный вариант. Ещё можно I am.',
										},
									],
								},
							],
						},
						{
							engSentences: ['Are you always on time? No, I am.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Вопрос задан правильно, но ответ должен быть совершенно другим',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'приходить вовремя', engWord: 'to be on time' },
						{ rusWord: 'всегда', engWord: 'always' },
						{ rusWord: 'очень', engWord: 'very' },
						{ rusWord: 'редко', engWord: 'seldom' },
					],
				},
				{
					rusSentence: 'Вы вегетарианец? Нет.',
					engSentences: [
						{ engSentences: ['Are you a vegetarian? No, I am not.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Тут смысл следующий: «Любой вегетарианец это вы? Нет, это не так.». Это предложение построено странно. Лучше перевернуть и действующим лицом сделать местоимение you.',
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

									children: [
										{
											type: 'text',

											text: 'Это многословный вариант, но грамматически-правильный.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'вегетарианец', engWord: 'a vegetarian' }],
				},
				{
					rusSentence: 'Английский ваш первый язык? Ага.',
					engSentences: [
						{
							engSentences: ['Is English your first language? Yes, it is.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'вегетарианец', engWord: 'a vegetarian' }],
				},
				{
					rusSentence: '— Вы хороший человек? — Я честный человек.',
					engSentences: [
						{
							engSentences: ['Are you a good person? I am an honest person.'],
							isCorrect: true,
						},
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',

									children: [
										{
											type: 'text',

											text: 'Слово honest при произношении начинается с гласной: ˈänəst. Поэтому перед ним неопределённый артикль будет в форме an.',
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

									children: [
										{
											type: 'text',

											text: 'Перед good person поставьте неопределённый артикль потому что англичанам важно знать существительное определённое или конкретное. В данном случае существительное определённое.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'хороший', engWord: 'good' },
						{ rusWord: 'человек', engWord: 'a person' },
						{ rusWord: 'честный', engWord: 'honest' },
					],
				},
			],
			offset: true,
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Ответ можно расширить наполнив подробностями.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Арбуз фрукт?' },

				{ type: 'text',  text: 'Is watermelon a fruit?' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Нет.' },

				{ type: 'text',  text: 'It isn’t.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'В кратких ответах принято всегда использовать краткую форму вспомогательных глаголов.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Нет, это не так.' },

				{ type: 'text',  text: 'No, it isn’t.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Нет, не фрукт.' },

				{ type: 'text',  text: 'No, it isn’t a fruit.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'По-русски можно сказать «не фрукт» опустив подлежащее «это». В английском подлежащее всегда должно быть потому что англичане хотят знать кто выполняет действие, даже не смотря на то, что это ясно из контекста.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Ягода.' },

				{ type: 'text',  text: 'It’s a berry.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Нет, это не фрукт, а ягода.',
				},

				{
					type: 'text',

					text: 'No, it isn’t a fruit. It is a berry.',
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

							text: 'В английском языке не приемлемо вместо вспомогательного глагола использовать смысловой в ответе.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Врачи учатся много лет? — Да, участся.',
						},

						{
							type: 'text',

							text: 'Do doctors study for many years? — Yes, they ',
						},
						{ type: 'text', color: 'error', text: 'study' },
						{ type: 'text',  text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [{ type: 'text',  text: 'Так правильно:' }],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: 'Да, участся.' },

						{ type: 'text',  text: 'Yes, they ' },
						{ type: 'text', color: 'blue', text: 'do' },
						{ type: 'text',  text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: true,

					children: [
						{
							type: 'text',

							text: 'Do как бы является ссылкой на смысловой.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: '— Мне нравятся лошади!',
						},

						{
							type: 'text',

							text: '— I love horses!',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text',  text: '— Я рад ' },
						{
							type: 'text',
							color: 'gray',

							text: '(что нравятся лошади)',
						},
						{ type: 'text',  text: '.' },

						{
							type: 'text',

							text: '— I am glad you do.',
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

							text: 'Ходит шутка, что в русском можно сказать и «да» и «нет» в ответе:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Да нет, наверное.',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',

							text: 'Но тут слово «да» обозначает не положительный ответ, а вводное слово выражающее сомнение и неуверенность. В английском за это отвечает слово well:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Well, I don’t think so.',
						},

						{
							type: 'text',

							text: 'Да я не думаю так.',
						},
					],
				},
			],
		},
	],
}*/

// export default shortAnswers
