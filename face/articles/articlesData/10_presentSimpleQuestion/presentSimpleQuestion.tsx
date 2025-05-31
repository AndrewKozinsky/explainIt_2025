import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const presentSimpleQuestion: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'present-simple-question',
		name: 'Present Simple в вопросе',
		description: 'Изучим как составлять вопросительное предложение в грамматическом времени Present Simple.',
		keywords:
			'Present Simple questions, do, does, вопросы в Present Simple, вспомогательные глаголы, как задать вопрос в Present Simple, презент симпл',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В русском языке вопросительное предложение можно сделать просто поставив знак вопроса на письме, а в разговоре сказать с вопросительной интонацией. Но в английском другой механизм. Нужно один раз понять как это работает потому что вопросительные предложения в остальных временах будут строиться похожим образом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Давайте посмотрим на обычное утвердительное предложение.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimplePositiveSchemeFlat.src,
			alt: imageMapper.schemas.PresentSimplePositiveSchemeFlat.alt,
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В Present Simple глагол находится в настоящем времени. На это указывает окончание ',
				},
				{ type: 'text', color: 'blue', text: 's' },
				{
					type: 'text',
					text: '. Оно ставится если подлежащее 3-го лица (he/she/it). Давайте глагол, содержащий время совершения действия, отметим ',
				},
				{ type: 'text', color: 'blue', text: 'синей обводкой' },
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimplePositive.src,
			alt: imageMapper.schemas.PresentSimplePositive.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Чтобы образовать вопрос нужно к подлежащему ',
				},
				{ type: 'text', text: 'Masha ', weight: 'bold' },
				{
					type: 'text',
					text: ' добавить вспомогательный глагол. Для времён группы Simple таким глаголом будет',
				},
				{ type: 'text', color: 'blue', text: 'do' },
				{ type: 'text', text: '. ' },
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleQuestion_1.src,
			alt: imageMapper.schemas.PresentSimpleQuestion_1.alt,
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'В английском языке есть два типа глаголов: ',
						},
						{ type: 'text', color: 'gold', text: 'смысловые' },
						{ type: 'text', text: ' и ' },
						{ type: 'text', color: 'blue', text: 'вспомогательные' },
						{
							type: 'text',
							text: '. Смысловой несёт смысл (красить, читать). Вспомогательные не несут смысла и никак не переводятся, но участвуют в формировании вопроса.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'Есть только 3 вспомогательных глагола. Ещё несколько модальных. Все остальные смысловые.',
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
					text: 'Но это ещё не всё. На первом шаге на смысловом глаголе ',
				},
				{ type: 'text', color: 'blue', text: 'like' },
				{
					type: 'text',
					text: ' стоит настоящее время. Но вспомогательный глагол всегда перетягивает на себя время совершения действия. Поэтому глагол ',
				},
				{ type: 'text', color: 'blue', text: 'likes' },
				{
					type: 'text',
					text: ' становится инфинитивом ',
				},
				{ type: 'text', color: 'gold', text: 'like' },
				{ type: 'text', text: '. А инфинитив ' },
				{ type: 'text', color: 'gold', text: 'do' },
				{
					type: 'text',
					text: ' становится глаголом в настоящем времени. С местоимением 3-го лица выглядит как ',
				},
				{ type: 'text', color: 'blue', text: 'does' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleQuestion_2.src,
			alt: imageMapper.schemas.PresentSimpleQuestion_2.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В предложениях с подлежащим 1-го и 2-го лица механизм образования вопроса аналогичный. Добавим к подлежащему вспомогательный глагол ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleFirstPronounQuestionScheme_1.src,
			alt: imageMapper.schemas.PresentSimpleFirstPronounQuestionScheme_1.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Затем перенесём грамматическую нагрузку со смыслового глагола ',
				},
				{
					type: 'text',
					text: 'like',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' на вспомогательный ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. ',
				},
				{
					type: 'text',
					text: 'Like',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в неопределённой форме выглядит точно так же как и в настоящем времени для подлежащего 1-го и 2-го лица. А ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' в настоящем времени выглядит точно так же как в неопределённой форме.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleFirstPronounQuestionScheme_2.src,
			alt: imageMapper.schemas.PresentSimpleFirstPronounQuestionScheme_2.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Давайте посмотрим то же самое в таблице',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PresentSimplePositiveAndQuestion.src,
			alt: imageMapper.tables.PresentSimplePositiveAndQuestion.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если совсем упрощать, то для образования вопроса из утвердительного предложения нужно перед местоимениями ',
				},
				{
					type: 'text',
					text: 'I',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'you',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'we',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'they',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' ставить ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', а перед ',
				},
				{
					type: 'text',
					text: 'he',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'she',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'it',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' ставить ',
				},
				{
					type: 'text',
					text: 'does',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. А ',
				},
				{
					type: 'text',
					text: 'смысловой глагол',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' станет в неопределённой форме как в словаре.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Приводя выше такое большое описание образования вопроса я ставил целью чтобы вы понимали почему вообще слово ',
						},
						{
							type: 'text',
							text: 'likes',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ' превращается в ',
						},
						{
							type: 'text',
							text: 'like',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ', а ',
						},
						{
							type: 'text',
							text: 'do',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ' в ',
						},
						{
							type: 'text',
							text: 'does',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ', а не только механически подставляли слова. Даже если забудете схему, то понимая логику образования вопросительного предложения сможете самостоятельно её вычислить.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Примеры:' }],
		},
		{
			type: 'rusToEng',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Ты помогаешь своим родителям?',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'Do you help your parents?',
						},
					],
				},
			],
			textSize: 'giant',
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он работает здесь?' }] },
				{ eng: [{ type: 'text', text: 'Does he work here?' }] },
			],
		},
		exercises_1,
	],
}

export default presentSimpleQuestion
