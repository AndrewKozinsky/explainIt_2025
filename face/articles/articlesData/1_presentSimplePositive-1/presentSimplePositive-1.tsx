import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const presentSimplePositive1: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'present-simple-positive-1',
		name: 'Present Simple в утверждении (часть 1)',
		description:
			'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений первого и второго лица.',
		keywords: 'Present Simple, презент симпл, утверждение, местоимение, первое лицо, второе лицо',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Present Simple — это грамматическое время обозначающее действия в настоящий момент. Это пока всё, что вам требуется знать на данном этапе. Про это время в деталях будет рассказано в сравнении с Present Progressive. Это будет в одной из будущих глав. Сейчас просто запомните, что Present Simple строится так же как предложение в настоящем времени на русском языке. Другими словами просто заменяете слова на русском языке английскими.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Несколько примеров:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я изучаю английский.' }] },
				{ eng: [{ type: 'text', text: 'I learn English.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Ты ешь вишню.' }] },
				{ eng: [{ type: 'text', text: 'You eat cherry.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Мы любим зиму.' }] },
				{ eng: [{ type: 'text', text: 'We love winter.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Они готовят ужин вместе.' }] },
				{ eng: [{ type: 'text', text: 'They cook dinner together.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Предложение, отмеченное пунктирной линией, имеет транскрипцию. Нажмите и посмотрите:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я работаю каждый день.' }] },
				{ eng: [{ type: 'text', text: 'I work every day.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Ты читаешь книги.' }] },
				{ eng: [{ type: 'text', text: 'You read books.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Мы работаем полный рабочий день.' }] },
				{ eng: [{ type: 'text', text: 'We work full-time.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Они носят костюмы.' }] },
				{ eng: [{ type: 'text', text: 'They wear suits.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте самостоятельно перевести несколько предложений:',
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
					text: 'Предложения посложнее:',
				},
			],
		},
		exercises_2,
	],
}

export default presentSimplePositive1
