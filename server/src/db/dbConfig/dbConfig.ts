import { languages } from '../../utils/languages'
import { BdConfig } from './dbConfigType'

const languagesArr: string[] = Object.keys(languages)
const s3ProviderName = ['cloudRu'] // https://s3.cloud.ru/explain/videoDev/c8b0aead-b6c3-4621-89fe-8be460185b3f-2025-11-03 18-56-49.mp4

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
			Payment: {
				type: 'oneToMany',
			},
			BookPrivate: {
				type: 'oneToMany',
			},
			VideoPrivate: {
				type: 'oneToMany',
			},
			UserSubscription: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	SubscriptionBalanceTransaction: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_subscription_id: {
				type: 'manyToOne',
				thisField: 'user_subscription_id', // Name of the column of this table that refers to another table
				relationField: 'userSubscription',
				foreignTable: 'UserSubscription', // Name of the table that this column refers to
				foreignField: 'id',
				required: true,
			},
			type: {
				type: 'enum',
				description: 'Status of balance changing ',
				required: true,
				// CHARGE — списание с баланса
				variants: ['CHARGE'],
				enumName: 'BalanceTransactionType',
			},
			// Это значение необходимо чтобы фиксировать списание.
			amount: {
				type: 'number',
				description: 'Amount of money: negative or positive number',
				required: true,
			},
			payment_id: {
				type: 'manyToOne',
				thisField: 'payment_id', // Name of the column of this table that refers to another table
				relationField: 'payment',
				foreignTable: 'Payment', // Name of the table that this column refers to another table
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
			UserSubscription: {
				type: 'parentOneToOne',
				required: false,
			},
			SubscriptionBalanceTransaction: {
				type: 'oneToMany',
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
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				maxLength: 1000,
			},
			BookChapter: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	BookPublic: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			free_to_use: {
				type: 'boolean',
				default: false,
				description: 'Can user see this book without subscription',
				example: true,
				required: false,
			},
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			covers: {
				type: 'array',
				arrayItemType: 'string',
				description: 'Covers of the book',
				required: true,
			},
			coverBackgroundColor: {
				type: 'string',
				description: 'Background color for the book card',
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
			BookChapter: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
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
			original_content: {
				type: 'string',
				description: 'Original content of the chapter',
				required: false,
				maxLength: 900000,
			},
			processed_content: {
				type: 'string',
				description: 'Processed content of the chapter (flattened)',
				required: false,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				required: false,
				minLength: 0,
				maxLength: 1000,
			},
			Sentence: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
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
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			year: {
				type: 'number',
				description: 'Year of video release',
				required: false,
				max: 2030,
				min: 1900,
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
			s3_provider_name: {
				type: 'enum',
				enumName: 'S3ProviderName',
				variants: s3ProviderName,
				description: 'S3 provider name',
				required: false,
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
				required: true,
				default: 0,
			},
			name: {
				type: 'string',
				description: 'Name of the video',
				required: false,
				maxLength: 255,
			},
			original_content: {
				type: 'string',
				description: 'Original subtitles or text of the video provided by user',
				required: false,
			},
			processed_content: {
				type: 'string',
				description: 'Processed subtitles or text of the video (flattened)',
				required: false,
			},
			content_type: {
				type: 'enum',
				description: 'Type of content in the video: plain text or subtitles (SRT)',
				required: true,
				variants: ['text', 'subtitles'],
				default: 'text',
				enumName: 'VideoTextType',
			},
			Subtitle: {
				type: 'oneToMany',
			},
			Sentence: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
			},
		},
	},
	VideoPublic: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			free_to_use: {
				type: 'boolean',
				default: false,
				description: 'Can user see this video without subscription',
				example: true,
				required: false,
			},
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			year: {
				type: 'number',
				description: 'Year of video release',
				required: true,
				max: 2030,
				min: 1900,
			},
			name: {
				type: 'string',
				description: 'Name of the video',
				required: true,
				maxLength: 255,
			},
			file_name: {
				type: 'string',
				description: 'Name of the video',
				required: true,
				maxLength: 200,
				example: 'Zootopia-2016.mp4',
			},
			file_s3_key: {
				type: 'string',
				description: 'S3 key',
				required: true,
				maxLength: 1000,
				example: 'video_dev/Zootopia-2016.mp4',
			},
			s3_provider_name: {
				type: 'enum',
				enumName: 'S3ProviderName',
				variants: s3ProviderName,
				description: 'S3 provider name',
				required: true,
			},
			note: {
				type: 'string',
				description: 'Note about the video',
				required: true,
				maxLength: 4000,
			},
			covers: {
				type: 'array',
				arrayItemType: 'string',
				description: 'Covers of the video',
				required: true,
			},
			coverBackgroundColor: {
				type: 'string',
				description: 'Background color for the video card',
				required: true,
				maxLength: 255,
			},
			original_content: {
				type: 'string',
				description: 'Original subtitles or text of the video provided by user',
				required: true,
			},
			processed_content: {
				type: 'string',
				description: 'Processed subtitles or text of the video (flattened)',
				required: true,
			},
			content_type: {
				type: 'enum',
				description: 'Type of content in the video: plain text or subtitles (SRT)',
				required: true,
				variants: ['text', 'subtitles'],
				default: 'text',
				enumName: 'VideoTextType',
			},
			Subtitle: {
				type: 'oneToMany',
			},
			Sentence: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
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
				relationField: 'bookChapter',
				foreignTable: 'BookChapter', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			video_private_id: {
				type: 'manyToOne',
				thisField: 'video_private_id', // Name of the column of this table that refers to another table
				relationField: 'videoPrivate',
				foreignTable: 'VideoPrivate', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			video_public_id: {
				type: 'manyToOne',
				thisField: 'video_public_id',
				relationField: 'videoPublic',
				foreignTable: 'VideoPublic',
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
			SubtitleSentenceInit: {
				type: 'oneToMany',
			},
			SentenceTranslation: {
				type: 'oneToMany',
			},
		},
	},
	SentenceTranslation: {
		dtoProps: {
			text: {
				type: 'string',
				description: 'Sentence for translation',
				required: true,
				minLength: 1,
				maxLength: 500,
			},
			isPublicMedia: {
				type: 'boolean',
				description: 'Is sentence related to public media (public book/video)',
				required: true,
			},
			sourceLanguageCode: {
				type: 'string',
				description: 'Source language code',
				required: false,
				minLength: 2,
				maxLength: 2,
			},
			targetLanguageCode: {
				type: 'string',
				description: 'Target language code',
				required: false,
				minLength: 2,
				maxLength: 2,
			},
			bookName: {
				type: 'string',
				description: 'Name of the book',
				required: false,
			},
			bookAuthor: {
				type: 'string',
				description: 'Author of the book',
				required: false,
			},
			videoName: {
				type: 'string',
				description: 'Name of the video',
				required: false,
			},
			videoYear: {
				type: 'number',
				description: 'Year of video release',
				required: false,
			},
		},
		indexes: [{ fields: ['sentence_id'] }],
		dbFields: {
			id: {
				type: 'index',
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id',
				foreignTable: 'Sentence',
				foreignField: 'id',
				required: true,
			},
			translation: {
				type: 'string',
				description: 'Translation of the sentence',
				required: true,
			},
			analysis: {
				type: 'string',
				description: 'Optional analysis data from provider',
				required: false,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	Subtitle: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			start_time_ms: {
				type: 'number',
				description: 'Start time of subtitle in milliseconds',
				example: 10,
				required: true,
			},
			end_time_ms: {
				type: 'number',
				description: 'time when subtitle ends',
				example: 110,
				required: true,
			},
			start_offset: {
				type: 'number',
				description:
					'how many symbols it needs to offset from the beginning of the whole text where this subtitle ends',
				example: 110,
				required: true,
			},
			length: {
				type: 'number',
				description: 'how many symbols subtitle has',
				example: 9,
				required: true,
			},
			order_index: {
				type: 'number',
				description: 'the serial number of this subtitle',
				example: 10,
				required: true,
			},
			video_private_id: {
				type: 'manyToOne',
				thisField: 'video_private_id', // Name of the column of this table that refers to another table
				relationField: 'videoPrivate',
				foreignTable: 'VideoPrivate', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			video_public_id: {
				type: 'manyToOne',
				thisField: 'video_public_id',
				relationField: 'videoPublic',
				foreignTable: 'VideoPublic',
				foreignField: 'id',
				required: false,
			},
			SubtitleSentenceInit: {
				type: 'oneToMany',
			},
		},
	},
	SubtitleSentenceInit: {
		dtoProps: {},
		indexes: [{ fields: ['subtitle_id'] }, { fields: ['sentence_id'] }],
		dbFields: {
			id: {
				type: 'index',
			},
			subtitle_id: {
				type: 'manyToOne',
				thisField: 'subtitle_id', // Name of the column of this table that refers to another table
				foreignTable: 'Subtitle', // Name of the table that this column refers to
				foreignField: 'id',
				required: true,
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id', // Name of the column of this table that refers to another table
				foreignTable: 'Sentence', // Name of the table that this column refers to
				foreignField: 'id',
				required: true,
			},
			start_offset: {
				type: 'number',
				description:
					'how many symbols it needs to offset from the beginning of this subtitle where this sentence begins',
				example: 100,
				required: true,
			},
			length: {
				type: 'number',
				description: 'length of this sentence in subtitle',
				example: 10,
				required: true,
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
			/*rus: {
				type: 'string',
				description: 'Russian text',
				required: true,
				maxLength: 500,
				example: 'жизнь',
			},*/
			transcription: {
				type: 'string',
				description: 'Transcription',
				required: false,
				maxLength: 500,
			},
			/*lexemes: {
				type: 'string',
				description: 'Lexemes',
				required: false,
				maxLength: 5000,
			},*/
			created_at: {
				type: 'createdAt',
			},
			updated_at: {
				type: 'updatedAt',
			},
		},
	},
	// Таблица тарифов (справочник), редактируется редко
	Tariff: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			code: {
				type: 'string',
				description: 'Unique code of the tariff',
				required: true,
				unique: true,
			},
			name: {
				type: 'string',
				description: 'Name of the tariff',
				required: true,
				maxLength: 100,
			},
			price: {
				type: 'number',
				description: 'Price for 30 days',
				example: 10,
				required: true,
			},
			included_balance: {
				type: 'number',
				description: 'How many kopecks are given to the user to analyze sentences',
				example: 10,
				required: true,
			},
			included_file_storage_mb: {
				type: 'number',
				description: 'How many megabytes of file storage are included',
				example: 5000,
				required: true,
			},
			duration_days: {
				type: 'number',
				description: 'How many days user can use this subscription',
				example: 30,
				required: true,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	UserSubscription: {
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
			tariff_id: {
				type: 'manyToOne',
				thisField: 'tariff_id', // Name of the column of this table that refers to another table
				foreignTable: 'Tariff', // Name of the table that this column refers to
				foreignField: 'id',
				onDelete: 'Restrict',
				required: true,
			},
			price_paid: {
				type: 'number',
				description: 'The price paid for this subscription',
				required: true,
			},
			balance: {
				type: 'number',
				description: 'How many kopecks are available inside this subscription',
				required: true,
			},
			included_file_storage_mb: {
				type: 'number',
				description: 'How many megabytes of file storage are included',
				required: true,
			},
			starts_at: {
				type: 'dateTime',
				required: true,
			},
			ends_at: {
				type: 'dateTime',
				required: true,
			},
			Payment: {
				type: 'childOneToOne',
				thisField: 'payment_id', // Name of the column of this table that refers to another table
				foreignTable: 'Payment', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			SubscriptionBalanceTransaction: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
} satisfies BdConfig.Root
