import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const toBePastQuestion: ArticleType.Art = {
	meta: {
		number: 0,
		slug: 'to-be-past-question',
		name: 'To be в прошедшем в вопросе',
		description: 'Изучите как глагол be используется в вопросе про прошедшее время.',
		keywords: 'Перевод, предложение, английский, русский, глагол, be, was, were',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Сделать вопрос в предложении с be в прошедшем времени можно так же как и в настоящем: глаголу was или were поставить перед подлежащим.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я не был напуган?' }] },
				{
					eng: [
						{ type: 'text', color: 'blue', text: 'Was' },
						{ type: 'text', text: ' I afraid?' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'С тобой вчера было всё в порядке?' }] },
				{
					eng: [
						{ type: 'text', color: 'blue', text: 'Was' },
						{ type: 'text', text: ' you alright yesterday?' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Эти туфли были дорогими?' }] },
				{
					eng: [
						{ type: 'text', color: 'blue', text: 'Were' },
						{ type: 'text', text: ' these shoes expensive?' },
					],
				},
			],
		},
		exercises_1,
	],
}

export default toBePastQuestion
