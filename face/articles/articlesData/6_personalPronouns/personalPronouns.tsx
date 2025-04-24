import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'

const personalPronouns: ArticleType.Art = {
	meta: {
		number: 6,
		slug: 'personal-pronouns',
		caption: 'Глава 6',
		articleName: 'Личные местоимения',
		articleDescription: 'Обобщим знания по личным местоимениям и разберёмся с конструкцией «у меня» и «им хочется»',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'С личными местоимениями вы уже сталкивались во всех предыдущих главах. Но до сих пор они не обсуждались. Давайте это исправим.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Личным местоимением обозначают ',
				},
				{
					type: 'text',
					color: 'blue',
					text: 'лицо совершающее действие',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Они различаются по лицам и числам:',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PersonalPronounceSubject.src,
			alt: imageMapper.tables.PersonalPronounceSubject.alt,
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'I — я' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В английском всегда заглавной буквой.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'You — вы' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'На русском мы обращаемся к человеку на «вы» или «ты» в зависимости от возраста или близости. В английском всех называют на «вы».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В русском языке местоимение «вы» используется как для обращения к одному человеку, так и нескольким. Это понимается по контексту. То же самое в английском.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'We — мы' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Используются для обозначения группы лиц когда говорящий ',
				},
				{ type: 'text', weight: 'bold', text: 'находится' },
				{ type: 'text', text: ' в ней.' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'They — они' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Используются для обозначения группы предметов или лиц когда говорящий ',
				},
				{ type: 'text', weight: 'bold', text: 'не находится' },
				{ type: 'text', text: ' в ней.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё это относится не только к людям, но и к предметам. Тут нужно быть внимательным потому что на русском мы группу предметов называем «это».',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'He — он, she — она' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Применяются только для обозначения человека.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'It — это (он, она)' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Через it называют все неодушевлённые предметы и животных в единственном числе. It применяется если предмет неисчисляемый. ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Из-за наличия родов в русском языке мы можем называть предметы «он» или «она». Например: «Она сломалась» в отношении машины. Но в английском родов нет. Поэтому все объекты кроме людей называют через it. Но при обратном переводе it нужно менять на подходящее местоимение в зависимости от рода.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Есть несколько исключений.  Животное могут назвать через he или she если хотят акцентировать внимание на поле или выделить из общей массы. Также посторонние люди могут новорождённых детей называть через it если не знают пола.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Have в значении владения' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'На русском языке владение выражается через личное местоимения в родительском падеже. А в английском для этого используется глагол have с личными местоимениями.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'У меня есть вопрос.' }],
			eng: [{ type: 'text', text: 'I have a question.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'У него хорошие результаты.' }],
			eng: [{ type: 'text', text: 'He has good results.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'У них есть квартира.' }],
			eng: [{ type: 'text', text: 'They have an apartment.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте попереводить похожие предложения:',
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Притяжательное местоимение в роли подлежащего' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В русском языке можно часто встречаются предложения где в роли подлежащего выступает притяжательное местоимение:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Мне нравится этот город.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Но если в английском языке в роли подлежащего стоит местоимение, то это местоимение может быть только личным: I, we, he, she, they, we.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'I like this city.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Похожие конструкции:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Им живется хорошо.' }],
			eng: [{ type: 'text', text: 'They live well.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мне хочется спать.' }],
			eng: [{ type: 'text', text: 'I want to sleep.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Ему мешает шум.' }],
			eng: [{ type: 'text', text: 'The noise bothers him.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					text: 'Шум мешает ему. Поэтому шум — это лицо выполняющее действие. То есть подлежащие. Действие направлено на него, поэтому местоимение «он» стоит в роли дополнения.',
					color: 'gray',
				},
			],
		},
		exercises_2,
	],
}

export default personalPronouns
