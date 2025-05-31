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
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я не был напуган?' }] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Was' },
						{ type: 'text', text: ' I afraid?' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'С тобой вчера было всё в порядке?' }] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Was' },
						{ type: 'text', text: ' you alright yesterday?' },
					] },
			],
		},
	],
}

export default toBePastQuestion
