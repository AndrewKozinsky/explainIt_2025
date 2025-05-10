import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'
import exercises_2 from './exercises-2'
import exercises_3 from './exercises-3'

const pastSimplePositive1: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'past-simple-positive-1',
		name: 'Past Simple в утверждении (часть 1)',
		description: 'Изучим как составлять предложения в грамматическом времени Past Simple для правильных глагов.',
		keywords: 'Past Simple, паст симпл, утверждение, правильные глаголы',
	},
	content: [
		{
			type: 'paragraph',
			children: [
				{
					type: 'text',
					text: 'Past Simple — это грамматическое время для обозначения действия совершённого в прошлом: час назад, вчера, в прошлом веке.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В Present Simple смысловой глагол находится в настоящему времени. После местоимений 1-го и 2-го лица выглядит как инфинитив. А после третьего лица имеет окончание s. Ранее вы это детально обсуждали:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я хочу сок.' }],
			eng: [{ type: 'text', text: 'I want juice.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он гладит твои штаны.' }],
			eng: [
				{ type: 'text', text: 'He iron' },
				{ type: 'text', text: 's', color: 'blue' },
				{ type: 'text', text: ' your trousers.' },
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Чтобы обозначить, что действие произошло в прошлом нужно к глаголу в неопределённой форме добавить окончание ',
				},
				{
					type: 'text',
					text: 'ed',
					color: 'blue',
				},
				{
					type: 'text',
					text: '. Это действует для всех лиц:',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Я хотел сок.' }],
			eng: [
				{ type: 'text', text: 'I want' },
				{ type: 'text', text: 'ed', color: 'blue' },
				{ type: 'text', text: ' juice.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он гладил твои штаны.' }],
			eng: [
				{ type: 'text', text: 'He iron' },
				{ type: 'text', text: 'ed', color: 'blue' },
				{ type: 'text', text: ' your trousers.' },
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
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он гладил твои штаны.' }],
			eng: [
				{ type: 'text', text: 'He iron' },
				{ type: 'text', text: 'ed', color: 'blue' },
				{ type: 'text', text: ' your trousers.' },
			],
		},

		exercises_1,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'И есть несколько исключений в словах, к которым добавление ',
				},
				{ type: 'text', color: 'blue', text: 'ed' },
				{
					type: 'text',
					text: ' создаёт неудобно при говорении.',
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если глагол оканчивается на ',
				},
				{ type: 'text', color: 'gold', text: 'e' },
				{
					type: 'text',
					text: ', то во второй форме добавляется ',
				},
				{ type: 'text', color: 'blue', text: 'd' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'big',
			rus: [
				{
					type: 'text',
					text: 'спасать — спас',
				},
			],
			eng: [
				{ type: 'text', text: 'sav' },
				{ type: 'text', color: 'gold', text: 'e' },
				{ type: 'text', text: ' — sav' },
				{ type: 'text', color: 'gold', text: 'e' },
				{ type: 'text', color: 'blue', text: 'd' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			rus: [{ type: 'text', text: 'Он спас ей жизнь.' }],
			eng: [{ type: 'text', text: 'He saved her live.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Мой друг переехал в Италию.' }],
			eng: [{ type: 'text', text: 'My friend moved to Italy.' }],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Если глагол оканчивается на ',
				},
				{ type: 'text', color: 'gold', text: 'y' },
				{
					type: 'text',
					text: ', которой предшествует согласная буква, то убирается ',
				},
				{ type: 'text', color: 'gold', text: 'y' },
				{
					type: 'text',
					text: ' и добавляется ',
				},
				{ type: 'text', color: 'blue', text: 'ied' },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'big',
			rus: [
				{
					type: 'text',
					text: 'пытаться — пытался',
				},
			],
			eng: [
				{ type: 'text', text: 'tr' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', text: ' — tr' },
				{ type: 'text', color: 'blue', text: 'ied' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'big',
			rus: [
				{
					type: 'text',
					text: 'учиться — учился',
				},
			],
			eng: [
				{ type: 'text', text: 'stud' },
				{ type: 'text', color: 'gold', text: 'y' },
				{ type: 'text', text: ' — styd' },
				{ type: 'text', color: 'blue', text: 'ied' },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			offset: true,
			rus: [{ type: 'text', text: 'Она заплакала вдруг.' }],
			eng: [
				{ type: 'text', text: 'She cr' },
				{ type: 'text', text: 'ied', color: 'blue' },
				{ type: 'text', text: ' suddenly.' },
			],
		},
		exercises_2,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Смешанная практика: часть предложений в Present Simple, часть в Past Simple.',
				},
			],
		},
		exercises_3,
	],
}

export default pastSimplePositive1
