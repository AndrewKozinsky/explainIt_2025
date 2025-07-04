import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'

const phrases_1: ArticleType.Art = {
	meta: {
		number: 8,
		slug: 'phrases-1',
		name: 'Фразы',
		description: 'Посмотрим как строить конструкцию «играть в...» и отличия слово another от other.',
		keywords:
			'играть в игры, играть на инструменте, презент симпла, another, other, фразы на английском, present simple',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Английский и русский языки имеют свои устоявшиеся фразы, идиомы, используемые предлоги. В большинстве случаев если дословно переводить с одного языка на другой, то такие фразы будут выглядеть неестественно или даже непонятно для носителей. Поэтому в специальных главах мы будем разбирать как строятся отдельные фразы, которые нельзя перевести правильно только зная грамматику.',
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
			parts: [
				{ rus: [{ type: 'text', text: 'Я играю в теннис.' }] },
				{ eng: [{ type: 'text', text: 'I play tennis.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Мы играем в эту игру.' }] },
				{ eng: [{ type: 'text', text: 'We play this game.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Сёстры играют там.' }] },
				{ eng: [{ type: 'text', text: 'The sisters play there.' }] },
			],
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
			parts: [
				{ rus: [{ type: 'text', text: 'Лена играет на кларнете перед школой.' }] },
				{
					eng: [
						{ type: 'text', text: 'Lena plays the ' },
						{ type: 'text', text: 'the', color: 'blue' },
						{ type: 'text', text: ' clarinet before school.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Мои бабушка и дедушка оба играют на аккордеоне.' }] },
				{
					eng: [
						{ type: 'text', text: 'My grandparents both play ' },
						{ type: 'text', text: 'the', color: 'blue' },
						{ type: 'text', text: ' accordion.' },
					],
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Другой или другие' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Другой — ',
				},
				{
					type: 'text',
					text: 'another',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', другие — ',
				},
				{
					type: 'text',
					text: 'other',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. Многие путают эти слова поэтому несколько примеров и упражнение на перевод.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это означает другую вещь.' }] },
				{ eng: [{ type: 'text', text: 'It means another thing.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я посещаю другие страны и города.' }] },
				{ eng: [{ type: 'text', text: 'I visit other countries and cities.' }] },
			],
		},
		exercises_2,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Чувствовать себя' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В английском глагол ',
				},
				{
					type: 'text',
					text: 'feel',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' уже в себе подразумевает смысл «чувствовать себя». Поэтому слово «себя» отдельно переводить не нужно.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я чувствую себя ужасно.' }] },
				{ eng: [{ type: 'text', text: 'I feel awful.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я не чувствую себя уютно в твоей комнате.' }] },
				{ eng: [{ type: 'text', text: 'I don’t feel comfortable in your room.' }] },
			],
		},
		exercises_3,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Тетрадь и ноутбук' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В русском языке закрепилось слово «ноутбук» для обозначения небольшого портативного компьютера. Но в самом английском ',
				},
				{
					type: 'text',
					text: 'notebook',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' обозначает блокнот или тетрадь. А портативный компьютер называют ',
				},
				{
					type: 'text',
					text: 'laptop',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Она пишет в тетради.' }] },
				{ eng: [{ type: 'text', text: 'She writes in the notebook.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Мери включает ноутбук каждое утро.' }] },
				{ eng: [{ type: 'text', text: 'Mary turns on a laptop every morning.' }] },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Работать кем-то' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Гектор работает репортером на 9 канале.' }] },
				{ eng: [{ type: 'text', text: 'Hector works as a reporter on Channel 9.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Так вы все еще хотите быть официантом?' }] },
				{ eng: [{ type: 'text', text: 'So do you still want to be a waiter?' }] },
			],
		},
	],
}

export default phrases_1
