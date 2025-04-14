import ArticleType from '../../articleType'
import exercises_1 from './exercises-1'

const presentSimplePositive1: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'present-simple-positive-1',
		caption: 'Глава 1',
		articleName: 'Present Simple в утверждении (часть 1)',
		articleDescription:
			'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений первого и второго лица.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Present Simple — это грамматическое время обозначающее повседневные и повторяющиеся действия. Я сейчас не буду вдаваться в подробности потому что на данном этапе это не имеет смысла. Про это время лучше рассказать в сравнении с Present Progressive. Это будет в одной из будущих глав. Сейчас просто запомните, что Present Simple строится так же как предложение в настоящем времени на русском языке.',
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
			rus: [{ type: 'text', text: 'Я изучаю английский.' }],
			eng: [{ type: 'text', text: 'I learn English.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Ты ешь вишню.' }],
			eng: [{ type: 'text', text: 'You eat cherry.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мы любим зиму.' }],
			eng: [{ type: 'text', text: 'We love winter.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они готовят ужин вместе.' }],
			eng: [{ type: 'text', text: 'They cook dinner together.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Предложение, отмеченное пунктирной линией, имеет транскрипцию и кнопку воспроизведения для прослушивания. Попробуйте нажать и послушать как оно звучит:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я чувствую себя счастливым.' }],
			eng: [{ type: 'text', text: 'I feel happy.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Ты читаешь книги.' }],
			eng: [{ type: 'text', text: 'You read books.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мы работаем полный рабочий день.' }],
			eng: [{ type: 'text', text: 'We work full-time.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они носят костюмы.' }],
			eng: [{ type: 'text', text: 'They wear suits.' }],
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
	],
}

export default presentSimplePositive1
