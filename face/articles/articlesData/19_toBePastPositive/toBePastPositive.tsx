import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const toBePastPositive: ArticleType.Art = {
	meta: {
		number: 0,
		slug: 'to-be-past-positive',
		name: 'To be в прошедшем в утверждении',
		description: 'Изучите как глагол be используется в прошедшем времени.',
		keywords: 'Перевод, предложение, английский, русский, глагол, be, was, were',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Чтобы сделать предложение с глаголом ',
				},
				{
					type: 'text',
					text: 'be',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в настоящем времени его ставят в форму настоящего времени в зависимости от подлежащего:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я невероятно счастлив.' }] },
				{ eng: [
						{ type: 'text', text: 'I ' },
						{ type: 'text', color: 'blue', text: 'am' },
						{ type: 'text', text: ' incredibly happy.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Горы всегда величественны.' }] },
				{ eng: [
						{ type: 'text', text: 'Mountains ' },
						{ type: 'text', color: 'blue', text: 'are' },
						{ type: 'text', text: ' always majestic.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он сумасшедший учёный.' }] },
				{ eng: [
						{ type: 'text', text: 'He ' },
						{ type: 'text', color: 'blue', text: 'is' },
						{ type: 'text', text: ' a crazy scientist.' },
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'По такому же принципу делается предложение с ',
				},
				{
					type: 'text',
					text: 'be',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в прошедшем времени. Он будет иметь форму ',
				},
				{
					type: 'text',
					text: 'was',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' или ',
				},
				{
					type: 'text',
					text: 'were',
					color: 'blue',
				},
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.ToBePresentAndPast.src,
			alt: imageMapper.tables.ToBePresentAndPast.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В русском языке глагол «',
				},
				{
					type: 'text',
					text: 'есть',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» уже явно присутствует в прошедшем времени в виде формы «',
				},
				{
					type: 'text',
					text: 'был',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '/',
				},
				{
					type: 'text',
					text: 'была',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '/',
				},
				{
					type: 'text',
					text: 'было',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '/',
				},
				{
					type: 'text',
					text: 'были',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '».',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Я ' },
						{ type: 'text', color: 'blue', text: 'был' },
						{ type: 'text', text: ' космонавтом.' },
					] },
				{ eng: [
						{ type: 'text', text: 'I ' },
						{ type: 'text', color: 'blue', text: 'was' },
						{ type: 'text', text: ' a spaceman.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Они ' },
						{ type: 'text', color: 'blue', text: 'были' },
						{ type: 'text', text: ' клоунами.' },
					] },
				{ eng: [
						{ type: 'text', text: 'They ' },
						{ type: 'text', color: 'blue', text: 'were' },
						{ type: 'text', text: ' clowns.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Это ' },
						{ type: 'text', color: 'blue', text: 'было' },
						{ type: 'text', text: ' странным решением.' },
					] },
				{ eng: [
						{ type: 'text', text: 'It ' },
						{ type: 'text', color: 'blue', text: 'was' },
						{ type: 'text', text: ' a strange decision.' },
					] },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					children: [
						{ type: 'text', color: 'blue', text: 'Was' },
						{
							type: 'text',
							text: ' ставится перед подлежащим единственного числа, а ',
						},
						{ type: 'text', color: 'blue', text: 'were' },
						{
							type: 'text',
							text: ' множественного. Как и в русском для единственного говорим «',
						},
						{
							type: 'text',
							text: 'был',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '», а для множественного «',
						},
						{
							type: 'text',
							text: 'были',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '». Даже по количеству букв слова совпадают.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте перевести предложения в прошедшем времени.',
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
					text: 'Смешанная практика. Переведите предложения с ',
				},
				{
					type: 'text',
					text: 'be',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в настоящем и прошедшем времени.',
				},
			],
		},
		exercises_2,
	],
}

export default toBePastPositive
