// import ArticleType from '../../articleType'

/*const strikeDo: ArticleType.Art = {
	meta: {
		number: 18,
		slug: 'strike-do',
		caption: 'Глава 16',
		articleName: 'Смысловой глагол do',
		articleDescription:
			'Рассмотрим как строить предложения где глагол do находится в роли смыслового, а не всмогательного.',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Смысловой глагол' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Любой вспомогательный глагол может быть в роли смыслового. Глагол ',
				},
				{ type: 'text',  weight: 'bold', text: 'do' },
				{
					type: 'text',

					text: ' в качестве смыслового обозначает глагол «делать».',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я делаю это всегда.' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' it always.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я делаю это всегда?' },

				{ type: 'text',  text: 'Do I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' it always?' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', text: 'Глагол ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'do' },
				{
					type: 'text',
					color: 'gray',

					text: ' в начале вспомогательный и никак не переводится, а после местоимения ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'I' },
				{ type: 'text', color: 'gray', text: ' смысловой.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Ещё пример:' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Я делаю домашнюю работу.',
				},

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' my homework.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Я делаю домашнюю работу?',
				},

				{ type: 'text',  text: 'Do I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' my homework?' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Я принёс вещи вчера.',
					engSentences: [{ engSentences: ['I brought things yesterday.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Усиление высказывания' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Глагол do перед другим смысловым глаголом подчёркивает и усиливает действие. На русский язык переводится разными оборотами.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Я ' },
				{ type: 'text', color: 'blue', text: 'действительно' },
				{ type: 'text',  text: ' тебя люблю!' },

				{ type: 'text',  text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' love you!' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Они ' },
				{ type: 'text', color: 'blue', text: 'на самом деле' },
				{ type: 'text',  text: ' знают это!' },

				{ type: 'text',  text: 'They ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text',  text: ' know it.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В утвердительных предложениях в Simple только один смысловой глагол может иметь грамматическую нагрузку. И она падает на do. Следующий за ним смысловой глагол стоит в инфинитивной форме. Поэтому после подлежащего в третьем лице do становится does, а believe не изменяется.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Ева ' },
				{ type: 'text', color: 'blue', text: 'всё же' },
				{ type: 'text',  text: ' верит ему.' },

				{ type: 'text',  text: 'Eva ' },
				{ type: 'text', color: 'blue', text: 'does' },
				{ type: 'text',  text: ' believe him.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В прошедшем времени на do падает грамматическая нагрузка времени поэтому превращается в did. А следующий смысловой глагол по-прежнему и инфинитивной форме.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Грузчик действительно уронил телевизор.',
				},

				{ type: 'text',  text: 'The loader ' },
				{ type: 'text', color: 'blue', text: 'did' },
				{ type: 'text',  text: ' drop the TV.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'В русском предложении усилительные конструкции «действительно/на самом деле/всё же» никак не показывают время потому что это не глаголы. Но в английском do является смысловым глаголом. Поэтому обязан показывать время совершения действия в утверждении.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'В вопросительных предложениях вместо do используют really.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{
					type: 'text',

					text: 'Он действительно задал вопрос?',
				},

				{ type: 'text',  text: 'Did he ' },
				{ type: 'text', color: 'blue', text: 'really' },
				{ type: 'text',  text: ' ask a question?' },
			],
		},
		{ type: 'exercises', exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Сокращённая форма вспомогательного do' },
	],
}*/

// export default strikeDo
