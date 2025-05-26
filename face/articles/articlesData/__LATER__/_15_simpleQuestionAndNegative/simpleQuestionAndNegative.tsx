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
				{ type: 'text',   text: 'Он работает здесь?' },
				{ type: 'text',   text: 'Does he work here?' },
			],
		},
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
