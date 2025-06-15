import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const the: ArticleType.Art = {
	meta: {
		number: 5,
		slug: 'the',
		name: 'Определённый артикль the',
		description: 'Определённый артикль the используется перед сущностями известными собеседнику из контекста. ',
		keywords: 'артикль the, множественное число, случаи употребления',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Существительное может обозначать как конкретный предмет, так и любой предмет этого класса. Возьму такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [{ type: 'text', text: 'Купи, пожалуйста, мяч.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Если про мяч сообщается впервые, то будет обозначать просьбу купить ',
				},
				{
					type: 'text',
					text: 'любой',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' мяч. А если упоминался ранее или понятно о каком мяче идёт речь (говорящий держит в руках), то конкретный. В русском языке это понимают по контексту.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Англоговорящие же явно указывают определитель существительного:',
				},
			],
		},
		{
			type: 'list',
			listType: 'dots',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Неопределённый артикль a',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' для обозначения любого предмета этого класса;',
						},
					],
				},
				{
					type: 'paragraph',
					children: [
						{
							type: 'text',
							text: 'Определённый артикль the',
							color: 'gold',
						},
						{
							type: 'text',
							text: ' для конкретного.',
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
					text: 'Давайте в предложении «',
				},
				{
					type: 'text',
					text: 'Машина в гараже',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '» подставим разные артикли и посмотрим как изменяется смысл.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-92750',
			cells: [
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'gold', text: 'A' },
								{
									type: 'text',
									text: ' car in ',
								},
								{ type: 'text', color: 'gold', text: 'a' },
								{ type: 'text', text: ' garage' },
							],
						},
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Какая-то машина в каком-то гараже.',
								},
							],
						},
						{
							type: 'paragraph',
							textSize: 'small',
							children: [
								{
									type: 'text',
									text: 'Предложение лишённое смысла потому что не понятно что это должно сказать собеседнику.',
									color: 'gray',
								},
							],
						},
					],
				},
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', text: 'The' },
								{
									type: 'text',
									text: ' car in ',
								},
								{ type: 'text', color: 'gold', text: 'a' },
								{ type: 'text', text: ' garage' },
							],
						},
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									text: 'Конкретная машина сейчас в каком-то гараже, а не стоит, к примеру, на улице.',
								},
							],
						},
					],
				},
				{
					minWidth: '220px',
					width: '1fr',
					children: [
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [
								{ type: 'text', color: 'blue', text: 'The' },
								{
									type: 'text',
									text: ' car in ',
								},
								{ type: 'text', color: 'blue', text: 'the' },
								{ type: 'text', text: ' garage' },
							],
						},
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Конкретная машина в конкретном гараже.',
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
					offset: true,
					children: [
						{
							type: 'text',
							text: 'С точки зрения русского языка такое уточнение избыточно потому что мы понимает из контекста о каком существительном говорят. Но англоговорящие мыслят другими категориями и приходится перестраивать своё мышление чтобы говорить грамотно.',
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
					text: 'Вы не можете поставить ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' перед существительным если собеседник не понимает о каком предмете идёт речь. Это как на русском сказать «Я прочитал ту самую статью». Если собеседник не понимает о какой той самой статье идёт речь, то будет озадачен.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Случаи употребления' },
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Перед существительными введёнными в контекст ранее',
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					text: 'В примере ниже это магазин. Сначала на него указали ',
				},
				{
					type: 'text',
					text: 'введя в контекст',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ', а затем достали использовав ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', weight: 'bold', text: 'Этот магазин' },
						{ type: 'text', text: ' очень дорогой.' },
					],
				},
				{
					eng: [
						{ type: 'text', weight: 'bold', text: 'This shop' },
						{ type: 'text', text: ' is very expensive.' },
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
						{ type: 'text', color: 'blue', text: 'Магазин' },
						{ type: 'text', text: ' ещё и закрыт сегодня.' },
					],
				},
				{
					eng: [
						{ type: 'text', color: 'blue', text: 'The shop' },
						{ type: 'text', text: ' is also closed today.' },
					],
				},
			],
		},
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Перед существительными находящимися в глобальном контексте ',
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Некоторые конкретные существительные понятны и без ввода в контекст. Например предложения ниже собеседник поймёт как «зима в этом году была ветренной». То есть одна конкретная зима. Поэтому зиму даже не нужно было вводить в контекст. И так понятно что подразумевалось.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Зима была ветренной.' }] },
				{
					eng: [
						{ type: 'text', color: 'blue', text: 'The winter' },
						{ type: 'text', text: ' was windy.' },
					],
				},
			],
		},
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Перед существительными, которые по определению будут единственными',
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'На корабле может быть только один капитан. А в стране только один президент. Поэтому такие существительные используются с ',
				},
				{
					type: 'text',
					text: 'the',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' даже если упоминаются в первый раз.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Туда же относятся предметы имеющие свойство в превосходной степени потому что может быть только один такой объект.',
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
							text: 'Он был ',
						},
						{
							type: 'text',
							text: 'самым молодым федеральным судьёй',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' в стране.',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'He was ',
						},
						{
							type: 'text',
							text: 'the youngest federal judge',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' in the country.',
						},
					],
				},
			],
		},
		{
			type: 'header',
			tag: 'h3',
			style: 'h3',
			text: 'Перед существительными ясными из контекста',
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Или заходите в квартиру и спрашиваете «Где туалет?». Перед туалетом тоже будет артикль ',
				},
				{ type: 'text', color: 'blue', text: 'the' },
				{
					type: 'text',
					text: ' потому что в большинстве случаев в квартире есть один единственный туалет. Он и подразумевается. Даже если это большой дом с несколькими уборными, то такое построение фразы будет верным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'Если сидите в машине и она не заводится, то перед engine будет стоять определённый артикль потому что понятно из контекста о каком двигателе идёт речь.',
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
							text: 'Двигатель',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' не запускается.',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'The engine',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' refuses to start.',
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
					text: 'Иногда ',
				},
				{
					type: 'text',
					text: 'the',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' употребляется в отношении существительного, которые ещё не появлялось в контексте, но может быть понятно слушателю. Например:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Я хожу в ' },
						{ type: 'text', text: '(тот самый)', color: 'gray' },
						{ type: 'text', text: ' обувной магазин' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'I go to ' },
						{ type: 'text', text: 'the shoe shop', color: 'blue' },
						{ type: 'text', text: '.' },
					],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'По артиклю ',
				},
				{
					type: 'text',
					text: 'the',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' собеседник должен понять о каком магазине идёт речь. Может это магазин, в который говорящий ходит всегда или ближайший обувной магазин. Вообщем собеседник должен понять о чём идёт речь. Если бы был использован неопределённый артикль, то фраза был обозначала любой магазин. Говорящий пока сам не знает в какой магазин пойдёт. Просто в любой.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{ type: 'text', text: 'Я хожу в ' },
						{ type: 'text', text: '(любой)', color: 'gray' },
						{ type: 'text', text: ' обувной магазин.' },
					],
				},
				{
					eng: [
						{ type: 'text', text: 'I go to ' },
						{ type: 'text', text: 'a shoe shop', color: 'blue' },
						{ type: 'text', text: '.' },
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
					offset: true,
					children: [
						{
							type: 'text',
							text: 'Артикль ',
						},
						{
							type: 'text',
							text: 'the',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' можно ставить к любым типам существительных, а не только к исчисляемым в единственном числе как у неопределённого артикля ',
						},
						{
							type: 'text',
							text: 'a',
							color: 'blue',
						},
						{
							type: 'text',
							text: '.',
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
					text: 'Попробуйте самостоятельно понять какой артикль ставить и где в упражнении.',
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Исключения' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'К сожалению для изучающих английский простое правило «Ставьте определённый артикль для определённых существительных, а для неопределённых неопределённый» не универсально. Есть много случаев когда оно нарушается только потому что так принято говорить.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Например Соединённое Королевство пишется с ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' потому что это конкретная и единственная страна. Другой нет.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Соединённое Королевство' }] },
				{ eng: [{ type: 'text', text: 'The United Kingdom' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но в отношении Франции, России ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' не ставится, хотя это тоже страны.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [{ type: 'text', text: 'Франция' }] }, { eng: [{ type: 'text', text: 'France' }] }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Во фразе «играть в футбол» перед «футболом» не ставится никакой артикль потому что неопределённый артикль нельзя поставить потому что это неисчисляемое существительное, а определённый потому что это не конкретный объект, а название игры.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Играть в футбол' }] },
				{ eng: [{ type: 'text', text: 'Play football' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но перед названием музыкальных всегда ставят ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' хотя всегда имеют в виду любой музыкальный инструмент.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Играть на гитаре' }] },
				{ eng: [{ type: 'text', text: 'Play the guitar' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'С некоторыми существительным: «озеро», «река», «парк», «лес», «кинотеатр», «телефон» всегда используют с ',
				},
				{
					type: 'text',
					text: 'the',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' даже если не подразумевают конкретное место или вещь.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он всегда говорит по телефону.' }] },
				{ eng: [{ type: 'text', text: 'He always talks on the phone.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'При этом слова «больница», «школа» в большинстве случаев используют без артиклей.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Такие исключения будут последовательно разбираться в следующих статьях.',
				},
			],
		},
	],
}

export default the
