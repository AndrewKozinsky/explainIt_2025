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
					text: 'В вопросе Present Simple вспомогательный глагол do стоит до подлежащего. И он же участвует для формирования отрицания. Только do должен стоять после подлежащего. И ешё отрицательная частица not.',
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
			children: [
				{
					type: 'text',
					text: 'После подлежащих 1-го и 2-го лица (I, we, they) вспомогательный do никак не меняется.',
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
							children: [{ type: 'text', text: 'Я читаю английские книги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'I read English books.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Они курят.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'They smoke.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Мы часто проверяем это.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'We often check it.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Он зарабатывает деньги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'He earn money.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Она преподаёт математику.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'She teaches math.' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я читаю английские книги?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Do I read English books?' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Они курят?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Do they smoke?' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Мы часто проверяем это?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Do we often check it?' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Он зарабатывает деньги?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Does he earn money?' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Она преподаёт математику?' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'Does she teach math?' }],
						},
					],
				},
				{
					children: [
						{
							type: 'paragraph',
							children: [{ type: 'text', text: 'Я не читаю английские книги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'I do not read English books.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Они не курят.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'They do not smoke.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Мы не часто проверяем это.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'We do not often check it.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Он не зарабатывает деньги.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'He does not earn money.' }],
						},

						{
							type: 'paragraph',
							offset: true,
							children: [{ type: 'text', text: 'Она не преподаёт математику.' }],
						},
						{
							type: 'paragraph',
							textSize: 'giant',
							children: [{ type: 'text', text: 'She does not teach math.' }],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			offset: true,
			children: [{ type: 'text', text: 'Другие примеры:' }],
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
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Я не работаю весь день.',
				},
			],
			eng: [{ type: 'text', text: 'I do not work all day.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Она не есть мясо.',
				},
			],
			eng: [{ type: 'text', text: 'She does not eat meat.' }],
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
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'У меня никогда нет личной жизни.',
				},
			],
			eng: [{ type: 'text', text: 'I never have any privacy.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Ты никогда не меняешься. Ты все еще подросток.',
				},
			],
			eng: [{ type: 'text', text: 'You never change. You are still a teenager.' }],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			rus: [
				{
					type: 'text',
					text: 'Ник никогда меня не замечает.',
				},
			],
			eng: [{ type: 'text', text: 'Nick never notices me.' }],
		},
	],
}

export default presentSimpleNegative
