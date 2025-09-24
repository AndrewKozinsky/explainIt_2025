import { BdConfig } from './dbConfigType'

/**
 * Database structure.
 * With help of this structure, it is formed schema.prisma and class-validator set of decorators to check fields in DTO.
 */
export const bdConfig = {
	AI: {
		dtoProps: {
			rusSentence: {
				type: 'string',
				minLength: 5,
				maxLength: 120,
				description: 'Sentence in Russian',
				example: 'Он часто бегает',
				required: true,
			},
			engSentence: {
				type: 'string',
				minLength: 1,
				maxLength: 120,
				description: 'Sentence in English',
				example: 'He often runs',
				required: true,
			},
		},
		dbFields: {},
	},
	User: {
		dtoProps: {
			password: {
				type: 'string',
				minLength: 6,
				maxLength: 30,
				match: /[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
				matchErrorMessage:
					'Password must have min length is 6 and max length is 30 and contains letters, numbers and other symbols',
				description: 'User password',
				example: '$1Hn[595n8]T',
				required: false,
			},
			codeToGetUserDataFromOAuthProvider: {
				type: 'string',
				required: true,
			},
		},
		dbFields: {
			id: {
				type: 'index',
			},
			email: {
				type: 'email',
				unique: true,
				description: 'User\'s email',
				required: true,
			},
			password: {
				type: 'string',
				description: 'Hashed user\'s password',
				example: 'z151JPS16jz151JPS16j',
				required: false,
			},
			email_confirmation_code: {
				type: 'string',
				required: false,
				minLength: 3,
				maxLength: 100,
				description: 'The code with which the user must confirm his email',
				example: '1836',
			},
			email_confirmation_code_expiration_date: {
				type: 'string',
				required: false,
				description: 'The date when email confirmation code will be expired',
				example: '2024-08-30T08:43:48.596Z',
			},
			is_email_confirmed: {
				type: 'boolean',
				default: false,
				description: 'Is user\'s email confirmed',
				example: true,
				required: true,
			},
			is_user_confirmed: {
				type: 'boolean',
				default: false,
				description: 'Is user account confirmed with a social network',
				required: true,
			},
			balance: {
				type: 'number',
				description: 'User\'s balance',
				example: 100,
				required: true,
				default: 0,
			},
			created_at: {
				type: 'createdAt',
			},
			BalanceTransaction: {
				type: 'oneToMany',
			},
			Payment: {
				type: 'oneToMany',
			},
			Book: {
				type: 'oneToMany',
			},
		},
	},
	BalanceTransaction: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
			},
			type: {
				type: 'enum',
				description: 'Status of balance changing ',
				required: true,
				// TOP_UP — пополнение баланса
				// CHARGE — списание с баланса
				// ACCOUNT_CONFIRMATION_WELCOME_BONUS — приветственный бонус за регистрацию
				variants: ['TOP_UP', 'CHARGE', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS'],
				enumName: 'BalanceTransactionType',
			},
			amount: {
				type: 'number',
				description: 'Amount of money: negative or positive number',
				required: true,
			},
			Payment: {
				type: 'childOneToOne',
				thisField: 'payment_id', // Name of the column of this table that refers to another table
				foreignTable: 'Payment', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	// User increases his balance with payment
	Payment: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
			},
			amount: {
				type: 'number',
				description: 'Amount of money',
				required: true,
				min: 1,
				max: 10000,
			},
			status: {
				type: 'enum',
				description: 'Status of payment',
				required: true,
				variants: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELED'],
				default: 'PENDING',
				enumName: 'PaymentStatus',
			},
			provider_name: {
				type: 'enum',
				description: 'Name of payment provider (Yookassa or Stripe)',
				required: true,
				variants: ['YOOKASSA'],
				default: 'YOOKASSA',
				enumName: 'PaymentProviderName',
			},
			external_id: {
				type: 'string',
				description: 'id of the payment in the payment provider',
				required: true,
				unique: true,
			},
			BalanceTransaction: {
				type: 'parentOneToOne',
				required: false,
			},
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
			},
		},
	},
	Book: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
			},
			author: {
				type: 'string',
				description: 'Author of the book',
				required: false,
				maxLength: 255,
			},
			name: {
				type: 'string',
				description: 'Name of the book',
				required: false,
				maxLength: 255,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				maxLength: 1000,
			},
			created_at: {
				type: 'createdAt',
			},
			BookChapter: {
				type: 'oneToMany',
			},
		},
	},
	BookChapter: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			book_id: {
				type: 'manyToOne',
				thisField: 'book_id', // Name of the column of this table that refers to another table
				foreignTable: 'Book', // Name of the table that this column refers to
				foreignField: 'id',
			},
			name: {
				type: 'string',
				description: 'Name of the chapter. For example: Chapter 1.',
				required: false,
				maxLength: 255,
			},
			header: {
				type: 'string',
				description: 'Header of the chapter',
				required: false,
				maxLength: 255,
			},
			content: {
				type: 'string',
				description: 'Content of the chapter',
				required: false,
				maxLength: 50000,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				minLength: 0,
				maxLength: 1000,
			},
			BookChapterPhrase: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	// Переводы одного или нескольких слов (фраза).
	// Используется для хранения переведённых фраз и для заучивания
	BookChapterPhrase: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			sentence: {
				type: 'string',
				description: 'Предложение где находится фраза',
				required: true,
				minLength: 1,
				maxLength: 1000,
			},
			phrase: {
				type: 'string',
				description: 'Одно или несколько слов на иностранном языке для заучивания',
				required: true,
				minLength: 1,
				maxLength: 200,
			},
			phraseTranslation: {
				type: 'string',
				description: 'Перевод фразы на русский язык',
				required: true,
				minLength: 1,
				maxLength: 200,
			},
			phraseAnalysis: {
				type: 'string',
				description: 'Анализ что обозначает фраза более подробно',
				required: true,
				minLength: 1,
				maxLength: 1000,
			},
			book_chapter_id: {
				type: 'manyToOne',
				thisField: 'book_chapter_id', // Name of the column of this table that refers to another table
				foreignTable: 'BookChapter', // Name of the table that this column refers to
				foreignField: 'id',
			},
			BookChapterPhraseExample: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	// К каждой фразе (BookChapterPhrase) есть массив примеров использования.
	// Они содержатся в этой таблице.
	BookChapterPhraseExample: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			book_chapter_phrase_id: {
				type: 'manyToOne',
				thisField: 'book_chapter_phrase_id', // Name of the column of this table that refers to another table
				foreignTable: 'BookChapterPhrase', // Name of the table that this column refers to
				foreignField: 'id',
			},
			sentence: {
				type: 'string',
				description: 'A sentence example with this phrase. For example: ',
				required: true,
				maxLength: 500,
			},
			translate: {
				type: 'string',
				description: 'A translate of sentence example with this phrase. For example: ',
				required: true,
				maxLength: 500,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
} satisfies BdConfig.Root
