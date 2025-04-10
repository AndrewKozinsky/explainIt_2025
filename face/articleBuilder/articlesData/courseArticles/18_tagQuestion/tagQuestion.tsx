import ArticleType from '../../articleType'

const tagQuestion: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 20,
		slug: 'tag-question',
		caption: 'Глава 18',
		articleName: 'Разделительный вопрос',
		articleDescription: 'Научимся строить предложения с вопросительным хвостиком вида «Я остроумный, не так ли?»',
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
					text: 'Разделительный вопрос — это вопрос о правильности утверждения. На русский обычно переводится как «',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'не так ли?' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '», «так ведь?», «да?». А чтобы его составить на английском нужно сделать вопрос из вспомогательного глагола использованного в главном предложении.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Он умён, не так ли?' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'He is smart, is not he?' },
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
					text: 'Главное предложение задаётся как утверждение, а следом вопрос правильно ли это оно.',
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
					text: 'В примере выше главное предложение в утвердительной форме. А придаточное в отрицательной. Но отрицание можно поставить и в главное, тогда в придаточном наоборот будет утверждение.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Он не умён, да?' },

				{ type: 'text', color: 'black', weight: 'normal', text: 'He is not smart, is he?' },
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
					text: 'Сделаю вопрос через грамматическое время Simple:',
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
					text: 'Она купила лотерейный билет, не так ведь?',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: "She bought a lottery ticket, didn't she?",
				},
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
					text: 'Главное предложение в Past Simple, поэтому вопрос будет построен в этом времени.',
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
					text: 'То же самое предложение, но вначале будет отрицание, поэтому в придаточном будет вопрос без отрицания:',
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
					text: 'Она не купила лотерейный билет, не так ли?',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'She did not bought a lottery ticket, did she?',
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
							text: 'На русском языке придаточное предложение как правило всегда в отрицании:',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [{ type: 'text', color: 'black', weight: 'normal', text: '..., не так ли' }],
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
							text: 'Но английский более строг: если главное предложение без отрицания, то в придаточном должно быть отрицание и наоборот.',
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
					text: 'В придаточном предложении как правило используется местоимение.',
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
					text: 'Карл покормит собаку, так ведь?',
				},

				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Carl will feed the dog, won’t he?',
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Он же не был водителем автобуса?',
					engSentences: [{ engSentences: ['He was not a bus driver, is he?'], isCorrect: true }],
					words: [{ rusWord: 'водитель', engWord: 'driver' }],
				},
				{
					rusSentence: '"That man isn\'t very nice, is he?" says Martin.',
					engSentences: [
						{
							engSentences: ['"That man isn\'t very nice, is he?" says Martin.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'водитель', engWord: 'driver' }],
				},
			],
			offset: true,
		},
	],
}

export default tagQuestion
