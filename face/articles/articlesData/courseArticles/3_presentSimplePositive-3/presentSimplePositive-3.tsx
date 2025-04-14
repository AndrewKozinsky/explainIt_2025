import ArticleType from '../../articleType'
import exercises_2 from './exercises-2'
import exercises_1 from './exercises-1'

const presentSimplePositive3: ArticleType.Art = {
	meta: {
		number: 3,
		slug: 'present-simple-positive-3',
		caption: 'Глава 3',
		articleName: 'Present Simple в утверждении (часть 3)',
		articleDescription: 'Смешанная практика по времени Present Simple и ещё узнаем как его использовать с именами.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Подлежащее — это лицо выполняющее действие. В предыдущих главах подлежащее всегда было местоимением:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Мы', color: 'blue' },
				{ type: 'text', text: ' тренируемся вместе.' },
			],
			eng: [
				{ type: 'text', text: 'We', color: 'blue' },
				{ type: 'text', text: ' train together.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Он', color: 'blue' },
				{ type: 'text', text: ' носит костюмы.' },
			],
			eng: [
				{ type: 'text', text: 'He', color: 'blue' },
				{ type: 'text', text: ' wears suits.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Подлежащим может быть не только местоимение, но и существительное или имя. Чтобы понять требуется ли к глаголу добавлять -s/-es нужно мысленно заменить подлежащее на подходящее местоимение. Например:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Подлежащее «Совы» можно заменить на местоимение they потому что множественное число, это второе лицо. Поэтому к глаголу не добавляется окончание -s:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Совы', color: 'blue' },
				{ type: 'text', text: '  летают по ночам.' },
			],
			eng: [
				{ type: 'text', text: 'Owls', color: 'blue' },
				{ type: 'text', text: ' fly at night.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Подлежащее «Ваня» можно заменить на местоимение he, это третье лицо. Поэтому к глаголу добавляется окончание -s:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Ваня', color: 'blue' },
				{ type: 'text', text: ' спит после обеда.' },
			],
			eng: [
				{ type: 'text', text: 'Vanya', color: 'blue' },
				{ type: 'text', text: '  sleeps after dinner.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если подлежащее — неисчисляемое существительное, то его можно заменить местоимением «это». Это третье лицо. Поэтому к глаголу добавляется окончание -s:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Эти деньги', color: 'blue' },
				{ type: 'text', text: ' принадлежат мне.' },
			],
			eng: [
				{ type: 'text', text: 'This money', color: 'blue' },
				{ type: 'text', text: '  belongs to me.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Подлежащее может состоять из нескольких действующих лиц. Тогда оно заменяется на местоимение they. Это второе лицо. Поэтому добавлять -s к глаголу не требуется:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Бернард и Эрик', color: 'blue' },
				{ type: 'text', text: ' коллекционируют марки.' },
			],
			eng: [
				{ type: 'text', text: 'Bernard and Eric', color: 'blue' },
				{ type: 'text', text: ' collect stamps.' },
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
		exercises_2,
	],
}

export default presentSimplePositive3
