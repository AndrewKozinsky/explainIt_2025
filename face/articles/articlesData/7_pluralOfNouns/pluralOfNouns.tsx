import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_5 from './exercises-5'
import exercises_6 from './exercises-6'

const pluralOfNouns: ArticleType.Art = {
	meta: {
		number: 7,
		slug: 'plural-of-nouns',
		articleName: 'Множественное число',
		articleDescription:
			'Разберём способы образования множественного числа существительных от основных до исключений.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В предыдущих главах уже встречались существительные во множественном числе и вы могли заметить, что они образовываются из единственного числа добавлением окончания ',
				},
				{
					type: 'text',
					text: 's',
					color: 'blue',
				},
				{
					type: 'text',
					text: '. Это самый распространённый, но не универсальный способ. Давайте рассмотрим все.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Окончание -s' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В большинстве случаев для образования множественного числа к слову добавляется окончание ',
				},
				{ type: 'text', color: 'blue', text: 's' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мяч — мячи' }],
			eng: [
				{ type: 'text', text: 'A ball — ball' },
				{ type: 'text', color: 'blue', text: 's' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Дерево — Деревья' }],
			eng: [
				{ type: 'text', text: 'A tree — Tree' },
				{ type: 'text', color: 'blue', text: 's' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Переведите эти предложения.',
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Окончание -es' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'К некоторым словам для образования множественного числа добавляют окончание ',
				},
				{ type: 'text', color: 'blue', text: 'es' },
				{
					type: 'text',
					text: ' потому что несколько согласных подряд  затрудняют проговаривание. Такие слова заканчиваются на следующие буквы:',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ch' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Скамейка' }],
			eng: [
				{ type: 'text', text: 'A ben' },
				{ type: 'text', weight: 'bold', text: 'ch' },
				{ type: 'text', text: ' — ben' },
				{ type: 'text', weight: 'bold', text: 'ch' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: 's' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Автобус' }],
			eng: [
				{ type: 'text', text: 'A bu' },
				{ type: 'text', weight: 'bold', text: 's' },
				{ type: 'text', text: ' — bu' },
				{ type: 'text', weight: 'bold', text: 's' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-ss' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Класс' }],
			eng: [
				{ type: 'text', text: 'A cla' },
				{ type: 'text', weight: 'bold', text: 'ss ' },
				{ type: 'text', text: '— cla' },
				{ type: 'text', weight: 'bold', text: 'ss' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-sh' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Желание' }],
			eng: [
				{ type: 'text', text: 'A wi' },
				{ type: 'text', weight: 'bold', text: 'sh' },
				{ type: 'text', text: ' — wi' },
				{ type: 'text', weight: 'bold', text: 'sh' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-x' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Лиса' }],
			eng: [
				{ type: 'text', text: 'A fo' },
				{ type: 'text', weight: 'bold', text: 'x' },
				{ type: 'text', text: ' — fo' },
				{ type: 'text', weight: 'bold', text: 'x' },
				{ type: 'text', color: 'blue', text: 'es' },
			],
		},
		{ type: 'header', tag: 'h3', style: 'h4', text: '-o' },
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Картошка' }],
			eng: [
				{ type: 'text', text: 'a potat' },
				{ type: 'text', weight: 'bold', text: 'o' },
				{ type: 'text', text: ' — potat' },
				{ type: 'text', weight: 'bold', text: 'o' },
				{ type: 'text', color: 'blue', text: 'es' },
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
							text: 'Такое запомнить сложно, поэтому не заучивайте. Понимание какое окончание ставить будет интуитивным после чтения английских текстов.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'Но если этого пока нет, то в случае сомнений попробуйте добавить к слову ',
						},
						{ type: 'text', color: 'blue', text: 's' },
						{
							type: 'text',
							text: '. Если язык не спотыкается от добавления ',
						},
						{ type: 'text', color: 'blue', text: 's' },
						{
							type: 'text',
							text: ', то скорее всего форма слова определена верно. В противном случае попробуйте ',
						},
						{ type: 'text', color: 'blue', text: 'es' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		exercises_2,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Окончание -ies' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', weight: 'bold', text: '-y' },
				{ type: 'text', text: ', то последняя ' },
				{ type: 'text', weight: 'bold', text: 'y' },
				{ type: 'text', text: ' меняется на ' },
				{ type: 'text', color: 'blue', text: 'ies' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Дитя' }],
			eng: [
				{ type: 'text', text: 'A bab' },
				{ type: 'text', weight: 'bold', text: 'y' },
				{ type: 'text', text: ' — bab' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Город' }],
			eng: [
				{ type: 'text', text: 'A cit' },
				{ type: 'text', weight: 'bold', text: 'y' },
				{ type: 'text', text: ' — cit' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мелодия' }],
			eng: [
				{ type: 'text', text: 'A melod' },
				{ type: 'text', weight: 'bold', text: 'y' },
				{ type: 'text', text: ' — melod' },
				{ type: 'text', color: 'blue', text: 'ies' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Окончание -ves' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Если существительное оканчивается на ',
				},
				{ type: 'text', weight: 'bold', text: 'f' },
				{ type: 'text', text: '/' },
				{ type: 'text', weight: 'bold', text: 'fe' },
				{ type: 'text', text: ', то заменяется на ' },
				{ type: 'text', color: 'blue', text: 'ves' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-3089',
			cells: [
				{
					children: [
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Волк' }],
							eng: [
								{ type: 'text', text: 'A wol' },
								{ type: 'text', weight: 'bold', text: 'f' },
								{ type: 'text', text: ' — wol' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Лист' }],
							eng: [
								{ type: 'text', text: 'A lea' },
								{ type: 'text', weight: 'bold', text: 'f' },
								{ type: 'text', text: ' — lea' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Булка' }],
							eng: [
								{ type: 'text', text: 'a loa' },
								{ type: 'text', weight: 'bold', text: 'f' },
								{ type: 'text', text: ' — loa' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Половина' }],
							eng: [
								{ type: 'text', text: 'a hal' },
								{ type: 'text', weight: 'bold', text: 'f' },
								{ type: 'text', text: ' — hal' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [
								{ type: 'text', text: 'Лист ' },
								{ type: 'text', color: 'gray', text: '(дерева)' },
							],
							eng: [
								{ type: 'text', text: '' },
								{ type: 'text', text: 'a lea' },
								{ type: 'text', weight: 'bold', text: 'f' },
								{ type: 'text', text: ' — lea' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'rusToEng',
							textSize: 'giant',
							offset: true,
							rus: [{ type: 'text', text: 'Жизнь' }],
							eng: [
								{ type: 'text', text: 'A li' },
								{ type: 'text', weight: 'bold', text: 'fe' },
								{ type: 'text', text: ' — li' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Мяч' }],
							eng: [
								{ type: 'text', text: 'A kni' },
								{ type: 'text', weight: 'bold', text: 'fe' },
								{ type: 'text', text: ' — kni' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Жизнь' }],
							eng: [
								{ type: 'text', text: 'a li' },
								{ type: 'text', weight: 'bold', text: 'fe' },
								{ type: 'text', text: ' — li' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [{ type: 'text', text: 'Жена' }],
							eng: [
								{ type: 'text', text: 'a wi' },
								{ type: 'text', weight: 'bold', text: 'fe' },
								{ type: 'text', text: ' — wi' },
								{ type: 'text', color: 'blue', text: 'ves' },
							],
						},
					],
				},
			],
		},

		{ type: 'header', tag: 'h2', style: 'h2', text: 'Изменение основы слова' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В английском у некоторых существительных форма множественного числа образуется через изменении основы. Кстати некоторые те же самые русские слова тоже во множественном числе изменяют основу слова. Такие слова нужно запомнить:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Ребёнок' }],
			eng: [{ type: 'text', text: 'a child — children' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Стопа' }],
			eng: [{ type: 'text', text: 'a foot — feet' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Гусь' }],
			eng: [{ type: 'text', text: 'a goose — geese' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мужчина' }],
			eng: [{ type: 'text', text: 'a man — men' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Существительное a man/men обозначает не только для мужчину, но человека/людей. Также входит в состав других слов. Например postman (почтальон).',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			rus: [{ type: 'text', text: 'Женщина' }],
			eng: [{ type: 'text', text: 'a woman — women' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мышь' }],
			eng: [{ type: 'text', text: 'a mouse — mice' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Человек' }],
			eng: [{ type: 'text', text: 'a person — people' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Зуб' }],
			eng: [{ type: 'text', text: 'a tooth — teeth' }],
		},
		exercises_5,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ответьте на вопросы чтобы проверить насколько хорошо поняли материал.',
				},
			],
		},
		{
			type: 'faq',
			items: [
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'text',

										text: 'Зачем используют так много вариантов окончаний для образования множественного числа? Почему для всех случаев бы использовать окончание -s?',
									},
								],
							},
						],
					},
					answer: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'text',
										text: 'Если к существительным оканчивающимся на некоторые согласные добавлять окончание -s, то их будет трудно произнести в речи. И чтобы достичь гармоничности для некоторых слов добавляют другие окончания.',
									},
								],
							},
						],
					},
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Единственное и множественное число совпадают' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Некоторые существительные всегда находятся во множественном числе несмотря на то, что могут использовать в единственном. Например слово «пижама» всегда находится во множественном числе хотя в предложении используется в единственном:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'У Гектора ужасная пижама.' }],
			eng: [{ type: 'text', text: 'Hector has terrible pyjamas.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Так как существительное во множественном, то нельзя ставить неопределённый артикль a.',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'И если пижама упоминается через местоимение, то нужно использовать именно they потому что это множественное число:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Ты должна это видеть, Надя.' }],
			eng: [{ type: 'text', text: 'You should see them, Nadia.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Другие примеры: nice trousers, dirty glasses, scissors, Новость, новости → News, Бильярд → Billiards, Штаны → Trousers, Джинсы → Jeans, Очки → Glasses.',
				},
			],
		},
		{
			type: 'note',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'На русском языке слово «видео» в единственном и множественном числе выглядят одинаково, но на английском множественное число образуется через добавление -s.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'По-русски говорим «евро» для любого числа, в английском нужно добавлять -s.\n',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'big',
					rus: [{ type: 'text', text: 'Это стоит 50 евро.' }],
					eng: [{ type: 'text', text: 'It costs fifty euros.' }],
				},
			],
		},
		exercises_6,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Пара чего то' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В английском выражение “a pair of jeans” означает одни джинсы, несмотря на слово pair (пара). Это связано с тем, что джинсы (как и брюки, очки, ножницы и т. п.) состоят из двух симметричных частей — двух штанин — поэтому грамматически считается, что это пара.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'big',
			rus: [
				{
					type: 'text',
					text: 'Шесть футболок, три пары джинсов, четыре пары брюк, две пары вечерних туфель и три зубные щетки.',
				},
			],
			eng: [
				{
					type: 'text',
					text: 'Six T-shirts, three pairs of jeans, four pairs of trousers, two pairs of evening shoes and three toothbrushes.',
				},
			],
		},
	],
}

export default pluralOfNouns
