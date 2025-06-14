import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_2 from './exercises-2'
import exercises_1 from './exercises-1'

const presentSimplePositive3: ArticleType.Art = {
	meta: {
		number: 3,
		slug: 'present-simple-positive-3',
		name: 'Present Simple в утверждении (часть 3)',
		description: 'Смешанная практика по времени Present Simple и ещё узнаем как его использовать с именами.',
		keywords: 'Present Simple, презент симпл, практика, утверждение, упражнения',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Посмотрим на таблицу составления утвердительного предложения. После местоимений 1-го и 2-го лица используется обычный глагол (обозначается буквой ',
				},
				{
					type: 'text',
					text: 'V',
					color: 'blue',
				},
				{
					type: 'text',
					text: '). А после 3-го лица к глаголу добавляется окончание ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' или ',
				},
				{
					type: 'text',
					text: 'es',
					color: 'gold',
				},
				{
					type: 'text',
					text: '. Вы это уже изучили в двух первых главах.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PresentSimplePositive.src,
			alt: imageMapper.tables.PresentSimplePositive.alt,
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Местоимение в данном контексте выполняют роль подлежащего — лица выполняющего действие:',
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
						{ type: 'text', text: ' тренируемся вместе.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'We', color: 'blue' },
						{ type: 'text', text: ' train together.' },
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
						{ type: 'text', text: ' носит костюмы.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'He', color: 'blue' },
						{ type: 'text', text: ' wear' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' suits.' },
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
					text: 'Подлежащим может быть не только местоимение, но и существительное или имя. Чтобы понять требуется ли к глаголу добавлять ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: '/',
				},
				{
					type: 'text',
					text: 'es',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' нужно мысленно заменить подлежащее на подходящее местоимение. Например:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Подлежащее «',
				},
				{
					type: 'text',
					text: 'совы',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» можно заменить на местоимение ',
				},
				{
					type: 'text',
					text: 'they',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' (второе лицо). Поэтому к глаголу не добавляется окончание ',
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
						{ type: 'text', text: 'Совы', color: 'blue' },
						{ type: 'text', text: '  летают по ночам.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'Owls', color: 'blue' },
						{ type: 'text', text: ' fly at night.' },
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
					text: 'Подлежащее «',
				},
				{
					type: 'text',
					text: 'Ваня',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» можно заменить на местоимение ',
				},
				{
					type: 'text',
					text: 'he',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' (третье лицо). Поэтому к глаголу добавляется окончание ',
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
						{ type: 'text', text: 'Ваня', color: 'blue' },
						{ type: 'text', text: ' спит после обеда.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'Vanya', color: 'blue' },
						{ type: 'text', text: ' ' },
						{ type: 'text', text: 'sleep' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' after dinner.' },
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
					text: 'Если подлежащее — неисчисляемое существительное, то его можно заменить местоимением ',
				},
				{
					type: 'text',
					text: 'it',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' (третье лицо). Поэтому к глаголу добавляется окончание ',
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
						{ type: 'text', text: 'Эти деньги', color: 'blue' },
						{ type: 'text', text: ' принадлежат мне.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'This money', color: 'blue' },
						{ type: 'text', text: '  belong' },
						{ type: 'text', text: 's', color: 'gold' },
						{ type: 'text', text: ' to me.' },
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
					text: 'Подлежащее может состоять из нескольких действующих лиц. Тогда оно заменяется на местоимение ',
				},
				{
					type: 'text',
					text: 'they',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' (второе лицо). Поэтому добавлять ',
				},
				{
					type: 'text',
					text: 's',
					color: 'gold',
				},
				{
					type: 'text',
					text: ' к глаголу не требуется:',
				},
			],
		},

		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Бернард и Эрик', color: 'blue' },
						{ type: 'text', text: ' коллекционируют марки.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'Bernard and Eric', color: 'blue' },
						{ type: 'text', text: ' collect stamps.' },
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
					text: 'Попробуйте перевести такие предложения:',
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
					text: 'Теперь вы знаете теоретический минимум о грамматическом времени Present Simple. Прежде чем перейти к новой теме давайте переведём предложения где нужно использовать все изученные правила.',
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
							text: 'В некоторых предложениях встречаются числа. Лучше записывать их словами — так вы эффективнее изучите числа в английском.',
						},
					],
				},
			],
		},
		exercises_2,
	],
}

export default presentSimplePositive3
