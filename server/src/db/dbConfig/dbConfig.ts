import { languages } from 'utils/languages'
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
				description: 'User ID',
				example: 1,
			},
			email: {
				type: 'email',
				unique: true,
				description: 'User-s email',
				example: 'user@example.com',
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
				example: true,
				required: true,
			},
			balance: {
				type: 'number',
				default: 0,
				description: 'User balance in kopecks',
				example: 50000,
				required: true,
			},
			Payment: {
				type: 'oneToMany',
			},
			UserBalanceTransaction: {
				type: 'oneToMany',
			},
			Book: {
				type: 'oneToMany',
			},
			Video: {
				type: 'oneToMany',
			},
			SentenceChatThread: {
				type: 'oneToMany',
			},
			Flashcard: {
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
				description: 'User balance transaction ID',
				example: 1,
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
				variants: ['CHARGE', 'TOP_UP', 'REFUND'],
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
		dtoProps: {
			amountInKopecks: {
				type: 'number',
				min: 1,
				max: 10000,
				description: 'Amount in kopecks to top up the balance',
				example: 10000,
				required: true,
			},
			confirmationUrl: {
				type: 'string',
				description: 'URL for payment confirmation redirect',
				example: 'https://yookassa.ru/payments/...',
				required: true,
			},
		},
		dbFields: {
			id: {
				type: 'index',
				description: 'Payment ID',
				example: 1,
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id', // Name of the column of this table that refers to another table
				foreignTable: 'User', // Name of the table that this column refers to
				foreignField: 'id',
				description: 'User ID who owns the book',
				example: 1,
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
	Book: {
		dtoProps: {
			coverFileName: {
				type: 'string',
				description: 'File name of the book cover',
				required: false,
				maxLength: 255,
			},
			fileMimeType: {
				type: 'string',
				description: 'File Mime Type of the book cover',
				required: false,
				maxLength: 50,
			},
			coverUrl: {
				type: 'string',
				description: 'URL to the book cover image',
				example: 'https://s3.example.com/privateBooksDev/cover.jpg',
				required: false,
			},
			uploadUrl: {
				type: 'string',
				description: 'Pre-signed S3 upload URL for the book cover',
				example: 'https://s3.example.com/presigned-url',
				required: false,
			},
		},
		dbFields: {
			id: {
				type: 'index',
				description: 'Book ID',
				example: 1,
			},
			type: {
				type: 'enum',
				enumName: 'MediaType',
				variants: ['public', 'private'],
				description: 'Media type: public or private',
				example: 'private',
				required: true,
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id',
				foreignTable: 'User',
				foreignField: 'id',
				description: 'User ID who owns the book (null for public books)',
				example: 1,
				required: false,
			},
			author: {
				type: 'string',
				description: 'Author of the book',
				example: 'J.K. Rowling',
				required: false,
				maxLength: 255,
			},
			name: {
				type: 'string',
				description: 'Name of the book',
				example: 'Harry Potter',
				required: false,
				maxLength: 255,
			},
			source_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				description: 'Language code of the book',
				example: 'en',
				required: true,
			},
			note: {
				type: 'string',
				description: 'Note about the book',
				example: 'This book is great for learning new vocabulary',
				required: false,
				maxLength: 2000,
			},
			cover_file_name: {
				type: 'string',
				description: 'Name of the book cover file',
				required: false,
				maxLength: 200,
				example: 'cover.jpg',
			},
			cover_file_s3_key: {
				type: 'string',
				description: 'S3 key of the book cover',
				required: false,
				maxLength: 1000,
				example: 'privateBooksDev/cover.jpg',
			},
			cover_file_s3_provider_name: {
				type: 'enum',
				enumName: 'S3ProviderName',
				variants: s3ProviderName,
				description: 'S3 provider name',
				required: false,
			},
			is_cover_file_uploaded: {
				type: 'boolean',
				default: false,
				description: 'Is cover file was uploaded',
				example: true,
				required: true,
			},
			BookChapter: {
				type: 'oneToMany',
			},
			Flashcard: {
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
				description: 'Book chapter ID',
				example: 1,
			},
			book_id: {
				type: 'manyToOne',
				thisField: 'book_id',
				foreignTable: 'Book',
				foreignField: 'id',
				required: true,
			},
			name: {
				type: 'string',
				description: 'Name of the chapter. For example: Chapter 1.',
				example: 'Chapter 1',
				required: false,
				maxLength: 255,
			},
			header: {
				type: 'string',
				description: 'Header of the chapter',
				example: 'The Boy Who Lived',
				required: false,
				maxLength: 255,
			},
			original_content: {
				type: 'string',
				description: 'Original content of the chapter',
				example: 'Mr. and Mrs. Dursley, of number four, Privet Drive...',
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
				example: 'This chapter introduces the main character.',
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
	Video: {
		dtoProps: {
			fileName: {
				type: 'string',
				description: 'File name of the video',
				example: 'Zootopia-2016.mp4',
				required: false,
				maxLength: 255,
			},
			fileMimeType: {
				type: 'string',
				description: 'File Mime Type of the video',
				example: 'video/mp4',
				required: false,
				maxLength: 50,
			},
			fileUrl: {
				type: 'string',
				description: 'Downloadable URL for the video file',
				example: 'https://s3.example.com/video_dev/Zootopia-2016.mp4',
				required: false,
			},
			uploadUrl: {
				type: 'string',
				description: 'Pre-signed S3 upload URL for the video file',
				example: 'https://s3.example.com/presigned-url',
				required: false,
			},
			coverFileName: {
				type: 'string',
				description: 'File name of the video cover',
				required: false,
				maxLength: 255,
			},
			coverFileMimeType: {
				type: 'string',
				description: 'File Mime Type of the video cover',
				required: false,
				maxLength: 50,
			},
			coverUrl: {
				type: 'string',
				description: 'URL to the cover image of the video',
				example: 'https://s3.example.com/privateVideoCoversDev/cover.jpg',
				required: false,
			},
			uploadCoverUrl: {
				type: 'string',
				description: 'Pre-signed S3 upload URL for the video cover',
				example: 'https://s3.example.com/presigned-url',
				required: false,
			},
		},
		dbFields: {
			id: {
				type: 'index',
				description: 'Video ID',
				example: 1,
			},
			type: {
				type: 'enum',
				enumName: 'MediaType',
				variants: ['public', 'private'],
				description: 'Media type: public or private',
				example: 'private',
				required: true,
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id',
				foreignTable: 'User',
				foreignField: 'id',
				description: 'User ID who owns the video (null for public videos)',
				example: 1,
				required: false,
			},
			name: {
				type: 'string',
				description: 'Name of the video',
				example: 'Zootopia',
				required: false,
				maxLength: 255,
			},
			note: {
				type: 'string',
				description: 'Note about the video',
				example: 'A great animated movie about animals.',
				required: false,
				maxLength: 4000,
			},
			source_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				description: 'Language code of the video',
				example: 'en',
				required: true,
			},
			youtube_video_id: {
				type: 'string',
				description: 'YouTube video ID for videos hosted on YouTube',
				required: false,
				unique: true,
				maxLength: 20,
				example: 'dQw4w9WgXcQ',
			},
			file_name: {
				type: 'string',
				description: 'File name of the video file',
				required: false,
				maxLength: 200,
				example: 'Zootopia-2016.mp4',
			},
			file_s3_key: {
				type: 'string',
				description: 'S3 key of the video file',
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
				description: 'Is video file was uploaded',
				example: true,
				required: false,
			},
			file_size_mb: {
				type: 'number',
				description: 'Size of the video file in megabytes',
				example: 100,
				required: true,
				default: 0,
			},
			file_duration_sec: {
				type: 'number',
				description: 'Duration of the uploaded video file in seconds',
				example: 3600,
				required: false,
			},
			original_content: {
				type: 'string',
				description: 'Original subtitles or text of the video',
				example: 'Some original content.',
				required: false,
			},
			processed_content: {
				type: 'string',
				description: 'Processed subtitles or text of the video (flattened)',
				example: 'Processed content.',
				required: false,
			},
			content_type: {
				type: 'enum',
				description: 'Type of content in the video: plain text or subtitles (SRT)',
				example: 'text',
				required: true,
				variants: ['text', 'subtitles'],
				default: 'text',
				enumName: 'VideoTextType',
			},
			cover_file_name: {
				type: 'string',
				description: 'Name of the video cover file',
				required: false,
				maxLength: 200,
				example: 'charade.jpg',
			},
			cover_file_s3_key: {
				type: 'string',
				description: 'S3 key of the video cover',
				required: false,
				maxLength: 1000,
				example: 'publicVideoCovers/english/charade.jpg',
			},
			cover_file_s3_provider_name: {
				type: 'enum',
				enumName: 'S3ProviderName',
				variants: s3ProviderName,
				description: 'S3 provider name',
				required: false,
			},
			is_cover_file_uploaded: {
				type: 'boolean',
				default: false,
				description: 'Is cover file was uploaded',
				example: true,
				required: true,
			},
			subtitles_source: {
				type: 'enum',
				enumName: 'SubtitlesSource',
				variants: ['user', 'youTube', 'llm'],
				default: 'user',
				description: 'Who created the subtitles: user-uploaded, from YouTube, or LLM-generated',
				required: true,
			},
			subtitles_status: {
				type: 'enum',
				enumName: 'SubtitlesStatus',
				variants: ['idle', 'pending', 'processing', 'done', 'failed'],
				default: 'idle',
				description: 'Status of subtitles processing',
				required: true,
			},
			subtitles_error_code: {
				type: 'string',
				description: 'Machine-readable error code if status is failed',
				required: false,
				maxLength: 200,
			},
			subtitles_job_id: {
				type: 'string',
				description: 'BullMQ job id of the current subtitles task',
				required: false,
				maxLength: 200,
			},
			Subtitle: {
				type: 'oneToMany',
			},
			Sentence: {
				type: 'oneToMany',
			},
			Flashcard: {
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
				description: 'Sentence ID',
				example: 1,
			},
			book_chapter_id: {
				type: 'manyToOne',
				thisField: 'book_chapter_id', // Name of the column of this table that refers to another table
				relationField: 'bookChapter',
				foreignTable: 'BookChapter', // Name of the table that this column refers to
				foreignField: 'id',
				required: false,
			},
			video_id: {
				type: 'manyToOne',
				thisField: 'video_id',
				relationField: 'video',
				foreignTable: 'Video',
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
		indexes: [{ fields: ['sentence_id'] }, { fields: ['sentence_id', 'target_language_code'] }],
		dbFields: {
			id: {
				type: 'index',
				description: 'Sentence translation ID',
				example: 1,
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id',
				foreignTable: 'Sentence',
				foreignField: 'id',
				required: true,
			},
			target_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
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
		indexes: [
			{ fields: ['sentence_id'] },
			{ fields: ['sentence_id', 'target_language_code'] },
			{ fields: ['sentence_id', 'phrase_start_offset', 'phrase_end_offset'] },
			{ fields: ['sentence_id', 'target_language_code', 'phrase_start_offset', 'phrase_end_offset'] },
		],
		dbFields: {
			id: {
				type: 'index',
				description: 'Sentence phrase translation ID',
				example: 1,
			},
			sentence_id: {
				type: 'manyToOne',
				thisField: 'sentence_id',
				foreignTable: 'Sentence',
				foreignField: 'id',
				required: true,
			},
			target_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
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
			error_code: {
				type: 'string',
				required: false,
			},
			Flashcard: {
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
	Subtitle: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
				description: 'Subtitle ID',
				example: 1,
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
			video_id: {
				type: 'manyToOne',
				thisField: 'video_id',
				relationField: 'video',
				foreignTable: 'Video',
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
				description: 'Subtitle sentence init ID',
				example: 1,
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
	// Слово, фраза или предложение. Используется для транскрипций, озвучки и грамматических конструкций
	UniversalPhrase: {
		dtoProps: {},
		indexes: [{ fields: ['source_language_code', 'text'], unique: true }],
		dbFields: {
			id: {
				type: 'index',
				description: 'Universal phrase ID',
				example: 1,
			},
			text: {
				type: 'string',
				description: 'Word, phrase or sentence in foreign language',
				required: true,
				maxLength: 2000,
				example: 'life',
			},
			source_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				description: 'Language code of the book or video',
				example: 'en',
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
			UniversalPhraseTranslation: {
				type: 'oneToMany',
			},
			created_at: { type: 'createdAt' },
			updated_at: { type: 'updatedAt' },
		},
	},
	// Транскрипция слова или фразы
	UniversalTranscription: {
		dtoProps: {},
		dbFields: {
			id: {
				type: 'index',
				description: 'Universal transcription ID',
				example: 1,
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
		dtoProps: {
			audioUrl: {
				type: 'string',
				description: 'Audio file URL',
				example: 'https://s3.example.com/pronunciations/en/abc.ogg',
				required: true,
			},
		},
		dbFields: {
			id: {
				type: 'index',
				description: 'Universal audio pronunciation ID',
				example: 1,
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
	// Перевод фразы из UniversalPhrase на конкретный язык через LLM
	UniversalPhraseTranslation: {
		dtoProps: {
			provider: {
				type: 'string',
				description: 'LLM provider name',
				required: false,
			},
		},
		indexes: [
			{ fields: ['universal_phrase_id', 'target_language_code'], unique: true },
			{ fields: ['universal_phrase_id'] },
		],
		dbFields: {
			id: {
				type: 'index',
				description: 'Universal phrase translation ID',
				example: 1,
			},
			universal_phrase_id: {
				type: 'manyToOne',
				thisField: 'universal_phrase_id',
				relationField: 'universal_phrase',
				foreignTable: 'UniversalPhrase',
				foreignField: 'id',
				required: true,
			},
			target_language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			translation: {
				type: 'string',
				description: 'JSON with translation result from LLM',
				required: false,
			},
			status: {
				type: 'enum',
				description: 'Status of translation generation',
				required: true,
				variants: ['pending', 'ready', 'error'],
				default: 'pending',
				enumName: 'UniversalPhraseTranslationStatus',
			},
			error_code: {
				type: 'string',
				description: 'Error code if status is error',
				required: false,
			},
			non_existent_word: {
				type: 'boolean',
				description: 'Flag indicating that the word/phrase does not exist in the source language',
				required: true,
				default: false,
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
				description: 'Sentence chat thread ID',
				example: 1,
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
				description: 'Sentence chat message ID',
				example: 1,
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
	// Карточка для заучивания фразы. Снапшот данных, привязанный к пользователю.
	// Источник (книга/видео) опциональный: при удалении источника связь обнуляется (SetNull),
	// а сама карточка остаётся в коллекции пользователя.
	Flashcard: {
		dtoProps: {
			phraseTranscription: {
				type: 'string',
				description: 'Snapshot of the phrase transcription',
				required: false,
			},
		},
		indexes: [
			{ fields: ['user_id'] },
			{ fields: ['user_id', 'language_code'] },
			{ fields: ['user_id', 'sentence_phrase_translation_id'], unique: true },
		],
		dbFields: {
			id: {
				type: 'index',
				description: 'Flashcard ID',
				example: 1,
			},
			user_id: {
				type: 'manyToOne',
				thisField: 'user_id',
				relationField: 'user',
				foreignTable: 'User',
				foreignField: 'id',
				required: true,
			},
			language_code: {
				type: 'enum',
				enumName: 'LanguageCode',
				variants: languagesArr,
				required: true,
			},
			sentence_text: {
				type: 'string',
				description: 'Snapshot of the sentence text',
				required: true,
			},
			sentence_translation: {
				type: 'string',
				description: 'Snapshot of the sentence translation',
				required: false,
			},
			phrase: {
				type: 'string',
				description: 'Snapshot of the phrase',
				required: true,
				maxLength: 500,
			},
			phrase_start_offset: {
				type: 'number',
				description: 'Phrase start offset within the sentence text snapshot',
				required: true,
			},
			phrase_end_offset: {
				type: 'number',
				description: 'Phrase end offset within the sentence text snapshot',
				required: true,
			},
			phrase_translation: {
				type: 'string',
				description: 'Snapshot of the phrase translation',
				required: false,
			},
			examples: {
				type: 'array',
				arrayItemType: 'string',
				description: 'Snapshot of phrase usage examples (encoded as flat [text, translate, ...] pairs)',
				required: true,
			},
			book_id: {
				type: 'manyToOne',
				thisField: 'book_id',
				relationField: 'book',
				foreignTable: 'Book',
				foreignField: 'id',
				onDelete: 'SetNull',
				required: false,
			},
			video_id: {
				type: 'manyToOne',
				thisField: 'video_id',
				relationField: 'video',
				foreignTable: 'Video',
				foreignField: 'id',
				onDelete: 'SetNull',
				required: false,
			},
			sentence_phrase_translation_id: {
				type: 'manyToOne',
				thisField: 'sentence_phrase_translation_id',
				relationField: 'sentencePhraseTranslation',
				foreignTable: 'SentencePhraseTranslation',
				foreignField: 'id',
				onDelete: 'SetNull',
				required: false,
			},
			created_at: {
				type: 'createdAt',
			},
		},
	},
} satisfies BdConfig.Root

export const dtoConfig = {
	language_code: {
		type: 'enum' as const,
		enumName: 'LanguageCode',
		variants: languagesArr,
		description: 'Language code',
		example: 'en',
		required: true,
	},
}
