import ArticleType from '../../articleType'
import PossessiveDeterminate_1_Scheme from './PossessiveDeterminate_1_Scheme'
import PossessiveDeterminate_2_Scheme from './PossessiveDeterminate_2_Scheme'
import PossessiveDeterminate_3_Scheme from './PossessiveDeterminate_3_Scheme'
import PossessiveDeterminate_4_Scheme from './PossessiveDeterminate_4_Scheme'

const possessiveNouns: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: 11,
		slug: 'possessive-nouns',
		caption: 'Глава 9',
		articleName: 'Притяжательные существительные',
		articleDescription:
			'Наравне с притяжательными местоимениями задаёт принадлежость предмета, но выбор слов гораздо больше, чем 7 местоимений.',
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
					text: 'Вы уже встречались с притяжательными местоимениями.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Эта моя тарелка' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This is my plate' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Эта тарелка моя' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'This plate is mine' },
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
					text: 'Притяжательными можно сделать существительные задав им притяжательный падеж.',
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
					text: 'Падеж — это изменение окончания существительного для выражения связи с другими словами в предложении. В русском языке их 6. В английском 2: общий и притяжательный.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Существительное ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'в общем падеже' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' — это форма слова в словаре. В русском это ',
				},
				{ type: 'text', color: 'gold', weight: 'normal', text: 'именительный падеж' },
				{ type: 'text', color: 'black', weight: 'normal', text: '. А существительное в ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'притяжательном падеже' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' является определением к следующему за ним существительному, задаёт принадлежность предмета.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'A ' },
				{ type: 'text', color: 'gold', weight: 'normal', text: 'cat' },
				{ type: 'text', color: 'black', weight: 'normal', text: '' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'A ' },
				{ type: 'text', color: 'blue', weight: 'normal', text: 'cat’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' bowl' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'cat' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' — это форма в общем падеже, а ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'cat’s' },
				{ type: 'text', color: 'gray', weight: 'normal', text: ' в притяжательном.' },
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
					text: 'На русский язык обычно переводится в обратном порядке.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'A cat’s bowl' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Кота чашка' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Чашка кота' },
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
					text: 'Притяжательный падеж по назначению похож на притяжательные местоимения. Только тут принадлежность задаёт не местоимение, а существительное.',
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
					text: 'Его можно добавить к любому существительному. Но в основном предпочитают добавлять их к одушевлённым персонажам.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Образование притяжательного падежа' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Одно слово в притяжательном падеже' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Существительному добавляется знака апострофа и буквы ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' к форме общего падежа.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Lisa' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' friend' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'друг Лизы' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'My father' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' lighter' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Зажигалка моего отца' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Children' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' umbrella' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Зонт детей' },
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
					text: 'Если существительное заканчивается на ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: 's' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ', то добавляется только апостроф.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Iris' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' coat' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Пальто Айрис' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'My friends' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' book' },
				{ type: 'arrow' },
				{ type: 'text', color: 'black', weight: 'normal', text: 'Книга моих друзей' },
			],
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
					text: 'При произношении никакой разницы с существительным в общем падежом нет.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Несколько слов в притяжательном падеже' },
		{
			type: 'paragraph',
			offset: false,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Если в притяжательном падеже стоит несколько слов, то ',
				},
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: ' добавляется к последнему слову:',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', weight: 'normal', text: 'My sister-in-law' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' advice' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Совет моей сводной сестры.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', weight: 'normal', text: 'Romeo and Juliet' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' love story' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Любовная история Ромео и Джульетты',
				},
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', weight: 'normal', text: 'The King of Monaco son' },
				{ type: 'text', color: 'blue', weight: 'normal', text: '’s' },
				{ type: 'text', color: 'black', weight: 'normal', text: ' wedding' },
				{ type: 'arrow' },
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Свадьба сына короля Монако',
				},
			],
		},
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Вытеснение определителя у определяемого слова',
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
					text: 'Определяемое слово может иметь определитель.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_1_Scheme /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'А существительное в притяжательном падеже само по себе является определителем. ',
				},
				{ type: 'text', color: 'gray', weight: 'normal', text: 'Посмотрите главу про ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',
					color: 'gray',
					weight: 'normal',
					text: ' где кратко рассказано про все виды определителей.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_2_Scheme /> },
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'У существительного не может быть больше одного определителя. Поэтому определитель определяемого слова вытесняется существительным в притяжательном падеже.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_3_Scheme /> },
		{
			type: 'note',
			noteStyle: 'gray',
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
							text: 'Это правило верно для любых других определителей:',
						},
					],
				},
				{
					type: 'paragraph',
					offset: false,
					textSize: 'big',
					children: [
						{ type: 'text', color: 'error', weight: 'normal', text: 'This my' },
						{ type: 'text', color: 'black', weight: 'normal', text: ' pizza is raw' },
						{ type: 'arrow' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: 'This pizza is raw ',
						},
						{ type: 'text', color: 'gray', weight: 'normal', text: 'или' },
						{
							type: 'text',
							color: 'black',
							weight: 'normal',
							text: ' My pizza is raw',
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
					text: 'Но само существительное в притяжательном падеже не теряет собственный артикль:',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_4_Scheme /> },
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Отец Алисы доволен и счастлив.',
					engSentences: [
						{
							engSentences: ['Alissa\'s father is pleased and happy.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
				{
					rusSentence: 'Комната в отеле Айприл и Лауры на втором этаже.',
					engSentences: [
						{
							engSentences: ['April and Laura\'s hotel room is on the second floor.'],
							isCorrect: true,
						},
					],
					words: [{ rusWord: 'положение', engWord: 'situation' }],
				},
			],
			offset: true,
		},
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Притяжательный падеж или сокращённая форма be',
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
					text: 'Апостров + s используется в том числе как сокращённая форма глагола be в форме is. Но сомнений обычно не возникает потому что определить это можно по косвенным признакам присущих притяжательным существительным и be.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black', weight: 'normal', text: 'Посмотрим примеры.' },
			],
		},
		{
			type: 'paragraph',
			offset: false,
			textSize: 'giant',
			children: [{ type: 'text', color: 'black', weight: 'normal', text: 'Andy’s toy.' }],
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
					text: 'Если ‘s — это сокращённая форма is, тогда перед toy должен быть неопределённый артикль a. Поэтому переводится не «Энди — игрушка», а «Игрушка Энди».',
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
					text: 'Даже если бы слово toy было во множественном числе и неопределённый артикль нельзя было поставить, то всё равно бы было понятно потому что около Энди не может быть существительного множественного числа и be был бы в форме are.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'giant',
			children: [
				{
					type: 'text',
					color: 'black',
					weight: 'normal',
					text: 'Nutcracker’s my favourite book.',
				},
			],
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
					text: 'Если Nutcracker’s — это притяжательное существительное, то после него должно быть существительное. А тут стоит местоимение. Поэтому ‘s — это сокращение от is. Предложение переводится «Щелкунчик моя любимая книга».',
				},
			],
		},
	],
}

export default possessiveNouns
