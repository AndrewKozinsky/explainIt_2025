import ExercisesType from '../../articleTypes/exercisesType'

const exercises_2: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: '30 минут каждый день — это идеальный вариант.',
			engSentences: [{ engSentences: ['30 minutes every day is ideal.'], isCorrect: true }],
			words: [
				{ rusWord: 'минута', engWord: 'minute' },
				{ rusWord: 'каждый', engWord: 'every' },
				{ rusWord: 'день', engWord: 'day' },
				{ rusWord: 'идеальный вариант', engWord: 'ideal' },
			],
		},
		{
			rusSentence: 'Он очень хороший друг.',
			engSentences: [{ engSentences: ['He is a very good friend'], isCorrect: true }],
			words: [
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'хороший', engWord: 'good' },
				{ rusWord: 'друг', engWord: 'friend' },
			],
		},
		{
			rusSentence: 'Его одежда ужасна. Она такая старомодная.',
			engSentences: [{ engSentences: ['His clothes are awful. They are so old-fashioned.'], isCorrect: true }],
			words: [
				{ rusWord: 'его', engWord: 'his' },
				{ rusWord: 'одежда', engWord: 'clothes' },
				{ rusWord: 'ужасна', engWord: 'awful' },
				{ rusWord: 'старомодный', engWord: 'old-fashioned' },
			],
		},
		{
			rusSentence: 'Я продавец, ты клиент.',
			engSentences: [{ engSentences: ['I am the shopkeeper, you are the customer.'], isCorrect: true }],
			words: [
				{ rusWord: 'продавец', engWord: 'shopkeeper' },
				{ rusWord: 'клиент', engWord: 'customer' },
			],
		},
		{
			rusSentence: 'Маша просто истеричная дура, а Саша самовлюблённый болван.',
			engSentences: [
				{
					engSentences: ['Masha is just a hysterical fool and Sasha is a narcissistic idiot.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'просто', engWord: 'just' },
				{ rusWord: 'истеричный', engWord: 'hysterical' },
				{ rusWord: 'дурак', engWord: 'fool' },
				{ rusWord: 'самовлюблённый', engWord: 'narcissistic' },
				{ rusWord: 'болван', engWord: 'idiot' },
			],
		},
		{
			rusSentence: 'Я единственный ребенок и очень балованная.',
			engSentences: [{ engSentences: ['I am an only child and very spoiled.'], isCorrect: true }],
			words: [
				{ rusWord: 'единственный', engWord: 'only' },
				{ rusWord: 'ребенок', engWord: 'child' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'балованный', engWord: 'spoiled' },
			],
		},
		{
			rusSentence: 'Они оба невероятно счастливые.',
			engSentences: [{ engSentences: ['They are both incredibly happy.'], isCorrect: true }],
			words: [
				{ rusWord: 'оба', engWord: 'both' },
				{ rusWord: 'невероятно', engWord: 'incredibly' },
				{ rusWord: 'счастливый', engWord: 'happy' },
			],
		},
		{
			// TODO
			rusSentence: 'Асфальт очень старый, а вот скамейки отличные.',
			engSentences: [
				{
					engSentences: ['Asphalt is very old, but the benches are excellent.'],
					isCorrect: true,
				},
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									text: 'В этом пр',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'два', engWord: 'two' }],
		},
		{
			// TODO
			rusSentence: 'Окно закрыто.',
			engSentences: [{ engSentences: ['The window is closed.'], isCorrect: true }],
			words: [
				{ rusWord: 'готовый', engWord: 'ready' },
				{ rusWord: 'скоро', engWord: 'soon' },
			],
		},
		{
			rusSentence: 'Орлы — очень сильные  птицы.',
			engSentences: [{ engSentences: ['Eagles are very strong birds.'], isCorrect: true }],
			words: [
				{ rusWord: 'орёл', engWord: 'eagle' },
				{ rusWord: 'сильный', engWord: 'strong' },
				{ rusWord: 'птица', engWord: 'bird' },
			],
		},
		{
			// TODO
			rusSentence: 'Кот — чёрный.',
			engSentences: [{ engSentences: ['The cat is black.'], isCorrect: true }],
			words: [
				{ rusWord: 'команда', engWord: 'team' },
				{ rusWord: 'лидер', engWord: 'leader' },
			],
		},
		{
			rusSentence: 'Она такая умная, такая добрая, такая счастливая!',
			engSentences: [{ engSentences: ['She is so clever, so kind, so happy!'], isCorrect: true }],
			words: [
				{ rusWord: 'умный', engWord: 'clever' },
				{ rusWord: 'добрый', engWord: 'kind' },
				{ rusWord: 'счастливый', engWord: 'happy' },
			],
		},
		{
			rusSentence: 'Еда в холодильнике.',
			engSentences: [{ engSentences: ['The food is in the refrigerator.'], isCorrect: true }],
			words: [
				{ rusWord: 'еда', engWord: 'food' },
				{ rusWord: 'холодильник', engWord: 'refrigerator' },
			],
		},
	],
}

export default exercises_2
