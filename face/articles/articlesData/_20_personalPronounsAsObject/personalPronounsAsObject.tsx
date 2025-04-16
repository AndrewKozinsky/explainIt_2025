// import ArticleType from '../../articleType'
// import PersonalPronounceSubjectAndObjectTable from './PersonalPronounceSubjectAndObjectTable'

/*const personalPronounsAsObject: ArticleType.Art = {
	meta: {
		number: 22,
		slug: 'personal-pronouns-as-object',
		caption: 'Глава 20',
		articleName: 'Личные местоимения в дополнении',
		articleDescription: 'Узнаем как изменяются личные местоимения когда действие направлено на объект.',

	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'В самом первом уроке рассказывалось, что личные местоимения используются в качестве ',
				},
				{ type: 'text', color: 'blue',  text: 'подлежащего' },
				{
					type: 'text',

					text: ' — объекта выполняющего действие. В этом случае они стоят в именительном падеже.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Мы' },
				{ type: 'text',   text: ' помогаем.' },

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'We' },
				{ type: 'text',   text: ' help.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Личные местоимения также используются для обозначения ',
				},
				{ type: 'text', color: 'blue',  text: 'дополнения' },
				{
					type: 'text',

					text: ' — объекта, на который действие направлено. Тогда они должны быть в форме объектного падежа.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Мы помогаем ' },
				{ type: 'text', color: 'blue',  text: 'им' },
				{ type: 'text',   text: '.' },

				{ type: 'text',   text: 'We help ' },
				{ type: 'text', color: 'blue',  text: 'them' },
				{ type: 'text',   text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: '«Мы» — это подлежащее, оно выполняет действие. А действие направлено на дополнение «им».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В разных ролях личные местоимения будут иметь разные формы. Это справедливо как для русского, так и английского языка.',
				},
			],
		},
		{ type: 'customComponent', component: <PersonalPronounceSubjectAndObjectTable /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Паша отправил ' },
				{ type: 'text', color: 'blue',  text: 'ей' },
				{ type: 'text',   text: ' открытку.' },

				{ type: 'text',   text: 'Pasha sent ' },
				{ type: 'text', color: 'blue',  text: 'her' },
				{ type: 'text',   text: ' a postcard.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Ты встретишь ' },
				{ type: 'text', color: 'blue',  text: 'их' },
				{ type: 'text',   text: ' на барбекю.' },

				{ type: 'text',   text: 'You will meet ' },
				{ type: 'text', color: 'blue',  text: 'them' },
				{ type: 'text',   text: ' at the barbeque.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Мы старые друзья, ты знаешь ',
				},
				{ type: 'text', color: 'blue',  text: 'меня' },
				{
					type: 'text',

					text: ' и моих людей, мы не убийцы!',
				},

				{
					type: 'text',

					text: 'We are old friends, you know ',
				},
				{ type: 'text', color: 'blue',  text: 'me' },
				{
					type: 'text',

					text: ' and my people, we are not murderers!',
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

							text: 'Только личные местоимения имеют формы для двух падежей. Остальные типы по падежам не изменяются.',
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

					text: 'Довольно часто среди носителей в разговорной речи можно встретить как местоимение ',
				},
				{ type: 'text',  weight: 'bold', text: 'me' },
				{
					type: 'text',

					text: ' используется в качестве подлежащего вместо ',
				},
				{ type: 'text',  weight: 'bold', text: 'I' },
				{
					type: 'text',

					text: '. Это грамматические неправильно. Но используется потому что звучит гармоничнее. Поэтому не удивляйтесь.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Me, you and you will go shopping for Hector a little bit each.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'В коротких ответах ' },
				{ type: 'text',  weight: 'bold', text: 'I' },
				{
					type: 'text',

					text: ' в форме объектного падежа встречается повсеместно.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'blue',

					text: 'Who broke the vase? – Not me! / Me. Кто разбил вазу? – Не я! / Я. I am feeling tired. – Me too. Я (очень) устал/(чувств. уставшим). – Я тоже.',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Я слышал, как они пришли.',
					engSentences: [{ engSentences: ['I heard them come.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я постоянно думаю о тебе.',
					engSentences: [{ engSentences: ['I think about you all the time.'], isCorrect: true }],
					words: [{ rusWord: 'готов', engWord: 'ready' }],
				},
				{
					rusSentence: 'Я действительно тебя люблю.',
					engSentences: [{ engSentences: ['I really love you.'], isCorrect: true }],
					words: [
						{ rusWord: 'действительно', engWord: 'really' },
						{ rusWord: 'любить', engWord: 'love' },
					],
				},
				{
					rusSentence: 'Я понимаю вас очень хорошо.',
					engSentences: [{ engSentences: ['I understand you very well.'], isCorrect: true }],
					words: [
						{ rusWord: 'нуждаться', engWord: 'need' },
						{ rusWord: 'бумага', engWord: 'paper' },
					],
				},
				{
					rusSentence: 'Том позвонил маме и сообщил радостную новость.',
					engSentences: [
						{
							engSentences: ['Tom phoned his mummy and told her the good news.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мы видели его!',
					engSentences: [{ engSentences: ['We saw him!'], isCorrect: true }],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Господин президент правильно сказал — это их выборы, не наши.',
					engSentences: [
						{
							engSentences: ['Mr President rightly said it was their elections and not ours.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
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
					rusSentence: 'Мы были молоды когда я первой увидела тебя.',
					engSentences: [
						{
							engSentences: ['We were both young when I first saw you.'],
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
					rusSentence: 'Я всегда уважаю её мнение, даже если оно отличается от моего.',
					engSentences: [
						{
							engSentences: ['I always respected her opinion even if it differed from mine.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Если я не нравлюсь одной девушке, я найду еще одну.',
					engSentences: [
						{
							engSentences: ['If one girl doesn\'t like me, I\'ll find another girl.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
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

								children: [
									{
										type: 'text',

										text: 'Вспомните какие типы местоимений вы уже знаете и в каких случаях используются.',
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

// export default personalPronounsAsObject
