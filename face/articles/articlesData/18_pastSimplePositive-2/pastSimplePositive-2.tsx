import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const pastSimplePositive2: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'past-simple-positive-2',
		name: 'Past Simple в утверждении (часть 2)',
		description:
			'Изучим как составлять предложения в грамматическом времени Past Simple для неправильных глаголов.',
		keywords: 'Past Simple, паст симпл, утверждение, правильные глаголы',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В предыдущем уроке вы научились делать предложения в прошедшем времени через добавление к глаголу окончания ',
				},
				{ type: 'text', color: 'blue', text: 'ed' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Этот курс помог мне.' }],
			eng: [
				{ type: 'text', text: 'This course help' },
				{ type: 'text', text: 'ed', color: 'blue' },
				{ type: 'text', text: ' me.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'В настоящем времени — help, для прошедшего к help добавляется ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'ed' },
				{ type: 'text', color: 'gray', text: ' — help' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'ed' },
				{ type: 'text', color: 'gray', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они приехали домой.' }],
			eng: [
				{ type: 'text', text: 'They arriv' },
				{ type: 'text', text: 'ed', color: 'blue' },
				{ type: 'text', text: ' home.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'В настоящем времени — arrive, для прошедшего к arrive добавляется ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'ed' },
				{ type: 'text', color: 'gray', text: ' — arriv' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'ed' },
				{ type: 'text', color: 'gray', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{ type: 'text', text: 'В английском языке глаголы разделяются на ' },
				{ type: 'text', weight: 'bold', text: 'правильные' },
				{ type: 'text', text: ' и ' },
				{ type: 'text', weight: 'bold', text: 'неправильные. ' },
				{
					type: 'text',
					text: 'Правильные — это те, которым нужно добавлять ed для образования прошедшего времени. Это большая часть всех глаголов. Но есть около 200 глаголов, которые этому правилу не соответствуют. Поэтому называются неправильными. У них собственная форма прошедшего времени, которую нужно запомнить. Эти глаголы не многочисленны, но являются самыми часто используемыми.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-3784',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Правильные глаголы' },
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'У таких глаголов прошедшее время образуется по правилу добавления окончание -',
								},
								{ type: 'text', color: 'blue', text: 'ed' },
								{
									type: 'text',
									text: ' к инфинитивной форме.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'работать — работал',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'work — work',
								},
								{ type: 'text', color: 'blue', text: 'ed' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'начать — начал',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'start — start',
								},
								{ type: 'text', color: 'blue', text: 'ed' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'ждать — ждал',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'wait — wait',
								},
								{ type: 'text', color: 'blue', text: 'ed' },
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Неправильные глаголы' },
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Имеют собственную форму прошедшего времени не подчиняющейся формальному правилу с ',
								},
								{ type: 'text', color: 'blue', text: 'ed' },
								{
									type: 'text',
									text: '.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'делать — делал',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'make — made',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', text: 'Не ' },
								{ type: 'text', color: 'error', text: 'maked' },
								{ type: 'text', color: 'gray', text: ', а ' },
								{ type: 'text', color: 'blue', text: 'made' },
								{
									type: 'text',
									color: 'gray',
									text: '. Нужно запомнить.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'пить — выпил',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'drink — drank',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', text: 'Не ' },
								{ type: 'text', color: 'error', text: 'drinked' },
								{ type: 'text', color: 'gray', text: ', а ' },
								{ type: 'text', color: 'blue', text: 'drank' },
								{
									type: 'text',
									color: 'gray',
									text: '. Нужно запомнить.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'есть — ел',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'eat — ate',
								},
							],
						},
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
					text: 'Примеры:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я понял этот вопрос.' }],
			eng: [
				{
					type: 'text',
					text: 'I understood this question.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'Understand' },
				{
					type: 'text',
					color: 'gray',
					text: ' (понимать) — неправильный глагол. В прошедшем времени будет не ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'understanded' },
				{ type: 'text', color: 'gray', text: ', а ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'understood' },
				{ type: 'text', color: 'gray', text: '. Это нужно запомнить.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он дал мне ключ.' }],
			eng: [{ type: 'text', text: 'He gave me a key.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'Give' },
				{
					type: 'text',
					color: 'gray',
					text: ' (давать) — неправильный глагол. В прошедшем времени будет не ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'gived' },
				{ type: 'text', color: 'gray', text: ', а ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'gave' },
				{ type: 'text', color: 'gray', text: '. Это нужно запомнить.' },
			],
		},

		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Неправильные глаголы можно найти в таблице неправильных глаголов в интернете. А ещё формы для настоящего и прошедшего времени указаны в упражнениях.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Выполните упражнение с неправильными глаголами:',
				},
			],
		},
		exercises_1,
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: 'Очень давно в английском многие глаголы имели свои формы прошедшего времени. Но постепенно стали подчиняться формальному правилу -',
						},
						{ type: 'text', weight: 'bold', text: 'ed' },
						{
							type: 'text',
							text: '. Но некоторые из них сохранили своё наследие до сегодняшнего дня.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Во втором упражнении правильные и неправильные глаголы перемешаны.',
				},
			],
		},
		exercises_2,
	],
}

export default pastSimplePositive2
