// import ArticleType from '../../articleType'
// import ToBePresentPositiveScheme from './ToBePresentPositiveScheme'
// import ToBePresentQuestionScheme from './ToBePresentQuestionScheme'
// import PresentSimplePositiveScheme from './PresentSimplePositiveScheme'
// import PresentSimpleQuestionScheme_1 from './PresentSimpleQuestionScheme_1'
// import PresentSimpleQuestionScheme_2 from './PresentSimpleQuestionScheme_2'
// import PresentSimplePositiveAndQuestionTable from './PresentSimplePositiveAndQuestionTable'
// import PastSimplePositiveScheme from './PastSimplePositiveScheme'
// import PastSimpleQuestionScheme_1 from './PastSimpleQuestionScheme_1'
// import PastSimpleQuestionScheme_2 from './PastSimpleQuestionScheme_2'
// import PastSimplePositiveAndQuestionTable from './PastSimplePositiveAndQuestionTable'
// import FutureSimplePositiveScheme from './FutureSimplePositiveScheme'
// import FutureSimpleQuestionScheme from './FutureSimpleQuestionScheme'
// import ToBePresentNegativeScheme from './ToBePresentNegativeScheme'
// import PresentSimpleNegativeScheme_1 from './PresentSimpleNegativeScheme_1'
// import PresentSimpleNegativeScheme_2 from './PresentSimpleNegativeScheme_2'
// import PastSimpleFullTable from './PastSimpleFullTable'
// import PresentSimpleFullTable from './PresentSimpleFullTable'
// import FutureSimpleFullTable from './FutureSimpleFullTable'

