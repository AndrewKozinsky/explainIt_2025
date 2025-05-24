import ArticleType from '../../articleTypes/articleType'

const wordsOrder: ArticleType.Art = {
	meta: {
		number: 0,
		slug: 'to-be-past-positive',
		name: 'To be в прошедшем в утверждении',
		description: 'Изучите как глагол be используется в прошедшем времени.',
		keywords: 'Перевод, предложение, английский, русский, глагол, be, was, were',
	},
	content: [
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Он ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text', text: ' щенком.' },
			],
			eng: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'was' },
				{ type: 'text', text: ' a puppy.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'HОн часто бил Рэнсома, когда был пьян.' }],
			eng: [{ type: 'text', text: 'He often hit Ransome when he was drunk.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Заметьте, что хотя на русском используется местоимение «он», но в переводе на английский его нужно заменить на it (это) потому что he или she применяется только к людям. Животные и неодушевлённые предметы называются через it.',
				},
			],
		},
	],
}

export default wordsOrder
