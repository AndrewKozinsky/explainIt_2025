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
				description: 'User-s email',
				required: true,
			},
			password: {
				type: 'string',
				description: 'Hashed user-s password',
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
				description: 'Is user-s email confirmed',
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
				description: 'User-s balance',
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
			BookPrivate: {
				type: 'oneToMany',
			},
			VideoPrivate: {
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
				required: true,
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
				required: true,
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
	BookPrivate: {
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
				required: true,
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
	BookPublic: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			cover: {
				type: 'string',
				description: 'Cover of the book',
				required: true,
				maxLength: 255,
			},
			author: {
				type: 'string',
				description: 'Author of the book',
				required: true,
				maxLength: 255,
			},
			name: {
				type: 'string',
				description: 'Name of the book',
				required: true,
				maxLength: 255,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: true,
				maxLength: 2000,
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
				foreignTable: 'BookPrivate', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			book_public_id: {
				type: 'manyToOne',
				thisField: 'book_public_id', // Name of the column of this table that refers to another table
				foreignTable: 'BookPublic', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
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
				maxLength: 900000,
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
			Sentence: {
				type: 'oneToMany',
			},
		},
	},
	Sentence: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			book_chapter_id: {
				type: 'manyToOne',
				thisField: 'book_chapter_id', // Name of the column of this table that refers to another table
				foreignTable: 'BookChapter', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			start_offset: {
				type: 'number',
				description:
					'how many symbols it needs to offset from the beginning of the whole text where this sentence begins',
				example: 100,
				required: true,
			},
			length: {
				type: 'number',
				description: 'lenght of the sentence',
				example: 10,
				required: true,
			},
			order_index: {
				type: 'number',
				description: 'the serial number of this sentence',
				example: 10,
				required: true,
			},
		},
	},
	/*Word: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id', // Name of the column of this table that refers to another table
				foreignTable: 'Sentence', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			start_offset: {
				type: 'number',
				description:
					'how many symbols it needs to offset from the beginning of the sentence where this word begins',
				example: 100,
				required: true,
			},
			length: {
				type: 'number',
				description: 'lenght of this word',
				example: 10,
				required: true,
			},
			order_index: {
				type: 'number',
				description: 'the serial number of this sentence',
				example: 10,
				required: true,
			},
		},
	},*/
	VideoPrivate: {
		dtoProps: {
			fileName: {
				type: 'string',
				description: 'File name of the video',
				required: false,
				maxLength: 255,
			},
			fileMimeType: {
				type: 'string',
				description: 'File Mime Type of the video',
				required: false,
				maxLength: 50,
			},
		},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
				required: true,
			},
			file_name: {
				type: 'string',
				description: 'Name of the video',
				required: false,
				maxLength: 200,
				example: 'Zootopia-2016.mp4',
			},
			file_s3_key: {
				type: 'string',
				description: 'S3 key',
				required: false,
				maxLength: 1000,
				example: 'video_dev/Zootopia-2016.mp4',
			},
			file_url: {
				type: 'string',
				description: 'URL of the video',
				required: false,
				maxLength: 1000,
			},
			is_file_uploaded: {
				type: 'boolean',
				default: false,
				description: 'Is file was uploaded',
				example: true,
				required: true,
			},
			file_size_mb: {
				type: 'number',
				description: 'size of the file in megabytes',
				example: 100,
				required: false,
				default: 0,
			},
			name: {
				type: 'string',
				description: 'Name of the video',
				required: false,
				maxLength: 255,
			},
			content: {
				type: 'string',
				description: 'Subtitles or text of the video',
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
	EngRusDictionary: {
		dtoProps: {
			sourceLanguageCode: {
				type: 'string',
				description: 'Language code',
				required: true,
				maxLength: 2,
				example: 'en',
			},
			targetLanguageCode: {
				type: 'string',
				description: 'Language code',
				required: true,
				maxLength: 2,
				example: 'ru',
			},
		},
		dbFields: {
			id: {
				type: 'index',
			},
			eng: {
				type: 'string',
				description: 'English text',
				required: true,
				maxLength: 500,
				example: 'life',
				unique: true,
			},
			rus: {
				type: 'string',
				description: 'Russian text',
				required: true,
				maxLength: 500,
				example: 'жизнь',
			},
			transcription: {
				type: 'string',
				description: 'Transcription',
				required: false,
				maxLength: 500,
			},
			lexemes: {
				type: 'string',
				description: 'Lexemes',
				required: false,
				maxLength: 5000,
			},
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
			},
		},
	},
} satisfies BdConfig.Root
