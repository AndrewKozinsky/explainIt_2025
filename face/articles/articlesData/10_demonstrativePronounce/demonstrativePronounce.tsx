import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const demonstrativePronounce: ArticleType.Art = {
	meta: {
		number: 10,
		slug: 'demonstrative-pronouns',
		caption: 'Глава 10',
		articleName: 'Указательные местоимения',
		articleDescription: 'Указательные местоимения используются для ввода в контекст нового персонажа или предмета.',
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
			rus: [
				{ type: 'text', color: 'blue', text: 'Это' },
				{ type: 'text', text: ' новая машина, а ' },
				{ type: 'text', color: 'blue', text: 'та' },
				{ type: 'text', text: ' старая.' },
			],
			eng: [
				{ type: 'text', text: '' },
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', text: '’s a new car, but ' },
				{ type: 'text', color: 'blue', text: 'that' },
				{ type: 'text', text: ' car is old.' },
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
					rus: [
						{
							type: 'text',
							text: 'Это новая машина, а та старая.',
						},
					],
					eng: [
						{
							type: 'text',
							text: 'This is a new car, but that one is old.',
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
					children: [
						{ type: 'text', text: 'После ' },
						{ type: 'text', color: 'blue', text: 'this' },
						{
							type: 'text',
							text: ' нельзя ставить короткую форму глагола ',
						},
						{ type: 'text', color: 'blue', text: 'is' },
						{
							type: 'text',
							text: '. Про сокращённую форму be будет в одном из следующих уроков.',
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
							text: 'Но это действует не всегда. Американцы наоборот для указания на собеседника используют ',
						},
						{ type: 'text', weight: 'bold', text: 'this' },
						{ type: 'text', text: '.' },
					],
				},
				{
					type: 'rusToEng',
					textSize: 'big',
					rus: [{ type: 'text', text: 'Кто это?' }],
					eng: [{ type: 'text', text: 'Who’s this?' }],
				},
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Этот салат вкусный, а тот слишком острый.',
					engSentences: [
						{
							engSentences: ['This salad is delicious, but that is too spicy.'],
							isCorrect: true,
						},
						{
							engSentences: ['This salad is delicious, but this is too spicy.'],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',

											text: 'Грамматически правильно, но когда указывается на несколько предметов для одного будут использовать this, а для другого that. Выбор указательного местоимения ещё зависит от расстояния (this ближе, that дальше), эмоциональной окраски (this положительная, that отрицательная).',
										},
									],
								},
							],
						},
					],
					words: [
						{ rusWord: 'салат', engWord: 'a salad' },
						{ rusWord: 'вкусный', engWord: 'delicious' },
						{ rusWord: 'слишком', engWord: 'too' },
						{ rusWord: 'острый', engWord: 'spicy' },
					],
				},
				{
					rusSentence: 'Однако это не простой остров.',
					engSentences: [{ engSentences: ['This is not a simple island.'], isCorrect: true }],
					words: [
						{ rusWord: 'однако', engWord: 'however' },
						{ rusWord: 'простой', engWord: 'simple' },
						{ rusWord: 'остров', engWord: 'an island' },
					],
				},
				{
					rusSentence: 'Это ручка, а то – карандаш.',
					engSentences: [{ engSentences: ['This is a pen, and that is a pencil.'], isCorrect: true }],
					words: [
						{ rusWord: 'суп', engWord: 'soup' },
						{ rusWord: 'солёный', engWord: 'salty' },
						{ rusWord: 'вкусный', engWord: 'tasty' },
					],
				},
				{
					rusSentence: 'Это не так уж и безумно.',
					engSentences: [
						{ engSentences: ['This is not so crazy.'], isCorrect: true },
						{
							engSentences: [],
							isCorrect: false,
							analysis: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',

											text: 'В этом предложе«Он» — это третье лицо, поэтому to be будет в форме is.',
										},
									],
								},
							],
						},
					],
					words: [{ rusWord: 'безумный', engWord: 'crazy' }],
				},
				{
					rusSentence: 'Возможно, это не подходящие выходные.',
					engSentences: [
						{
							engSentences: ['Maybe this is not a suitable weekend.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'возможно', engWord: 'maybe' },
						{ rusWord: 'подходящий', engWord: 'suitable' },
					],
				},
				{
					rusSentence: 'Это великолепная идея!',
					engSentences: [{ engSentences: ['This is a great idea!'], isCorrect: true }],
					words: [
						{ rusWord: 'великолепный', engWord: 'great' },
						{ rusWord: 'идея', engWord: 'an idea' },
					],
				},
				{
					rusSentence: 'Это не ответ!',
					engSentences: [{ engSentences: ['That is not an answer!'], isCorrect: true }],
					words: [
						{ rusWord: 'очки', engWord: 'glasses' },
						{ rusWord: 'ужасный', engWord: 'terrible' },
					],
				},
				{
					rusSentence: 'Это глупо.',
					engSentences: [{ engSentences: ['That is stupid.'], isCorrect: true }],
					words: [
						{ rusWord: 'очки', engWord: 'glasses' },
						{ rusWord: 'ужасный', engWord: 'terrible' },
					],
				},
				{
					rusSentence: 'Это Катя, моя сводная сестра.',
					engSentences: [{ engSentences: ['This is Katya, my stepsister.'], isCorrect: true }],
					words: [{ rusWord: 'сводная сестра', engWord: 'a stepsister' }],
				},
				{
					rusSentence: 'Это не ваши следы.',
					engSentences: [{ engSentences: ['This is not your footsteps. '], isCorrect: true }],
					words: [{ rusWord: 'след', engWord: 'a footstep' }],
				},
				{
					rusSentence: 'Это не моя основная профессия.',
					engSentences: [{ engSentences: ['This is not my main occupation.'], isCorrect: true }],
					words: [
						{ rusWord: 'основной', engWord: 'main' },
						{ rusWord: 'профессия', engWord: 'occupation' },
					],
				},
				{
					rusSentence: 'Эта книга была великолепной.',
					engSentences: [{ engSentences: ['That book was excellent.'], isCorrect: true }],
					words: [
						{ rusWord: 'книга', engWord: 'a book' },
						{ rusWord: 'великолепный', engWord: 'excellent' },
					],
				},
			],
			offset: true,
		},
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
			rus: [{ type: 'text', text: 'Это великолепно!' }],
			eng: [{ type: 'text', text: 'This is awesome!' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Эта сумочка очень дешёвая.',
				},
			],
			eng: [{ type: 'text', text: 'This bag is very cheap.' }],
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
			rus: [{ type: 'text', text: 'Это кошмар!' }],
			eng: [{ type: 'text', text: 'That is a disaster!' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Тот человек очень злой.' }],
			eng: [{ type: 'text', text: 'That man is very angry.' }],
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
			rus: [{ type: 'text', text: 'Это кошмар!' }],
			eng: [{ type: 'text', text: 'This is a disaster!' }],
		},
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Это яблоко гнилое.',
					engSentences: [{ engSentences: ['This apple is rotten.'], isCorrect: true }],
					words: [
						{ rusWord: 'яблоко', engWord: 'an apple' },
						{ rusWord: 'гнилой', engWord: 'rotten' },
					],
				},
				{
					rusSentence: 'Тот человек очень злой.',
					engSentences: [{ engSentences: ['That man is very angry.'], isCorrect: true }],
					words: [
						{ rusWord: 'человек', engWord: 'man' },
						{ rusWord: 'злой', engWord: 'angry' },
					],
				},
				{
					rusSentence: 'Та змея очень ядовитая, а это обычный уж.',
					engSentences: [
						{
							engSentences: ['That snake is very toxic, and this is an common grass snake.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'змея', engWord: 'snake' },
						{ rusWord: 'ядовитый', engWord: 'toxic' },
						{ rusWord: 'обычный', engWord: 'usual' },
						{ rusWord: 'уж', engWord: 'a grass snake' },
					],
				},
				{
					rusSentence: 'Этот суп вкусный, а тот слишком солёный',
					engSentences: [
						{
							engSentences: ['This soup is tasty, but that one is too salty.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'суп', engWord: 'soup' },
						{ rusWord: 'солёный', engWord: 'salty' },
						{ rusWord: 'вкусный', engWord: 'tasty' },
					],
				},
				{
					rusSentence: 'Это побережье очень опасно.',
					engSentences: [{ engSentences: ['This coast is very dangerous.'], isCorrect: true }],
					words: [
						{ rusWord: 'побережье', engWord: 'a coast' },
						{ rusWord: 'опасный', engWord: 'a dangerous' },
					],
				},
				{
					rusSentence: 'Этот аромат нереальный, а те обычные дешёвые духи.',
					engSentences: [
						{
							engSentences: ['This fragrance is unreal, and those ordinary cheap perfume'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'аромат', engWord: 'fragranc' },
						{ rusWord: 'нереальный', engWord: 'unreal' },
						{ rusWord: 'обычный', engWord: 'ordinary' },
						{ rusWord: 'дешёвый', engWord: 'cheap' },
						{ rusWord: 'духи', engWord: 'perfume' },
					],
				},
				{
					rusSentence: 'Эта любовь сложная, но настоящая.',
					engSentences: [
						{
							engSentences: ["This love is difficult, but it's real."],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'аромат', engWord: 'fragrance' },
						{ rusWord: 'нереальный', engWord: 'unreal' },
						{ rusWord: 'обычный', engWord: 'ordinary' },
						{ rusWord: 'дешёвый', engWord: 'cheap' },
						{ rusWord: 'духи', engWord: 'perfume' },
					],
				},
				{
					rusSentence: 'К сожалению этот человек ненадежен.',
					engSentences: [
						{
							engSentences: ['Unfortunately, that person is unreliable.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'человек', engWord: 'a person' },
						{ rusWord: 'ненадежен', engWord: 'unreliable' },
					],
				},
				{
					rusSentence: 'Эта книга гораздо более интересная, чем та.',
					engSentences: [
						{
							engSentences: ['This book is much more interesting than that.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'очки', engWord: 'glasses' },
						{ rusWord: 'ужасный', engWord: 'terrible' },
					],
				},
				{
					rusSentence: 'Тот фильм не был замечательным.',
					engSentences: [{ engSentences: ['That movie wasn’t wonderful.'], isCorrect: true }],
					words: [
						{ rusWord: 'фильм', engWord: 'a movie' },
						{ rusWord: 'замечательный', engWord: 'wonderful' },
					],
				},
			],
			offset: true,
		},
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
			rus: [{ type: 'text', text: 'Это великолепно!' }],
			eng: [
				{ type: 'text', color: 'blue', text: 'This ' },
				{ type: 'text', text: ' is great!' },
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
			rus: [{ type: 'text', text: 'Это было великолепно!' }],
			eng: [
				{ type: 'text', text: '' },
				{ type: 'text', color: 'blue', text: 'That' },
				{ type: 'text', text: ' was great!' },
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
			rus: [
				{
					type: 'text',
					text: 'Вы — юрист? Да, это так.',
				},
			],
			eng: [
				{
					type: 'text',
					text: 'Are you a lawyer? Yes, that is right.',
				},
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
			rus: [
				{
					type: 'text',
					text: 'Этот торт очень очень дорогой.',
				},
			],
			eng: [
				{ type: 'text', text: '' },
				{ type: 'text', color: 'blue', text: 'This' },
				{
					type: 'text',
					text: ' cake is very expensive.',
				},
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
			rus: [{ type: 'text', text: 'Но он очень вкусный.' }],
			eng: [
				{ type: 'text', text: 'But ' },
				{ type: 'text', color: 'blue', text: 'it ' },
				{ type: 'text', text: 'is very tasty.' },
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
			rus: [
				{
					type: 'text',
					text: 'Это не религиозность, это не духовность, это не мистика.',
				},
			],
			eng: [
				{ type: 'text', text: '' },
				{ type: 'text', color: 'blue', text: 'This' },
				{ type: 'text', text: ' is not religious, ' },
				{ type: 'text', color: 'blue', text: 'it' },
				{ type: 'text', text: ' is not spiritual, ' },
				{ type: 'text', color: 'blue', text: 'it' },
				{ type: 'text', text: ' is not mystical.' },
			],
		},
		{
			type: 'exercises',
			exercises: [
				{
					note: 'Примечание к предложению',
					rusSentence: 'Это жук? Нет, это паук.',
					engSentences: [{ engSentences: ['Is this a bug? No, it is a spider.'], isCorrect: true }],
					words: [
						{ rusWord: 'жук', engWord: 'bug' },
						{ rusWord: 'паук', engWord: 'spider' },
					],
				},
				{
					rusSentence: 'Это карандаш? Нет, это ручка.',
					engSentences: [{ engSentences: ["Is this a pencil? No, it's a pen."], isCorrect: true }],
					words: [
						{ rusWord: 'карандаш', engWord: 'pencil' },
						{ rusWord: 'ручка', engWord: 'pen' },
					],
				},
				{
					rusSentence: 'Это океан? Нет, это озеро.',
					engSentences: [{ engSentences: ["Is this an ocean? No, it's a lake."], isCorrect: true }],
					words: [
						{ rusWord: 'океан', engWord: 'ocean' },
						{ rusWord: 'озеро', engWord: 'lake' },
					],
				},
				{
					rusSentence: 'Это мексиканская кухня? Нет, корейская. Но тоже острая.',
					engSentences: [
						{
							engSentences: ['Is this Mexican food? No, Korean. But also spicy.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'мексикансая кухня', engWord: 'Mexican food' },
						{ rusWord: 'корейский', engWord: 'Korean' },
						{ rusWord: 'острый', engWord: 'spicy' },
					],
				},
				{
					rusSentence: 'Это новый компьютер? Да, очень дорогой.',
					engSentences: [
						{
							engSentences: ['Is this a new computer? Yes, it is very expencive.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'мексикансая кухня', engWord: 'Mexican food' },
						{ rusWord: 'корейский', engWord: 'Korean' },
						{ rusWord: 'острый', engWord: 'spicy' },
					],
				},
			],
			offset: true,
		},
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
							rus: [
								{
									type: 'text',
									text: 'этот — this',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'эти — these',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'Эта сумка огромная.',
								},
							],
							eng: [
								{ type: 'text', color: 'gold', text: 'This' },
								{
									type: 'text',
									text: ' bag is huge.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'Эти сумки огромные.',
								},
							],
							eng: [
								{ type: 'text', color: 'blue', text: 'These' },
								{
									type: 'text',
									text: ' bags are huge.',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'rusToEng',
							textSize: 'giant',
							rus: [
								{
									type: 'text',
									text: 'тот — that',
								},
							],
							eng: [
								{
									type: 'text',
									text: 'те — those',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'Тот человек ненадёжен.',
								},
							],
							eng: [
								{ type: 'text', color: 'gold', text: 'That' },
								{
									type: 'text',
									text: ' person is unreliable.',
								},
							],
						},
						{
							type: 'rusToEng',
							textSize: 'big',
							rus: [
								{
									type: 'text',
									text: 'Те люди ненадежные.',
								},
							],
							eng: [
								{ type: 'text', color: 'blue', text: 'Those' },
								{
									type: 'text',
									text: ' people are unreliable.',
								},
							],
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
		{
			type: 'exercises',
			exercises: [
				{
					rusSentence: 'Те —  мои ключи.',
					engSentences: [{ engSentences: ['Those are my keys.'], isCorrect: true }],
					words: [{ rusWord: 'ключ', engWord: 'key' }],
				},
				{
					rusSentence: 'Большинство людей не знают своих прав',
					engSentences: [
						{
							engSentences: ['Many people are not aware about these rights.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'люди', engWord: 'people' },
						{ rusWord: 'знать', engWord: 'aware' },
						{ rusWord: 'права', engWord: 'rights' },
					],
				},
				{
					rusSentence: 'Эти двое мои соседи: Пауль и Кэрол.',
					engSentences: [
						{
							engSentences: ['These two people are my neighbors, Paul and Carol.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'двое', engWord: 'two' },
						{ rusWord: 'сосед', engWord: 'a neighbor' },
					],
				},
				{
					rusSentence: 'Это огурцы.',
					engSentences: [{ engSentences: ['Those are cucumbers.'], isCorrect: true }],
					words: [{ rusWord: 'огурец', engWord: 'a cucumber' }],
				},
				{
					rusSentence: 'Это не настоящие кошки.',
					engSentences: [{ engSentences: ['Those aren’t real cats.'], isCorrect: true }],
					words: [
						{ rusWord: 'настоящий', engWord: 'real' },
						{ rusWord: 'кот', engWord: 'cat' },
					],
				},
				{
					rusSentence: 'Эти шоколадки вкусные.',
					engSentences: [{ engSentences: ['These chocolates are delicious.'], isCorrect: true }],
					words: [
						{ rusWord: 'шоколадка', engWord: 'a chocolate' },
						{ rusWord: 'вкусный', engWord: 'delicious' },
					],
				},
				{
					rusSentence: 'Их сыновья определённо не являются преступниками.',
					engSentences: [
						{
							engSentences: ['Their children certainly are not criminals.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'сын', engWord: 'a son' },
						{ rusWord: 'определённо', engWord: 'certainly' },
						{ rusWord: 'преступник', engWord: 'criminal' },
					],
				},
				{
					rusSentence: 'Эти карандаши, а те ручки.',
					engSentences: [
						{
							engSentences: ['These are pencils and those are pens.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'карандаш', engWord: 'a pencil' },
						{ rusWord: 'ручка', engWord: 'a pen' },
					],
				},
				{
					rusSentence: 'Эти очки ужасные.',
					engSentences: [{ engSentences: ['This glasses are terrible.'], isCorrect: true }],
					words: [
						{ rusWord: 'очки', engWord: 'glasses' },
						{ rusWord: 'ужасный', engWord: 'terrible' },
					],
				},
			],
			offset: true,
		},
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
			rus: [{ type: 'text', text: 'Это животное — жираф.' }],
			eng: [
				{
					type: 'text',
					text: 'This animal is a giraffe.',
				},
			],
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
			rus: [{ type: 'text', text: 'Это великолепная идея!' }],
			eng: [{ type: 'text', text: 'This is a great idea!' }],
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
