import ArticleType from '../../articleType'

const demonstrativePronouns: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 9,
		slug: 'demonstrative-pronouns',
		caption: 'Глава 7',
		articleName: 'Указательные местоимения',
		articleDescription:
			'Указательные местоимения используются для ввода в контекст нового персонажа или предмета.',
		isPaid: false,
	},
	content: [
		{ type: 'header', tag: 'h2', style: 'h2', text: 'This и that' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Указательные местоимения используются чтобы указать на персонаж, предмет, событие.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(этот)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' используют когда говорят о предмете находящимся ближе к нам, а ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(тот)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' когда дальше. Под «ближе/дальше» подразумевается расстояние, эмоциональная окраска, время.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Предметы на разном расстоянии' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если один предмет находится ближе другого, то для указания на более близкий используют ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(ближе)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', а для более дальнего ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дальше)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', weight: 'normal', text: 'Это' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' новая машина, а ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'та' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' старая.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: '’s a new car, but ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' car is old.' },
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
					text: 'Новая машина ближе, а старая дальше.',
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
					offset: false,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'Чтобы одно и то же существительное не повторять несколько раз его обычно заменяют на слово one. Предложение выше можно передалать так:',
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
							text: 'Это новая машина, а та старая.',
						},
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
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
					offset: false,
					textSize: 'normal',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'После ' },
						{ type: 'text', color: 'blue', weight: 'normal', text: 'this' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' нельзя ставить короткую форму глагола ',
						},
						{ type: 'text', color: 'blue', weight: 'normal', text: 'is' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: '. Про сокращённую форму be будет в одном из следующих уроков.',
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
					text: 'Дистанцирование работает и при телефонном разговоре. Чтобы указать на себя используют ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(ближе)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. Чтобы указать на собеседника, то ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дальше)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' потому что он находится далеко, на другом конце провода.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: '— Hello. ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is Andrew. Is ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' Victoria?' },
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
							text: 'Но это действует не всегда. Американцы наоборот для указания на собеседника используют ',
						},
						{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
						{ type: 'text', color: 'black', weight: 'normal', text: '.' },
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'black', weight: 'normal', text: 'Кто это?' },
						{ type: 'arrow' },
						{ type: 'text', color: 'black', weight: 'normal', text: 'Who’s this?' },
					],
				},
			],
		},
		{
			type: 'exercises',
			id: 0,
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
					engSentences: [
						{ engSentences: ['This is not a simple island.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'однако', engWord: 'however' },
						{ rusWord: 'простой', engWord: 'simple' },
						{ rusWord: 'остров', engWord: 'an island' },
					],
				},
				{
					rusSentence: 'Это ручка, а то – карандаш.',
					engSentences: [
						{ engSentences: ['This is a pen, and that is a pencil.'], isCorrect: true },
					],
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
									offset: false,
									textSize: 'normal',
									children: [
										{
											type: 'text',
											color: 'black',
											weight: 'normal',
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
					engSentences: [
						{ engSentences: ['This is Katya, my stepsister.'], isCorrect: true },
					],
					words: [{ rusWord: 'сводная сестра', engWord: 'a stepsister' }],
				},
				{
					rusSentence: 'Это не ваши следы.',
					engSentences: [
						{ engSentences: ['This is not your footsteps. '], isCorrect: true },
					],
					words: [{ rusWord: 'след', engWord: 'a footstep' }],
				},
				{
					rusSentence: 'Это не моя основная профессия.',
					engSentences: [
						{ engSentences: ['This is not my main occupation.'], isCorrect: true },
					],
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
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(ближе)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' если относятся к объекту с положительным настроем:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это великолепно!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This is awesome!' },
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
					text: 'Эта сумочка очень дешёвая.',
				},
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This bag is very cheap.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'That ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дальше)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' если относимся к объекту в негативном ключе, как бы дистанцируемся.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это кошмар!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'That is a disaster!' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Тот человек очень злой.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'That man is very angry.' },
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
							text: 'Похожее эмоциональное дистанцирование есть в русском языке. Если футбольная команда выиграла, то болельщики говорят «мы выиграли». Если програла, то «они проиграли».',
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
					text: 'Не воспринимайте это как какое-то абсолютные правило. Если на негативно окрашенное событие укажите через ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', то никакой проблемы не будет.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это кошмар!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This is a disaster!' },
			],
		},
		{
			type: 'exercises',
			id: 1,
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
							engSentences: [
								'That snake is very toxic, and this is an common grass snake.',
							],
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
					engSentences: [
						{ engSentences: ['This coast is very dangerous.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'побережье', engWord: 'a coast' },
						{ rusWord: 'опасный', engWord: 'a dangerous' },
					],
				},
				{
					rusSentence: 'Этот аромат нереальный, а те обычные дешёвые духи.',
					engSentences: [
						{
							engSentences: [
								'This fragrance is unreal, and those ordinary cheap perfume',
							],
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
							engSentences: ['This love is difficult, but it\'s real.'],
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
					engSentences: [
						{ engSentences: ['That movie wasn’t wonderful.'], isCorrect: true },
					],
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
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'О событии происходящим в текущее время говорят через ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(ближе)' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', про прошедшее через ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дальше)' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
					text: 'Вы на концерте любимой группы. Выступление вам нравится, и вы говорите:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это великолепно!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This ' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'is great!' },
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
					text: 'Когда после концерта вы звоните другу и описываете все, что увидели (ситуацию в прошлом) вы говорите:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это было великолепно!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'That' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' was great!' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ' },
				{ type: 'text', color: 'gray', weight: 'normal', text: '(ближе)' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
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
					offset: false,
					textSize: 'small',
					children: [
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'При переводе на английский язык указательных местоимений ориентируйтесь на правила приведённые здесь, а не на русский язык. Например если яблоко в руках собеседника, то по-русски я скажу «Дай мне это яблоко». А по-английски «Give me that ',
						},
						{ type: 'text', color: 'gray', weight: 'normal', text: '(то)' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
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
							color: 'black',
							weight: 'normal',
							text: 'Если я буду рассказывать о произошедшем событии, то я скажу «Этот концерт был потрясающий», а по английски «That ',
						},
						{ type: 'text', color: 'gray', weight: 'normal', text: '(тот)' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' concert was marvellous». В этом случае для нас разница между «этот» или «тот» незначительна, но она принципиальна для английского языка. Употребить this в этом случае будет ошибкой.',
						},
					],
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Отсылка к сказанному' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если мы ссылаемся к сказанному, то применяется that ',
				},
				{ type: 'text', color: 'gray', weight: 'normal', text: '(дальше)' },
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
					text: 'Вы — юрист? Да, это так.',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Are you a lawyer? Yes, that is right.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Отличие this/that от it' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: '/' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'that' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' вводят предмет в контекст:',
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
					text: 'Этот торт очень очень дорогой.',
				},
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' cake is very expensive.',
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
					text: 'При последующем указании на предмет используйте ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
				{ type: 'text', color: 'black', weight: 'normal', text: ':' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Но он очень вкусный.' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'But ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'it ' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'is very tasty.' },
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
					text: 'Ещё пример как в одном предложении сначала указывается на существительное через this, а затем используется it для его обозначания:',
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
					text: 'Это не религиозность, это не духовность, это не мистика.',
				},
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'This' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is not religious, ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'it' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is not spiritual, ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'it' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' is not mystical.' },
			],
		},
		{
			type: 'exercises',
			id: 2,
			exercises: [
				{
					note: 'Примечание к предложению',
					rusSentence: 'Это жук? Нет, это паук.',
					engSentences: [
						{ engSentences: ['Is this a bug? No, it is a spider.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'жук', engWord: 'bug' },
						{ rusWord: 'паук', engWord: 'spider' },
					],
				},
				{
					rusSentence: 'Это карандаш? Нет, это ручка.',
					engSentences: [
						{ engSentences: ['Is this a pencil? No, it\'s a pen.'], isCorrect: true },
					],
					words: [
						{ rusWord: 'карандаш', engWord: 'pencil' },
						{ rusWord: 'ручка', engWord: 'pen' },
					],
				},
				{
					rusSentence: 'Это океан? Нет, это озеро.',
					engSentences: [
						{ engSentences: ['Is this an ocean? No, it\'s a lake.'], isCorrect: true },
					],
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
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Местоимения ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' и ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'that' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' используются с существительными в единственном числе. Для указания на несколько предметов вместо ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' используют ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'these' },
				{ type: 'text', color: 'black', weight: 'normal', text: ', а вместо ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'that' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' — ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'those' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
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
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'этот — this',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'эти — these',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Эта сумка огромная.',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'This' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' bag is huge.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Эти сумки огромные.',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'These' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' bags are huge.',
								},
							],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							offset: false,
							textSize: 'giant',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'тот — that',
								},
								{ type: 'arrow' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'те — those',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Тот человек ненадёжен.',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'gold', weight: 'normal', text: 'That' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: ' person is unreliable.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							textSize: 'big',
							children: [
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
									text: 'Те люди ненадежные.',
								},
								{ type: 'arrow' },
								{ type: 'text', color: 'black', weight: 'normal', text: '' },
								{ type: 'text', color: 'blue', weight: 'normal', text: 'Those' },
								{
									type: 'text',
									color: 'black',
									weight: 'normal',
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
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Давайте для практики переведём такое предложение:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Это наши дети.' }],
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
					text: 'Можно дать такой вариант:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'It is our children.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это — это ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
				{ type: 'text', color: 'black', weight: 'normal', text: '. После ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' ставится ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'is' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: '. А дальше идут «наши дети».',
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
					text: 'Но это не правильно потому что «дети» — это множество людей. А местоимением ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' можно заменить только существительное в единственном числе. Для выражения множественного числа подходит местоимение ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'they' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' независимо от того человек это или неодушевлённый предмет.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'They are our children.' },
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
					text: 'Но если существительное упоминаются в первый раз, то лучше использовать не личные, а указательные местоимения. А тут, похоже, дети упоминаются в первый раз, поэтому заменю ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'they' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' на ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'these' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' или ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'those' },
				{ type: 'text', color: 'black', weight: 'normal', text: '. Выберу ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'these' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' потому что дети находятся скорее всего недалеко и упоминуются в положительном ключе.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'These are our children.' },
			],
		},
		{
			type: 'exercises',
			id: 3,
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
					engSentences: [
						{ engSentences: ['These chocolates are delicious.'], isCorrect: true },
					],
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
					engSentences: [
						{ engSentences: ['This glasses are terrible.'], isCorrect: true },
					],
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
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Указательные местоимения являются определяющими словами обозначающими конкретный предмет. Поэтому другое определители ставить не требуется.',
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
					text: 'Но тут важно разграничивать к какому существительному оно относится. Например:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это животное — жираф.' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'This animal is a giraffe.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'bold', text: 'This' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' относится к существительному «животное», поэтому перед ним другое определяющее слово не требуется. А «жираф» — это уже другое существительное, поэтому перед ним должно стоять другое определяющее слово. Так как подразумевают любого жирафа, то стоит неопределённый артикль a.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Подлежащее' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'This/that может использоваться как подлежащее:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Это великолепная идея!' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This is a great idea!' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Тут ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'this' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' не относится к ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'great idea' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', а является подлежащим. Поэтому перед ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'great idea' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' ставится неопределённый артикль ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'a' },
				{ type: 'text', color: 'black', weight: 'normal', text: '.' },
			],
		},
	],
}

export default demonstrativePronouns
