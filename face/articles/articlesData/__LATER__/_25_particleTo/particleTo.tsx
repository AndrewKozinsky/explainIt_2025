// import ArticleType from '../../articleType'
// import PresentSimplePositiveScheme from './PresentSimplePositiveScheme'
// import PresentSimpleQuestionScheme_2 from './PresentSimpleQuestionScheme_2'

/*const particleTo: ArticleType.Art = {
	meta: {
		number: 27,
		slug: 'particle-to',
		caption: 'Глава 25',
		articleName: 'Инфинитив',
		articleDescription:
			'Научимся составлять предложения с несколькими глаголами и узнаем чем в этом поможет инфинитивная форма глагола.',

	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Инфинитив — это глагол без грамматической нагрузки времени. Вы уже встречались с ними при формировании отрицательного и вопросительного предложения.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В утверждении у глагола есть время совершения действия. Например like в форме настроящего времени после подлежащего третьего лица будет в форме likes.',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimplePositiveScheme /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'А в вопросе появляется глагол do, на который переходит настоящее время. А смысловой like становится инфинитивом.',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimpleQuestionScheme_2 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Такие глаголы типа like называют голым инфинитивом. А если глагол стоит после другого глагола и отвечает на вопрос «Что делать?», то к ним добавляется частица to и они называются полным инфинитивом.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Ник хочет ' },
				{ type: 'text', color: 'gray', text: '(что сделать?)' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'закрыть' },
				{ type: 'text',  text: ' окно.' },

				{ type: 'text',  text: 'Nic wants ' },
				{ type: 'text', color: 'blue', text: 'to close' },
				{ type: 'text',  text: ' the window.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Мы попытаемся ' },
				{ type: 'text', color: 'gray', text: '(что сделать?)' },
				{ type: 'text',  text: ' ' },
				{ type: 'text', color: 'blue', text: 'поймать' },
				{ type: 'text',  text: ' её.' },

				{ type: 'text',  text: 'We will try ' },
				{ type: 'text', color: 'blue', text: 'to catch' },
				{ type: 'text',  text: ' her.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gray', text: '(что сделать?)' },
				{
					type: 'text',

					text: ' Решить проблему было легко.',
				},

				{ type: 'text',  text: 'It was easy ' },
				{ type: 'text', color: 'blue', text: 'to solve' },
				{ type: 'text',  text: ' the problem.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Если перед глаголом в неопределённой форме стоит and (и) либо or (или), то частицу to не ставят.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Щенок хотел прыгать и бегать.',
				},

				{
					type: 'text',

					text: 'The puppy wanted to jump and ',
				},
				{ type: 'text', color: 'blue', text: 'run' },
				{ type: 'text',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Для создания отрицания инфинитиву не требуется помощь вспомогательного глагола. Not можно добавить прямо к нему.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Я был счастлив не видеть тебя.',
				},

				{ type: 'text',  text: 'I was happy ' },
				{ type: 'text', color: 'blue', text: 'not to see' },
				{ type: 'text',  text: ' you.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Я призываю всех не учить грамматику',
				},

				{
					type: 'text',

					text: 'I encourage everybody not to learn grammar.',
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

							text: 'После модальных глаголов всегда стоят глаголы в голом инфинитиве.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{
							type: 'text',

							text: 'Цены будут расти быстрее, инфляция увеличится.',
						},

						{ type: 'text',  text: 'Prices ' },
						{ type: 'text', color: 'gold', text: 'will' },
						{ type: 'text',  text: ' ' },
						{ type: 'text', color: 'blue', text: 'grow' },
						{
							type: 'text',

							text: ' faster, inflation will rise.',
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

							text: 'Глаголы grow и rise в инфинитивной форме, но частица to не стоит потому что после модальных глаголов инфинитивный глагол должен быть без частицы to.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  text: 'После ' },
				{ type: 'text',  weight: 'bold', text: 'be' },
				{
					type: 'text',

					text: ' тоже может быть инфинитивный глагол.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Наша цель улучшить результат.',
				},

				{
					type: 'text',

					text: 'Our goal is to improve the result.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Меллори желает видеть нас здесь?',
					engSentences: [{ engSentences: ['Does Mallory want to see us here?'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Майк каждому разрешает заходить сюда.',
					engSentences: [{ engSentences: ['Mike allows everybody to come here.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Директор заставляла вас что-то делать?',
					engSentences: [
						{
							engSentences: ['Did the principal force you to do anything?'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он попросит суд назначить другого адвоката.',
					engSentences: [
						{
							engSentences: ['He will request the court to appoint another lawyer.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Офицер призвал нас соблюдать правила.',
					engSentences: [
						{
							engSentences: ['The officer urged us to obey the rule.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Твой отец разрешает брать машину?',
					engSentences: [
						{
							engSentences: ['Does your father allow you to take his car?'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я не прошу родителей давать деньги. ',
					engSentences: [
						{
							engSentences: [' I don’t ask my parents to give me money.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я не разрешаю тебе пропускать уроки.',
					engSentences: [
						{
							engSentences: ['I don’t allow you to skip your lessons.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Егор обожает есть мороженое.',
					engSentences: [{ engSentences: ['Egor adores to eat ice-cream.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Ему нужно стараться изо всех сил, чтобы сохранить свою репутацию.',
					engSentences: [
						{
							engSentences: ['They do their best to maintain their reputation.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: ['He loved science and wanted to become a biologist.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [{ engSentences: ['I wanted to start a new life.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Переведи',
					engSentences: [
						{
							engSentences: [
								'Mr Shuan, the mat that really knew how to sail the ship, was only dangerous when he was drunk.',
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Он тас',
					engSentences: [{ engSentences: ['I was tired but happy to be alive.'], isCorrect: true }],
					words: [{ rusWord: 'каждый год', engWord: 'year' }],
				},
			],
			offset: true,
		},
	],
}*/

// export default particleTo
