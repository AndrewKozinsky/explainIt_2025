import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'
import exercises_4 from './exercises-4'

const verbAfterVerb: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'verb-after-verb',
		name: 'Глагол после глагола',
		description: 'Изучите как поставить другой глагол после глагола.',
		keywords: 'Перевод, английский, русский, глагол, be, was, were, отрицательное предложение',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Из предыдущих глав вы знаете, что английский глагол может находиться в одной из трёх форм:',
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
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Неопределённой' },
						{
							type: 'paragraph',
							offset: true,
							children: [
								{
									type: 'text',
									text: 'Отвечает на вопрос «Что делать?»:',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'Красить, открывать, лить.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Настоящего времени' },
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Отвечает на вопрос «Что делаю?»:',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'Крашу, открываю, лью.',
								},
							],
						},
					],
				},
				{
					minWidth: '300px',
					width: '1fr',
					children: [
						{ type: 'header', tag: 'h4', style: 'h4', text: 'Прошедшего времени' },
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Отвечает на вопрос «Что сделал?»:',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'big',
							children: [
								{
									type: 'text',
									text: 'Покрасил, открыл, пролил.',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'С неопределённой формой глагола (ещё называют инфинитивом) мы ещё не сталкивались. Это форма действия без указания времени. В английском она ставится после другого глагола и с предлогом to.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Наша цель улучшить результат.',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'Our goal is to improve the result.',
						},
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Щенок хотел прыгать и бегать.',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'The puppy wanted to jump and ',
						},
						{ type: 'text', color: 'blue', text: 'run' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Ник хочет ' },
						{ type: 'text', color: 'gray', text: '(что сделать?)' },
						{ type: 'text', text: ' ' },
						{ type: 'text', color: 'blue', text: 'закрыть' },
						{ type: 'text', text: ' окно.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'Nic wants ' },
						{ type: 'text', color: 'blue', text: 'to close' },
						{ type: 'text', text: ' the window.' },
					],
				},
			],
		},
		exercises_1,
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Глагол be точно так же может быть быть в неопределённой форме если находится после другого глагола.',
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
					text: 'Для создания отрицания инфинитиву не требуется помощь вспомогательного глагола. Not можно добавить прямо к нему.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Я был счастлив не видеть тебя.',
						},
					],
				},
				{
					eng: [
						{ type: 'text', text: 'I was happy ' },
						{ type: 'text', color: 'blue', text: 'not to see' },
						{ type: 'text', text: ' you.' },
					],
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
					text: 'После слов started и прочих глагол пишется с окончанием -ing.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он побежал через гору, а я последовал за ним.' }] },
				{ eng: [{ type: 'text', text: 'He started running across the mountain, and I followed him.' }] },
			],
		},
		exercises_4,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Тут расскажи про слово «чтобы».',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я здесь, чтобы расследовать ограбление.' }] },
				{ eng: [{ type: 'text', text: 'I am here to investigate a robbery.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Она открыла окно чтобы впустить свежего воздуха.' }] },
				{ eng: [{ type: 'text', text: 'She opened the window to get some fresh air.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Я хочу, чтобы ты напал на меня.' }] },
				{ eng: [{ type: 'text', text: 'I want you to attack me.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Моя работа — предоставить вам всю информацию по этому вопросу.' }] },
				{ eng: [{ type: 'text', text: 'It is my job to give you all the information about it.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Как приятно встретить разумного клиента.' }] },
				{ eng: [{ type: 'text', text: 'How nice to meet a reasonable customer.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: '========================',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если перед глаголом в неопределённой форме стоит and (и) либо or (или), то частицу to не ставят.',
				},
			],
		},
	],
}

export default verbAfterVerb
