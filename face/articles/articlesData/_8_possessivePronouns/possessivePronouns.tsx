// import ArticleType from '../../articleType'
// import PossessivePronounsTable from './PossessivePronounsTable'

/*const possessivePronouns: ArticleType.Art = {
	meta: {
		number: 10,
		slug: 'possessive-pronouns',
		caption: 'Глава 8',
		articleName: 'Притяжательные местоимения',
		articleDescription: 'Притяжательные местоимения поясняют кому принадлежит персонаж или предмет.',

	},
	content: [
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Притяжательные местоимения уточняют кому принадлежит персонаж или предмет и отвечают на вопрос ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'Чей' },
				{ type: 'text', color: 'black', text: '/' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'Чья' },
				{ type: 'text', color: 'black', text: '/' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'Чьё' },
				{ type: 'text', color: 'black', text: '/' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'Чьи?' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gray', text: '(Чей?)' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'Твой' },
				{ type: 'text', color: 'black', text: ' телефон сломан.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gray', text: '(Чьи?)' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'blue', text: 'Его' },
				{ type: 'text', color: 'black', text: ' предки знамениты.' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Английская речь наводнена притяжательными местоимениями. Фраза «Папа запрещает приходить поздно» в английском превращается в «Мой папа запрещает мне приходить поздно» потому что перед существительным всегда должно быть определяющее слово. Так как «папа» конкретный, то перед ним можно поставить или артикль ',
						},
						{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
						{
							type: 'text',
							color: 'black',

							text: ' или указательное или притяжательное местоимение. В этом предложении самым логичным будет притяжательное местоимение «мой».',
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

							text: 'В русском языке нет таких заморочек. И вставка местоимения «мой» даже будет лишней потому что и так понятно, что мой папа запрещает.',
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

					text: 'Есть два типа притяжательных местоимений:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: '1) После которых должно идти ',
				},
				{ type: 'text', color: 'gold', text: 'существительное' },
				{ type: 'text', color: 'black', text: ':' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'Мой' },
				{ type: 'text', color: 'black', text: ' ' },
				{ type: 'text', color: 'gold', text: 'брат' },
				{ type: 'text', color: 'black', text: ' — строитель.' },
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

					text: '2) Которые заменяют существительное. Они называются самостоятельными и в русском предложении ставятся в конце предложения:',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Забытые вещи были ' },
				{ type: 'text', color: 'blue', text: 'мои' },
				{ type: 'text', color: 'black', text: '.' },
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

					text: 'Два типа местоимений обозначают одно и то же. Но самостоятельные притяжательные местоимения делают акцент на принадлежности.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это ' },
				{ type: 'text', color: 'blue', text: 'мои' },
				{ type: 'text', color: 'black', text: ' деньги.' },

				{ type: 'text', color: 'black', text: 'This is ' },
				{ type: 'text', color: 'blue', text: 'my' },
				{ type: 'text', color: 'black', text: ' money.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Эти деньги ' },
				{ type: 'text', color: 'blue', text: 'мои' },
				{ type: 'text', color: 'black', text: '.' },

				{ type: 'text', color: 'black', text: 'This money is ' },
				{ type: 'text', color: 'blue', text: 'mine' },
				{ type: 'text', color: 'black', text: '.' },
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

					text: 'Ещё самостоятельным притяжательным местоимением можно ответить на вопрос.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Это чьи деньги?' },

				{ type: 'text', color: 'black', text: 'Whose money is this?' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'Мои' },
				{ type: 'text', color: 'black', text: '.' },

				{ type: 'text', color: 'black', text: '' },
				{ type: 'text', color: 'blue', text: 'Mine' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Whose — это относительное местоимение. Будет изучено в одной из следующих глав.',
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

					text: 'Притяжательные местоимения логичным образом происходят из личных.',
				},
			],
		},
		{ type: 'customComponent', component: <PossessivePronounsTable /> },
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
							color: 'black',

							text: 'В русском языке притяжательное местоимение не меняется в завимости от того если ли перед ним существительное или нет.',
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

					text: 'Притяжательное местоимение является определяющим словом для существительного. Поэтому перед ним не нужно указывать ещё одно определяющее слово вроде определённого артикля ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'the' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Попробуй салат!' },

				{ type: 'text', color: 'black', text: 'Try the salad!' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black', text: 'Попробуй мой салат!' },

				{ type: 'text', color: 'black', text: 'Try my salad!' },
			],
		},
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Притяжательные местоимения с существительным',
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'I ' },
				{ type: 'text', color: 'gray',  text: '(я)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Му ' },
				{ type: 'text', color: 'gray',  text: '(мой)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это ' },
				{ type: 'text', color: 'blue',  text: 'мой' },
				{ type: 'text', color: 'black',  text: ' компьютер.' },

				{ type: 'text', color: 'black',  text: 'It is ' },
				{ type: 'text', color: 'blue',  text: 'my' },
				{ type: 'text', color: 'black',  text: ' computer.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это ' },
				{ type: 'text', color: 'blue',  text: 'моя' },
				{ type: 'text', color: 'black',  text: ' собственная ложка.' },

				{ type: 'text', color: 'black',  text: 'It is ' },
				{ type: 'text', color: 'blue',  text: 'my' },
				{ type: 'text', color: 'black',  text: ' own spoon.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Ты ' },
				{ type: 'text', color: 'blue',  text: 'моё' },
				{ type: 'text', color: 'black',  text: ' сокровище.' },

				{ type: 'text', color: 'black',  text: 'You are ' },
				{ type: 'text', color: 'blue',  text: 'my' },
				{ type: 'text', color: 'black',  text: ' jewel.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Сергей и Алёна ' },
				{ type: 'text', color: 'blue',  text: 'мои' },
				{ type: 'text', color: 'black',  text: ' дети.' },

				{ type: 'text', color: 'black',  text: 'Sergei and Alyona are ' },
				{ type: 'text', color: 'blue',  text: 'my' },
				{ type: 'text', color: 'black',  text: ' children.' },
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
							color: 'black',

							text: 'Такое разнообразие переводов местоимения ',
						},
						{ type: 'text', color: 'black', weight: 'bold', text: 'my' },
						{
							type: 'text',
							color: 'black',

							text: ' на русский язык связано с падежами. В английском их нет, поэтому мой, моя, моё и мои переводятся одним и тем же словом.',
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
				{ type: 'text', color: 'black',  text: 'You ' },
				{ type: 'text', color: 'gray',  text: '(вы)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Your ' },
				{ type: 'text', color: 'gray',  text: '(ваш)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Ваша' },
				{ type: 'text', color: 'black',  text: ' мама не здесь.' },

				{ type: 'text', color: 'black',  text: '' },
				{ type: 'text', color: 'blue',  text: 'Your' },
				{ type: 'text', color: 'black',  text: ' mother is not here.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'He ' },
				{ type: 'text', color: 'gray',  text: '(он)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'His ' },
				{ type: 'text', color: 'gray',  text: '(его)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Его' },
				{ type: 'text', color: 'black',  text: ' нос чёрный и влажный.' },

				{ type: 'text', color: 'black',  text: '' },
				{ type: 'text', color: 'blue',  text: 'His' },
				{ type: 'text', color: 'black',  text: ' nose is black and wet.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'В этом предложение подлежащее his nose потому что притяжательное местоимение не может существовать отдельно и должно пристыковываться к существительному. Но даже если прибавить пару прилагательных (его холодный и грязный нос), то всё равно это будет одним подлежащим потому что обозначает одну сущность. Поэтому ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray',  text: ' стоит не после ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'his' },
				{ type: 'text', color: 'gray',  text: ', а после ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'his nose' },
				{ type: 'text', color: 'gray',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'She ' },
				{ type: 'text', color: 'gray',  text: '(она)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Her ' },
				{ type: 'text', color: 'gray',  text: '(её)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это ' },
				{ type: 'text', color: 'blue',  text: 'её' },
				{ type: 'text', color: 'black',  text: ' новый питомец.' },

				{ type: 'text', color: 'black',  text: 'It is ' },
				{ type: 'text', color: 'blue',  text: 'her' },
				{ type: 'text', color: 'black',  text: ' new pet.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'It ' },
				{ type: 'text', color: 'gray',  text: '(это)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Its ' },
				{ type: 'text', color: 'gray',  text: '(этот)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Эти' },
				{ type: 'text', color: 'black',  text: ' джинсы синие.' },

				{ type: 'text', color: 'black',  text: '' },
				{ type: 'text', color: 'blue',  text: 'Its' },
				{ type: 'text', color: 'black',  text: ' jeans is blue.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'jeans всегда используются во множественном числе. И их количество можно определить по форме глагола to be. Тут стоит в форме is, поэтому они в единственном. Если были бы во множественном, то был бы are.',
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
					color: 'gray',

					text: 'Местоимение its может переводиться не только на русский словом «это», но и «её» и «его» потому что в русском есть рода и предмет может быть среднего, мужского или женского рода. Но если говорим про половую принадлежность, то используйте или his или her.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'We ' },
				{ type: 'text', color: 'gray',  text: '(мы)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Our ' },
				{ type: 'text', color: 'gray',  text: '(наш)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Наша' },
				{
					type: 'text',
					color: 'black',

					text: ' старшая сестра восхитительна.',
				},

				{ type: 'text', color: 'black',  text: '' },
				{ type: 'text', color: 'blue',  text: 'Our' },
				{
					type: 'text',
					color: 'black',

					text: ' elder sister is wonderful.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'They ' },
				{ type: 'text', color: 'gray',  text: '(они)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Their ' },
				{ type: 'text', color: 'gray',  text: '(их)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue',  text: 'Их' },
				{
					type: 'text',
					color: 'black',

					text: ' домашнее задание трудное.',
				},

				{ type: 'text', color: 'black',  text: '' },
				{ type: 'text', color: 'blue',  text: 'Their' },
				{ type: 'text', color: 'black',  text: ' homework is difficult.' },
			],
		},
		{
			type: 'exercises',
			id: 0,
			exercises: [
				{
					rusSentence: 'Моё положение бедственное.',
					engSentences: [{ engSentences: ['My situation is awful.'], isCorrect: true }],
					words: [
						{ rusWord: 'положение', engWord: 'situation' },
						{ rusWord: 'бедственный', engWord: 'awful' },
					],
				},
				{
					rusSentence: 'Мое психологическое состояние плохое.',
					engSentences: [{ engSentences: ['My psychology is not well.'], isCorrect: true }],
					words: [
						{ rusWord: 'психологическое состояние', engWord: 'psychology' },
						{ rusWord: 'здоровый, в удовлетворительном состоянии', engWord: 'well' },
					],
				},
				{
					rusSentence: 'Его рукопись была очень старой и грязной.',
					engSentences: [
						{
							engSentences: ['His manuscript was very old and durty.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'рукопись', engWord: 'a manuscript ' },
						{ rusWord: 'старый', engWord: 'old' },
						{ rusWord: 'грязный', engWord: 'durty' },
					],
				},
				{
					rusSentence: 'В настоящее время он является его агентом.',
					engSentences: [{ engSentences: ['He is currently his agent.'], isCorrect: true }],
					words: [
						{ rusWord: 'в настоящее время', engWord: 'currently' },
						{ rusWord: 'агент', engWord: 'agent' },
					],
				},
				{
					rusSentence: 'Английский их второй или иногда даже третий язык.',
					engSentences: [
						{
							engSentences: ['English is their second and sometimes their third language.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'английский', engWord: 'English' },
						{ rusWord: 'второй', engWord: 'second' },
						{ rusWord: 'третий', engWord: 'third' },
						{ rusWord: 'иногда', engWord: 'sometimes' },
						{ rusWord: 'язык', engWord: 'language' },
					],
				},
				{
					rusSentence: 'Он ваш брат? Нет.',
					engSentences: [{ engSentences: ['Is he your brother? No, he is not.'], isCorrect: true }],
					words: [{ rusWord: 'брат', engWord: 'brother' }],
				},
				{
					rusSentence: 'Мои руки чистые.',
					engSentences: [{ engSentences: ['My hands are clear.'], isCorrect: true }],
					words: [{ rusWord: 'брат', engWord: 'brother' }],
				},
			],
			offset: true,
		},
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Самостоятельные притяжательные местоимения',
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Самостоятельные притяжательные местоимения заменяют существительное чтобы исключить повторение.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это моя тарелка, а это ' },
				{ type: 'text', color: 'blue',  text: 'твоя ' },
				{ type: 'text', color: 'gray',  text: '(тарелка)' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'После местоимение «моя» нужно ставить существительное, а после «твоя» нет потому что оно самодостаточное и заменяет местоимение «тарелка».',
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
					color: 'gray',

					text: 'Не забывайте, что в русском языке местоимения двух типов выглядят одинаково, а в английском отличаются.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'I ' },
				{ type: 'text', color: 'gray',  text: '(я)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Mine ' },
				{ type: 'text', color: 'gray',  text: '(моя)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Эта тарелка ' },
				{ type: 'text', color: 'blue',  text: 'моя' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This plate is ' },
				{ type: 'text', color: 'blue',  text: 'mine' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'note',
			noteStyle: 'gray',
			children: [
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Предложения «Эта моя тарелка» и «Эта тарелка моя» можно перевести и как This is my plate, так и This plate is mine. Форма с самостоятельным притяжательным местоимением больше подходит чтобы заострить внимание на факте обладания.',
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
				{ type: 'text', color: 'black',  text: 'You ' },
				{ type: 'text', color: 'gray',  text: '(вы)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Yours ' },
				{ type: 'text', color: 'gray',  text: '(ваш)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это красная книга ' },
				{ type: 'text', color: 'blue',  text: 'ваша' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This red book is ' },
				{ type: 'text', color: 'blue',  text: 'yours' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'He ' },
				{ type: 'text', color: 'gray',  text: '(он)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'His ' },
				{ type: 'text', color: 'gray',  text: '(его)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Этот кактус ' },
				{ type: 'text', color: 'blue',  text: 'его' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This cactus is ' },
				{ type: 'text', color: 'blue',  text: 'his' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'She ' },
				{ type: 'text', color: 'gray',  text: '(она)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Hers ' },
				{ type: 'text', color: 'gray',  text: '(её)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Этот дневник ' },
				{ type: 'text', color: 'blue',  text: 'её' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This diary is ' },
				{ type: 'text', color: 'blue',  text: 'hers' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'It ' },
				{ type: 'text', color: 'gray',  text: '(это)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Its ' },
				{ type: 'text', color: 'gray',  text: '(эта)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'Через местоимение ' },
				{ type: 'text', color: 'black', weight: 'bold', text: 'it' },
				{
					type: 'text',
					color: 'black',

					text: ' обозначают не только предметы и персонажи не являющиеся людьми, но и человека, у которого неизвестен пол или на него не хотят заострять внимание.',
				},
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Эта тень ' },
				{ type: 'text', color: 'blue',  text: 'его/её' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This shadow is ' },
				{ type: 'text', color: 'blue',  text: 'its' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'We ' },
				{ type: 'text', color: 'gray',  text: '(мы)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Ours ' },
				{ type: 'text', color: 'gray',  text: '(наш)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Этот ноутбук ' },
				{ type: 'text', color: 'blue',  text: 'наш' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This laptop is ' },
				{ type: 'text', color: 'blue',  text: 'ours' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'black',  text: 'They ' },
				{ type: 'text', color: 'gray',  text: '(они)' },
				{ type: 'text', color: 'black',  text: '' },

				{ type: 'text', color: 'black',  text: 'Theirs ' },
				{ type: 'text', color: 'gray',  text: '(их)' },
			],
		},
		{
			type: 'paragraph',

			textSize: 'giant',
			children: [
				{ type: 'text', color: 'black',  text: 'Это вознаграждение ' },
				{ type: 'text', color: 'blue',  text: 'их' },
				{ type: 'text', color: 'black',  text: '.' },

				{ type: 'text', color: 'black',  text: 'This reward is ' },
				{ type: 'text', color: 'blue',  text: 'theirs' },
				{ type: 'text', color: 'black',  text: '.' },
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

					text: 'Самостоятельные притяжательные местоимения очень похожи на притяжательные местоимения с последующим существительным. Только у них на конце всегда есть буква -',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 's' },
				{ type: 'text', color: 'black',  text: '. А местоимение ' },
				{ type: 'text', color: 'blue',  text: 'my' },
				{ type: 'text', color: 'black',  text: ' будет ' },
				{ type: 'text', color: 'blue',  text: 'mine' },
				{ type: 'text', color: 'black',  text: '.' },
			],
		},
		{
			type: 'exercises',
			id: 1,
			exercises: [
				{
					rusSentence: 'Его автомобиль чёрный, а её красный.',
					engSentences: [{ engSentences: ['His car is black, but hers is red.'], isCorrect: true }],
					words: [
						{ rusWord: 'автомобиль', engWord: 'a car' },
						{ rusWord: 'чёрный', engWord: 'black' },
						{ rusWord: 'красный', engWord: 'red' },
					],
				},
				{
					rusSentence: 'Такие компании как наша более гибкие.',
					engSentences: [
						{
							engSentences: ['Companies like ours are more flexible.'],
							isCorrect: true,
						},
					],
					words: [
						{ rusWord: 'компания', engWord: 'a company' },
						{ rusWord: 'гибкий', engWord: 'flexible' },
					],
				},
				{
					rusSentence: 'Его пальто длинное, а её короткое.',
					engSentences: [{ engSentences: ['His coat is long, but hers is short.'], isCorrect: true }],
					words: [
						{ rusWord: 'пальто', engWord: 'coat' },
						{ rusWord: 'длинный', engWord: 'long' },
						{ rusWord: 'короткий', engWord: 'short' },
					],
				},
				{
					rusSentence: 'Те пакеты ваши?',
					engSentences: [{ engSentences: ['Are those packages yours?'], isCorrect: true }],
					words: [{ rusWord: 'пакет', engWord: 'package' }],
				},
				{
					rusSentence: 'Эти дома их?',
					engSentences: [{ engSentences: ['Are those houses theirs?'], isCorrect: true }],
					words: [{ rusWord: 'дом', engWord: 'house' }],
				},
				{
					rusSentence: 'Эта сумка не твоя.',
					engSentences: [{ engSentences: ['This bag isn’t yours.'], isCorrect: true }],
					words: [{ rusWord: 'сумка', engWord: 'bag' }],
				},
			],
			offset: true,
		},
	],
}*/

// export default possessivePronouns
