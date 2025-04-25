import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'

const toBePresentPositive: ArticleType.Art = {
	meta: {
		number: 9,
		slug: 'to-be-present-positive',
		caption: 'Глава 9',
		articleName: 'To be в настоящем в утверждении',
		articleDescription:
			'Посмотрим как строить предложения где в русском переводе нет глагола. В английском для этого используется глагол to be.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Давайте попробуем дословно перевести следующие предложения:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я космонавт.' }],
			eng: [{ type: 'text', text: 'I spaceman.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Они клоуны.' }],
			eng: [{ type: 'text', text: 'They clowns.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Это щенок.' }],
			eng: [{ type: 'text', text: 'It puppy.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Предложение на английском языке должно содержать в себе как минимум подлежащее и сказуемое. ',
				},
				{ type: 'text', weight: 'bold', text: 'Подлежащее' },
				{
					type: 'text',
					text: ' — это объект совершающий действие. Он может быть выражен местоимением, именем, существительным. А ',
				},
				{ type: 'text', weight: 'bold', text: 'сказуемое' },
				{
					type: 'text',
					text: ' — это само действие. Выражается глаголом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В предложениях выше подлежащие в виде местоимения. Но в моих переводах нет сказуемого, то есть самого действия. Когда-то давно в русском языке оно ставилось. На современный манер звучало бы как «',
				},
				{ type: 'text', color: 'blue', text: 'есть' },
				{
					type: 'text',
					text: '». В болгарском оно существует до сих пор. И в английском тоже. Это глагол ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', text: '. Поставлю в перевод:' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' космонавт.' },
			],
			eng: [
				{ type: 'text', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', text: ' a spaceman.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' клоуны.' },
			],
			eng: [
				{ type: 'text', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', text: ' clowns.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' щенок.' },
			],
			eng: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{ type: 'text', text: ' a puppy.' },
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
							text: 'Иногда и в современном русском языке явно используем глагол «есть» в разных видах:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text', text: 'Незаконным ' },
						{ type: 'text', color: 'blue', text: 'является' },
						{
							type: 'text',
							text: ' способ получения этих средств.',
						},
					],
				},
				{
					type: 'paragraph',
					textSize: 'big',
					children: [
						{ type: 'text', text: 'Что вы из себя ' },
						{ type: 'text', color: 'blue', text: 'представляете' },
						{ type: 'text', text: '?' },
					],
				},
				{
					type: 'paragraph',
					textSize: 'big',
					children: [
						{ type: 'text', text: 'Там ' },
						{ type: 'text', color: 'blue', text: 'есть' },
						{ type: 'text', text: ' стол.' },
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'Тире также аналог слова «есть»:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text', text: 'Борис ' },
						{ type: 'text', color: 'blue', text: '—' },
						{
							type: 'text',
							text: ' сильный мужчина.',
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
					text: 'Английские глаголы могут находиться в одной из трёх форм:',
				},
			],
		},
		{
			type: 'list',
			listType: 'numbers',
			children: [
				{
					type: 'paragraph',
					children: [
						{ type: 'text', text: 'В ' },
						{ type: 'text', weight: 'bold', text: 'неопределённой' },
						{
							type: 'text',
							text: ' форме (инфинитиве). Это глагол отвечающий на вопрос «что делать?». Это действие в чистом виде по которому нельзя сказать о времени. Глагол «есть» в неопределённой форме будет ',
						},
						{ type: 'text', color: 'blue', text: 'be' },
						{
							type: 'text',
							text: '. Как я и поставил.',
						},
					],
				},
				{
					type: 'paragraph',
					children: [
						{ type: 'text', text: 'В форме ' },
						{ type: 'text', weight: 'bold', text: 'настоящего' },
						{ type: 'text', text: ' времени.' },
					],
				},
				{
					type: 'paragraph',
					children: [
						{ type: 'text', text: 'В форме ' },
						{ type: 'text', weight: 'bold', text: 'прошедшего' },
						{ type: 'text', text: ' времени.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{ type: 'text', text: 'Форма глагола ' },
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					text: ' в настоящем времени зависит от лица подлежащего.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.ToBePresent.src,
			alt: imageMapper.tables.ToBePresent.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Сказуемое в утвердительном предложении всегда должно показывать время совершения действия. Давайте ',
				},
				{ type: 'text', color: 'blue', text: 'be' },
				{
					type: 'text',
					text: ' переделаем в форму настоящего времени.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Я ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' космонавт.' },
			],
			eng: [
				{ type: 'text', text: 'I ' },
				{ type: 'text', color: 'blue', text: 'am' },
				{ type: 'text', text: ' a spaceman.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Они ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' клоуны.' },
			],
			eng: [
				{ type: 'text', text: 'They ' },
				{ type: 'text', color: 'blue', text: 'are' },
				{ type: 'text', text: ' clowns.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Это ' },
				{ type: 'text', color: 'gray', text: '(есть)' },
				{ type: 'text', text: ' щенок.' },
			],
			eng: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'is' },
				{ type: 'text', text: ' a puppy.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Чтобы закрепить новые значения выполните упражнения на перевод.',
				},
			],
		},
		exercises_1,
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Выше я писал, что сказуемое в утвердительном предложении всегда показывает время совершения действия. В изученном нами грамматическом времени Present Simple сказуемое после подлежащего 1-го (I) и 2-го (you, we, they) лица выглядит точно так же как для неопределённой формы.',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'giant',
					rus: [{ type: 'text', text: 'Я читаю эту книгу.' }],
					eng: [{ type: 'text', text: 'I read this book.' }],
				},
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: '«Читать» в неопределённой форме будет read. И «читаю» в настоящем времени тоже будет read если стоит после местоимений первого и второго лица как в этом случае.',
							color: 'gray',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'giant',
					rus: [{ type: 'text', text: 'Мы курим.' }],
					eng: [{ type: 'text', text: 'We smoke.' }],
				},
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: '«Курить» и «курю/курим» по английски будет одним и тем же словом smoke если стоит после подлежащего первого и второго лица.',
							color: 'gray',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'После подлежащего 3-го лица (he, she, it) к подлежащему добавляется окончание -s или -es. Это и является указанием на настоящее время.',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'giant',
					rus: [{ type: 'text', text: 'Она заказывает еду онлайн.' }],
					eng: [{ type: 'text', text: 'She orders food online.' }],
				},
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: '«Заказывать» в неопределённой форме будет order. Если этот глагол стоит в Present Simple в утвердительном предложении после подлежащего 3-го лица, то к глаголу добавляется окончание -s как в этом случае.',
							color: 'gray',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'giant',
					rus: [{ type: 'text', text: 'Ему нравится эта профессия.' }],
					eng: [{ type: 'text', text: 'He likes this profession.' }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте попереводить предложения посложнее.',
				},
			],
		},
		exercises_2,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Давайте сформулируем более конкретное правило в каких случаях используется be. Я дам три интерпретации, а вы выбирите понравившуюся.',
				},
			],
		},
		{
			type: 'list',
			listType: 'numbers',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Ставьте ',
						},
						{
							type: 'text',
							text: 'be',
							weight: 'bold',
						},
						{
							type: 'text',
							text: ' в тех переводах, где в русском можно поставить глагол «',
						},
						{
							type: 'text',
							text: 'есть',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '». Но мы его не проговариваем. Чтобы убедиться в существовании нужно перевести предложение в прошедшее время. И если появляется слово «',
						},
						{
							type: 'text',
							text: 'был/была',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '», то в настоящем будет слово «',
						},
						{
							type: 'text',
							text: 'есть',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '».',
						},
					],
				},
				{
					type: 'paragraph',

					children: [
						{
							type: 'text',
							text: 'В английском предложении всегда должен быть глагол. Если в русском предложении глагола нет, то значит в английском ставьте ',
						},
						{
							type: 'text',
							text: 'be',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '.',
						},
					],
				},
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Через глагол be рассказывается о свойствах предмета, то, чем он является. Можно задать вопрос «',
						},
						{
							type: 'text',
							text: 'Быть каким/кем?',
							weight: 'bold',
						},
						{
							type: 'text',
							text: '».',
						},
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он водитель.' }],
			eng: [{ type: 'text', text: 'He is a driver.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: '1. Между словами можно поставить «есть». 2. В русском нет глагола, значит в переводе должен быть be. 3. Водитель —  это свойство (быть кем?).',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			rus: [{ type: 'text', text: 'Это было великолепно!' }],
			eng: [{ type: 'text', text: 'That was awesome!' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: '1. Между словами можно поставить «есть». 2. В русском нет глагола, значит в переводе должен быть be. 3. Великолепный —  это свойство.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			rus: [{ type: 'text', text: 'Это местные бабочки.' }],
			eng: [
				{
					type: 'text',
					text: 'They are local butterflies.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: '1. Между словами можно поставить «есть». 2. В русском нет глагола, значит в переводе должен быть be. 3. Бабочка —  это свойство (быть кем?).',
				},
			],
		},
		exercises_3,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ответьте на вопросы чтобы убедиться, что правильно поняли материал.',
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
										text: 'Что такое подлежащее и сказуемое?',
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
										weight: 'bold',
										text: 'Подлежащее',
									},
									{
										type: 'text',
										text: ' — это член предложения обозначающий объект совершающий действие. Мы пока изучили личные местоимения, но подлежащим может быть существительное, имя.',
									},
								],
							},
							{
								type: 'paragraph',
								offset: true,
								children: [
									{
										type: 'text',
										weight: 'bold',
										text: 'Сказуемое',
									},
									{
										type: 'text',
										text: ' — это член предложения обозначающий действие совершаемое подлежащим. Выражается глаголом. Так как в английском предложении всегда должно быть явно обозначено действие, то в таких предложениях где на русском мы указываем свойство объекта, и глагол обычно не ставится, в английском явно есть глагол ',
									},
									{ type: 'text', weight: 'bold', text: 'be' },
									{
										type: 'text',
										text: ' в одной из временных форм: am, are, is, was, were или be после will для выражения будущего времени.',
									},
								],
							},
						],
					},
				},
				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'text',
										text: 'Почему в заголовке главы говорится про ',
									},
									{ type: 'text', weight: 'bold', text: 'be' },
									{
										type: 'text',
										text: ', но в предложениях почему-то используется am, are, is, was и were?',
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
										text: 'Be — это неопределённая форма глагола «быть». По такому глаголу нельзя определить время. Это как сказать «Саша ',
									},
									{ type: 'text', weight: 'bold', text: 'печь' },
									{
										type: 'text',
										text: ' печенье». Это действие в чистом виде. Поэтому глагол нагружают каким-то временем изменяя его форму: пёк (прошедшее), печёт (настоящее), испечёт (будущее). То же самое и с ',
									},
									{ type: 'text', weight: 'bold', text: 'be' },
									{
										type: 'text',
										text: '. В настоящем времени он будет в форме am, are или is. А в прошедшем was или were. Формы будущего времени ни у одного английского глагола нет.',
									},
								],
							},
						],
					},
				},

				{
					question: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'text',
										text: 'Почему в предложениях про будущее время глагол ',
									},
									{ type: 'text', weight: 'bold', text: 'be' },
									{
										type: 'text',
										text: ' выглядит как инфинитив? Мы же знаем, что такие предложения стоят в настоящем времени, следовательно ',
									},
									{ type: 'text', weight: 'bold', text: 'be' },
									{
										type: 'text',
										text: ' должен быть в форме am, are или is.',
									},
								],
							},
							{
								type: 'rusToEng',
								textSize: 'big',
								rus: [
									{
										type: 'text',
										text: 'Это будет дворец.',
									},
								],
								eng: [
									{
										type: 'text',
										text: 'It will be a palace.',
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

										text: 'Потому что время совершения действия находится на сказуемом. Сказуемым является модальный глагол will. Он и стоит в форме настоящего времени. А be тут дополнение, через него время не передаётся, поэтому стоит в инфинитивной форме.',
									},
								],
							},
						],
					},
				},
			],
		},
	],
}

export default toBePresentPositive
