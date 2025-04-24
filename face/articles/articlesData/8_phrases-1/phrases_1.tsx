import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const phrases_1: ArticleType.Art = {
	meta: {
		number: 7,
		slug: 'phrases-1',
		caption: 'Глава 8',
		articleName: 'Фразы',
		articleDescription: 'Посмотрим как строить конструкцию «играть в...» и отличия слово another от other.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Английский и русский языки имеют свои устоявшиеся фразы, идиомы, используемые предлоги. В большинстве случаев если дословно переводить с одного языка на другой, то такие фразы будут выглядеть неестественно или даже непонятно для носителей. Поэтому в таких специальных главах мы будем разбирать как строятся фразы, которые используют англоговорящие.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Играть во что-то или на музыкальном инструменте' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'На русском языке перед названием игры мы ставим предлог ',
				},
				{
					type: 'text',
					text: 'в',
					color: 'blue',
				},
				{
					type: 'text',
					text: '. В переводе предлог не нужен.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я играю в теннис.' }],
			eng: [{ type: 'text', text: 'I play tennis.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мы играем в эту игру.' }],
			eng: [{ type: 'text', text: 'We play this game.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Сёстры играют там.' }],
			eng: [{ type: 'text', text: 'The sisters play there.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если же играют на музыкальном инструменте, то перед ним всегда ставится ',
				},
				{
					type: 'text',
					text: 'the',
					color: 'blue',
				},
				{
					type: 'text',
					text: ':',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Лена играет на кларнете перед школой.' }],
			eng: [
				{ type: 'text', text: 'Lena plays the ' },
				{ type: 'text', text: 'the', color: 'blue' },
				{ type: 'text', text: ' clarinet before school.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мои бабушка и дедушка оба играют на аккордеоне.' }],
			eng: [
				{ type: 'text', text: 'My grandparents both play ' },
				{ type: 'text', text: 'the', color: 'blue' },
				{ type: 'text', text: ' accordion.' },
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Другой или другие' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Другой — another, другие — other. Многие путают эти слова поэтому несколько примеров и упражнение на перевод.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Это означает другую вещь.' }],
			eng: [{ type: 'text', text: 'It means another thing.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я посещаю другие страны и города.' }],
			eng: [{ type: 'text', text: 'I visit other countries and cities.' }],
		},
		exercises_2,
	],
}

export default phrases_1
