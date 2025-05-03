import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const toBePresentNegative: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'to-be-present-negative',
		articleName: 'To be в отрицании',
		articleDescription: 'Посмотрим как составить отрицательные предложение в to be.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Чтобы сделать отрицание для глагола ',
				},
				{ type: 'text', weight: 'bold', text: 'be' },
				{
					type: 'text',
					text: ' нужно после него поставить отрицательную частицу ',
				},
				{ type: 'text', color: 'blue', text: 'not' },
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-2915',
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
							src: imageMapper.schemas.ToBePresentNegative.src,
							alt: imageMapper.schemas.ToBePresentNegative.alt,
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
					text: 'Посмотрите как утвердительные предложения становятся вопросительными и отрицательными.',
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
							children: [{ type: 'text', text: 'Я готов.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'I ' },
								{ type: 'text', text: 'am', color: 'blue' },
								{ type: 'text', text: ' ready.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Ты уставший.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'You ' },
								{ type: 'text', text: 'are', color: 'blue' },
								{ type: 'text', text: ' tired.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Это важно.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'It ' },
								{ type: 'text', text: 'is', color: 'blue' },
								{ type: 'text', text: ' important.' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я готов?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Am', color: 'blue' },
								{ type: 'text', text: ' I ready?' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Ты уставший?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Are', color: 'blue' },
								{ type: 'text', text: ' you tired?' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Это важно?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'Is', color: 'blue' },
								{ type: 'text', text: ' it important?' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я не готов.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'I ' },
								{ type: 'text', text: 'am not', color: 'blue' },
								{ type: 'text', text: ' ready.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Ты не уставший.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'You ' },
								{ type: 'text', text: 'are not', color: 'blue' },
								{ type: 'text', text: ' tired.' },
							],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Это не важно.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', text: 'It ' },
								{ type: 'text', text: 'is not', color: 'blue' },
								{ type: 'text', text: ' important.' },
							],
						},
					],
				},
			],
		},
		exercises_1,
	],
}

export default toBePresentNegative
