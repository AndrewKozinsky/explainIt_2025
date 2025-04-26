import ExercisesType from '../../articleTypes/exercisesType'

const exercises_1: ExercisesType.ExercisesObj = {
	type: 'exercises',
	exercises: [
		{
			rusSentence: 'Это книга.',
			engSentences: [
				{ engSentences: ['It is a book.'], isCorrect: true },
				{
					engSentences: ['It a book.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В предложении сообщается чем является подлежащее «Это». Поэтому после него ставиться to be в одной из своих форм зависящей от лица подлежащего.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It is the book.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Книга упоминается в первый раз. Поэтому существительное «книга» будет в значении «одна из книг». Чтобы это показать поставьте неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: ' вместо ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'the',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'книга', engWord: 'book' }],
		},
		{
			rusSentence: 'Я строитель',
			engSentences: [
				{ engSentences: ['I am a builder.'], isCorrect: true },
				{
					engSentences: ['I am builder.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Перед существительными в единственном числе нужно ставить артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '. Подробнее о его назначении будет рассказано в следующей главе.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'строитель', engWord: 'builder' }],
		},
		{
			rusSentence: 'Это журнал.',
			engSentences: [
				{ engSentences: ['It is a magazine.'], isCorrect: true },
				{
					engSentences: ['It are a magazine.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'После ',
								},
								{
									type: 'text',
									color: 'gold',
									text: 'it',
								},
								{
									type: 'text',
									text: ' ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'be',
								},
								{
									type: 'text',
									text: ' будет в форме ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'is',
								},
								{
									type: 'text',
									text: '. Are ставится только после подлежащего второго лица.',
								},
							],
						},
					],
				},
				{
					engSentences: ['They are a magazine.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'They обозначает «они». А в предложении сказано «Это». Поэтому должно быть ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'it',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'журнал', engWord: 'magazine' }],
		},
		{
			rusSentence: 'Он учитель.',
			engSentences: [
				{ engSentences: ['He is a teacher.'], isCorrect: true },
				{
					engSentences: ['He teacher.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В этом предложении сообщается о профессии человека, кем он является. В английском чтобы сообщить и каким является персонаж и кем/чем нужно использовать to be в форме зависящей от лица подлежащего. «Он» — это третье лицо, поэтому to be будет в форме is.',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,
							children: [
								{
									type: 'text',
									text: 'Ещё перед любым существительным англоговорящие ставят определяющее слово каким оно является: определённым или неопределённым. Определённые существительные обозначают точный предмет известный собеседнику. А неопределённые любой предмет из класса таких же предметов. В русском предложении говорится о профессии персонажа: он один из учителей. Поэтому существительное будет неопределённым. А чтобы это обозначить перед ним ставится неопределённый артикль a.',
								},
							],
						},
					],
				},
				{
					engSentences: ['He a teacher.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В этом предложении сообщается о профессии человека, кем он является. В английском чтобы сообщить и каким является персонаж и кем/чем нужно использовать to be в форме зависящей от лица подлежащего. «Он» — это третье лицо, поэтому to be будет в форме is.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'учитель', engWord: 'teacher' }],
		},
		{
			rusSentence: 'Это телефон.',
			engSentences: [
				{ engSentences: ['It is a phone.'], isCorrect: true },
				{
					engSentences: ['It is an phone.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'An используется если следом идёт слово начинающееся на гласную. А phone и на письме и вербально начинается на согласную ph.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It are phone.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									color: 'blue',
									text: 'It',
								},
								{
									type: 'text',
									text: ' — это местоимение третьего лица. Поэтому после него должен стоять ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'is',
								},
								{
									type: 'text',
									text: '. И перед существительным не написан неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: ' потому что сообщается, что это один из множества старых телефонов, не не какой-то конкретный.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'телефон', engWord: 'phone' }],
		},
		{
			rusSentence: 'Павел студент.',
			engSentences: [
				{ engSentences: ['Pavel is a student.'], isCorrect: true },
				{
					engSentences: ['Pavel be student.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Павел является студентом. Тут правильно использован ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: '. Но ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' в чистом виде используется в других типах предложений. Тут ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: '?',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,

							children: [
								{
									type: 'text',
									text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
				{
					engSentences: ['Pavel is student.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									text: 'Перед существительными ставится один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'студент', engWord: 'student' }],
		},
		{
			rusSentence: 'Это дверь.',
			engSentences: [
				{ engSentences: ['It is a door.'], isCorrect: true },
				{
					engSentences: ['Pavel be student.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',
									text: 'Павел является студентом. Тут правильно использован ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: '. Но ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' в чистом виде используется в других типах предложений. Тут ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' должен быть в одной из форм настоящего времени потому что без указания времени бытия предложение грамматически неправильное. В какой форме будет ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: '?',
								},
							],
						},
						{
							type: 'paragraph',
							offset: true,

							children: [
								{
									type: 'text',
									text: 'Ещё мы договорились перед существительными ставить один из определителей. Так как тут сообщается, что Павел является одним из студентов, то перед ним ставится неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'дверь', engWord: 'door' }],
		},
		{
			rusSentence: 'Они всё ещё дети.',
			engSentences: [{ engSentences: ['They are still children.'], isCorrect: true }],
			words: [
				{ rusWord: 'они', engWord: 'they' },
				{ rusWord: 'всё ещё', engWord: 'still' },
				{ rusWord: 'дети', engWord: 'children' },
			],
		},
		{
			rusSentence: 'Эйприл Фокс танцовщица.',
			engSentences: [{ engSentences: ['April Fox is a dancer.'], isCorrect: true }],
			words: [{ rusWord: 'танцор/танцовщица', engWord: 'dancer' }],
		},
		{
			rusSentence: 'Ты и Палмер такие тупые!',
			engSentences: [
				{
					engSentences: ['You and Palmer are so stupid!'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Палмер', engWord: 'Palmer' },
				{ rusWord: 'такой', engWord: 'so' },
				{ rusWord: 'тупой', engWord: 'stupid' },
			],
		},
		{
			// TODO
			rusSentence: 'Волк — это хищное животное.',
			engSentences: [
				{
					engSentences: ['A wolf is a predator animal.'],
					isCorrect: true,
				},
			],
			words: [
				{ rusWord: 'Палмер', engWord: 'Palmer' },
				{ rusWord: 'такой', engWord: 'so' },
			],
		},
		{
			rusSentence: 'Это старая деревня.',
			engSentences: [
				{ engSentences: ['It is an old village.'], isCorrect: true },
				{
					engSentences: ['It is old village.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Воспринимайте old village как одну сущность: старая деревня. Но англичанам важно знать это одна из множества старых деревень или та самая конкретная деревня. Это одна из множества. Поэтому перед ней ставьте неопределённый артикль a потому что «деревня» — это исчисляемое существительное в единственном числе. А перед ними ставится артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '. Но так как перед артиклем стоит слово начинающееся на гласную, то используйте артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'an',
								},
								{
									type: 'text',
									text: ' для благозвучности.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It is a old village.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Слово ',
								},
								{
									type: 'text',
									color: 'blue',

									text: 'old',
								},
								{
									type: 'text',
									text: ' пишется и произносится через гласную ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'o',
								},
								{
									type: 'text',
									text: '. А a используется когда следом идёт слово начинающуюся на согласную. ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'an',
								},
								{
									type: 'text',
									text: ' с согласной сделано для удобства речи потому что язык спотыкается когде есть подряд две гласные.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'старый', engWord: 'old' },
				{ rusWord: 'деревня', engWord: 'village' },
			],
		},
		{
			rusSentence: 'Валера — главный редактор.',
			engSentences: [
				{ engSentences: ['Valera is an editor-in-chief.'], isCorrect: true },
				{
					engSentences: ['Valera is editor-in-chief.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',

									text: 'editor-in-chief — это существительное. А перед ними мы договорились всегда ставить определяющее слово. Валера один из главных редакторов, поэтому стоит поставить неопределённый артикль a.',
								},
							],
						},
					],
				},
				{
					engSentences: ['Valera is an editor-in-chief.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Неопределённый артикль a не может стоять в форме an потому что следом не стоит слово начинающееся на согласную.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'главный редактор', engWord: 'editor-in-chief' }],
		},
		{
			rusSentence: 'Кстати, он очень хороший врач.',
			engSentences: [
				{ engSentences: ['He\'s a very good doctor, by the way.'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Сообщается кем он является — очень хорошим врачом. Поэтому после подлежащего должен быть to be. B один один из «очень хороших докторов». Поэтому перед этим словосочетанием должен быть неопределённый артикль a.',
								},
							],
						},
					],
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
									text: 'Грамматически правильно, но забыли слово «очень».',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'кстати', engWord: 'by the way' },
				{ rusWord: 'очень', engWord: 'good' },
				{ rusWord: 'очень', engWord: 'very' },
				{ rusWord: 'врач', engWord: 'doctor' },
			],
		},
		{
			rusSentence: 'Это железо, а это утюг.',
			engSentences: [{ engSentences: ['It is iron, but it is an iron.'], isCorrect: true }],
			words: [{ rusWord: 'железо/утюг', engWord: 'iron' }],
		},
		{
			rusSentence: 'Майкл — настоящий мужчина.',
			engSentences: [
				{ engSentences: ['Michael is a real man.'], isCorrect: true },
				{
					engSentences: ['Michael is the real man.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Если бы в контексте разговора упоминался какой-то настоящий мужчина и потом сообщили, что Майкл и он есть, то предложение было бы правильным. Но про это ничего не сказано. И смысл предложения в том, что Майкл один из настоящих мужчин. Поэтому перед связкой ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'real man',
								},
								{
									type: 'text',
									text: ' нужно поставить неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
				{
					engSentences: ['Michael is real a man.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Неопределённый артикль a должен стоять перед связкой прилагательного + существительного.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'настоящий', engWord: 'real' },
				{ rusWord: 'мужчина', engWord: 'man' },
			],
		},
		{
			rusSentence: 'Человеческий младенец полностью беспомощен.',
			engSentences: [
				{ engSentences: ['A human baby is totally helpless.'], isCorrect: true },
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
			words: [
				{ rusWord: 'человеческий', engWord: 'human' },
				{ rusWord: 'младенец', engWord: 'baby' },
				{ rusWord: 'полностью', engWord: 'totally' },
				{ rusWord: 'беспомощен', engWord: 'helpless' },
			],
		},
		{
			rusSentence: 'Собака — верный питомец.',
			engSentences: [
				{ engSentences: ['A dog is a loyal pet.'], isCorrect: true },
				{
					engSentences: ['A dog is loyal pet.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Перед loyal pet должен быть неопределённый артикль a потому что подразумевают типичное поведение: любая собака по поведению — это верный питомец.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'собака', engWord: 'dog' },
				{ rusWord: 'верный', engWord: 'loyal' },
				{ rusWord: 'домашнее животное', engWord: 'pet' },
			],
		},
		{
			rusSentence: 'Она художница.',
			engSentences: [
				{ engSentences: ['She is an artist.'], isCorrect: true },
				{
					engSentences: ['She a artist is.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В английских предложениях есть чёткий порядок слов: за подлежащим следует сказуемое в повествовательных предложениях. Тут сказуемое убежало в конец предложения.',
								},
							],
						},
					],
				},
				{
					engSentences: ['She am a famous artist.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'После местоимения ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'she',
								},
								{
									type: 'text',
									text: ' следует ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' в форме ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'is',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'знаменитый', engWord: 'famous' },
				{ rusWord: 'художник', engWord: 'artist' },
			],
		},

		{
			rusSentence: 'Это конверт.',
			engSentences: [
				{ engSentences: ['It is an envelop.'], isCorrect: true },
				{
					engSentences: ['It is a envelope.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Неопределённый артикль ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: ' пишется перед словами начинающиеся с согласной для благозвучности. А envelop начинается с гласной. Поэтому тут используйте ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'an',
								},
								{
									type: 'text',
									text: '.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It is envelop.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Перед существительным должно быть определяющее слово. О каком конверте идёт речь: об определённом или одном из? Если отдельно не сказано, то об одном из множества.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'конверт', engWord: 'envelope' }],
		},
		{
			rusSentence: 'Вы идиот.',
			engSentences: [{ engSentences: ['You are an idiot '], isCorrect: true }],
			words: [{ rusWord: 'идиот', engWord: 'idiot' }],
		},
		{
			rusSentence: 'Он дикарь.',
			engSentences: [
				{ engSentences: ['He is a savage.'], isCorrect: true },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',

							children: [
								{
									type: 'text',

									text: 'Местоимение he стоит в третьем лице. А to be в третьем лице настоящего времени будет в форме is. В остальном предложение правильное.',
								},
							],
						},
					],
				},
			],
			words: [{ rusWord: 'дикарь', engWord: 'savage' }],
		},
		{
			rusSentence: 'Я Кельвин.',
			engSentences: [
				{ engSentences: ['I am Calvin.'], isCorrect: true },
				{
					engSentences: ['I am Kelvin'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Кельвин пишется через ',
								},
								{ type: 'text', weight: 'bold', text: 'C' },
								{
									type: 'text',
									text: ': Calvin. А так предложение правильное.',
								},
							],
						},
					],
				},
				{
					engSentences: ['I am Celvin'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Кельвин пишется через ',
								},
								{ type: 'text', weight: 'bold', text: 'a' },
								{
									type: 'text',
									text: ', а не ',
								},
								{ type: 'text', weight: 'bold', text: 'e' },
								{
									type: 'text',
									text: ': C',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'a',
								},
								{
									type: 'text',
									text: 'lvin. А так предложение правильное.',
								},
							],
						},
					],
				},
			],
			words: [],
		},
		{
			rusSentence: 'Он полицейский.',
			engSentences: [{ engSentences: ['He is a policeman.'], isCorrect: true }],
			words: [{ rusWord: 'полицейский', engWord: 'policeman' }],
		},
		{
			rusSentence: 'Даша симпатичная девушка.',
			engSentences: [
				{ engSentences: ['Dasha is a pretty girl.'], isCorrect: true },
				{
					engSentences: ['Dasha is are pretty girl.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В предложении ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'to be',
								},
								{
									type: 'text',
									text: ' должен быть в один. А тут их два: в форме ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'is',
								},
								{
									type: 'text',
									text: ' и ',
								},
								{
									type: 'text',
									color: 'blue',
									text: 'are',
								},
								{
									type: 'text',
									text: '. И артикля a не хватает. Даша ведь одна из симпатичных девушек, а не та самая.',
								},
							],
						},
					],
				},
				{
					engSentences: ['Dasha is pretty a girl.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'В связке прилагательного и существительного первым идёт неопределённый артикль a. Поставьте его перед прилагательным.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'симпатичный', engWord: 'pretty' },
				{ rusWord: 'девушка', engWord: 'girl' },
			],
		},
		{
			rusSentence: 'Это чёрный телефон.',
			engSentences: [
				{ engSentences: ['It is a black phone.'], isCorrect: true },
				{
					engSentences: ['It is black a phone.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Неопределённый артикль a должен стоять перед связкой прилагательного + существительного. Считайте black phone одной сущностью перед которой нужно показать определённость или неопределённость через определяющее слово.',
								},
							],
						},
					],
				},
				{
					engSentences: ['It phone is black.'],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Тут одновременно есть два подлежащих: it и phone. Так быть не должно.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'чёрный', engWord: 'black' },
				{ rusWord: 'телефон', engWord: 'phone' },
			],
		},
		{
			rusSentence: 'Это просто любопытный факт.',
			engSentences: [
				{ engSentences: [], isCorrect: false },
				{
					engSentences: [],
					isCorrect: false,
					analysis: [
						{
							type: 'paragraph',
							children: [
								{
									type: 'text',
									text: 'Если перед существительным есть прилагательное, относящиеся к этому существительному, то артикль a должен стоять перед этим словом, а не после.',
								},
							],
						},
					],
				},
			],
			words: [
				{ rusWord: 'просто', engWord: 'just' },
				{ rusWord: 'любопытный', engWord: 'fun' },
				{ rusWord: 'факт', engWord: 'fact' },
			],
		},
	],
}

export default exercises_1
