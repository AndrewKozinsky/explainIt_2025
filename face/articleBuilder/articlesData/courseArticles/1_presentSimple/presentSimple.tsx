import ArticleType from '../../articleType'
// import PersonalPronounceSubjectTable from './PersonalPronounceSubjectTable'

const presentSimple: ArticleType.Art = {
	meta: {
		number: 3,
		slug: 'present-simple-1',
		caption: 'Глава 1',
		articleName: 'Present Simple',
		articleDescription:
			'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений первого и второго лица.',
		isPaid: false,
	},
	content: [
		{
			type: 'paragraph',
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Present Simple — это грамматическое время обозначающее повседневные и повторяющиеся действия. Я сейчас не буду вдаваться в подробности потому что на данном этапе это не имеет смысла. Про это время лучше рассказать в сравнении с Present Progressive. Это будет в одной из будущих глав. Сейчас просто запомните, что Present Simple строится так же как предложение в настоящем времени на русском языке.',
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
					text: 'Несколько примеров:',
				},
			],
		},
		/*{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я изучаю английский.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I learn English.' },
			],
		},*/
		/*{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я чувствую себя счастливым.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'I feel happy.' },
			],
		},*/
		/*{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мы любим зиму.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'We love winter.' },
			],
		},*/
		/*{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Мы работаем полный рабочий день.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'We work full-time.' },
			],
		},*/
		/*{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Они носят костюмы.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'They wear suits.' },
			],
		},*/
		/*{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Они готовят ужин вместе.' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'They cook dinner together.' },
			],
		},*/
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', color: 'black', weight: 'normal', text: 'Я изучаю английский.' }],
			eng: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'I ' },
				{ type: 'text', color: 'blue', weight: 'bold', text: 'learn' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' English.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', color: 'black', weight: 'normal', text: 'Они готовят ужин вместе.' }],
			eng: [{ type: 'text', color: 'black', weight: 'normal', text: 'They cook dinner together.' }],
		},
	],
}

export default presentSimple
