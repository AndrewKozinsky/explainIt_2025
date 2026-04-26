import { languages } from '../../utils/languages'
import { BdConfig } from './dbConfigType'

const languagesArr: string[] = Object.keys(languages)
const s3ProviderName = ['cloudRu'] // https://s3.cloud.ru/explain/videoDev/c8b0aead-b6c3-4621-89fe-8be460185b3f-2025-11-03 18-56-49.mp4

/**
 * Database structure.
 * With help of this structure, it is formed schema.prisma and class-validator set of decorators to check fields in DTO.
 */
export const bdConfig = {
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
				default: 0,
				description: 'User balance in kopecks',
				required: true,
			},
			Payment: {
				type: 'oneToMany',
			},
			UserBalanceTransaction: {
				type: 'oneToMany',
			},
			BookPrivate: {
				type: 'oneToMany',
			},
			VideoPrivate: {
				type: 'oneToMany',
			},
			SentenceChatThread: {
				type: 'oneToMany',
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	UserBalanceTransaction: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				relationField: 'user',
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
				required: true,
			},
			type: {
				type: 'enum',
				description: 'Status of balance changing ',
				required: true,
				variants: ['CHARGE', 'TOP_UP'],
				enumName: 'BalanceTransactionType',
			},
			amount: {
				type: 'number',
				description: 'Amount of money: negative or positive number',
				required: true,
			},
			payment_id: {
				type: 'childOneToOne',
				thisField: 'payment_id', // Name of the column of this table that refers to another table
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
			UserBalanceTransaction: {
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
			SentencePhraseTranslation: {
				type: 'oneToMany',
			},
			SentenceChatThread: {
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
			created_at: {
				type: 'createdAt',
			},
		},
	},
	SentencePhraseTranslation: {
		dtoProps: {
			phrase: {
				type: 'string',
				description: 'Phrase in source language',
				required: true,
				minLength: 1,
				maxLength: 500,
			},
			translate: {
				type: 'string',
				description: 'Phrase translation',
				required: false,
			},
		},
		indexes: [{ fields: ['sentence_id'] }, { fields: ['sentence_id', 'phrase_start_offset', 'phrase_end_offset'] }],
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
			phrase: {
				type: 'string',
				required: true,
				maxLength: 500,
			},
			phrase_start_offset: {
				type: 'number',
				required: true,
			},
			phrase_end_offset: {
				type: 'number',
				required: true,
			},
			translate: {
				type: 'string',
				required: false,
			},
			examples: {
				type: 'array',
				arrayItemType: 'string',
				required: true,
			},
			status: {
				type: 'enum',
				required: true,
				variants: ['pending', 'ready', 'error'],
				enumName: 'SentencePhraseTranslationStatus',
			},
			error_message: {
				type: 'string',
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
	// Слово или фраза. Используется в таблице транскрипций и озвучки
	UniversalPhrase: {
		dtoProps: {},
		indexes: [{ fields: ['language_code', 'phrase'], unique: true }],
		dbFields: {
			id: {
				type: 'index',
			},
			phrase: {
				type: 'string',
				description: 'Word or phrase in foreign language',
				required: true,
				maxLength: 500,
				example: 'life',
			},
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			UniversalTranscription: {
				type: 'parentOneToOne',
				required: false,
			},
			UniversalAudioPronunciation: {
				type: 'parentOneToOne',
				required: false,
			},
		},
	},
	// Транскрипция слова или фразы
	UniversalTranscription: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			universal_phrase_id: {
				type: 'childOneToOne',
				thisField: 'universal_phrase_id',
				foreignTable: 'UniversalPhrase',
				foreignField: 'id',
				required: true,
			},
			// Транскрипция в формате IPA
			ipa: {
				type: 'string',
				description: 'IPA transcription',
				required: false,
				maxLength: 500,
			},
			// Транскрипция в формате pinyin (для китайского)
			pinyin: {
				type: 'string',
				description: 'Pinyin transcription (for Chinese)',
				required: false,
				maxLength: 500,
			},
		},
	},
	// Озвучка слова
	UniversalAudioPronunciation: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
			},
			universal_phrase_id: {
				type: 'childOneToOne',
				thisField: 'universal_phrase_id',
				foreignTable: 'UniversalPhrase',
				foreignField: 'id',
				required: true,
			},
			s3_key: {
				type: 'string',
				description: 'S3 object key of the audio file',
				required: true,
				maxLength: 500,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
	// Тред чата с ИИ по конкретному выделенному предложению. У каждого пользователя не более одного треда на предложение.
	SentenceChatThread: {
		dtoProps: {},
		indexes: [{ fields: ['user_id', 'sentence_id'], unique: true }, { fields: ['user_id'] }],
		dbFields: {
			id: {
				type: 'index',
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id',
				relationField: 'user',
				foreignTable: 'User',
				foreignField: 'id',
				required: true,
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id',
				relationField: 'sentence',
				foreignTable: 'Sentence',
				foreignField: 'id',
				required: true,
			},
			SentenceChatMessage: {
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
	// Отдельное сообщение в треде чата с ИИ.
	SentenceChatMessage: {
		dtoProps: {},
		indexes: [{ fields: ['thread_id'] }],
		dbFields: {
			id: {
				type: 'index',
			},
			thread_id: {
				type: 'manyToOne',
				thisField: 'thread_id',
				relationField: 'thread',
				foreignTable: 'SentenceChatThread',
				foreignField: 'id',
				required: true,
			},
			role: {
				type: 'enum',
				description: 'Who sent this message',
				required: true,
				variants: ['user', 'assistant'],
				enumName: 'SentenceChatMessageRole',
			},
			content: {
				type: 'string',
				description: 'Markdown-formatted message content',
				required: true,
			},
			status: {
				type: 'enum',
				description: 'Lifecycle status of the message (mostly relevant for assistant messages)',
				required: true,
				variants: ['streaming', 'completed', 'canceled', 'failed'],
				default: 'completed',
				enumName: 'SentenceChatMessageStatus',
			},
			error_message: {
				type: 'string',
				description: 'Error description if status is failed',
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
} satisfies BdConfig.Root