/*const simpleQuestionAndNegative: ArticleType.Art = {
	meta: {
		number: 17,
		slug: 'simple-question-and-negative',
		caption: 'Глава 15',
		articleName: 'Вопрос и отрицание в Simple',
		articleDescription:
			'Научимся строить предложения сообщающие о действии совершаемые переодически или постоянно.',

	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Вопрос' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос в be' },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',   text: 'Чтобы предложение с ' },
				{ type: 'text', color: 'blue',  text: 'be' },
				{
					type: 'text',

					text: ' сделать вопросительным мы ставили глагол перед подлежащим.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-6610',
			cells: [
				{
					children: [{ type: 'customComponent', component: <ToBePresentPositiveScheme /> }],
				},
				{
					children: [{ type: 'customComponent', component: <ToBePresentQuestionScheme /> }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В английском языке есть два типа глаголов: ',
				},
				{ type: 'text', color: 'gold',  text: 'смысловые' },
				{ type: 'text',   text: ' и ' },
				{ type: 'text', color: 'blue',  text: 'вспомогательные' },
				{
					type: 'text',

					text: '. Смысловой несёт смысл (красить, читать). Вспомогательные не несут смысла, но участвуют в формировании вопроса.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'Глагол ' },
				{ type: 'text', color: 'blue',  text: 'be' },
				{
					type: 'text',

					text: ' одновременно и смысловой и вспомогательный: передаёт смысл бытия и с его помощью задаётся вопрос. Для этого его ставят перед подлежащим.',
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

							text: 'Есть только 3 вспомогательных глагола. Ещё несколько модальных. Все остальные смысловые.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос в Present Simple' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Но в повествовательных предложениях, построенных в Present Simple, не видно ',
				},
				{ type: 'text',  weight: 'bold', text: 'вспомогательного' },
				{
					type: 'text',

					text: ' глагола, который можно было бы также поставить перед подлежащим. В примере единственный глагол ',
				},
				{ type: 'text', color: 'blue',  text: 'likes' },
				{
					type: 'text',

					text: ' передаёт только смысл. И ещё нужно отметить, что этот глагол находится ',
				},
				{ type: 'text', color: 'blue',  text: 'в настоящем времени' },
				{
					type: 'text',

					text: '. Давайте глагол, содержащий время совершения действия, отметим синим цветом.',
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

					text: 'Если вспомогательного глагола нет, то его нужно добавить перед подлежащим. Для времён группы Simple таким глаголом будет ',
				},
				{ type: 'text', color: 'blue',  text: 'do' },
				{ type: 'text',   text: '. ' },
			],
		},
		{ type: 'customComponent', component: <PresentSimpleQuestionScheme_1 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Но это ещё не всё. На первом шаге на смысловом глаголе ',
				},
				{ type: 'text', color: 'blue',  text: 'like' },
				{
					type: 'text',

					text: ' стоит настоящее время. Но вспомогательный глагол всегда перетягивает на себя время совершения действия. Поэтому глагол ',
				},
				{ type: 'text', color: 'blue',  text: 'likes' },
				{
					type: 'text',

					text: ' становится инфинитивом ',
				},
				{ type: 'text', color: 'gold',  text: 'like' },
				{ type: 'text',   text: '. А инфинитив ' },
				{ type: 'text', color: 'gold',  text: 'do' },
				{
					type: 'text',

					text: ' становится глаголом в настоящем времени. С местоимением 3-го лица выглядит как ',
				},
				{ type: 'text', color: 'blue',  text: 'does' },
				{ type: 'text',   text: '.' },
			],
		},
		{ type: 'customComponent', component: <PresentSimpleQuestionScheme_2 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В предложениях с подлежащим 1-го и 2-го лица смысловой глагол в настоящем времени выглядит точно также как в инфинитиве. Поэтому когда время переходит на вспомогательный, то смысловой внешне никак не изменяется.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'We ' },
				{ type: 'text', color: 'blue',  text: 'like' },
				{ type: 'text',   text: ' tea.' },

				{ type: 'text',   text: '' },
				{ type: 'text', color: 'blue',  text: 'Do' },
				{ type: 'text',   text: ' we like tea?' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'В утверждении like нагружен настоящем временем, а в вопросе уже стал инфинитивом потому что время ушло к do. Но внешне никак не заметно.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',   text: 'И сам ' },
				{ type: 'text', color: 'blue',  text: 'do' },
				{
					type: 'text',

					text: ' с подлежащими 1-го и 2-го лица ничем не отличается от своей инфинитивной формы. Но тем не менее стоит в настоящем времени.',
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

							text: 'Наверное такой механизм образования вопроса выглядит страшноватым. В русском достаточно поставить знак вопроса на письме, а в разговоре сказать с вопросительной интонацией. Но такой механизм действует для всех грамматических времён и его нужно понять только один раз.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'small',
					children: [
						{
							type: 'text',

							text: 'И ещё я хочу чтобы вы понимали почему вообще слово likes превращается в like, а do в does, а не только механически подставляли слова. Даже если забудите схему ниже, то понимая логику образования вопросительного предложения сможете самостоятельно вычислить формулу.',
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

					text: 'Схема образования утвердительного и вопросительного предложения в Present Simple:',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimplePositiveAndQuestionTable /> },
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Примеры:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты помогаешь своим родителям?',
				},

				{
					type: 'text',

					text: 'Do you help your parents?',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Он работает здесь?' },

				{ type: 'text',   text: 'Does he work here?' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Ты понимаешь?',
					engSentences: [{ engSentences: ['Do you understand?'], isCorrect: true }],
					words: [{ rusWord: 'готов', engWord: 'ready' }],
				},
				{
					rusSentence: 'Я хорошо выгляжу?',
					engSentences: [{ engSentences: ['Do I look good?'], isCorrect: true }],
					words: [{ rusWord: 'готов', engWord: 'ready' }],
				},
				{
					rusSentence: 'В твоём чае есть сахар?',
					engSentences: [{ engSentences: ['Do you have sugar in your tea?'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Оля часто бегает?',
					engSentences: [{ engSentences: ['Does Olya often run?'], isCorrect: true }],
					words: [
						{ rusWord: 'часто', engWord: 'often' },
						{ rusWord: 'бегать', engWord: 'run' },
					],
				},
				{
					rusSentence: 'Ты помогаешь своим родителям?',
					engSentences: [{ engSentences: ['Do you help your parents?'], isCorrect: true }],
					words: [{ rusWord: 'многие', engWord: 'many' }],
				},
				{
					rusSentence: 'Он работает здесь?',
					engSentences: [{ engSentences: ['Does he work here? '], isCorrect: true }],
					words: [{ rusWord: 'многие', engWord: 'many' }],
				},
				{
					rusSentence: 'Тебе нравится те туфли?',
					engSentences: [{ engSentences: ['Do you like those shoes?'], isCorrect: true }],
					words: [{ rusWord: 'многие', engWord: 'many' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос в Past Simple' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'По принципу построения вопроса в настоящем времени построем вопросительное из утвердительного в прошедшем времени.',
				},
			],
		},
		{ type: 'customComponent', component: <PastSimplePositiveScheme /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Поставлю вспомогательный глагол do перед подлежащим.',
				},
			],
		},
		{ type: 'customComponent', component: <PastSimpleQuestionScheme_1 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'И перенесу прошедшее время из смыслового глагола на вспомогательный. Do — это неправильный глагол. Поэтому в форме прошедшего времени выглядит не doed, а имеет собственную форму did. Смысловой глагол лишившись формы прошедшего времени стал в инфинитивную форму.',
				},
			],
		},
		{ type: 'customComponent', component: <PastSimpleQuestionScheme_2 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Схема образования утвердительного и вопросительного предложения в Past Simple:',
				},
			],
		},
		{ type: 'customComponent', component: <PastSimplePositiveAndQuestionTable /> },
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Примеры:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты помогал своим родителям?',
				},

				{
					type: 'text',

					text: 'Did you help your parents?',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Он работал здесь?' },

				{ type: 'text',   text: 'Did he work here?' },
			],
		},
		{ type: 'exercises', id: 1, exercises: [], offset: true },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Вопрос в Future Simple' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Для создания утвердительного предложения в будущем мы использовали модальный глагол will.',
				},
			],
		},
		{ type: 'customComponent', component: <FutureSimplePositiveScheme /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Модальный глагол, как и вспомогательный, умеет полномочия образовывать вопросительные предложения. Поэтому как и ',
				},
				{ type: 'text', color: 'blue',  text: 'do' },
				{
					type: 'text',

					text: ' он перелетает из позиции ',
				},
				{ type: 'text',  weight: 'bold', text: '«после подлежащего»' },
				{ type: 'text',   text: ' в ' },
				{ type: 'text',  weight: 'bold', text: '«до подлежащего»' },
				{ type: 'text',   text: '.' },
			],
		},
		{ type: 'customComponent', component: <FutureSimpleQuestionScheme /> },
		{ type: 'exercises', id: 2, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Отрицание' },
		{
			type: 'paragraph',

			children: [
				{ type: 'text',   text: 'В предложение с ' },
				{ type: 'text',  weight: 'bold', text: 'be' },
				{
					type: 'text',

					text: ' для отрицания мы ставим ',
				},
				{ type: 'text', color: 'blue',  text: 'not' },
				{
					type: 'text',

					text: ' после вспомогательного глагола.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-2989',
			cells: [
				{
					children: [{ type: 'customComponent', component: <ToBePresentPositiveScheme /> }],
				},
				{
					children: [{ type: 'customComponent', component: <ToBePresentNegativeScheme /> }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В Present Simple всё делается по аналогии.',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimpleNegativeScheme_1 /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'И как в вопросе вспомогательный глагол перетягивает на себя настоящее время со смыслового глагола.',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimpleNegativeScheme_2 /> },
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

							text: 'У вас мог возникнуть вопрос а нужно ли при переводе точно так же делать два шага. Конечно нет. Это сделано чтобы вы понимали механизм образования вопроса и отрицания. Вы должны стремиться к полному автоматизму при переводе.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Примеры:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты не помогаешь своим родителям.',
				},

				{
					type: 'text',

					text: 'You do not help your parents.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Он не работает здесь.' },

				{ type: 'text',   text: 'He does not work here.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Отрицание в Past Simple:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты не помогал своим родителям.',
				},

				{
					type: 'text',

					text: 'You did not help your parents.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',   text: 'Он не работал здесь.' },

				{ type: 'text',   text: 'He did not work here.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Отрицание в Future Simple:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Ты не будешь помогать своим родителям.',
				},

				{
					type: 'text',

					text: 'You will not help your parents.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Он не будет работать здесь.',
				},

				{ type: 'text',   text: 'He will not work here.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В английском не приняты двойные отрицания. Поэтому русские обороты вроде «никогда не» переводите через never.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Мы никогда не ходим пешком.',
				},

				{ type: 'text',   text: 'We never walk.' },
			],
		},
		{
			type: 'exercises',
			id: 3,
			exercises: [
				{
					rusSentence: 'Он никогда не ходит без своих друзей.',
					engSentences: [{ engSentences: ['He never goes without his friends.'], isCorrect: true }],
					words: [
						{ rusWord: 'никогда не', engWord: 'never' },
						{ rusWord: 'ходить', engWord: 'go' },
						{ rusWord: 'без', engWord: 'without' },
						{ rusWord: 'друг', engWord: 'friend' },
					],
				},
				{
					note: 'Лучше переводить через отрицание.',
					rusSentence: 'Я чувствую себя неуютно в твоей комнате.',
					engSentences: [
						{
							engSentences: ['I don’t feel comfortable in your room.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Все схемы' },
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Past Simple.' }],
		},
		{ type: 'customComponent', component: <PastSimpleFullTable /> },
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Present Simple.' }],
		},
		{ type: 'customComponent', component: <PresentSimpleFullTable /> },
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',   text: 'Future Simple.' }],
		},
		{ type: 'customComponent', component: <FutureSimpleFullTable /> },
	],
}*/

// export default simpleQuestionAndNegative
