import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const toBePresentQuestion: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'to-be-present-question',
		name: 'To be в вопросе',
		description: 'Посмотрим как составить вопросительное предложение в to be.',
		keywords: 'to be, вопросы с to be, am is are, презент симпл, вопрос в настоящем времени, вопрос с be',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В вопросе во времени Present Simple требовалось перед подлежащим поставить вспомогательный глагол ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' или ',
				},
				{
					type: 'text',
					text: 'does',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. В конструкции с глаголом ',
				},
				{
					type: 'text',
					text: 'be',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' проще: его (в настоящем времени это ',
				},
				{
					type: 'text',
					text: 'am',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'are',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'is',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ') ставят перед подлежащим.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-35530',
			cells: [
				{
					children: [
						{
							type: 'image',
							src: imageMapper.schemas.ToBePresentPositive.src,
							alt: imageMapper.schemas.ToBePresentPositive.alt,
						},
					],
				},
				{
					children: [
						{
							type: 'image',
							src: imageMapper.schemas.ToBePresentQuestion.src,
							alt: imageMapper.schemas.ToBePresentQuestion.alt,
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
					text: 'Давайте сравним как отличаются утвердительные и вопросительные предложения между собой.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-35531',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я напуган.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'I ' },
								{ type: 'text', text: 'am', color: 'blue' },
								{ type: 'text', text: ' afraid.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Ты совсем один.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'You ' },
								{ type: 'text', text: 'are', color: 'blue' },
								{ type: 'text', text: 'are completely alone.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Сегодня пятница.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Today ' },
								{ type: 'text', text: 'is', color: 'blue' },
								{ type: 'text', text: ' Friday.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я напуган?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Am', color: 'blue' },
								{ type: 'text', text: ' I afraid?' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Ты совсем один?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Are', color: 'blue' },
								{ type: 'text', text: ' you completely alone?' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Сегодня пятница?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Is', color: 'blue' },
								{ type: 'text', text: ' today Friday?' },
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Другие примеры:' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Я в другой стране?',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'Am I in another country?' }] },
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
							text: 'С тобой всё в порядке?',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'Are you alright?' }] },
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
							text: 'Это эффективно или нет?',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'Is it effective or not?' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Теперь ваша очередь:' }],
		},
		exercises_1,
	],
}

export default toBePresentQuestion
