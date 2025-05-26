import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const structure: ArticleType.Art = {
	meta: {
		number: 0,
		slug: 'structure',
		name: 'Структура предложения',
		description: 'Изучите как строить предложения где нет подлежащего.',
		keywords: 'Перевод, предложение, английский, русский, глагол, be, was, were',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'В упражнениях предыдущих глав я следил за тем, чтобы порядок слов в предложениях на русском языке соответствовал переводу на английском. Поэтому от вас только требовалась заменить слова и в нужных местах подставить глагол be и, если требуется, вспомогательный глагол или артикль. Но нередко бывает так, что дословно перевести с одного языка на другой не получится потому что каждый язык имеет свою специфику. Давайте поговорим в чём она заключается для английского языка.',
				},
			],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Подлежащее и сказуемое есть всегда' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Другими словами всегда должен быть объект и всегда должно быть указано какое действие выполняет. Вы уже видели это на примере глагола be когда на русском предмет просто чем-то является:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Суп — холодный.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					text: 'Предмет никакое действие не выполняет.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'И нужно искусственно это действие указать:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Суп ',
				},
				{
					type: 'text',
					text: '(есть)',
					color: 'gray',
				},
				{
					type: 'text',
					text: ' холодный.',
				},
			],
			eng: [
				{ type: 'text', text: 'The soup ' },
				{ type: 'text', text: 'is', color: 'blue' },
				{ type: 'text', text: ' cold.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Но на русском можно найти предложения без подлежащего:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Не спится.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					text: 'Понятно, что не спится мне. Но формально это не проговаривается.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'А английском подлежащее нужно явно указать:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Не спится.',
				},
			],
			eng: [
				{ type: 'text', text: 'I', color: 'blue' },
				{ type: 'text', text: ' cannot sleep.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					text: 'Дословно переводится «Я не могу спать». Cannot — это модальный глагол. Изучим в будущем.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Давайте посмотрим другое предложение. Тут и подлежащее есть и действие. Кажется, что всё очевидно. Но такой вариант не совсем правильный:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он милый, но всегда голодный.' }],
			eng: [{ type: 'text', text: 'He is cute but always hungry.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Дело в том, что тут два простых предложения объединены в одно сложное. Первое предложение — «Он (есть) милый». Второе — «всегда голодный». Это не грубая ошибка, но подлежащее скорее продублируют.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он милый, но всегда голодный.' }],
			eng: [{ type: 'text', text: 'He is cute but he is always hungry.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Упражнение на закрепление материала:',
				},
			],
		},
		exercises_1,

		{ type: 'header', tag: 'h2', style: 'h2', text: 'Строгий порядок слов' },
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В английском порядок слов можно описать формулой SVO: subject (подлежащее) – verb (сказуемое) – object (дополнение). Изменить порядок слов как в русском нельзя. Давайте посмотрим примеры.',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Меня научил отец.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Действие выполняет «отец». Это подлежащее. Его на первое место. Затем действие, которое он выполняет. Это на второе. После дополнение, то есть на кого направлено действие — меня. Можно переформулировать таким образом:',
				},
			],
		},
		{
			type: 'paragraph',
			textSize: 'giant',
			children: [
				{
					type: 'text',
					text: 'Мой отец научил меня.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Дословно перевести не получилось чтобы соответствовать порядку членов предложения в английском языке. Но смысл от этого никак не изменился.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Меня научил отец.' }],
			eng: [{ type: 'text', text: 'My father taught me.' }],
		},
		{ type: 'header', tag: 'h2', style: 'h2', text: 'Не забывайте про определители' },
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Англоговорящие обожают указывать что это за существительное: определённое или неопределённое. Это делается через определители. Мы знаем неопределённый артикль a, остальные определённые: the, притяжательные и указательные местоимения. На русском прямых аналогов для a и the просто не существует, а притяжательные местоимения указывают в куда меньших количествах. Без них речь выглядит чище. В английском они используются в больших количествах.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Он дал сестре деньги.',
				},
			],
			eng: [{ type: 'text', text: 'He gave his sister money.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Все, что вам нужно — это паспорт, билеты и деньги.',
				},
			],
			eng: [{ type: 'text', text: 'All you need is your passport, your tickets and your money.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: '-----------------------------------------',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{ type: 'text', text: 'Он ' },
				{ type: 'text', color: 'blue', text: 'был' },
				{ type: 'text', text: ' щенком.' },
			],
			eng: [
				{ type: 'text', text: 'It ' },
				{ type: 'text', color: 'blue', text: 'was' },
				{ type: 'text', text: ' a puppy.' },
			],
		},
		{
			type: 'paragraph',
			textSize: 'small',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'Заметьте, что хотя на русском используется местоимение «он», но в переводе на английский его нужно заменить на it (это) потому что he или she применяется только к людям. Животные и неодушевлённые предметы называются через it.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Том позвонил маме и сообщил радостную новость.' }],
			eng: [{ type: 'text', text: 'Tom phoned his mummy and told her the good news.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я уверен, что результаты моих экзаменов здесь.' }],
			eng: [{ type: 'text', text: 'I am sure my examination results are here.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					color: 'gray',
					text: 'В русском языке когда говорят про родственников, то подразумевают «свойх» родственников, а не каких-то чужих. А в английском всегда уточняйте чей родственник. Потому что английские мозги так устроены, что хотят точно знать каком объекте сообщаете: определённом или не определённом.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Он позволил мне уйти.',
				},
			],
			eng: [{ type: 'text', text: 'He let me go.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Он очень часто плавает.',
				},
			],
			eng: [{ type: 'text', text: 'He swims very often.' }],
		},
	],
}

export default structure
