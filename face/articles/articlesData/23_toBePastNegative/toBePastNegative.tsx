import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const toBePastNegative: ArticleType.Art = {
	meta: {
		number: 0,
		slug: 'to-be-past-negative',
		name: 'To be в прошедшем в отрицании',
		description: 'Изучите как глагол be используется в отрицании в прошедшем.',
		keywords: 'Перевод, английский, русский, глагол, be, was, were, отрицательное предложение',
	},
	content: [
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Отрицание в прошедшем времени.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [{ type: 'text', text: 'Я не был напуган.' }],
				},
				{
					eng: [
						{ type: 'text', text: 'I ' },
						{ type: 'text', color: 'blue', text: 'was not' },
						{ type: 'text', text: ' afraid.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [{ type: 'text', text: 'Вы не были милым.' }],
				},
				{
					eng: [
						{ type: 'text', text: 'You ' },
						{ type: 'text', color: 'blue', text: 'were not' },
						{ type: 'text', text: ' cute.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [{ type: 'text', text: 'Она не была красивой.' }],
				},
				{
					eng: [
						{ type: 'text', text: 'She ' },
						{ type: 'text', color: 'blue', text: 'was not' },
						{ type: 'text', text: ' beautiful.' },
					],
				},
			],
		},
	],
}

export default toBePastNegative
