import ArticleType from '../../articleType'
import PersonalPronounceSubjectTable from './PersonalPronounceSubjectTable'

const personalPronouns: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 3,
		slug: 'personal-pronouns',
		caption: 'Глава 1',
		articleName: 'Личные местоимения',
		articleDescription:
			'Изучим член предложения без которой не обходится не одно предложение: подлежащее и его частный случай личные местоимения.',
		isPaid: false,
	},
	content: [
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Местоимение используется для обозначения персонажа или предмета не называя по имени.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Личным местоимением обозначают ',
				},
				{
					type: 'text',
					color: 'blue',
					weight: 'normal',
					text: 'лицо совершающее действие',
				},
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Я' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' поставил чайник на плиту.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Она' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' принесла печенье.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Они различаются по лицам и числам:',
				},
			],
		},
		{ type: 'customComponent', component: <PersonalPronounceSubjectTable /> },
		{ type: 'header', tag: 'h2', style: 'h2', text: 'I — я' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В английском всегда заглавной буквой.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'You — вы' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'На русском мы обращаемся к человеку на «вы» или «ты» в зависимости от возраста или близости. В английском всех называют на «вы».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В русском языке местоимение «вы» используется как для обращения к одному человеку, так и нескольким. Это понимается по контексту. То же самое в английском.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'We — мы' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Используются для обозначения группы лиц когда говорящий ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'находится' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' в ней.' },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'They — они' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Используются для обозначения группы предметов или лиц когда говорящий ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'не находится' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' в ней.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ещё это относится не только к людям, но и к предметам. Тут нужно быть внимательным потому что на русском мы группу предметов называем «это».',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'He — он, she — она' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Применяются только для обозначения человека.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'It — это (он, она)' },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Через it обозначают все неодушевлённые предметы и животных в единственном числе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Из-за наличия родов в русском языке мы можем называть предметы «он» или «она». Например: «Она сломалась» в отношении машины. Но в английском родов нет. Поэтому все объекты кроме людей называют через it. Но при обратном переводе it нужно менять на подходящее местоимение в зависимости от рода.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Есть несколько исключений.  Животное могут назвать через he или she если хотят акцентировать внимание на поле или выделить из общей массы. Также посторонние люди могут новорождённых детей называть через it если не знают пола.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Ответьте на вопросы для проверки знаний.',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Через ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' можно обозначить неодушевлённый предмет в единственном числе. А через какое местоимение можно обозначить несколько предметов?',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'И несколько человек и несколько предметов обозначаются через they.',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'Можно через ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'we' },
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: ' обозначить несколько неодушевлённых предметов?',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'We используется когда говорящий находится внутри группы. Неодушевлённый предмет может находиться внутри группы, но не может говорить. Поэтому нет.',
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
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'В чём главное различие между местоимениями ',
									},
									{ type: 'text', color: 'black', weight: 'bold', text: 'we' },
									{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
									{ type: 'text', color: 'black', weight: 'bold', text: 'they' },
									{ type: 'text', color: 'black', weight: 'normal', text: '?' },
								],
							},
						],
					},
					answer: {
						type: 'ReactNode',
						value: [
							{
								type: 'paragraph',
								offset: false,
								textSize: 'normal',
								children: [
									{
										type: 'text',
										color: 'black',
										weight: 'normal',
										text: 'We используется когда говорящий находится внутри группы, а they если вне её.',
									},
								],
							},
						],
					},
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'yellow',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'На следующем уроке вы научитесь соединять эти местоимения с прилагательными для составления небольших предложений. Только советую перед этим выучить слова ниже. Они встретятся на тренировке.',
						},
					],
				},
			],
		},
	],
}

export default personalPronouns
