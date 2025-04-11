import ArticleType from '../../articleType'

const strikeDo: ArticleType.Art = {
	meta: {
		number: 18,
		slug: 'strike-do',
		caption: 'Глава 16',
		articleName: 'Смысловой глагол do',
		articleDescription:
			'Рассмотрим как строить предложения где глагол do находится в роли смыслового, а не всмогательного.',
		isPaid: false,
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Смысловой глагол' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Любой вспомогательный глагол может быть в роли смыслового. Глагол ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'do' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' в качестве смыслового обозначает глагол «делать».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я делаю это всегда.' },

				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' it always.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я делаю это всегда?' },

				{ type: 'text', color: 'black', text: 'Do I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' it always?' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', text: 'Глагол ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'do' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' в начале вспомогательный и никак не переводится, а после местоимения ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'I' },
				{ type: 'text', color: 'gray', text: ' смысловой.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', text: 'Ещё пример:' }],
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
					text: 'Я делаю домашнюю работу.',
				},

				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' my homework.' },
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
					text: 'Я делаю домашнюю работу?',
				},

				{ type: 'text', color: 'black', text: 'Do I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' my homework?' },
			],
		},
		{
			type: 'exercises',
			id: 0,
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
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Глагол do перед другим смысловым глаголом подчёркивает и усиливает действие. На русский язык переводится разными оборотами.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Я ' },
				{ type: 'text', color: 'blue', text: 'действительно' },
				{ type: 'text', color: 'black', text: ' тебя люблю!' },

				{ type: 'text', color: 'black', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' love you!' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Они ' },
				{ type: 'text', color: 'blue', text: 'на самом деле' },
				{ type: 'text', color: 'black', text: ' знают это!' },

				{ type: 'text', color: 'black', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', color: 'black', text: ' know it.' },
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
					text: 'В утвердительных предложениях в Simple только один смысловой глагол может иметь грамматическую нагрузку. И она падает на do. Следующий за ним смысловой глагол стоит в инфинитивной форме. Поэтому после подлежащего в третьем лице do становится does, а believe не изменяется.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Ева ' },
				{ type: 'text', color: 'blue', text: 'всё же' },
				{ type: 'text', color: 'black', text: ' верит ему.' },

				{ type: 'text', color: 'black', text: 'Eva ' },
				{ type: 'text', color: 'blue', text: 'does' },
				{ type: 'text', color: 'black', text: ' believe him.' },
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
					text: 'В прошедшем времени на do падает грамматическая нагрузка времени поэтому превращается в did. А следующий смысловой глагол по-прежнему и инфинитивной форме.',
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
					text: 'Грузчик действительно уронил телевизор.',
				},

				{ type: 'text', color: 'black', text: 'The loader ' },
				{ type: 'text', color: 'blue', text: 'did' },
				{ type: 'text', color: 'black', text: ' drop the TV.' },
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
					text: 'В русском предложении усилительные конструкции «действительно/на самом деле/всё же» никак не показывают время потому что это не глаголы. Но в английском do является смысловым глаголом. Поэтому обязан показывать время совершения действия в утверждении.',
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
					text: 'В вопросительных предложениях вместо do используют really.',
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
					text: 'Он действительно задал вопрос?',
				},

				{ type: 'text', color: 'black', text: 'Did he ' },
				{ type: 'text', color: 'blue', text: 'really' },
				{ type: 'text', color: 'black', text: ' ask a question?' },
			],
		},
		{ type: 'exercises', id: 1, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Сокращённая форма вспомогательного do' },
	],
}

export default strikeDo
