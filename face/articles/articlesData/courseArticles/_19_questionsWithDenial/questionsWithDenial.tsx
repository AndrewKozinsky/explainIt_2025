// import ArticleType from '../../articleType'

/*const questionsWithDenial: ArticleType.Art = {
	meta: {
		number: 21,
		slug: 'questions-with-denial',
		caption: 'Глава 19',
		articleName: 'Вопросы с отрицанием',
		articleDescription:
			'Научимся строить воросительные предложения с раздражительными нотками вида «Разве ты не постирал мои вещи?»',
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
					text: 'Задавая обычный вопрос спрашивающий хочет получить ответ. Такой вопрос эмоционально нейтрален.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ты постирал мои вещи?' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Did you wash my clothes?',
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
					text: 'Добавив в вопрос отрицание можно выразить раздражение или удивление. Такой вопрос может быть в полной или сокращённой форме. В полной отрицательную частицу not ставьте после подлежащего.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Did' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' you ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'not' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' wash my clothes?' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ты не постирал мои вещи?',
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
					text: 'А в сокращённой к вспомогательному глаголу образуя сокращённую форму.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Didn’t' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' you wash my clothes?' },

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ты не постирал мои вещи?',
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
					text: 'Полная форма используется в официальном стили, сокращённая в разговорном.',
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
					text: 'На русский такой вопрос можно перевести через слово «разве», «неужели».',
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
					text: 'Didn’t you wash my clothes?',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Разве' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ты не постирал мои вещи?',
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
					text: 'Didn’t you wash my clothes?',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Неужели' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ты не постирал мои вещи?',
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
					text: 'Глагол be является и смысловым и вспомогательным, поэтому переносится до подлежащего. Второй раз в вопросе с отрицанием если ставить не нужно.',
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
					text: 'Разве Ира не была в Италии?',
				},

				{ type: 'text', color: 'black', weight: 'normal', text: 'Wasn’t Ira in Italy?' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Неверно было бы сказать ' },
				{
					type: 'text',
					color: 'error',
					weight: 'normal',
					text: 'Wasn’t Ira was in Italy?',
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
							text: 'Если вам сложно такое осознать, то попробуйте сначала сделать утвердительное предложение, затем вопрос, и потом добавить not для вопроса с отрицанием:',
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
							text: 'Ira was in Italy.',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Was Ira in Italy?',
						},

						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Wasn’t Ira in Italy?',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Ещё один пример:' }],
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
					text: 'Неужели он не решит эту проблему?',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Won’t he solve this problem?',
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
					text: 'Ответ на такой вопрос строится по правилам рассказанным в предыдущей главе.',
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Она не такая уж молодая и привлекательная, не так ли?',
					engSentences: [
						{
							engSentences: ['She is not so young and attractive, is she?'],
							isCorrect: true,
						},
						{ engSentences: [], isCorrect: false },
					],
					words: [
						{ rusWord: 'такой молодой', engWord: 'so young' },
						{ rusWord: 'привлекательный', engWord: 'attractive' },
					],
				},
				{
					rusSentence: 'Вадим ведь здесь, правда?',
					engSentences: [
						{ engSentences: ['Vadim is here, is not he?'], isCorrect: true },
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
											text: 'Лучше вместо голого ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'true',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' использовать ',
										},
										{
											type: 'text',
											color: 'blue',
											weight: 'normal',
											text: 'is it true',
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
											text: 'Если в главном предложении используется утверждение, то во второстепенном должно быть отрицание и наоборот.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'здесь', engWord: 'here' }],
				},
				{
					rusSentence: 'Она и не такая, разве нет?',
					engSentences: [
						{ engSentences: ['She is not, is she?'], isCorrect: true },
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
											text: 'Если чётко следовать изначальному предложению, то в главном должно быть отрицание, а во второстепенном утверждение. А сам вариант грамматически правильный.',
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
											text: 'В главном предложении должно быть отрицание.',
										},
									],
								},
							],
						},
					],
					words: [],
				},
				{
					rusSentence: 'Они ведь не чокнутые, правда?',
					engSentences: [
						{ engSentences: ['They are not crazy, are they?'], isCorrect: true },
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
											text: 'После местоимения they to be должен быть в форме are.',
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
											text: 'Во втором предложении слова нужно строить под вопрос. Сейчас порядок слов для утвердительного предложения и в конце знак вопроса.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'чокнутый', engWord: 'crazy' }],
				},
				{
					rusSentence: 'Ведь здесь Том не в безопасности?',
					engSentences: [
						{ engSentences: ['Tom is not safe here, is he?'], isCorrect: true },
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
											text: 'Слово here обозначает место, их лучше ставить начале или в конце предложения.',
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
											text: 'В таких предложениях not нужно ставить или в главном или во второстепенном предложении, но не в двух одновременно. В русском варианте отрицание стоит в главном предложении. Поэтому в переводе not должен быть так же.',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'здесь', engWord: 'here' },
						{ rusWord: 'безопасность', engWord: 'safe' },
					],
				},
				{
					rusSentence: 'Ирина не здорова, ведь так?',
					engSentences: [
						{ engSentences: ['Irina is not healthy, is she?'], isCorrect: true },
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
											text: 'Получилось многословно, но грамматически правильно.',
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
											text: 'Конструкцию she is not можно ставить только в повествовательных предложениях и дальше должно идти или прилагательное или существительное. Но вместо повествовательного там должено быть вопросительное.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'здоров', engWord: 'healthy' }],
				},
				{
					rusSentence: 'Она же не беременна снова, не так ли?',
					engSentences: [{ engSentences: ["She's not pregnant again, is she?"], isCorrect: true }],
					words: [{ rusWord: 'здоров', engWord: 'healthy' }],
				},
			],
			offset: true,
		},
	],
}*/

// export default questionsWithDenial
