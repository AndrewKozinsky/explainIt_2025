import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'
import exercises_4 from './exercises-4'
import exercises_5 from './exercises-5'
import exercises_6 from './exercises-6'

const imperative: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'imperative',
		name: 'Повелительное наклонение',
		description: 'Изучите как поставить другой глагол после глагола.',
		keywords: 'Перевод, английский, русский, глагол, be, was, were, отрицательное предложение',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Во всех главах выше мы составляли предложения по формуле Subject (подлежащее) + Verb (сказуемое). Они выражают факты или действия, которые происходили, происходят или произойдут.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Я рассказал тебе всё сразу.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Ты даёшь мне деньги.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Такие предложения построены в изъявительном наклонении. Изъявлять — это значит выражать какое-то действие.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё есть повелительное наклонение. Это когда говорящий советует, просит или приказывает совершить действие другому лицу.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Расскажи мне всё сразу.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Дай мне деньги.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В английском языке такие предложения начинаются с глагола в форме голого инфинитива.',
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
							text: 'Дай мне деньги.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Give the money to me.' }],
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
							text: 'Расскажи мне всё прямо сейчас.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Tell me everything right now.' }],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Как видите от изъявительного наклонения такие предложения отличаются отсутствием подлежащего и глагол стоит в форме голого инфинитива.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Нередко когда повелительное предложение состоит из одного глагола.',
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
							text: 'Поторопись!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Hurry!' }],
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
							text: 'Говорите!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Speak!' }],
				},
			],
		},
		exercises_1,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Вежливая форма' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Слово please (пожалуйста) в начале или в конце предложения смягчает просьбу.',
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
							text: 'Закройте окно, пожалуйста.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Close the window, please.' }],
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
							text: 'Пожалуйста, оставайтесь спокойным!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Please, keep quiet.' }],
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
							text: 'А теперь, пожалуйста, расскажи про свои проблемы!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Now please, tell me your problems.' }],
				},
			],
		},
		exercises_2,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Усиление просьбы' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Для усиления просьбы инфинитивом ставят смысловой глагол do. Do можно перевести словами «обязательно», «непременно».',
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
							text: 'Обязательно',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' приезжайте раньше, чтобы избежать толпы.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do come early to avoid the crowd.' }],
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
							text: 'Непременно',
							color: 'blue',
						},
						{
							type: 'text',
							text: ' повеселись сегодня.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do have fun today.' }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Слова «обязательно», «непременно» можно и не писать если просьба уже сама достаточно сильная.',
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
							text: 'Пишите часто, нам нужно постоянно быть на связи.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do write often, we must stay in contact.' }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Do ещё можно перевести частицами «же», «да», «ну».',
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
							text: 'Да садись ',
						},
						{
							type: 'text',
							text: 'же',
							color: 'blue',
						},
						{
							type: 'text',
							text: '.',
						},
					],
				},
				{
					eng: [
						{ type: 'text', text: 'Do', color: 'blue' },
						{ type: 'text', text: ' sit down.' },
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
							text: 'Да выключите же звук!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do turn off the sound.' }],
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
							text: 'Ну простите меня, я не хотел вас обидеть.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do forgive me, I did not want to hurt you.' }],
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
							text: 'Do + глагол усиливает глагол. Если же do стоит без глагола, то является смысловым глаголом «делать».',
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
									text: 'Сделай это один раз и сделай правильно.',
								},
							],
						},
						{
							eng: [{ type: 'text', text: 'Do it once and do it right.' }],
						},
					],
				},
			],
		},
		exercises_3,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Запрет' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Для запрета что-либо делать используется глагол stop + причастие.',
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
							text: 'Прекрати вести себя так!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Stop acting like this!' }],
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
							text: 'Хватит устраивать скандалы!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Stop making scandals!' }],
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
							text: 'Хватит думать, что медитация — это что-то особенное!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Stop thinking that meditation is anything special.' }],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Глагол be тоже может быть в форме причастия и обозначает «вести себя каким-то образом».',
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
							text: 'Перестань злиться на более успешных людей!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Stop being angry at  more successful people.' }],
				},
			],
		},
		exercises_4,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Категоричный запрет' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Это достигается добавлением глагола do с отрицанием перед смысловым глаголом.',
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
							text: 'Не лги мне.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do not lie to me.' }],
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
							text: 'Не трогай эту большую шкатулку.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do not touch this big casket.' }],
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
							text: 'Не спрашивай меня про твоего отца.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Do not ask me about you father.' }],
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
							text: 'Полная форма do not используется в навигационных табличках и прочих сообщениях, которые должны быть хорошо видны и читаемы.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Выражение let’s' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: "Let's расшифровывается как let us. Это сокращение используется для призыва что-то сделать. На русский переводится словом «давай» или вообще никак не переводится:",
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
							text: 'Давайте пойдём в кино.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Let’s go to the cinema.' }],
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
							text: 'Давай встретимся на автобусной остановке.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: "Let's meet at the bus station." }],
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
							text: 'Давайте пойдём и встретимся с ним.',
						},
					],
				},
				{
					eng: [{ type: 'text', text: "Let's go and see him." }],
				},
			],
		},
		exercises_5,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Употребление you' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Выше я писал, что повелительное предложение характеризует отсутствие подлежащего. Но иногда чтобы усилить просьбу ставят подлежащее you и в зависимости от контекста это может быть или повелительным или изъявительным предложением. You на русский может переводиться по-разному.',
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
							text: 'You stop vehicle!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'А ну-ка остановите автомобиль!' }],
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
					text: 'Маловероятно, что предложение переводится как «Вы останавливаете автомобиль» в значении постоянно совершаемого действия. Если бы тут шла речь про текущий момент, то предложение было бы построено в Present Continuous. Но это не так. Поэтому самый логичный вариант повелительное наклонение.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'You leave me alone!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Да оставьте же вы меня в покое!' }],
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
					text: 'Это предложение в равной степени может переводить как «Ты (постоянно) оставляешь меня одной!» и «Оставь меня в покое!». Правильный перевод зависит от контекста.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'You take your hands off me!',
						},
					],
				},
				{
					eng: [{ type: 'text', text: 'Да убери от меня свои руки!' }],
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
					text: 'По тону высказывания похоже на приказ. Поэтому повелительное наклонение.',
				},
			],
		},
		exercises_6,
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
										text: 'Такое предложение является повелительным наклонением?',
									},
								],
							},
							{
								type: 'rusToEng',
								textSize: 'big',
								parts: [
									{
										rus: [
											{
												type: 'text',
												text: 'Как правило, бывает достаточно одного стакана в день.',
											},
										],
									},
									{
										eng: [{ type: 'text', text: 'Usually 1 cup a day is enough.' }],
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
										text: 'Нет, потому что тут есть полноценное подлежащее 1 cup a day за которым следует глагол be.',
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

export default imperative
