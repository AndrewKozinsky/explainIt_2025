import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const pastSimpleQuestion: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'past-simple-question',
		name: 'Past Simple в вопросе',
		description: 'Научимся задавать вопросы про действия в прошедшем времени.',
		keywords: 'Past Simple, паст симпл, вопрос',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'По принципу построения вопроса в настоящем времени построем вопросительное из утвердительного в прошедшем времени.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PastSimplePositive.src,
			alt: imageMapper.schemas.PastSimplePositive.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Поставлю вспомогательный глагол do перед подлежащим.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PastSimpleQuestion_1.src,
			alt: imageMapper.schemas.PastSimpleQuestion_1.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'И перенесу прошедшее время из смыслового глагола на вспомогательный. Do — это неправильный глагол. Поэтому в форме прошедшего времени выглядит не doed, а имеет собственную форму did. Смысловой глагол лишившись формы прошедшего времени стал в инфинитивную форму.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PastSimpleQuestion_2.src,
			alt: imageMapper.schemas.PastSimpleQuestion_2.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Схема образования утвердительного и вопросительного предложения в Past Simple:',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PastSimplePositiveAndQuestion.src,
			alt: imageMapper.tables.PastSimplePositiveAndQuestion.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Примеры:' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Ты помогал своим родителям?',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'Did you help your parents?',
						},
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он работал здесь?' }] },
				{ eng: [{ type: 'text', text: 'Did he work here?' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Попробуйте на практике:' }],
		},
		exercises_1,
	],
}

export default pastSimpleQuestion
