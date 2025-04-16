import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'

const indefiniteArticle: ArticleType.Art = {
	meta: {
		number: 3,
		slug: 'indefinite-article',
		caption: 'Глава 4',
		articleName: 'Неопределённый артикль a',
		articleDescription: 'Разберёмся как писать исчисляемые существительные в единственном числе.',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В предыдущих главах вы уже сталкивались с существительными:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Это приносит ему хорошие ' },
				{ type: 'text', text: 'деньги', color: 'blue' },
				{ type: 'text', text: '.' },
			],
			eng: [
				{ type: 'text', text: 'It brings him good ' },
				{ type: 'text', text: 'money', color: 'blue' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Я имею много свободного ' },
				{ type: 'text', text: 'времени', color: 'blue' },
				{ type: 'text', text: '.' },
			],
			eng: [
				{ type: 'text', text: 'I have much free ' },
				{ type: 'text', text: 'time', color: 'blue' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Они были неисчисляемые.',
				},
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

							text: 'Неисчисляемое существительное — это существительное не поддающееся счёту:',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'giant',
					children: [{ type: 'text', color: 'black', text: 'Три денег' }],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Так говорить нельзя, поэтому «деньги» — это неисчисляемое существительное.',
						},
					],
				},
				{
					type: 'paragraph',

					textSize: 'giant',
					children: [{ type: 'text', color: 'black', text: 'Девять времени' }],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Так говорить нельзя, поэтому «время» — это неисчисляемое существительное.',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					textSize: 'giant',
					children: [{ type: 'text', color: 'black', text: 'Два стакана воды' }],
				},
				{
					type: 'paragraph',

					textSize: 'normal',
					children: [
						{
							type: 'text',
							color: 'black',

							text: 'Вода — неисчисляемое существительное. Но число относится не к воде, а к стаканам. Стаканы исчисляемое.',
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
					text: 'Если существительное исчисляемое и в единственном числе, то перед ним ставится неопределённый артикль ',
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
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я вижу учителя.' }],
			eng: [
				{ type: 'text', text: 'I see ' },
				{ type: 'text', text: 'a', color: 'blue' },
				{ type: 'text', text: ' teacher.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',

					text: 'Учитель — исчисляемое существительное, поэтому перед ним нужно ставить неопределённый артикль a.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он живёт в доме.' }],
			eng: [
				{ type: 'text', text: 'He lives in ' },
				{ type: 'text', text: 'a', color: 'blue' },
				{ type: 'text', text: ' house.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Дом — исчисляемое существительное, поэтому перед ним неопределённый артикль a.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Попробуйте перевести такие предложения.',
				},
			],
		},
		exercises_1,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' произошёл от слова ',
				},
				{
					type: 'text',
					text: 'one',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' (один). Именно поэтому его и ставят перед исчисляемых существительных в единственном числе. Если поставить его перед неисчисляемыми существительными или перед существительными во множественном числе, то это будет выглядеть странно. Давайте сделаем смешанную практику и попереводим предложения с любыми типами существительных.',
				},
			],
		},

		exercises_2,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Изменение артикля на an' },
		{
			type: 'paragraph',

			textSize: 'normal',
			children: [
				{
					type: 'text',
					color: 'black',

					text: 'Если исчисляемое существительное в единственном числе ',
				},
				{ type: 'text', color: 'black', weight: 'bold', text: 'при произношении' },
				{
					type: 'text',
					color: 'black',

					text: ' (не на письме!) начинается с гласной буквы, то перед ним ставят артикль ',
				},
				{ type: 'text', color: 'blue', text: 'an' },
				{
					type: 'text',
					color: 'black',

					text: ', а если с согласной, то ',
				},
				{ type: 'text', color: 'blue', text: 'a' },
				{
					type: 'text',
					color: 'black',

					text: '. Это нужно для гармонии чтобы не произносить гласные друг за другом.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'an apple' },
				{ type: 'text', color: 'black', text: ' — произносится ' },
				{ type: 'text', color: 'blue', text: '[эпл]' },
				{
					type: 'text',
					color: 'black',

					text: ' и пишется с гласной. Поэтому ставится ',
				},
				{ type: 'text', color: 'blue', text: 'an' },
				{ type: 'text', color: 'black', text: ' вместо ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'an honest boy' },
				{
					type: 'text',
					color: 'black',

					text: ' — хотя в письме начинается с согласной, но произносится с гласной ',
				},
				{ type: 'text', color: 'blue', text: '[онэст]' },
				{
					type: 'text',
					color: 'black',

					text: '. Поэтому тут также стоит артикль ',
				},
				{ type: 'text', color: 'blue', text: 'an' },
				{
					type: 'text',
					color: 'black',

					text: '. Обратите внимание, что нужно смотреть не на существительное, а на слово, которое стоит после артикля. В этом примере это прилагательное ',
				},
				{ type: 'text', color: 'blue', text: 'honest' },
				{
					type: 'text',
					color: 'black',

					text: ' потому что прилагательные вклиниваются между артиклем и существительным.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'a table' },
				{
					type: 'text',
					color: 'black',

					text: ' — произносится и пишется ',
				},
				{ type: 'text', color: 'blue', text: '[тэйбл]' },
				{
					type: 'text',
					color: 'black',

					text: ' с согласной. Поэтому стоит артикль ',
				},
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text', color: 'black', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			textSize: 'normal',
			children: [
				{ type: 'text', color: 'blue', text: 'a unity' },
				{
					type: 'text',
					color: 'black',

					text: ' — хотя в письме начинается с гласной, но произносится с согласной ',
				},
				{ type: 'text', color: 'blue', text: '[джунэти]' },
				{ type: 'text', color: 'black', text: '. Поэтому ' },
				{ type: 'text', color: 'blue', text: 'a' },
				{ type: 'text', color: 'black', text: '.' },
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

							text: 'Чтобы лучше запоминать произношения слов нужно развивать насмотренность и наслушанность. А это делается через постоянное чтение и прослушивание рассказов. Лучший эффект даст материал где вы понимаете 80% слов. Так будите и понимать смысл и не уставать часто прибегая к словарю.',
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
					text: 'Попробуйте потренироваться.',
				},
			],
		},
		exercises_3,
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Какие свойства даёт артикль a/an существительному' },
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Одна порция' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Выше я писал, что неопределённый артикль ',
				},
				{
					type: 'text',
					text: 'a',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' не употребляется для неисчисляемых существительных потому что происходит от слова «один». Числа не ставят к таким существительным потому что их нельзя посчитать. Как в этом случае:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Дай мне чай.' }],
			eng: [{ type: 'text', text: 'Give me tea.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Чай — неисчисляемое существительное, поэтому неопределённый артикль a не ставится.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но если поставить в значении некоторых продуктов, то это будет означать порцию этого продукта.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Дай мне чашку чая.' }],
			eng: [{ type: 'text', text: 'Give me a tea.' }],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Под порцией чая обычно подразумевается чашка.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Другие примеры:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'A water',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'стакан воды',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'A beer',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'бутылка или стакан пива',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'A cheese',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'один сорт сыра',
				},
			],
		},
		{ type: 'header', tag: 'h3', style: 'h3', text: 'Определяет существительное' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В отличии от русского в английском одно и то же слово может быть и существительным и прилагательным и глаголом. Как раз неопределённый артикль указывает на существительное:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'beauty ',
				},
				{
					type: 'text',
					text: '(прилагательное)',
					color: 'gray',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'красивый ',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'big',
			children: [
				{
					type: 'text',
					text: 'a beauty ',
				},
				{
					type: 'text',
					text: '(существительное)',
					color: 'gray',
				},
				{ type: 'arrow' },
				{
					type: 'text',
					text: 'красотка, красивая вещь ',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: '==========================================',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'С точки зрения русского языка такое уточнение избыточно. Но в английском языке есть тенденция ставить перед существительными уточняющие слова. Это не только неопределённые артикли, но и другие определяющие слова о которых будет сказано в других главах. Такие определяющие слова поясняют, что дальше идёт существительное. Возьму такой пример:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Она простужается каждую зиму.' }],
			eng: [{ type: 'text', text: 'She catches a cold every winter.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Фраза ',
				},
				{
					type: 'text',
					text: 'catch a cold',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' дословно обозначает «поймать простуду». А на русский язык переводится глаголом «простужаться». Но ещё слово ',
				},
				{
					type: 'text',
					text: 'cold',
					color: 'blue',
				},
				{
					type: 'text',
					text: ' обозначает как существительное «простуда», так и прилагательное «холодный». И неопределённый артикль сообщает, что дальше идёт именно существительное.',
				},
			],
		},
	],
}

export default indefiniteArticle
