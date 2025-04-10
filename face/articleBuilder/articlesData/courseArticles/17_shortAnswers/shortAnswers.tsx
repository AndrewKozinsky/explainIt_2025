import ArticleType from '../../articleType'

const shortAnswers: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 19,
		slug: 'short-answers',
		caption: 'Глава 17',
		articleName: 'Короткие ответы',
		articleDescription:
			'Научимся отвечать на закрытые вопросы и узнаем почему в английском не принято отвечать yes или no как в русском.',
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
					text: 'В английском на закрытый вопрос не принято отвечать голым ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'yes' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (да) или ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'no' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' (нет) как в русском. Это звучит невежливо. Краткий ответ принято крепить к вспомогательному или модальному глаголу, который использовался в вопросе.',
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
					text: 'В примере в вопросе использовался вспомогательный глагол ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Вопрос' },
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
									text: 'Ты голоден?',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'Are' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'Yes, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'am' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'No, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'am' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' not.' },
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
					text: 'Другими словами на вопрос «Вы есть голодный» нужно отвечать «Да, я есть» или «Нет, я не есть». Конечно ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' должен иметь форму лица подлежащего.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Пример с ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'Past Simple' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Вспомогательным глаголом тут выступает ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'did' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Вопрос' },
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
									text: 'Ты говорила с отцом?',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'Did' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'Yes, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'did' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'No, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'did' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' not.' },
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
							text: 'No и not переводятся одинаково «нет». Но ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'no' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' ставится для отрицательного ответа, а ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' стоит после вспомогательного глагола и отрицает слова за ним.',
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
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Вопрос' },
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
									text: 'Ответишь на вопрос?',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'Will' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'Yes, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'No, I ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'will' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' not.' },
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
					text: 'Ответ можно сократить ещё больше убрав ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'yes' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' или ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'no' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Вопрос' },
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
									text: 'Он говорит по-английски?',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'Does' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Положительный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'He ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'does' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: 'Отрицательный',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'black', weight: 'normal', text: 'He ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'does' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' not.' },
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ответ можно расширить наполнив подробностями.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Арбуз фрукт?' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Is watermelon a fruit?' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Нет.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'It isn’t.' },
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
					text: 'В кратких ответах принято всегда использовать краткую форму вспомогательных глаголов.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Нет, это не так.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'No, it isn’t.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Нет, не фрукт.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'No, it isn’t a fruit.' },
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
					text: 'По-русски можно сказать «не фрукт» опустив подлежащее «это». В английском подлежащее всегда должно быть потому что англичане хотят знать кто выполняет действие, даже не смотря на то, что это ясно из контекста.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ягода.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'It’s a berry.' },
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
					text: 'Нет, это не фрукт, а ягода.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'В английском языке не приемлемо вместо вспомогательного глагола использовать смысловой в ответе.',
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
							text: 'Врачи учатся много лет? — Да, участся.',
						},
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Do doctors study for many years? — Yes, they ',
						},
						{ type: 'text', color: 'error', weight: 'normal', text: 'study' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Так правильно:' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Да, участся.' },
						{ type: 'arrow' },
						{ type: 'text', color: 'black', weight: 'normal', text: 'Yes, they ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
							text: 'Do как бы является ссылкой на смысловой.',
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
							text: '— Мне нравятся лошади!',
						},
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '— I love horses!',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: '— Я рад ' },
						{
							type: 'text',
							color: 'gray',
							weight: 'normal',
							text: '(что нравятся лошади)',
						},
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
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
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Ходит шутка, что в русском можно сказать и «да» и «нет» в ответе:',
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
							text: 'Да нет, наверное.',
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
							text: 'Но тут слово «да» обозначает не положительный ответ, а вводное слово выражающее сомнение и неуверенность. В английском за это отвечает слово well:',
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
							text: 'Well, I don’t think so.',
						},
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Да я не думаю так.',
						},
					],
				},
			],
		},
	],
}

export default shortAnswers
