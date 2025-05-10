import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const presentSimplePositive2: ArticleType.Art = {
	meta: {
		number: 2,
		slug: 'present-simple-positive-2',
		name: 'Present Simple в утверждении (часть 2)',
		description:
			'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений третьего лица.',
		keywords: 'Present Simple, презент симпл, местоимение 3 лица, утверждение',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В прошлом уроке разбиралось как строить предложения в Present Simple для местоимений первого и второго лица:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Я', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(1 лицо)', color: 'gray' },
				{ type: 'text', text: ' хочу больше денег.' },
			],
			eng: [
				{ type: 'text', text: 'I', color: 'blue' },
				{ type: 'text', text: ' want more money.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Ты', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(2 лицо)', color: 'gray' },
				{ type: 'text', text: ' видишь траву.' },
			],
			eng: [
				{ type: 'text', text: 'You', color: 'blue' },
				{ type: 'text', text: ' see grass.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Мы', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(2 лицо)', color: 'gray' },
				{ type: 'text', text: ' показываем плохие результаты.' },
			],
			eng: [
				{ type: 'text', text: 'We', color: 'blue' },
				{ type: 'text', text: ' show bad results.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Они', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(2 лицо)', color: 'gray' },
				{ type: 'text', text: ' показывают фокусы.' },
			],
			eng: [
				{ type: 'text', text: 'They', color: 'blue' },
				{ type: 'text', text: ' perform magic tricks.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В английском переводе используется голый глагол как в словаре: want, see, show, perform.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но после местоимений he, she, it к глаголу добавляется окончание ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
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
			rus: [
				{ type: 'text', text: 'Она', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(3 лицо)', color: 'gray' },
				{ type: 'text', text: ' хочет больше денег.' },
			],
			eng: [
				{ type: 'text', text: 'She', color: 'blue' },
				{ type: 'text', text: ' want' },
				{ type: 'text', text: 's', color: 'gold' },
				{ type: 'text', text: ' more money.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Он', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(3 лицо)', color: 'gray' },
				{ type: 'text', text: ' видит траву.' },
			],
			eng: [
				{ type: 'text', text: 'He', color: 'blue' },
				{ type: 'text', text: ' see' },
				{ type: 'text', text: 's', color: 'gold' },
				{ type: 'text', text: ' grass.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Это', color: 'blue' },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: '(3 лицо)', color: 'gray' },
				{ type: 'text', text: ' показывает плохие результаты.' },
			],
			eng: [
				{ type: 'text', text: 'It', color: 'blue' },
				{ type: 'text', text: ' show' },
				{ type: 'text', text: 's', color: 'gold' },
				{ type: 'text', text: ' bad results.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте использовать новое знание для перевода предложений:',
				},
			],
		},
		exercises_1,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если к подлежащему относится несколько глаголов, то у всех глаголов будет окончание ',
				},
				{
					type: 'text',
					text: 's',
					color: 'blue',
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
			rus: [{ type: 'text', text: 'Она путешествует, потому что ей это нравится.' }],
			eng: [
				{ type: 'text', text: 'She travel' },
				{ type: 'text', text: 's', color: 'blue' },
				{ type: 'text', text: ' because she like' },
				{ type: 'text', text: 's', color: 'blue' },
				{ type: 'text', text: ' it.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если глагол заканчивается на свистящий или щипящий звук (',
				},
				{
					type: 'text',
					text: 'ss',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'sh',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'ch',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'x',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', или ',
				},
				{
					type: 'text',
					text: 'o',
					color: 'blue',
				},
				{
					type: 'text',
					text: '), то вместо ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' ставьте ',
				},
				{
					type: 'text',
					text: 'es',
					color: 'gold',
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
			rus: [{ type: 'text', text: 'Он смотрит телевизор только иногда.' }],
			eng: [
				{ type: 'text', text: 'He wat' },
				{ type: 'text', text: 'ch', color: 'blue' },
				{ type: 'text', text: 'es', color: 'gold' },
				{ type: 'text', text: ' TV only sometimes.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Она делает это каждый день.' }],
			eng: [
				{ type: 'text', text: 'She d' },
				{ type: 'text', text: 'o', color: 'blue' },
				{ type: 'text', text: 'es', color: 'gold' },
				{ type: 'text', text: ' it every day.' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'Если глагол заканчивается на ',
						},
						{
							type: 'text',
							text: 'y',
							color: 'blue',
						},
						{
							type: 'text',
							text: ', то ',
						},
						{
							type: 'text',
							text: 'y',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' меняется на ',
						},
						{
							type: 'text',
							text: 'ies',
							color: 'gold',
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
					rus: [{ type: 'text', text: 'Он изучает экономику.' }],
					eng: [{ type: 'text', text: 'He studies economics.' }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Окончание ',
				},
				{
					type: 'text',
					text: 'es',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' добавляется для благозвучности потому что если добавить ещё одну ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' в набор ',
				},
				{
					type: 'text',
					text: 'ss',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'sh',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'ch',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'x',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' будет сложно проговорить. Поэтому добавляют промежуточную ',
				},
				{
					type: 'text',
					text: 'e',
					color: 'gold',
				},
				{
					type: 'text',
					text: '. Даже не пытайтесь заучить окончания таких слов. Это приходит с практикой и после этого никаких проблем с простановкой правильных окончаний не возникает. Тем не менее попробуйте перевести следующие предложения:',
				},
			],
		},
		exercises_2,
	],
}

export default presentSimplePositive2
