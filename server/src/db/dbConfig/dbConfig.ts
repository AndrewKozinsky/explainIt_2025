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
				description: 'User\'s password',
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
				variants: ['PAYMENT', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS'],
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
				minLength: 1,
				maxLength: 255,
			},
			name: {
				type: 'string',
				description: 'Name of the book',
				required: false,
				minLength: 0,
				maxLength: 255,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				minLength: 0,
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
			chapter: {
				type: 'string',
				description: 'Chapter of the chapter. For example: Chapter 1.',
				required: false,
				minLength: 1,
				maxLength: 255,
			},
			header: {
				type: 'string',
				description: 'Header of the chapter',
				required: false,
				minLength: 1,
				maxLength: 255,
			},
			text: {
				type: 'string',
				description: 'Text of the chapter',
				required: false,
				maxLength: 10000,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				minLength: 0,
				maxLength: 1000,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
} satisfies BdConfig.Root
