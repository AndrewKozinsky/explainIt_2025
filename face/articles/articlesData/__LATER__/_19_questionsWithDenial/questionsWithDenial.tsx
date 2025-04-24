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

			children: [
				{
					type: 'text',

					text: 'Задавая обычный вопрос спрашивающий хочет получить ответ. Такой вопрос эмоционально нейтрален.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Ты постирал мои вещи?' },

				{
					type: 'text',

					text: 'Did you wash my clothes?',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Добавив в вопрос отрицание можно выразить раздражение или удивление. Такой вопрос может быть в полной или сокращённой форме. В полной отрицательную частицу not ставьте после подлежащего.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Did' },
				{ type: 'text',   text: ' you ' },
				{ type: 'text', color: 'blue',  text: 'not' },
				{ type: 'text',   text: ' wash my clothes?' },

				{
					type: 'text',

					text: 'Ты не постирал мои вещи?',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'А в сокращённой к вспомогательному глаголу образуя сокращённую форму.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Didn’t' },
				{ type: 'text',   text: ' you wash my clothes?' },

				{
					type: 'text',

					text: 'Ты не постирал мои вещи?',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Полная форма используется в официальном стили, сокращённая в разговорном.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'На русский такой вопрос можно перевести через слово «разве», «неужели».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Didn’t you wash my clothes?',
				},

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'Разве' },
				{
					type: 'text',

					text: ' ты не постирал мои вещи?',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Didn’t you wash my clothes?',
				},

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'Неужели' },
				{
					type: 'text',

					text: ' ты не постирал мои вещи?',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Глагол be является и смысловым и вспомогательным, поэтому переносится до подлежащего. Второй раз в вопросе с отрицанием если ставить не нужно.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Разве Ира не была в Италии?',
				},

				{ type: 'text',   text: 'Wasn’t Ira in Italy?' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray',  text: 'Неверно было бы сказать ' },
				{
					type: 'text',
					color: 'error',

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

					children: [
						{
							type: 'text',

							text: 'Если вам сложно такое осознать, то попробуйте сначала сделать утвердительное предложение, затем вопрос, и потом добавить not для вопроса с отрицанием:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Ira was in Italy.',
						},

						{
							type: 'text',

							text: 'Was Ira in Italy?',
						},

						{
							type: 'text',

							text: 'Wasn’t Ira in Italy?',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Ещё один пример:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Неужели он не решит эту проблему?',
				},

				{
					type: 'text',

					text: 'Won’t he solve this problem?',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

									children: [
										{
											type: 'text',

											text: 'Лучше вместо голого ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'true',
										},
										{
											type: 'text',

											text: ' использовать ',
										},
										{
											type: 'text',
											color: 'blue',

											text: 'is it true',
										},
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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

									children: [
										{
											type: 'text',

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
