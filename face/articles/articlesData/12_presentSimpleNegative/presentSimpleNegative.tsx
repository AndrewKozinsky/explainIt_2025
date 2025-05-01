import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const presentSimpleNegative: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'present-simple-negative',
		articleName: 'Present Simple в отрицании',
		articleDescription: 'Изучим как составлять отрицательные предложения в Present Simple.',
	},
	content: [
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В вопросе Present Simple вспомогательный глагол do должен стоять до подлежащего. И он же участвует для формирования отрицания. Только do должен стоять после подлежащего. И после него отрицательная частица not.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleNegative_1.src,
			alt: imageMapper.schemas.PresentSimpleNegative_1.alt,
		},
		{
			type: 'paragraph',
			offset: true,

			children: [
				{
					type: 'text',
					text: 'И как в вопросе вспомогательный глагол перетягивает на себя настоящее время со смыслового глагола. Поэтому в третьем лица do превращается в does. А смысловой глагол ставится в неопределённую форму.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleNegative_2.src,
			alt: imageMapper.schemas.PresentSimpleNegative_2.alt,
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
							text: 'У вас мог возникнуть вопрос а нужно ли при переводе точно так же делать два шага. Конечно нет. Это сделано чтобы вы понимали механизм образования вопроса и отрицания. Вы должны стремиться к полному автоматизму при переводе.',
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
					text: 'Давайте из утверждения сделаем вопрос и отрицание.',
				},
			],
		},
		{
			type: 'grid',
			offset: true,
			gridId: 'grid-35531',
			cells: [
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Он зарабатывает деньги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'He earn money.' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Он зарабатывает деньги?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Does he earn money?' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Он не зарабатывает деньги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'He does not earn money.' }],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Примеры:' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Ты не помогаешь своим родителям.',
				},
			],
			eng: [
				{
					type: 'text',
					text: 'You do not help your parents.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [{ type: 'text', text: 'Он не работает здесь.' }],
			eng: [{ type: 'text', text: 'He does not work here.' }],
		},
		exercises_1,
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В английском не приняты двойные отрицания. Поэтому русские обороты вроде «никогда не» переводите через never.',
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Мы никогда не ходим пешком.',
				},
			],
			eng: [{ type: 'text', text: 'We never walk.' }],
		},
	],
}

export default presentSimpleNegative
