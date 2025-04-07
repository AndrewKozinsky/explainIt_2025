import ArticleType from '../../articleType'

const strikeDo: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
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
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я делаю это всегда.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' it always.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я делаю это всегда?' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Do I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' it always?' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Глагол ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'do' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' в начале вспомогательный и никак не переводится, а после местоимения ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'I' },
				{ type: 'text', color: 'gray', weight: 'normal', text: ' смысловой.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Ещё пример:' }],
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
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' my homework.' },
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
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Do I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' my homework?' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Я принёс вещи вчера.',
					engSentences: [
						{ engSentences: ['I brought things yesterday.'], isCorrect: true },
					],
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
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'действительно' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' тебя люблю!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' love you!' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Они ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'на самом деле' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' знают это!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'They ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'do' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' know it.' },
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
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ева ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'всё же' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' верит ему.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Eva ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'does' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' believe him.' },
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
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'The loader ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'did' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' drop the TV.' },
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
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Did he ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'really' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ask a question?' },
			],
		},
		{ type: 'exercises', id: 1, exercises: [], offset: true },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Сокращённая форма вспомогательного do' },
	],
}

export default strikeDo
