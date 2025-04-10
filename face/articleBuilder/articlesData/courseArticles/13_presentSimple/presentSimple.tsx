import ArticleType from '../../articleType'
import PresentSimplePositiveTable from './PresentSimplePositiveTable'
import PastSimplePositiveTable from './PastSimplePositiveTable'

const presentSimple: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 15,
		slug: 'present-simple',
		caption: 'Глава 13',
		articleName: 'Утвердительные предложения в Simple',
		articleDescription:
			'Узнаем про грамматическое время Simple и научимся строить утвердительные предложения во всех временах.',
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
					text: 'Грамматическая конструкция ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'подлежащее + глагол' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' называется временами группы ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Simple' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Группа состоит из трёх времён: ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'прошедшего' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (Past Simple), ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'настоящего' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (Present Simple) и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'будущего' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' (Future Simple).' },
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
					text: 'Мы уже строили предложения по этой формуле все предыдущие главы:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Она уборщица' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'She is a janitor' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'She' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — подлежащее, а ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'is' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — глагол.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Но глагол ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' во всех учебниках рассматривается отдельно потому что имеет собственные формы настоящего и прошедшего времени, изменяется по лицам. У остальных глаголов (сидеть, включать, клеить) правила построяния временных форм отличаются. Поэтому о них расскажу отдельно. ',
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
					text: 'В этой главе посмотрим построение утвердительного предложения во всех временах.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Настоящее время (Present Simple)' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'У всех остальных глаголов в утвердительном предложении форма настоящего времени после подлежащего 1-го и 2-го лица выглядит как инфинитив:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'run' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'run' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Инфинитив' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Форма настоящего времени.',
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
					text: 'А после подлежащих 3-го лица к глаголу добавляется или окончание -',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'run' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'run' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Инфинитив' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Форма настоящего времени после подлежащих 3-го лица.',
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
					text: 'Посмотрим на схеме. Глагол обозначается буквой ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'V' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' от слова verb (глагол).',
				},
			],
		},
		{ type: 'customComponent', component: <PresentSimplePositiveTable /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Посмотрим примеры. Подлежащее «мы» — это второе лицо. Поэтому в настоящем времени глагол выглядит как инфинитив.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Мы работаем полный рабочий день.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'We work full-time.\u0003',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Глагол «работать» в инфинитивной форме будет ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'work' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' . Так как он стоит после подлежащего второго лица, то в настоящем временем он останется неизменным.',
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
					text: 'Подлежащее «Ваня» — это третье лицо. Поэтому к глаголу в инфинитиве добавляется окончание ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Ваня спит после обеда.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Vanya sleep' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' after dinner.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Глагол «спать» в инфинитивной форме будет ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'sleep' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' . Так как он стоит после подлежащего третьего лица, то в настоящем временем к нему добавляется окончание ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: '-s' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '.' },
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
					text: 'Если глагол заканчивается на свистящий или шипящий звук (',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: '-ss' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: '-sh' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: '-ch' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: '-x' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', или ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: '-o' },
				{ type: 'text', color: 'black', weight: 'normal', text: '), то вместо ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ставьте ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '-es' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Она целует меня каждый день.',
				},
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'She ki' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'ss' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'es' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' me every day.' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Окончание ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: '-es' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' ставится после глаголов оканчивающихся на ',
						},
						{ type: 'text', color: 'gold', weight: 'normal', text: '-ss' },
						{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: '-sh' },
						{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: '-ch' },
						{ type: 'text', color: 'black', weight: 'normal', text: ', ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: '-x' },
						{ type: 'text', color: 'black', weight: 'normal', text: ', или ' },
						{ type: 'text', color: 'gold', weight: 'normal', text: '-o' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Если вы помните, то для образования множественного числа у существительных заканчивающихся на на те же буквы нужно тоже добавлять окончание ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: '-es' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Как будто делаем глагол во множественном числе 🙂. Объясняется это тем, что ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: '-s' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' не поставишь к этим буквам потому что такое сочетание трудно произносить и в существительных и в глаголах.',
						},
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Он очень часто плавает.',
					engSentences: [{ engSentences: ['He swims very often.'], isCorrect: true }],
					words: [{ rusWord: 'плавать', engWord: 'swim' }],
				},
				{
					rusSentence: 'Учебный год начинается в сентябре.',
					engSentences: [{ engSentences: ['The school year begins in September.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я люблю книги о природе.',
					engSentences: [{ engSentences: ['I like books about nature.'], isCorrect: true }],
					words: [
						{ rusWord: 'книга', engWord: 'book' },
						{ rusWord: 'о чем-то', engWord: 'about something' },
						{ rusWord: 'природа', engWord: 'nature' },
					],
				},
				{
					rusSentence: 'Мы изучаем математику.',
					engSentences: [{ engSentences: ['We study Math.'], isCorrect: true }],
					words: [
						{ rusWord: 'изучать', engWord: 'study' },
						{ rusWord: 'математика', engWord: 'Math' },
					],
				},
				{
					rusSentence: 'Мой сын приходит рано.',
					engSentences: [{ engSentences: ['My son arrives early.'], isCorrect: true }],
					words: [
						{ rusWord: 'сын', engWord: 'son' },
						{ rusWord: 'приходить', engWord: 'arrive' },
						{ rusWord: 'рано', engWord: 'early' },
					],
				},
				{
					rusSentence: 'Света растет активной и позитивной девочкой.',
					engSentences: [
						{
							engSentences: ['Sveta grows active and positive girl.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'расти', engWord: 'grow' },
						{ rusWord: 'активный', engWord: 'active' },
						{ rusWord: 'позитивный', engWord: 'positive' },
						{ rusWord: 'девочка', engWord: 'girl' },
					],
				},
				{
					rusSentence: 'Многие пациенты отдают предпочтение этому способу.',
					engSentences: [{ engSentences: ['Many patients prefer this method.'], isCorrect: true }],
					words: [
						{ rusWord: 'многие', engWord: 'many' },
						{ rusWord: 'пациент', engWord: 'patient' },
						{ rusWord: 'отдавать предпочтение', engWord: 'prefer' },
						{ rusWord: 'метод', engWord: 'method' },
					],
				},
				{
					rusSentence: 'Он изучает экономику.',
					engSentences: [{ engSentences: ['He studies economics.'], isCorrect: true }],
					words: [
						{ rusWord: 'многие', engWord: 'many' },
						{ rusWord: 'пациент', engWord: 'patient' },
						{ rusWord: 'отдавать предпочтение', engWord: 'prefer' },
						{ rusWord: 'метод', engWord: 'method' },
					],
				},
				{
					rusSentence: 'Не удивительно, что ты устала. Ты много работаешь.',
					engSentences: [
						{
							engSentences: ['No wonder that you are tired. You work hard.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'популярный', engWord: 'popular' },
						{ rusWord: 'No wonder', engWord: 'неудивительно' },
					],
				},
				{
					rusSentence: 'Всё, что ты делаешь, так естественно.',
					engSentences: [{ engSentences: ['Everything you do is so naturally.'], isCorrect: true }],
					words: [
						{ rusWord: 'популярный', engWord: 'popular' },
						{ rusWord: 'No wonder', engWord: 'неудивительно' },
					],
				},
				{
					rusSentence: 'Вино имеет приятный красный цвет.',
					engSentences: [{ engSentences: ['Wine has nice red color.'], isCorrect: true }],
					words: [
						{ rusWord: 'популярный', engWord: 'popular' },
						{ rusWord: 'No wonder', engWord: 'неудивительно' },
					],
				},
			],
			offset: true,
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Прошедшее время (Past Simple)' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Чтобы сделать предложение в прошедшем времени нужно поставить сказуемое в форму прошедшего времени. Глаголы в инфинитиве называются первой формой, а в прошедшем второй. На схемах отмечается как ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'V2' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
		{ type: 'customComponent', component: <PastSimplePositiveTable /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Глаголы разделяются на ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'правильные' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'неправильные' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Различаются способом образования прошедшего времени.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-3784',
			cells: [
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Правильные глаголы' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'У таких глаголов прошедшее время образуется по правилу добавления окончание -',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' к инфинитивной форме.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'работать — работал',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'work — work',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'начать — начал',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'start — start',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'ждать — ждал',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'wait — wait',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
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
									text: 'И есть несколько исключений в словах, к которым добавление -',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' создаёт неудобно при говорении.',
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
									text: 'Если глагол оканчивается на -',
								},
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ', то во второй форме добавляется -',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'd' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'спасать — спас',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: 'sav' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' — sav' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'e' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'd' },
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
									text: 'Если глагол оканчивается на -',
								},
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ', которой предшествует согласная буква, то убирается ',
								},
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' и добавляется -',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ied' },
								{ type: 'text', color: 'black', weight: 'normal', text: '.' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'пытаться — пытался',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: 'tr' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' — tr' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ied' },
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'учиться — учился',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: 'stud' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'y' },
								{ type: 'text', color: 'black', weight: 'normal', text: ' — styd' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ied' },
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Неправильные глаголы' },
						{
							type: 'paragraph',
							offset: false,
							textSize: 'normal',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Форма слова таких глаголов в прошедшем времени не образуется по правилу -',
								},
								{ type: 'text', color: 'blue', weight: 'normal', text: 'ed' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: '. Поэтому и называются неправильными. Эту форму нужно запомнить.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'делать — делал',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'make — made',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Не ' },
								{ type: 'text', color: 'error', weight: 'normal', text: 'maked' },
								{ type: 'text', color: 'gray', weight: 'normal', text: ', а ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'made' },
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: '. Нужно запомнить.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'пить — выпил',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'drink — drank',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'small',
							children: [
								{ type: 'text', color: 'gray', weight: 'normal', text: 'Не ' },
								{ type: 'text', color: 'error', weight: 'normal', text: 'drinked' },
								{ type: 'text', color: 'gray', weight: 'normal', text: ', а ' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'drank' },
								{
									type: 'text',
									color: 'gray',
									weight: 'normal',
									text: '. Нужно запомнить.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: false,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'есть — ел',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'eat — ate',
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
									text: 'Неправильные глаголы есть в таблице неправильных глаголов. А ещё они будут указаны в упражнениях.',
								},
							],
						},
						{
							type: 'note',
							noteStyle: 'gray',
							children: [
								{
									type: 'paragraph',
									offset: false,
									textSize: 'small',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: 'Глагол ',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'bold',
											text: 'be',
										},
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
											text: ' тоже считается неправильным.',
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Очень давно в английском многие глаголы имели свои формы прошедшего времени. Но постепенно стали подчиняться формальному правилу -',
						},
						{ type: 'text', color: 'black', weight: 'bold', text: 'ed' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Но некоторые из них сохранили своё наследие до сегодняшнего дня.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Неправильные глаголы ещё и самые частоиспользуемые глаголы в английском. А всего их около 200.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Тут никто не жил.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Nobody lived there.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'Live' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' — правильный глагол. Прошедшее время образуется по правилу добавления -',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'ed' },
				{ type: 'text', color: 'gray', weight: 'normal', text: ' к инфинитивной форме.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я понял этот вопрос.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I understood this question.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'Understand' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' — неправильный глагол. В прошедшем времени будет ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'understood' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '. Это нужно запомнить' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Он дал мне ключ.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'He gave me a key.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'Give' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' — неправильный глагол. Прошедшее время будет ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'gave' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '. Это нужно запомнить.' },
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Автомобиль также врезался в школьный автобус.',
					engSentences: [{ engSentences: ['The truck also hit a school bus.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мой начальник позволил взять перерыв.',
					engSentences: [{ engSentences: ['My boss let me take a break.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					note: 'В русском языке когда говорят про родственников, то подразумеваютк «свойх» родственников, а не каких-то чужих. А в английском всегда уточняйте чей родственник. Потому что английские мозги так устроены, что хотят точно знать каком объекте сообщаете: определённом или не определённом.',
					rusSentence: 'Он дал сестре деньги.',
					engSentences: [{ engSentences: ['He gave his sister money.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					note: 'В русском языке когда говорят про родственников, то подразумеваютк «свойх» родственников, а не каких-то чужих. А в английском всегда уточняйте чей родственник. Потому что английские мозги так устроены, что хотят точно знать каком объекте сообщаете: определённом или не определённом.',
					rusSentence: 'Он позволил мне уйти.',
					engSentences: [{ engSentences: ['He let me go.'], isCorrect: true }],
					words: [
						{ rusWord: 'ходить (куда-то)', engWord: 'go' },
						{ rusWord: 'стоматолог', engWord: 'every' },
						{ rusWord: 'каждый год', engWord: 'year' },
					],
				},
				{
					rusSentence: 'Родители купили машину прошлым летом.',
					engSentences: [{ engSentences: ['My parents bought a car last summer.'], isCorrect: true }],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Всё, что у них было теперь наше.',
					engSentences: [{ engSentences: ['Everything they have is now ours.'], isCorrect: true }],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Пэм принесла пластиковые тарелки, чашки и вилки.',
					engSentences: [
						{
							engSentences: ['Pam brought plastic plates, cups and forks.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Когда они вышли из конюшни, они увидели шерифа и профессора.',
					engSentences: [
						{
							engSentences: ['When they left the stable they saw the sheriff and Professor.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence: 'Он выглядел иначе когда был студентом.',
					engSentences: [
						{
							engSentences: ['He looked different when he was a student.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
				{
					rusSentence:
						"Kalamake looked strange. His skin was whiter than the other people's and he was blind.",
					engSentences: [
						{
							engSentences: [
								"Kalamake looked strange. His skin was whiter than the other people's and he was blind.",
							],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'ходить (куда-то)', engWord: 'go' }],
				},
			],
			offset: true,
		},
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Изменение части речи в зависимости от положения слова в предложении',
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'В главе про прилагательные я писал, что они могут иметь окончание -ed. И правильные глаголы в прошедшем времени имеют то же окончание. Даже более того одно и то же слово будет разными частями речи в зависимости от того слово какой части речи идёт до него.',
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
					text: 'Слово confuse является глаголом «запутывать», «сбивать с толку». Глагол правильный, поэтому в прошедшем времени confused.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'This words confused Keola.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Эти слова смутили Кеолу.',
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
					text: 'Поставлю confused после be и он станет прилагательным смущённый.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Keola is confused.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Кеола смущённый.' },
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
					text: 'Чтобы понять какой части речи слово нужно посмотреть что стоит перед ним. В первом предложении перед confused существительное words. Если бы после words, стоять запятая, то значит идёт перечисление существительных, но запятой нет. Значит не существительное. Прилагательное тоже не может быть потому что в английском оно всегда стоить до существительного в отличии от русского языка. Единственным логичным вариантом будет глагол. Ещё в пользу глагола говорит то, что This words — это подлежащее. А после подлежащего может быть только глагол.',
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
					text: 'confused во втором предложении стоит после глагола be. После него может быть или прилагательное или существительное. Существительных с окончанием -ed нет. К тому же перед ним стоял бы определитель или оно было бы во множественном числе. Поэтому confused — это прилагательное без вариантов.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					offset: false,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Определители существительного не только поясняют определённость, но и указывают что далее идёт существительное. Это дополнительная помощь чтобы разобраться с частями речи.',
						},
					],
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
					text: 'Понимание части речи — ключ к успешному переводу предложений. На таких простых примерах представленных выше это не кажестя чем-то сложным. Но в более сложных примерах можно легко потеряться и не понять смысла.',
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
					text: 'Такое динамическое изменения части речи во многих словах обычное дело в английском языке. Поэтому переводчик для одного и того же слова представляет переводы для нескольких частей речи.',
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
					text: 'Понимание что может стоять после определённых частей речи можно вывести логически. Никакие таблицы для этого не нужны.',
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
					text: 'Так как часть речи может быть любой, то поэтому в английском языке важен порядок слов в предложении.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Будущее время (Future Simple)' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Будущее время ничем не отличается от предложений с ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'black', weight: 'normal', text: '. Только вместо ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'be' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ставьте любой другой глагол.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Маша принесёт ужин.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Masha will bring dinner.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Магазин откроется завтра.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'The shop will open tomorrow.',
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
					text: 'Напомню почему именно так. Английский глагол имеет только инфинитивную форму и формы прошедшего и будущего времени. Чтобы указать на будущие добавляют модальный глагол ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', который означает «изволить что-то сделать в будущем». Сам глагол ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'will' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' стоит в настоящем времени. И получаеся всё предложение тоже в настоящем. Но по смыслу обозначает будущее. Остальные глаголы время не передают и находятся в инфинитивной форме.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Я приду в субботу.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'I will come on Saturday.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: 'Дословно английский перевод звучит как «Я имею волю приходить в субботу».',
				},
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					rusSentence: 'Ты победишь, без всяких сомнений.',
					engSentences: [{ engSentences: ['You will win, no doubts.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Мой отпуск закончится завтра.',
					engSentences: [{ engSentences: ['My vacation will end tomorrow.'], isCorrect: true }],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
				{
					rusSentence: 'Я буду мыть кошачью миску каждое утро.',
					engSentences: [
						{
							engSentences: ["I will wash the cat's bowl every morning."],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'популярный', engWord: 'popular' }],
				},
			],
			offset: true,
		},
	],
}

export default presentSimple
