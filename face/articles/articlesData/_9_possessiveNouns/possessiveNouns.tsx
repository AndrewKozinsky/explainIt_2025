// import ArticleType from '../../articleType'
// import PossessiveDeterminate_1_Scheme from './PossessiveDeterminate_1_Scheme'
// import PossessiveDeterminate_2_Scheme from './PossessiveDeterminate_2_Scheme'
// import PossessiveDeterminate_3_Scheme from './PossessiveDeterminate_3_Scheme'
// import PossessiveDeterminate_4_Scheme from './PossessiveDeterminate_4_Scheme'

/*const possessiveNouns: ArticleType.Art = {
	meta: {
		number: 11,
		slug: 'possessive-nouns',
		caption: 'Глава 9',
		articleName: 'Притяжательные существительные',
		articleDescription:
			'Наравне с притяжательными местоимениями задаёт принадлежость предмета, но выбор слов гораздо больше, чем 7 местоимений.',

	},
	content: [
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Вы уже встречались с притяжательными местоимениями.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Эта моя тарелка' },

				{ type: 'text',  text: 'This is my plate' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Эта тарелка моя' },

				{ type: 'text',  text: 'This plate is mine' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Притяжательными можно сделать существительные задав им притяжательный падеж.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Падеж — это изменение окончания существительного для выражения связи с другими словами в предложении. В русском языке их 6. В английском 2: общий и притяжательный.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{ type: 'text',  text: 'Существительное ' },
				{ type: 'text', color: 'gold', text: 'в общем падеже' },
				{
					type: 'text',

					text: ' — это форма слова в словаре. В русском это ',
				},
				{ type: 'text', color: 'gold', text: 'именительный падеж' },
				{ type: 'text',  text: '. А существительное в ' },
				{ type: 'text', color: 'blue', text: 'притяжательном падеже' },
				{
					type: 'text',

					text: ' является определением к следующему за ним существительному, задаёт принадлежность предмета.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'A ' },
				{ type: 'text', color: 'gold', text: 'cat' },
				{ type: 'text',  text: '' },

				{ type: 'text',  text: 'A ' },
				{ type: 'text', color: 'blue', text: 'cat’s' },
				{ type: 'text',  text: ' bowl' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{ type: 'text', color: 'gray', weight: 'bold', text: 'cat' },
				{
					type: 'text',
					color: 'gray',

					text: ' — это форма в общем падеже, а ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'cat’s' },
				{ type: 'text', color: 'gray', text: ' в притяжательном.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'На русский язык обычно переводится в обратном порядке.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'A cat’s bowl' },

				{ type: 'text',  text: 'Кота чашка' },

				{ type: 'text',  text: 'Чашка кота' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Притяжательный падеж по назначению похож на притяжательные местоимения. Только тут принадлежность задаёт не местоимение, а существительное.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Его можно добавить к любому существительному. Но в основном предпочитают добавлять их к одушевлённым персонажам.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Образование притяжательного падежа' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Одно слово в притяжательном падеже' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Существительному добавляется знака апострофа и буквы ',
				},
				{ type: 'text', color: 'blue', text: 's' },
				{ type: 'text',  text: ' к форме общего падежа.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Lisa' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' friend' },

				{ type: 'text',  text: 'друг Лизы' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'My father' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' lighter' },

				{ type: 'text',  text: 'Зажигалка моего отца' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Children' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' umbrella' },

				{ type: 'text',  text: 'Зонт детей' },
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'Если существительное заканчивается на ',
				},
				{ type: 'text', color: 'blue', text: 's' },
				{
					type: 'text',

					text: ', то добавляется только апостроф.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'Iris' },
				{ type: 'text', color: 'blue', text: '’' },
				{ type: 'text',  text: ' coat' },

				{ type: 'text',  text: 'Пальто Айрис' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text',  text: 'My friends' },
				{ type: 'text', color: 'blue', text: '’' },
				{ type: 'text',  text: ' book' },

				{ type: 'text',  text: 'Книга моих друзей' },
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'При произношении никакой разницы с существительным в общем падежом нет.',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Несколько слов в притяжательном падеже' },
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если в притяжательном падеже стоит несколько слов, то ',
				},
				{ type: 'text', color: 'blue', text: '’s' },
				{
					type: 'text',

					text: ' добавляется к последнему слову:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', text: 'My sister-in-law' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' advice' },

				{
					type: 'text',

					text: 'Совет моей сводной сестры.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', text: 'Romeo and Juliet' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' love story' },

				{
					type: 'text',

					text: 'Любовная история Ромео и Джульетты',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gold', text: 'The King of Monaco son' },
				{ type: 'text', color: 'blue', text: '’s' },
				{ type: 'text',  text: ' wedding' },

				{
					type: 'text',

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

			children: [
				{
					type: 'text',

					text: 'Определяемое слово может иметь определитель.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_1_Scheme /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

					text: 'А существительное в притяжательном падеже само по себе является определителем. ',
				},
				{ type: 'text', color: 'gray', text: 'Посмотрите главу про ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'неопределённый артикль a' },
				{
					type: 'text',
					color: 'gray',

					text: ' где кратко рассказано про все виды определителей.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessiveDeterminate_2_Scheme /> },
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',

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

					children: [
						{
							type: 'text',

							text: 'Это правило верно для любых других определителей:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'big',
					children: [
						{ type: 'text', color: 'error', text: 'This my' },
						{ type: 'text',  text: ' pizza is raw' },

						{
							type: 'text',

							text: 'This pizza is raw ',
						},
						{ type: 'text', color: 'gray', text: 'или' },
						{
							type: 'text',

							text: ' My pizza is raw',
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

			children: [
				{
					type: 'text',

					text: 'Апостров + s используется в том числе как сокращённая форма глагола be в форме is. Но сомнений обычно не возникает потому что определить это можно по косвенным признакам присущих притяжательным существительным и be.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,

			children: [{ type: 'text',  text: 'Посмотрим примеры.' }],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [{ type: 'text',  text: 'Andy’s toy.' }],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если ‘s — это сокращённая форма is, тогда перед toy должен быть неопределённый артикль a. Поэтому переводится не «Энди — игрушка», а «Игрушка Энди».',
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

					text: 'Nutcracker’s my favourite book.',
				},
			],
		},
		{
			type: 'paragraph',

			children: [
				{
					type: 'text',

					text: 'Если Nutcracker’s — это притяжательное существительное, то после него должно быть существительное. А тут стоит местоимение. Поэтому ‘s — это сокращение от is. Предложение переводится «Щелкунчик моя любимая книга».',
				},
			],
		},
	],
}*/

// export default possessiveNouns
