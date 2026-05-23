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
					text: 'В прошлом уроке разбиралось как строить предложения в Present Simple. Но в примерах были только местоимения первого и второго лица:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Я', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(1 лицо)', color: 'gray' },
						{ type: 'text', text: ' хочу больше денег.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'I', color: 'blue' },
						{ type: 'text', text: ' want more money.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Ты', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(2 лицо)', color: 'gray' },
						{ type: 'text', text: ' видишь траву.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'You', color: 'blue' },
						{ type: 'text', text: ' see grass.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Мы', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(2 лицо)', color: 'gray' },
						{ type: 'text', text: ' показываем плохие результаты.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'We', color: 'blue' },
						{ type: 'text', text: ' show bad results.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Они', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(2 лицо)', color: 'gray' },
						{ type: 'text', text: ' показывают фокусы.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'They', color: 'blue' },
						{ type: 'text', text: ' perform magic tricks.' },
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
					text: 'В таких случаях в английском переводе используется голый глагол как в словаре: want, see, show, perform.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но после местоимений третьего лица ',
				},
				{
					type: 'text',
					weight: 'bold',
					text: 'he',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					weight: 'bold',
					text: 'she',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					weight: 'bold',
					text: 'it',
				},
				{
					type: 'text',
					text: ' к глаголу добавляется окончание ',
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
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Она', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(3 лицо)', color: 'gray' },
						{ type: 'text', text: ' хочет больше денег.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'She', color: 'blue' },
						{ type: 'text', text: ' want' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' more money.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Он', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(3 лицо)', color: 'gray' },
						{ type: 'text', text: ' видит траву.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'He', color: 'blue' },
						{ type: 'text', text: ' see' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' grass.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Это', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: '(3 лицо)', color: 'gray' },
						{ type: 'text', text: ' показывает плохие результаты.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'It', color: 'blue' },
						{ type: 'text', text: ' show' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' bad results.' },
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
					text: 'Попробуйте использовать новое знание для перевода предложений.',
				},
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
							text: 'Некоторые предложения в этом и последующих упражнениях можно перевести разными грамматическими временами и конструкциями. Используйте, пожалуйста, уже изученные конструкции. Другие будут рассмотрены в дальнейшем. У вас будет возможность попрактиковаться.',
						},
					],
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
			parts: [
				{ rus: [{ type: 'text', text: 'Она курит и пьёт.' }] },
				{
					eng: [
						{ type: 'text', text: 'She smoke' },
						{ type: 'text', text: 's', color: 'blue' },
						{ type: 'text', text: ' and drink' },
						{ type: 'text', text: 's', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он тренируется и работает.' }] },
				{
					eng: [
						{ type: 'text', text: 'He train' },
						{ type: 'text', text: 's', color: 'blue' },
						{ type: 'text', text: ' and work' },
						{ type: 'text', text: 's', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Некоторые глаголы заканчиваются на свистящие или шипящие звуки: ',
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
					text: ', ',
				},
				{
					type: 'text',
					text: 'o',
					color: 'blue',
				},
				{
					type: 'text',
					text: '. Добавление ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' будет трудным для произношения. Поэтому вместо  ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' добавляют ',
				},
				{
					type: 'text',
					text: 'es',
					color: 'gold',
				},
				{
					type: 'text',
					text: '. ',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он смотрит телевизор только иногда.' }] },
				{
					eng: [
						{ type: 'text', text: 'He wat' },
						{ type: 'text', text: 'ch', color: 'blue' },
						{ type: 'text', text: 'es', color: 'gold' },
						{ type: 'text', text: ' TV only sometimes.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Она делает это каждый день.' }] },
				{
					eng: [
						{ type: 'text', text: 'She d' },
						{ type: 'text', text: 'o', color: 'blue' },
						{ type: 'text', text: 'es', color: 'gold' },
						{ type: 'text', text: ' it every day.' },
					],
				},
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
					parts: [
						{ rus: [{ type: 'text', text: 'Он изучает экономику.' }] },
						{ eng: [{ type: 'text', text: 'He studies economics.' }] },
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
					text: 'Не пытайтесь заучить эти окончания. Это приходит с практикой и после этого никаких проблем с простановкой правильных окончаний не возникает. Тем не менее попробуйте перевести следующие предложения:',
				},
			],
		},
		exercises_2,
	],
}

export default presentSimplePositive2
