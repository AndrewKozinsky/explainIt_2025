import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'

const possessivePronouns: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'possessive-pronouns',
		name: 'Притяжательные местоимения',
		description: 'Притяжательные местоимения поясняют кому принадлежит персонаж или предмет.',
		keywords:
			'притяжательные местоимения, my, mine, your, yours, his, her, hers, its, our, ours, their, theirs, whose, самостоятельные притяжательные местоимения',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Притяжательные местоимения уточняют кому принадлежит персонаж или предмет и отвечают на вопрос ',
				},
				{ type: 'text', weight: 'bold', text: 'Чей' },
				{ type: 'text', text: '/' },
				{ type: 'text', weight: 'bold', text: 'Чья' },
				{ type: 'text', text: '/' },
				{ type: 'text', weight: 'bold', text: 'Чьё' },
				{ type: 'text', text: '/' },
				{ type: 'text', weight: 'bold', text: 'Чьи?' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gray', text: '(Чей?)' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'blue', text: 'Твой' },
				{ type: 'text', text: ' телефон сломан.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'gray', text: '(Чьи?)' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'blue', text: 'Его' },
				{ type: 'text', text: ' предки знамениты.' },
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
							text: 'Английская речь наводнена притяжательными местоимениями. Фраза «Папа запрещает приходить поздно» в английском превращается в «Мой папа запрещает мне приходить поздно» потому что перед существительным всегда должно быть определяющее слово. Так как «папа» конкретный, то перед ним можно поставить или артикль ',
						},
						{ type: 'text', weight: 'bold', text: 'the' },
						{
							type: 'text',
							text: ' или указательное или притяжательное местоимение. В этом предложении самым логичным будет притяжательное местоимение «мой».',
						},
					],
				},
				{
					type: 'paragraph',
					offset: true,
					children: [
						{
							type: 'text',
							text: 'В русском языке нет таких заморочек. И вставка местоимения «мой» даже будет лишней потому что и так понятно, что мой папа запрещает.',
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
					text: 'Есть два типа притяжательных местоимений:',
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: '1) После которых должно идти ',
				},
				{ type: 'text', color: 'gold', text: 'существительное' },
				{ type: 'text', text: ':' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', color: 'blue', text: 'Мой' },
				{ type: 'text', text: ' ' },
				{ type: 'text', color: 'gold', text: 'брат' },
				{ type: 'text', text: ' — строитель.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: '2) Которые заменяют существительное. Они называются самостоятельными и в русском предложении ставятся в конце предложения:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', text: 'Забытые вещи были ' },
				{ type: 'text', color: 'blue', text: 'мои' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Два типа местоимений обозначают одно и то же. Но самостоятельные притяжательные местоимения делают акцент на принадлежности.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Это ' },
						{ type: 'text', color: 'blue', text: 'мои' },
						{ type: 'text', text: ' деньги.' },
					] },
				{ eng: [
						{ type: 'text', text: 'This is ' },
						{ type: 'text', color: 'blue', text: 'my' },
						{ type: 'text', text: ' money.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Эти деньги ' },
						{ type: 'text', color: 'blue', text: 'мои' },
						{ type: 'text', text: '.' },
					] },
				{ eng: [
						{ type: 'text', text: 'This money is ' },
						{ type: 'text', color: 'blue', text: 'mine' },
						{ type: 'text', text: '.' },
					] },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Ещё самостоятельным притяжательным местоимением можно ответить на вопрос.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Это чьи деньги?' }] },
				{ eng: [{ type: 'text', text: 'Whose money is this?' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Мои' },
						{ type: 'text', text: '.' },
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Mine' },
						{ type: 'text', text: '.' },
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
					text: 'Whose — это относительное местоимение. Будет изучено в одной из следующих глав.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Притяжательные местоимения логичным образом происходят из личных.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PossessivePronouns.src,
			alt: imageMapper.tables.PossessivePronouns.alt,
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
							text: 'В русском языке притяжательное местоимение не меняется в завимости от того если ли перед ним существительное или нет.',
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
					text: 'Притяжательное местоимение является определяющим словом для существительного. Поэтому перед ним не нужно указывать ещё одно определяющее слово вроде определённого артикля ',
				},
				{ type: 'text', weight: 'bold', text: 'the' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Попробуй салат!' }] },
				{ eng: [{ type: 'text', text: 'Try the salad!' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Попробуй мой салат!' }] },
				{ eng: [{ type: 'text', text: 'Try my salad!' }] },
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
			children: [
				{ type: 'text', text: 'I ' },
				{ type: 'text', color: 'gray', text: '(я)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Му ' },
				{ type: 'text', color: 'gray', text: '(мой)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Это ' },
						{ type: 'text', color: 'blue', text: 'мой' },
						{ type: 'text', text: ' компьютер.' },
					] },
				{ eng: [
						{ type: 'text', text: 'It is ' },
						{ type: 'text', color: 'blue', text: 'my' },
						{ type: 'text', text: ' computer.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Это ' },
						{ type: 'text', color: 'blue', text: 'моя' },
						{ type: 'text', text: ' собственная ложка.' },
					] },
				{ eng: [
						{ type: 'text', text: 'It is ' },
						{ type: 'text', color: 'blue', text: 'my' },
						{ type: 'text', text: ' own spoon.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Ты ' },
						{ type: 'text', color: 'blue', text: 'моё' },
						{ type: 'text', text: ' сокровище.' },
					] },
				{ eng: [
						{ type: 'text', text: 'You are ' },
						{ type: 'text', color: 'blue', text: 'my' },
						{ type: 'text', text: ' jewel.' },
					] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Сергей и Алёна ' },
						{ type: 'text', color: 'blue', text: 'мои' },
						{ type: 'text', text: ' дети.' },
					] },
				{ eng: [
						{ type: 'text', text: 'Sergei and Alyona are ' },
						{ type: 'text', color: 'blue', text: 'my' },
						{ type: 'text', text: ' children.' },
					] },
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
							text: 'Такое разнообразие переводов местоимения ',
						},
						{ type: 'text', weight: 'bold', text: 'my' },
						{
							type: 'text',
							text: ' на русский язык связано с падежами. В английском их нет, поэтому мой, моя, моё и мои переводятся одним и тем же словом.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'You ' },
				{ type: 'text', color: 'gray', text: '(вы)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Your ' },
				{ type: 'text', color: 'gray', text: '(ваш)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Ваша' },
						{ type: 'text', text: ' мама не здесь.' },
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Your' },
						{ type: 'text', text: ' mother is not here.' },
					] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'He ' },
				{ type: 'text', color: 'gray', text: '(он)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'His ' },
				{ type: 'text', color: 'gray', text: '(его)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'normal',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Его' },
						{ type: 'text', text: ' нос чёрный и влажный.' },
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'His' },
						{ type: 'text', text: ' nose is black and wet.' },
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
					text: 'В этом предложение подлежащее his nose потому что притяжательное местоимение не может существовать отдельно и должно пристыковываться к существительному. Но даже если прибавить пару прилагательных (его холодный и грязный нос), то всё равно это будет одним подлежащим потому что обозначает одну сущность. Поэтому ',
				},
				{ type: 'text', color: 'gray', weight: 'bold', text: 'be' },
				{ type: 'text', color: 'gray', text: ' стоит не после ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'his' },
				{ type: 'text', color: 'gray', text: ', а после ' },
				{ type: 'text', color: 'gray', weight: 'bold', text: 'his nose' },
				{ type: 'text', color: 'gray', text: '.' },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'She ' },
				{ type: 'text', color: 'gray', text: '(она)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Her ' },
				{ type: 'text', color: 'gray', text: '(её)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', text: 'Это ' },
						{ type: 'text', color: 'blue', text: 'её' },
						{ type: 'text', text: ' новый питомец.' },
					] },
				{ eng: [
						{ type: 'text', text: 'It is ' },
						{ type: 'text', color: 'blue', text: 'her' },
						{ type: 'text', text: ' new pet.' },
					] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'gray', text: '(это)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Its ' },
				{ type: 'text', color: 'gray', text: '(этот)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Эти' },
						{ type: 'text', text: ' джинсы синие.' },
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Its' },
						{ type: 'text', text: ' jeans is blue.' },
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
			children: [
				{ type: 'text', text: 'We ' },
				{ type: 'text', color: 'gray', text: '(мы)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Our ' },
				{ type: 'text', color: 'gray', text: '(наш)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Наша' },
						{
							type: 'text',
							text: ' старшая сестра восхитительна.',
						},
					] },
				{ eng: [
						{ type: 'text', color: 'blue', text: 'Our' },
						{
							type: 'text',
							text: ' elder sister is wonderful.',
						},
					] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'They ' },
				{ type: 'text', color: 'gray', text: '(они)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Their ' },
				{ type: 'text', color: 'gray', text: '(их)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [
						{ type: 'text', color: 'blue', text: 'Их' },
						{
							type: 'text',
							text: ' домашнее задание трудное.',
						},
					] },
				{ eng:[
						{ type: 'text', color: 'blue', text: 'Their' },
						{ type: 'text', text: ' homework is difficult.' },
					]},
			],
		},
		exercises_1,
		{
			type: 'header',
			tag: 'h2',
			style: 'h2',
			text: 'Самостоятельные притяжательные местоимения',
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Самостоятельные притяжательные местоимения заменяют существительное чтобы исключить повторение.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{ type: 'text', text: 'Это моя тарелка, а это ' },
				{ type: 'text', color: 'blue', text: 'твоя ' },
				{ type: 'text', color: 'gray', text: '(тарелка)' },
				{ type: 'text', text: '.' },
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
			type: 'rusToEng',
			textSize: 'normal',
			parts: [
				{ rus: [
						{ type: 'text', text: 'I ' },
						{ type: 'text', color: 'gray', text: '(я)' },
					] },
				{ eng: [
						{ type: 'text', text: 'Mine ' },
						{ type: 'text', color: 'gray', text: '(моя)' },
					] },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Эта тарелка ' },
				{ type: 'text', color: 'blue', text: 'моя' },
				{ type: 'text', text: '.' },
				{ type: 'arrow' },
				{ type: 'text', text: 'This plate is ' },
				{ type: 'text', color: 'blue', text: 'mine' },
				{ type: 'text', text: '.' },
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
							text: 'Предложения «Эта моя тарелка» и «Эта тарелка моя» можно перевести и как This is my plate, так и This plate is mine. Форма с самостоятельным притяжательным местоимением больше подходит чтобы заострить внимание на факте обладания.',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'You ' },
				{ type: 'text', color: 'gray', text: '(вы)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Yours ' },
				{ type: 'text', color: 'gray', text: '(ваш)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Это красная книга ' },
					{ type: 'text', color: 'blue', text: 'ваша' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This red book is ' },
					{ type: 'text', color: 'blue', text: 'yours' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'He ' },
				{ type: 'text', color: 'gray', text: '(он)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'His ' },
				{ type: 'text', color: 'gray', text: '(его)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Этот кактус ' },
					{ type: 'text', color: 'blue', text: 'его' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This cactus is ' },
					{ type: 'text', color: 'blue', text: 'his' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'She ' },
				{ type: 'text', color: 'gray', text: '(она)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Hers ' },
				{ type: 'text', color: 'gray', text: '(её)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Этот дневник ' },
					{ type: 'text', color: 'blue', text: 'её' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This diary is ' },
					{ type: 'text', color: 'blue', text: 'hers' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'gray', text: '(это)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Its ' },
				{ type: 'text', color: 'gray', text: '(эта)' },
			],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Через местоимение ' },
				{ type: 'text', weight: 'bold', text: 'it' },
				{
					type: 'text',
					text: ' обозначают не только предметы и персонажи не являющиеся людьми, но и человека, у которого неизвестен пол или на него не хотят заострять внимание.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Эта тень ' },
					{ type: 'text', color: 'blue', text: 'его/её' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This shadow is ' },
					{ type: 'text', color: 'blue', text: 'its' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'We ' },
				{ type: 'text', color: 'gray', text: '(мы)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Ours ' },
				{ type: 'text', color: 'gray', text: '(наш)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Этот ноутбук ' },
					{ type: 'text', color: 'blue', text: 'наш' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This laptop is ' },
					{ type: 'text', color: 'blue', text: 'ours' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'They ' },
				{ type: 'text', color: 'gray', text: '(они)' },
				{ type: 'arrow' },
				{ type: 'text', text: 'Theirs ' },
				{ type: 'text', color: 'gray', text: '(их)' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [
					{ type: 'text', text: 'Это вознаграждение ' },
					{ type: 'text', color: 'blue', text: 'их' },
					{ type: 'text', text: '.' },
				] }, { eng: [
					{ type: 'text', text: 'This reward is ' },
					{ type: 'text', color: 'blue', text: 'theirs' },
					{ type: 'text', text: '.' },
				] }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Самостоятельные притяжательные местоимения очень похожи на притяжательные местоимения с последующим существительным. Только у них на конце всегда есть буква -',
				},
				{ type: 'text', weight: 'bold', text: 's' },
				{ type: 'text', text: '. А местоимение ' },
				{ type: 'text', color: 'blue', text: 'my' },
				{ type: 'text', text: ' будет ' },
				{ type: 'text', color: 'blue', text: 'mine' },
				{ type: 'text', text: '.' },
			],
		},
		exercises_2,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В русском языке нередко используется слово «свой», «своё». Это слово переводится притяжательным местоимением',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus:  [{ type: 'text', text: 'Она умывает своё лицо каждый день.' }] }, { eng: [{ type: 'text', text: 'She washes her face every day.' }] }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [{ type: 'text', text: 'Я вижу свой прогресс.' }] }, { eng: [{ type: 'text', text: 'I see my progress.' }] }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [{ rus: [{ type: 'text', text: 'Он не помнит свой адрес.' }] }, { eng: [{ type: 'text', text: 'He does not remember his address.' }] }],
		},
		exercises_3,
	],
}

export default possessivePronouns
