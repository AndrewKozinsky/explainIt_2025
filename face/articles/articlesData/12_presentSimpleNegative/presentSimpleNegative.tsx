import { imageMapper } from '../../../utils/imageMapper'
import ArticleType from '../../articleTypes/articleType'
import exercises_1 from './exercises-1'

const presentSimpleNegative: ArticleType.Art = {
	meta: {
		number: 1,
		slug: 'present-simple-negative',
		name: 'Present Simple в отрицании',
		description: 'Изучим как составлять отрицательные предложения в Present Simple.',
		keywords: 'present simple, отрицательные предложения, отрицание, презент симпл, вопрос в настоящем времени',
	},
	content: [
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'В русском языке для отрицания действия мы ставим отрицательное слово «не» перед глаголом. В английском это слово ',
				},
				{
					type: 'text',
					text: 'not',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. Но перед ',
				},
				{
					type: 'text',
					text: 'not',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' ещё должен стоять вспомогательный глагол. Во времени Simple это ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' как вы уже знаете.',
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
					text: 'И как в вопросе вспомогательный глагол перетягивает на себя настоящее время со смыслового глагола. Поэтому в третьем лица ',
				},
				{
					type: 'text',
					text: 'do',
					weight: 'bold',
				},
				{
					type: 'text',
					text: ' превращается в ',
				},
				{
					type: 'text',
					text: 'does',
					weight: 'bold',
				},
				{
					type: 'text',
					text: '. А смысловой глагол ставится в неопределённую форму.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleNegative_2.src,
			alt: imageMapper.schemas.PresentSimpleNegative_2.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Поставлю do not перед местоимением первого лица чтобы сделать отрицание.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleNegative_3.src,
			alt: imageMapper.schemas.PresentSimpleNegative_3.alt,
		},
		{
			type: 'paragraph',
			offset: true,
			children: [
				{
					type: 'text',
					text: 'Снова вспомогательный глагол do перетягивает со смыслового время совершения действия. Поэтому like в форме настоящего времени становится в неопределённую форму. А do с неопределённой форме становится в форму настоящего времени. Но так как в настоящем времени перед местоимениями 1-го и 2-го лица глаголы никак свою форму не меняют, то выглядит так, как будто к глаголу просто подставили do not.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.schemas.PresentSimpleNegative_4.src,
			alt: imageMapper.schemas.PresentSimpleNegative_4.alt,
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
					text: 'Если по-простому, то для составления отрицания у Present Simple после местоимений первого и второго лица ставьте do not, а третьего does not. Смысловой глагол должен стоять в неопределённой форме.',
				},
			],
		},
		{
			type: 'image',
			src: imageMapper.tables.PresentSimpleNegative.src,
			alt: imageMapper.tables.PresentSimpleNegative.alt,
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
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Ты не помогаешь своим родителям.',
						},
					],
				},
				{
					eng: [
						{
							type: 'text',
							text: 'You do not help your parents.',
						},
					],
				},
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{ rus: [{ type: 'text', text: 'Он не работает здесь.' }] },
				{ eng: [{ type: 'text', text: 'He does not work here.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Я не работаю весь день.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'I do not work all day.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Она не есть мясо.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'She does not eat meat.' }] },
			],
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
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Мы никогда не ходим пешком.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'We never walk.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'У меня никогда нет личной жизни.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'I never have any privacy.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Ты никогда не меняешься. Ты все еще подросток.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'You never change. You are still a teenager.' }] },
			],
		},
		{
			type: 'rusToEng',
			textSize: 'giant',
			parts: [
				{
					rus: [
						{
							type: 'text',
							text: 'Майкл никогда меня не замечает.',
						},
					],
				},
				{ eng: [{ type: 'text', text: 'Michael never notices me.' }] },
			],
		},
	],
}

export default presentSimpleNegative
