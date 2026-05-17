export type ErrorMessage = {
	errorMessageCode: string
	[key: string]: string | number | boolean | null
}

export const errorMessage = {
	// EMAIL
	email: {
		isAlreadyRegistered: { errorMessageCode: 'EMAIL_IS_ALREADY_REGISTERED' }, // Почта уже зарегистрирована.
		isNotConfirmed: { errorMessageCode: 'EMAIL_IS_NOT_CONFIRMED' }, // Почта зарегистрирована, но не подтверждена.
		wrongFormat: { errorMessageCode: 'EMAIL_WRONG_FORMAT' }, // Адрес электронной почты должен соответствовать формату example@mail.com
		isAlreadyConfirmed: { errorMessageCode: 'EMAIL_IS_ALREADY_CONFIRMED' }, // Почта уже подтверждена.
		confirmationCodeIsExpired: { errorMessageCode: 'EMAIL_CONFIRMATION_CODE_IS_EXPIRED' }, // Срок действия кода подтверждения почты истек.
		confirmationCodeNotFound: { errorMessageCode: 'EMAIL_CONFIRMATION_CODE_NOT_FOUND' }, // Код подтверждения почты не найден.
		notFound: { errorMessageCode: 'EMAIL_NOT_FOUND' }, // Почта не найдена.
	},

	// USER
	user: {
		notFound: { errorMessageCode: 'USER_NOT_FOUND' }, // Пользователь не найден.
		unauthorized: { errorMessageCode: 'USER_UNAUTHORIZED' }, // Пользователь не авторизован.
		isNotOwner: { errorMessageCode: 'USER_IS_NOT_OWNER' }, // Пользователь не является владельцем этой сущности.
	},

	userBalanceIsNegative: { errorMessageCode: 'USER_BALANCE_IS_NEGATIVE' }, // Отрицательный баланс.
	userBalanceBelowMinimum: { errorMessageCode: 'USER_BALANCE_BELOW_MINIMUM' }, // Недостаточно средств на балансе для выполнения операции.
	insufficientBalanceForTranslation: { errorMessageCode: 'INSUFFICIENT_BALANCE_FOR_TRANSLATION' }, // Недостаточно средств на балансе для перевода.
	paymentIdIsRequiredForPaymentTransactions: { errorMessageCode: 'PAYMENT_ID_IS_REQUIRED_FOR_PAYMENT_TRANSACTIONS' }, // Payment ID is required for payment transactions
	cannotDepositAmountLessThanZero: { errorMessageCode: 'CANNOT_DEPOSIT_AMOUNT_LESS_THAN_ZERO' }, // You cannot deposit an amount less than zero into your balance.
	cannotWriteOffAmountGreaterThanZero: { errorMessageCode: 'CANNOT_WRITE_OFF_AMOUNT_GREATER_THAN_ZERO' }, // You cannot write off an amount greater than zero from your balance.
	invalidSrtFormat: { errorMessageCode: 'INVALID_SRT_FORMAT' }, // Invalid SRT format
	invalidSrtTimeFormat: { errorMessageCode: 'INVALID_SRT_TIME_FORMAT' }, // Invalid SRT time format

	// AUTH
	sessionTokenIsNotValid: { errorMessageCode: 'SESSION_TOKEN_IS_NOT_VALID' }, // Токен сессии недействителен.
	cannotGetAccessTokenForOAuthProvider: { errorMessageCode: 'CANNOT_GET_ACCESS_TOKEN_FOR_OAUTH_PROVIDER' }, // Не получилось получить токен доступа у поставщика OAuth.
	cannotGetUserDataFromOAuthProvider: { errorMessageCode: 'CANNOT_GET_USER_DATA_FROM_OAUTH_PROVIDER' }, // Не получилось получить данные о пользователе у поставщика OAuth.

	// NUMBERS
	minNum(num: number) {
		return { errorMessageCode: 'MIN_NUM', minNumber: num } // Минимальное число: ${num}
	},
	maxNum(num: number) {
		return { errorMessageCode: 'MAX_NUM', maxNumber: num } // Максимальное число: ${num}
	},

	// STRINGS
	mustBeString(name: string) {
		return { errorMessageCode: 'MUST_BE_STRING', fieldName: name } // ${name} должен быть строкой.
	},
	minCharacters(num: number) {
		return { errorMessageCode: 'MIN_CHARACTERS', minNumber: num } // Минимальное количество символов: ${num}
	},
	maxCharacters(num: number) {
		return { errorMessageCode: 'MAX_CHARACTERS', maxNumber: num } // Максимальное количество символов: ${num}
	},
	stringDateInISO(name: string) {
		return { errorMessageCode: 'STRING_DATE_IN_ISO', fieldName: name } // ${name}Должна быть строка в формате ISO. Например: 2024-09-29T09:18:40.523Z. Чтобы это сделать используйте new Date().toISOString().
	},

	// ARRAY
	mustBeArray(name: string) {
		return { errorMessageCode: 'MUST_BE_ARRAY', fieldName: name } // ${name} должен быть массивом.
	},
	mustBeArrayOfStrings(name: string) {
		return { errorMessageCode: 'MUST_BE_ARRAY_OF_STRINGS', fieldName: name } // ${name} должен быть массивом строк.
	},
	mustBeArrayOfMongoDBStrings(name: string) {
		return { errorMessageCode: 'MUST_BE_ARRAY_OF_MONGODB_STRINGS', fieldName: name } // ${name} должен быть массивом строк mongoId.
	},

	// MICK
	noSessionObject: { errorMessageCode: 'NO_SESSION_OBJECT' }, // Нет объект сессии (request.session).
	cannotFinishSession: { errorMessageCode: 'CANNOT_FINISH_SESSION' }, // Не удалось завершить сессию.
	unknownDbError: { errorMessageCode: 'UNKNOWN_DB_ERROR' }, // Неизвестная ошибка в базе данных.
	unknownOpenAIError: { errorMessageCode: 'UNKNOWN_OPENAI_ERROR' }, // Неизвестная ошибка при запросе в LLM.
	unknownError: { errorMessageCode: 'UNKNOWN_ERROR' }, // Неизвестная ошибка сервера.
	cannotSaveSession: { errorMessageCode: 'CANNOT_SAVE_SESSION' }, // Невозможно сохранить сессию
	onlyDevMode: { errorMessageCode: 'ONLY_DEV_MODE' }, // Работает только в режиме разработки.

	// YOOKASSA
	yookassaCannotCreatePayment: { errorMessageCode: 'YOOKASSA_CANNOT_CREATE_PAYMENT' }, // Не удалось создать платеж .

	book: {
		notCreated: { errorMessageCode: 'BOOK_NOT_CREATED' }, // Книга не создана.
		notFound: { errorMessageCode: 'BOOK_NOT_FOUND' }, // Книга не найдена.
	},

	bookChapter: {
		notCreated: { errorMessageCode: 'BOOK_CHAPTER_NOT_CREATED' }, // Глава книги не создана.
		notFound: { errorMessageCode: 'BOOK_CHAPTER_NOT_FOUND' }, // Глава книги не найдена.
		cannotAnalyzeSentenceAndPhrase: { errorMessageCode: 'BOOK_CHAPTER_CANNOT_ANALYZE_SENTENCE_AND_PHRASE' }, // Не удалось проанализировать предложение и фразу.
	},

	sentence: {
		notFound: { errorMessageCode: 'SENTENCE_NOT_FOUND' }, // Предложение не найдено.
	},

	video: {
		notCreated: { errorMessageCode: 'VIDEO_NOT_CREATED' }, // Видел не создано.
		notFound: { errorMessageCode: 'VIDEO_NOT_FOUND' }, // Видео не найдено.
		subtitlesGenerationAlreadyRunning: { errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_ALREADY_RUNNING' }, // Генерация субтитров для этого видео уже выполняется.
		subtitlesGenerationFileNotUploaded: { errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_FILE_NOT_UPLOADED' }, // Видеофайл не загружен — нечего распознавать.
		subtitlesGenerationLanguageRequired: { errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_LANGUAGE_REQUIRED' }, // Для генерации субтитров у видео должен быть указан язык.
		subtitlesGenerationVideoTooLong: { errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_VIDEO_TOO_LONG' }, // Длительность видео превышает допустимый лимит для генерации субтитров.
		subtitlesGenerationFailed: { errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_FAILED' }, // Не удалось сгенерировать субтитры для видео.
		subtitlesAsrFailed: { errorMessageCode: 'VIDEO_SUBTITLES_ASR_FAILED' }, // Сервис распознавания речи вернул ошибку.
	},
	sentenceTranslation: {
		notFound: { errorMessageCode: 'SENTENCE_TRANSLATION_NOT_FOUND' }, // Перевод предложения не найден.
		alreadyExists: { errorMessageCode: 'SENTENCE_TRANSLATION_ALREADY_EXISTS' }, // Перевод предложения уже существует.
		userCannotAccessForeignPrivateMedia: {
			errorMessageCode: 'SENTENCE_TRANSLATION_USER_CANNOT_ACCESS_FOREIGN_PRIVATE_MEDIA',
		}, // Нельзя получать переводы материалов другого пользователя.
		anonymousUserCannotTranslate: { errorMessageCode: 'SENTENCE_TRANSLATION_ANONYMOUS_USER_CANNOT_TRANSLATE' }, // Вы не можете переводить без авторизации.
	},
	nlp: {
		cantDivideTextIntoSentences: { errorMessageCode: 'NLP_CANT_DIVIDE_TEXT_INTO_SENTENCES' }, // Не получилось разделить текст на предложения.
		languageRequired: { errorMessageCode: 'NLP_LANGUAGE_REQUIRED' }, // Для разделения текста на предложения нужно указать язык.
	},
	universalPhrase: {
		notCreated: { errorMessageCode: 'UNIVERSAL_PHRASE_NOT_CREATED' }, // Фраза не создана.
		notFound: { errorMessageCode: 'UNIVERSAL_PHRASE_NOT_FOUND' }, // Фраза не найдена.
		alreadyExists: { errorMessageCode: 'UNIVERSAL_PHRASE_ALREADY_EXISTS' }, // Фраза с таким текстом и языком уже существует.
	},
	universalTranscription: {
		notCreated: { errorMessageCode: 'UNIVERSAL_TRANSCRIPTION_NOT_CREATED' }, // Не удалось создать транскрипцию.
		alreadyExists: { errorMessageCode: 'UNIVERSAL_TRANSCRIPTION_ALREADY_EXISTS' }, // Транскрипция для этой фразы уже существует.
		cannotGetTranscriptionFromLLM: {
			errorMessageCode: 'UNIVERSAL_TRANSCRIPTION_CANNOT_GET_TRANSCRIPTION_FROM_LLM',
		}, // Не удалось получить транскрипцию от LLM.
	},
	sentenceChat: {
		questionIsEmpty: { errorMessageCode: 'SENTENCE_CHAT_QUESTION_IS_EMPTY' }, // Текст вопроса пустой.
		generationAlreadyActive: { errorMessageCode: 'SENTENCE_CHAT_GENERATION_ALREADY_ACTIVE' }, // У вас уже есть активная генерация ответа. Дождитесь её завершения или отмените.
		threadNotFound: { errorMessageCode: 'SENTENCE_CHAT_THREAD_NOT_FOUND' }, // Тред чата не найден.
		threadAlreadyExists: { errorMessageCode: 'SENTENCE_CHAT_THREAD_ALREADY_EXISTS' }, // Тред обсуждения для этого предложения уже существует.
		lastMessageIsNotUserQuestion: { errorMessageCode: 'SENTENCE_CHAT_LAST_MESSAGE_IS_NOT_USER_QUESTION' }, // Невозможно сгенерировать ответ: последнее сообщение в треде не является вопросом пользователя.
		previousAnswerNotReady: { errorMessageCode: 'SENTENCE_CHAT_PREVIOUS_ANSWER_NOT_READY' }, // Невозможно отправить новый вопрос: предыдущий ответ ещё не завершён.
		insufficientBalance: { errorMessageCode: 'SENTENCE_CHAT_INSUFFICIENT_BALANCE' }, // Недостаточно средств на балансе для генерации ответа.
	},
	flashcard: {
		notFound: { errorMessageCode: 'FLASHCARD_NOT_FOUND' }, // Карточка не найдена.
		sourcePhraseNotFound: { errorMessageCode: 'FLASHCARD_SOURCE_PHRASE_NOT_FOUND' }, // Фраза-источник для карточки не найдена.
		sourceSentenceNotFound: { errorMessageCode: 'FLASHCARD_SOURCE_SENTENCE_NOT_FOUND' }, // Предложение-источник для карточки не найдено.
		sourceLanguageNotFound: { errorMessageCode: 'FLASHCARD_SOURCE_LANGUAGE_NOT_FOUND' }, // Не удалось определить язык фразы для карточки.
		alreadyExists: { errorMessageCode: 'FLASHCARD_ALREADY_EXISTS' }, // Карточка для этой фразы уже существует.
	},
	audioPronunciation: {
		notCreated: { errorMessageCode: 'AUDIO_PRONUNCIATION_NOT_CREATED' }, // Не удалось создать озвучку.
		alreadyExists: { errorMessageCode: 'AUDIO_PRONUNCIATION_ALREADY_EXISTS' }, // Озвучка для этой фразы уже существует.
		cannotUploadToS3: { errorMessageCode: 'AUDIO_PRONUNCIATION_CANNOT_UPLOAD_TO_S3' }, // Не удалось загрузить аудио файл в хранилище.
		cannotGenerateAudio: { errorMessageCode: 'AUDIO_PRONUNCIATION_CANNOT_GENERATE_AUDIO' }, // Не удалось сгенерировать аудио.
		anonymousUserCannotGenerate: { errorMessageCode: 'AUDIO_PRONUNCIATION_ANONYMOUS_USER_CANNOT_GENERATE' }, // Вы не можете создавать озвучку без авторизации.
	},
} satisfies Record<string, any>

export function serializeErrorMessage(errorMessage: ErrorMessage) {
	return JSON.stringify(errorMessage)
}

export function parseErrorMessage(errorMessage: unknown) {
	if (typeof errorMessage !== 'string') {
		return errorMessage
	}

	try {
		const parsedErrorMessage = JSON.parse(errorMessage)

		if (
			typeof parsedErrorMessage === 'object' &&
			!!parsedErrorMessage &&
			'errorMessageCode' in parsedErrorMessage
		) {
			return parsedErrorMessage
		}
	} catch {}

	return errorMessage
}
