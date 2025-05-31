import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const verbAfterVerb: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'verb-after-verb',
		name: 'Глагол после глагола',
		description: 'Изучите как поставить другой глагол после глагола.',
		keywords: 'Перевод, английский, русский, глагол, be, was, were, отрицательное предложение',
	},
	content: [
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он хотел знать, где я был вчера вечером.' }] },
				{ eng: [{ type: 'text', text: 'He wanted to know where I was last night.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я здесь, чтобы расследовать ограбление.' }] },
				{ eng: [{ type: 'text', text: 'I am here to investigate a robbery.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Ей нравится фотографировать, и иногда снимки получаются очень удачными.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'She likes taking photos and sometimes they are very good.' }] },
			],
		},
	],
}

export default verbAfterVerb
