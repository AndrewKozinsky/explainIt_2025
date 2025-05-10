import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const personalPronounsAsObject: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'personal-pronouns-as-object',
		name: 'Личные местоимения в дополнении',
		description: 'Узнаем как изменяются личные местоимения когда действие направлено на объект.',
		keywords:
			'личные местоимения, do, does, действующее лицо, подлежащее, дополнение, как задать вопрос в Present Simple, презент симпл',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В самом первом уроке рассказывалось, что личные местоимения используются в качестве ',
				},
				{ type: 'text', color: 'blue', text: 'подлежащего' },
				{
					type: 'text',
					text: ' — объекта выполняющего действие. В этом случае они стоят в именительном падеже.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', color: 'blue', text: 'Мы' },
				{ type: 'text', text: ' помогаем.' },
			],
			eng: [
				{ type: 'text', color: 'blue', text: 'We' },
				{ type: 'text', text: ' help.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Личные местоимения также используются для обозначения ',
				},
				{ type: 'text', color: 'blue', text: 'дополнения' },
				{
					type: 'text',
					text: ' — объекта, на который действие направлено. Тогда они должны быть в форме объектного падежа.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Мы помогаем ' },
				{ type: 'text', color: 'blue', text: 'им' },
				{ type: 'text', text: '.' },
			],
			eng: [
				{ type: 'text', text: 'We help ' },
				{ type: 'text', color: 'blue', text: 'them' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: '«Мы» — это подлежащее, оно выполняет действие. А действие направлено на дополнение «им».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В разных ролях личные местоимения будут иметь разные формы. Это справедливо как для русского, так и английского языка.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PersonalPronounceSubjectAndObject.src,
			alt: imageMapper.tables.PersonalPronounceSubjectAndObject.alt,
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Мы старые друзья, ты знаешь ',
				},
				{ type: 'text', color: 'blue', text: 'меня' },
				{
					type: 'text',
					text: '.',
				},
			],
			eng: [
				{
					type: 'text',
					text: 'We are old friends, you know ',
				},
				{ type: 'text', color: 'blue', text: 'me' },
				{
					type: 'text',
					text: '.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Паша отправляет ' },
				{ type: 'text', color: 'blue', text: 'ей' },
				{ type: 'text', text: ' открытки.' },
			],
			eng: [
				{ type: 'text', text: 'Pasha send ' },
				{ type: 'text', color: 'blue', text: 'her' },
				{ type: 'text', text: ' postcards.' },
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
							text: 'Только личные местоимения имеют формы для двух падежей. Остальные типы местоимений по падежам не изменяются.',
						},
					],
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Иногда живая разговорная речь входит в противоречие с грамматическими нормами если «неправильный» вариант звучит гармоничнее и проще. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Я, ты и ты делаем одну простую вещь.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Так как «',
				},
				{
					type: 'text',
					text: 'я',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» и «',
				},
				{
					type: 'text',
					text: 'ты',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» — это личные местоимения в роли подлежащего (действующего лица), то использую ',
				},
				{
					type: 'text',
					text: 'I',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' и ',
				},
				{
					type: 'text',
					text: 'you',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' при переводе:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'I',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', ',
				},
				{
					type: 'text',
					text: 'you',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' and ',
				},
				{
					type: 'text',
					text: 'you',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' do one simple thing.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Но в живой речи вместо I скажут Me:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Me',
					color: 'blue',
				},
				{
					type: 'text',
					text: ', you and you do one simple thing.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Дословно можно перевести «',
				},
				{
					type: 'text',
					text: 'Меня, ты и ты делаем одну простую вещь',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '». Это необычно, но скажут именно так.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Такой оборот используют если перечисляют несколько участников. Если действующее лицо одно, то будет нормальная форма первого лица в качестве подлежащего — ',
				},
				{
					type: 'text',
					text: 'I',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ':',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я делаю одну простую вещь.' }],
			eng: [
				{ type: 'text', text: 'I', color: 'blue' },
				{ type: 'text', text: ' do one simple thing.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё ',
				},
				{
					type: 'text',
					text: 'I',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' меняют на ',
				},
				{
					type: 'text',
					text: 'me',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' при ответе на вопрос:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: '— Я чувствую себя уставшим. — Я тоже.' }],
			eng: [
				{ type: 'text', text: '— I feel tired. – ' },
				{ type: 'text', text: 'Me', color: 'blue' },
				{ type: 'text', text: ' too.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Грамматические правильнее отвечать I too. Но так не говорят.',
				},
			],
		},
		{
			type: 'rusToEng',
			offset: true,
			textSize: 'giant',
			rus: [{ type: 'text', text: '— Кто разбил вазу? – Не я!' }],
			eng: [
				{ type: 'text', text: '— Who broke the vase? – Not ' },
				{ type: 'text', text: 'me', color: 'blue' },
				{ type: 'text', text: '!' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Грамматические правильнее отвечать Not I. Но так не скажут.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Такое исключение есть только у ',
				},
				{
					type: 'text',
					text: 'I',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '/',
				},
				{
					type: 'text',
					text: 'me',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. Остальные местоимения используются по правилам.',
				},
			],
		},
	],
}

export default personalPronounsAsObject
