import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'
import exercises_4 from './exercises-4'

const demonstrativePronounce: ArticleType.Art = {
	meta: {
		number: 10,
		slug: 'demonstrative-pronouns',
		name: 'Указательные местоимения',
		description: 'Указательные местоимения используются для ввода в контекст нового персонажа или предмета.',
		keywords: 'Указательные местоимения, this, that, зыс, зет',
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'This и that' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Указательные местоимения используются чтобы указать на персонаж, предмет, событие.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(этот)' },
				{
					type: 'text',
					text: ' используют когда говорят о предмете находящимся ближе к нам, а ',
				},
				{ type: 'text', color: 'blue', text: 'that' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(тот)' },
				{
					type: 'text',
					text: ' когда дальше. Под «ближе/дальше» подразумевается расстояние, эмоциональная окраска, время.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Предметы на разном расстоянии' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Если один предмет находится ближе другого, то для указания на более близкий используют ',
				},
				{ type: 'text', weight: 'bold', text: 'this' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(ближе)' },
				{ type: 'text', text: ', а для более дальнего ' },
				{ type: 'text', weight: 'bold', text: 'that' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(дальше)' },
				{ type: 'text', text: ':' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Это' },
						{ type: 'text', text: ' новая машина, а ' },
						{ type: 'text', color: 'blue', text: 'та' },
						{ type: 'text', text: ' старая.' },
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'This' },
						{ type: 'text', text: '’s a new car, but ' },
						{ type: 'text', color: 'blue', text: 'that' },
						{ type: 'text', text: ' car is old.' },
					] },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Новая машина ближе, а старая дальше.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если указываете только один предмет без сравнения с другим, то this и that выбирайте от удалённости от вас.',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: 'Чтобы одно и то же существительное не повторять несколько раз его обычно заменяют на слово one. Предложение выше можно передалать так:',
						},
					],
				},
				{
					type: 'rusToEng',
					textSize: 'big',
					parts: [
						{ rus: [
								{
									type: 'text',
									text: 'Это новая машина, а та старая.',
								},
							] },
						{ eng: [
								{
									type: 'text',
									text: 'This is a new car, but that one is old.',
								},
							] },
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
					text: 'Дистанцирование работает и при телефонном разговоре. Чтобы указать на себя используют ',
				},
				{ type: 'text', weight: 'bold', text: 'this' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(ближе)' },
				{
					type: 'text',
					text: '. Чтобы указать на собеседника, то ',
				},
				{ type: 'text', weight: 'bold', text: 'that' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(дальше)' },
				{
					type: 'text',
					text: ' потому что он находится далеко, на другом конце провода.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', text: '— Hello. ' },
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', text: ' is Andrew. Is ' },
				{ type: 'text', color: 'blue', text: 'that' },
				{ type: 'text', text: ' Victoria?' },
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Эмоциональное дистанцирование' },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', weight: 'bold', text: 'This' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(ближе)' },
				{
					type: 'text',
					text: ' если относятся к объекту с положительным настроем:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это великолепно!' }] },
				{ eng: [{ type: 'text', text: 'This is awesome!' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{
							type: 'text',
							text: 'Эта сумочка очень дешёвая.',
						},
					] },
				{ eng: [{ type: 'text', text: 'This bag is very cheap.' }] },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', text: 'That ' },
				{ type: 'text', color: 'gray', text: '(дальше)' },
				{
					type: 'text',
					text: ' если относимся к объекту в негативном ключе, как бы дистанцируемся.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это кошмар!' }] },
				{ eng: [{ type: 'text', text: 'That is a disaster!' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Тот человек очень злой.' }] },
				{ eng: [{ type: 'text', text: 'That man is very angry.' }] },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					textSize: 'small',
					children: [
						{
							type: 'text',
							text: 'Похожее эмоциональное дистанцирование есть в русском языке. Если футбольная команда выиграла, то болельщики говорят «мы выиграли». Если програла, то «они проиграли».',
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
					text: 'Не воспринимайте это как какое-то абсолютные правило. Если на негативно окрашенное событие укажите через ',
				},
				{ type: 'text', weight: 'bold', text: 'this' },
				{
					type: 'text',
					text: ', то никакой проблемы не будет.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus:[{ type: 'text', text: 'Это кошмар!' }] },
				{ eng: [{ type: 'text', text: 'This is a disaster!' }] },
			],
		},
		exercises_2,
		{ type: 'header', tag: 'h3', style: 'h3', text: 'События в разном времени' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'О событии происходящим в текущее время говорят через ',
				},
				{ type: 'text', weight: 'bold', text: 'this' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(ближе)' },
				{ type: 'text', text: ', про прошедшее через ' },
				{ type: 'text', weight: 'bold', text: 'that' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(дальше)' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'Вы на концерте любимой группы. Выступление вам нравится, и вы говорите:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это великолепно!' }] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'This ' },
						{ type: 'text', text: ' is great!' },
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Когда после концерта вы звоните другу и описываете все, что увидели (ситуацию в прошлом) вы говорите:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это было великолепно!' }] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'That' },
						{ type: 'text', text: ' was great!' },
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text', weight: 'bold', text: 'This' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gray', text: '(ближе)' },
				{
					type: 'text',
					text: ' также используют если событие ещё не произошло .',
				},
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'header',
					tag: 'h4',
					style: 'h4',
					text: 'Не ориентируйтесь на русский язык при переводе',
				},
				{
					type: 'paragraph',
					textSize: 'small',
					children: [
						{
							type: 'text',
							text: 'При переводе на английский язык указательных местоимений ориентируйтесь на правила приведённые здесь, а не на русский язык. Например если яблоко в руках собеседника, то по-русски я скажу «Дай мне это яблоко». А по-английски «Give me that ',
						},
						{ type: 'text', color: 'gray', text: '(то)' },
						{
							type: 'text',
							text: ' apple» потому что оно находится не в моей зоне доступа.',
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

							text: 'Если я буду рассказывать о произошедшем событии, то я скажу «Этот концерт был потрясающий», а по английски «That ',
						},
						{ type: 'text', color: 'gray', text: '(тот)' },
						{
							type: 'text',

							text: ' concert was marvellous». В этом случае для нас разница между «этот» или «тот» незначительна, но она принципиальна для английского языка. Употребить this в этом случае будет ошибкой.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отсылка к сказанному' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Если мы ссылаемся к сказанному, то применяется that ',
				},
				{ type: 'text', color: 'gray', text: '(дальше)' },
				{ type: 'text', text: ':' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{
							type: 'text',
							text: 'Вы — юрист? Да, это так.',
						},
					] },
				{ eng: [
						{
							type: 'text',
							text: 'Are you a lawyer? Yes, that is right.',
						},
					] },
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Отличие this/that от it' },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', weight: 'bold', text: 'This' },
				{ type: 'text', text: '/' },
				{ type: 'text', weight: 'bold', text: 'that' },
				{
					type: 'text',
					text: ' вводят предмет в контекст:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{
							type: 'text',
							text: 'Этот торт очень очень дорогой.',
						},
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'This' },
						{
							type: 'text',
							text: ' cake is very expensive.',
						},
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'При последующем указании на предмет используйте ',
				},
				{ type: 'text', weight: 'bold', text: 'it' },
				{ type: 'text', text: ':' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Но он очень вкусный.' }] },
				{ eng: [
						{ type: 'text', text: 'But ' },
						{ type: 'text', color: 'blue', text: 'it ' },
						{ type: 'text', text: 'is very tasty.' },
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё пример как в одном предложении сначала указывается на существительное через this, а затем используется it для его обозначания:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{
							type: 'text',
							text: 'Это не религиозность, это не духовность, это не мистика.',
						},
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'This' },
						{ type: 'text', text: ' is not religious, ' },
						{ type: 'text', color: 'blue', text: 'it' },
						{ type: 'text', text: ' is not spiritual, ' },
						{ type: 'text', color: 'blue', text: 'it' },
						{ type: 'text', text: ' is not mystical.' },
					] },
			],
		},
		exercises_3,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'These и those' },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Местоимения ' },
				{ type: 'text', weight: 'bold', text: 'this' },
				{ type: 'text', text: ' и ' },
				{ type: 'text', weight: 'bold', text: 'that' },
				{
					type: 'text',
					text: ' используются с существительными в единственном числе. Для указания на несколько предметов вместо ',
				},
				{ type: 'text', color: 'gold', text: 'this' },
				{ type: 'text', text: ' используют ' },
				{ type: 'text', color: 'blue', text: 'these' },
				{ type: 'text', text: ', а вместо ' },
				{ type: 'text', color: 'gold', text: 'that' },
				{ type: 'text', text: ' — ' },
				{ type: 'text', color: 'blue', text: 'those' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-54454',
			cells: [
				{
					children: [
						{
							type: 'rusToEng',
							textSize: 'giant',
							parts: [
								{ rus: [
										{
											type: 'text',
											text: 'этот — this',
										},
									] },
								{ eng:[
										{
											type: 'text',
											text: 'эти — these',
										},
									] },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							parts: [
								{ rus: [
										{
											type: 'text',
											text: 'Эта сумка огромная.',
										},
									] },
								{ eng: [
										{ type: 'text', color: 'gold', text: 'This' },
										{
											type: 'text',
											text: ' bag is huge.',
										},
									] },
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							parts: [
								{ rus: [
										{
											type: 'text',
											text: 'Эти сумки огромные.',
										},
									] },
								{ eng:[
										{ type: 'text', color: 'blue', text: 'These' },
										{
											type: 'text',
											text: ' bags are huge.',
										},
									] },
							],
						},
					],
				},
				{
					children: [
						{
							type: 'rusToEng',
							textSize: 'giant',
							parts: [{ rus: [
									{
										type: 'text',
										text: 'тот — that',
									},
								] }, { eng: [
									{
										type: 'text',
										text: 'те — those',
									},
								] }],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							parts: [{ rus: [
									{
										type: 'text',
										text: 'Тот человек ненадёжен.',
									},
								] }, { eng: [
									{ type: 'text', color: 'gold', text: 'That' },
									{
										type: 'text',
										text: ' person is unreliable.',
									},
								] }],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							parts: [{ rus: [
									{
										type: 'text',
										text: 'Те люди ненадежные.',
									},
								] }, { eng: [
									{ type: 'text', color: 'blue', text: 'Those' },
									{
										type: 'text',
										text: ' people are unreliable.',
									},
								] }],
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
					text: 'Давайте для практики переведём такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [{ type: 'text', text: 'Это наши дети.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Можно дать такой вариант:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [{ type: 'text', text: 'It is our children.' }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Это — это ' },
				{ type: 'text', weight: 'bold', text: 'it' },
				{ type: 'text', text: '. После ' },
				{ type: 'text', weight: 'bold', text: 'it' },
				{ type: 'text', text: ' ставится ' },
				{ type: 'text', weight: 'bold', text: 'is' },
				{
					type: 'text',
					text: '. А дальше идут «наши дети».',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но это не правильно потому что «дети» — это множество людей. А местоимением ',
				},
				{ type: 'text', weight: 'bold', text: 'it' },
				{
					type: 'text',
					text: ' можно заменить только существительное в единственном числе. Для выражения множественного числа подходит местоимение ',
				},
				{ type: 'text', weight: 'bold', text: 'they' },
				{
					type: 'text',
					text: ' независимо от того человек это или неодушевлённый предмет.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [{ type: 'text', text: 'They are our children.' }],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'Но если существительное упоминаются в первый раз, то лучше использовать не личные, а указательные местоимения. А тут, похоже, дети упоминаются в первый раз, поэтому заменю ',
				},
				{ type: 'text', weight: 'bold', text: 'they' },
				{ type: 'text', text: ' на ' },
				{ type: 'text', weight: 'bold', text: 'these' },
				{ type: 'text', text: ' или ' },
				{ type: 'text', weight: 'bold', text: 'those' },
				{ type: 'text', text: '. Выберу ' },
				{ type: 'text', weight: 'bold', text: 'these' },
				{
					type: 'text',
					text: ' потому что дети находятся скорее всего недалеко и упоминуются в положительном ключе.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text', text: 'These are our children.' }],
		},
		exercises_4,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Определяющее слово' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',
					text: 'Указательные местоимения являются определяющими словами обозначающими конкретный предмет. Поэтому другое определители ставить не требуется.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'Но тут важно разграничивать к какому существительному оно относится. Например:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [{ type: 'text', text: 'Это животное — жираф.' }] }, { eng: [
					{
						type: 'text',
						text: 'This animal is a giraffe.',
					},
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', weight: 'bold', text: 'This' },
				{
					type: 'text',
					text: ' относится к существительному «животное», поэтому перед ним другое определяющее слово не требуется. А «жираф» — это уже другое существительное, поэтому перед ним должно стоять другое определяющее слово. Так как подразумевают любого жирафа, то стоит неопределённый артикль a.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Подлежащее' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Указательные местоимения могут использоваться как подлежащее:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [{ type: 'text', text: 'Это великолепная идея!' }] }, { eng: [{ type: 'text', text: 'This is a great idea!' }] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Тут ' },
				{ type: 'text', weight: 'bold', text: 'this' },
				{ type: 'text', text: ' не относится к ' },
				{ type: 'text', weight: 'bold', text: 'great idea' },
				{
					type: 'text',
					text: ', а является подлежащим. Поэтому перед ',
				},
				{ type: 'text', weight: 'bold', text: 'great idea' },
				{
					type: 'text',
					text: ' ставится неопределённый артикль ',
				},
				{ type: 'text', weight: 'bold', text: 'a' },
				{ type: 'text', text: '.' },
			],
		},
	],
}

export default demonstrativePronounce
