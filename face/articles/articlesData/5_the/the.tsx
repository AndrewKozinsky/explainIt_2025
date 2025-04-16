import ArticleType from '../../articleTypes/articleType'

const the: ArticleType.Art = {
	meta: {
		number: 5,
		slug: 'the',
		caption: 'Глава 5',
		articleName: 'Определённый артикль the',
		articleDescription:
			'Определённый артикль the используется перед сущностями известными собеседнику из контекста. ',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Иногда the употребляется в отношении существительного, которые ещё не появлялось в контексте, но может быть понятно слушателю. Например:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я пойду в обувной магазин.' }],
			eng: [{ type: 'text', text: 'I will go to the shoe shop.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'По артиклю the собеседник должен понять о каком магазине идёт речь. Может это магазин, в который говорящий ходит всегда или ближайший обувной магазин. Вообщем собеседник должен понять о чём идёт речь. Если бы был использован неопределённый артикль, то фраза был обозначала любой магазин. Говорящий пока сам не знает в какой магазин пойдёт. Просто в любой.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я пойду в обувной магазин.' }],
			eng: [{ type: 'text', text: 'I will go to a shoe shop.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Одно и то же предложение на русском переводится разными способами на английский потому что для англоговорящих важно знать о каком предмете идёт речь: определённом или не определённом.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Другой пример:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я иду к врачу.' }],
			eng: [{ type: 'text', text: 'I’m going to the doctor.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Хотя я не сказал, какого врача, понятно, что речь о моём враче / обычной практике идти к врачу.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он в банке.' }],
			eng: [{ type: 'text', text: 'He’s at the bank.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Не важно, в каком банке именно — понятно, что он в своём обычном банке.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Она открыла окно чтобы получить немного свежего воздуха.' }],
			eng: [{ type: 'text', text: 'She opened the window to get some fresh air.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Обычно мы обедаем в ресторане недалеко от нашего офиса.' }],
			eng: [{ type: 'text', text: 'We usually have lunch at the restaurant near our office.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'С точки зрения русского языка такое уточнение избыточно. Но в английском языке есть тенденция ставить перед существительными уточняющие слова. Это не только неопределённые артикли, но и другие определяющие слова о которых будет сказано в других главах. Такие определяющие слова поясняют, что дальше идёт существительное. Возьму такой пример:',
				},
			],
		},
	],
}

export default the
