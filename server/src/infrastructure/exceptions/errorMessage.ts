export type ErrorMessage = {
	code: string
	[key: string]: string | number | boolean | null
}

export const errorMessage = {
	// EMAIL
	email: {
		isAlreadyRegistered: { code: 'EMAIL_IS_ALREADY_REGISTERED' }, // Почта уже зарегистрирована.
		isNotConfirmed: { code: 'EMAIL_IS_NOT_CONFIRMED' }, // Почта зарегистрирована, но не подтверждена.
		wrongFormat: { code: 'EMAIL_WRONG_FORMAT' }, // Адрес электронной почты должен соответствовать формату example@mail.com
		isAlreadyConfirmed: { code: 'EMAIL_IS_ALREADY_CONFIRMED' }, // Почта уже подтверждена.
		confirmationCodeIsExpired: { code: 'EMAIL_CONFIRMATION_CODE_IS_EXPIRED' }, // Срок действия кода подтверждения почты истек.
		confirmationCodeNotFound: { code: 'EMAIL_CONFIRMATION_CODE_NOT_FOUND' }, // Код подтверждения почты не найден.
		notFound: { code: 'EMAIL_NOT_FOUND' }, // Почта не найдена.
	},

	// USER
	user: {
		notFound: { code: 'USER_NOT_FOUND' }, // Пользователь не найден.
		unauthorized: { code: 'USER_UNAUTHORIZED' }, // Пользователь не авторизован.
		isNotOwner: { code: 'USER_IS_NOT_OWNER' }, // Пользователь не является владельцем этой сущности.
	},

	userBalanceIsNegative: { code: 'USER_BALANCE_IS_NEGATIVE' }, // Отрицательный баланс.
	userBalanceBelowMinimum: { code: 'USER_BALANCE_BELOW_MINIMUM' }, // Недостаточно средств на балансе для выполнения операции.
	insufficientBalanceForTranslation: { code: 'INSUFFICIENT_BALANCE_FOR_TRANSLATION' }, // Недостаточно средств на балансе для перевода.
	paymentIdIsRequiredForPaymentTransactions: { code: 'PAYMENT_ID_IS_REQUIRED_FOR_PAYMENT_TRANSACTIONS' }, // Payment ID is required for payment transactions
	cannotDepositAmountLessThanZero: { code: 'CANNOT_DEPOSIT_AMOUNT_LESS_THAN_ZERO' }, // You cannot deposit an amount less than zero into your balance.
	cannotWriteOffAmountGreaterThanZero: { code: 'CANNOT_WRITE_OFF_AMOUNT_GREATER_THAN_ZERO' }, // You cannot write off an amount greater than zero from your balance.
	invalidSrtFormat: { code: 'INVALID_SRT_FORMAT' }, // Invalid SRT format
	invalidSrtTimeFormat: { code: 'INVALID_SRT_TIME_FORMAT' }, // Invalid SRT time format

	// AUTH
	sessionTokenIsNotValid: { code: 'SESSION_TOKEN_IS_NOT_VALID' }, // Токен сессии недействителен.
	cannotGetAccessTokenForOAuthProvider: { code: 'CANNOT_GET_ACCESS_TOKEN_FOR_OAUTH_PROVIDER' }, // Не получилось получить токен доступа у поставщика OAuth.
	cannotGetUserDataFromOAuthProvider: { code: 'CANNOT_GET_USER_DATA_FROM_OAUTH_PROVIDER' }, // Не получилось получить данные о пользователе у поставщика OAuth.

	// NUMBERS
	mustBeNumber: { code: 'MUST_BE_NUMBER' }, // Должно быть числом.
	minNum(num: number) {
		return { code: 'MIN_NUM', minNumber: num } // Минимальное число: ${num}
	},
	maxNum(num: number) {
		return { code: 'MAX_NUM', maxNumber: num } // Максимальное число: ${num}
	},

	// STRINGS
	mustBeString(name: string) {
		return { code: 'MUST_BE_STRING', fieldName: name } // ${name} должен быть строкой.
	},
	mustBeBoolean(name: string) {
		return { code: 'MUST_BE_BOOLEAN', fieldName: name } // ${name} должен быть boolean.
	},
	stringDoesNotMatch(name: string) {
		return { code: 'STRING_DOES_NOT_MATCH', fieldName: name } // ${name} не соответствует формату.
	},
	minCharacters(num: number) {
		return { code: 'MIN_CHARACTERS', minNumber: num } // Минимальное количество символов: ${num}
	},
	maxCharacters(num: number) {
		return { code: 'MAX_CHARACTERS', maxNumber: num } // Максимальное количество символов: ${num}
	},
	stringDateInISO(name: string) {
		return { code: 'STRING_DATE_IN_ISO', fieldName: name } // ${name}Должна быть строка в формате ISO. Например: 2024-09-29T09:18:40.523Z. Чтобы это сделать используйте new Date().toISOString().
	},

	// ARRAY
	mustBeArray(name: string) {
		return { code: 'MUST_BE_ARRAY', fieldName: name } // ${name} должен быть массивом.
	},
	mustBeArrayOfStrings(name: string) {
		return { code: 'MUST_BE_ARRAY_OF_STRINGS', fieldName: name } // ${name} должен быть массивом строк.
	},
	mustBeArrayOfMongoDBStrings(name: string) {
		return { code: 'MUST_BE_ARRAY_OF_MONGODB_STRINGS', fieldName: name } // ${name} должен быть массивом строк mongoId.
	},
	mustBeEnumValue(name: string) {
		return { code: 'MUST_BE_ENUM_VALUE', fieldName: name } // ${name} должен быть валидным значением enum.
	},

	// MICK
	noSessionObject: { code: 'NO_SESSION_OBJECT' }, // Нет объект сессии (request.session).
	cannotFinishSession: { code: 'CANNOT_FINISH_SESSION' }, // Не удалось завершить сессию.
	unknownDbError: { code: 'UNKNOWN_DB_ERROR' }, // Неизвестная ошибка в базе данных.
	unknownOpenAIError: { code: 'UNKNOWN_OPENAI_ERROR' }, // Неизвестная ошибка при запросе в LLM.
	unknownError: { code: 'UNKNOWN_ERROR' }, // Неизвестная ошибка сервера.
	cannotSaveSession: { code: 'CANNOT_SAVE_SESSION' }, // Невозможно сохранить сессию
	onlyDevMode: { code: 'ONLY_DEV_MODE' }, // Работает только в режиме разработки.

	// YOOKASSA
	yookassaCannotCreatePayment: { code: 'YOOKASSA_CANNOT_CREATE_PAYMENT' }, // Не удалось создать платеж .

	book: {
		notCreated: { code: 'BOOK_NOT_CREATED' }, // Книга не создана.
		notFound: { code: 'BOOK_NOT_FOUND' }, // Книга не найдена.
	},

	bookChapter: {
		notCreated: { code: 'BOOK_CHAPTER_NOT_CREATED' }, // Глава книги не создана.
		notFound: { code: 'BOOK_CHAPTER_NOT_FOUND' }, // Глава книги не найдена.
		cannotAnalyzeSentenceAndPhrase: { code: 'BOOK_CHAPTER_CANNOT_ANALYZE_SENTENCE_AND_PHRASE' }, // Не удалось проанализировать предложение и фразу.
	},

	sentence: {
		notFound: { code: 'SENTENCE_NOT_FOUND' }, // Предложение не найдено.
	},

	video: {
		notCreated: { code: 'VIDEO_NOT_CREATED' }, // Видел не создано.
		notFound: { code: 'VIDEO_NOT_FOUND' }, // Видео не найдено.
		subtitlesGenerationAlreadyRunning: { code: 'VIDEO_SUBTITLES_GENERATION_ALREADY_RUNNING' }, // Генерация субтитров для этого видео уже выполняется.
		subtitlesGenerationFileNotUploaded: { code: 'VIDEO_SUBTITLES_GENERATION_FILE_NOT_UPLOADED' }, // Видеофайл не загружен — нечего распознавать.
		subtitlesGenerationLanguageRequired: { code: 'VIDEO_SUBTITLES_GENERATION_LANGUAGE_REQUIRED' }, // Для генерации субтитров у видео должен быть указан язык.
		subtitlesGenerationDurationRequired: { code: 'VIDEO_SUBTITLES_GENERATION_DURATION_REQUIRED' }, // Для генерации субтитров нужно знать длительность видео.
		subtitlesGenerationVideoTooLong: { code: 'VIDEO_SUBTITLES_GENERATION_VIDEO_TOO_LONG' }, // Длительность видео превышает допустимый лимит для генерации субтитров.
		subtitlesGenerationFailed: { code: 'VIDEO_SUBTITLES_GENERATION_FAILED' }, // Не удалось сгенерировать субтитры для видео.
		subtitlesAsrFailed: { code: 'VIDEO_SUBTITLES_ASR_FAILED' }, // Сервис распознавания речи вернул ошибку.
	},
	sentenceTranslation: {
		notFound: { code: 'SENTENCE_TRANSLATION_NOT_FOUND' }, // Перевод предложения не найден.
		alreadyExists: { code: 'SENTENCE_TRANSLATION_ALREADY_EXISTS' }, // Перевод предложения уже существует.
		userCannotAccessForeignPrivateMedia: {
			code: 'SENTENCE_TRANSLATION_USER_CANNOT_ACCESS_FOREIGN_PRIVATE_MEDIA',
		}, // Нельзя получать переводы материалов другого пользователя.
		anonymousUserCannotTranslate: { code: 'SENTENCE_TRANSLATION_ANONYMOUS_USER_CANNOT_TRANSLATE' }, // Вы не можете переводить без авторизации.
	},
	nlp: {
		cantDivideTextIntoSentences: { code: 'NLP_CANT_DIVIDE_TEXT_INTO_SENTENCES' }, // Не получилось разделить текст на предложения.
		languageRequired: { code: 'NLP_LANGUAGE_REQUIRED' }, // Для разделения текста на предложения нужно указать язык.
	},
	universalPhrase: {
		notCreated: { code: 'UNIVERSAL_PHRASE_NOT_CREATED' }, // Фраза не создана.
		notFound: { code: 'UNIVERSAL_PHRASE_NOT_FOUND' }, // Фраза не найдена.
		alreadyExists: { code: 'UNIVERSAL_PHRASE_ALREADY_EXISTS' }, // Фраза с таким текстом и языком уже существует.
	},
	universalTranscription: {
		notCreated: { code: 'UNIVERSAL_TRANSCRIPTION_NOT_CREATED' }, // Не удалось создать транскрипцию.
		alreadyExists: { code: 'UNIVERSAL_TRANSCRIPTION_ALREADY_EXISTS' }, // Транскрипция для этой фразы уже существует.
		cannotGetTranscriptionFromLLM: {
			code: 'UNIVERSAL_TRANSCRIPTION_CANNOT_GET_TRANSCRIPTION_FROM_LLM',
		}, // Не удалось получить транскрипцию от LLM.
		languageNotSupported: { code: 'UNIVERSAL_TRANSCRIPTION_LANGUAGE_NOT_SUPPORTED' }, // Транскрипция не поддерживается для этого языка.
	},
	sentenceChat: {
		questionIsEmpty: { code: 'SENTENCE_CHAT_QUESTION_IS_EMPTY' }, // Текст вопроса пустой.
		generationAlreadyActive: { code: 'SENTENCE_CHAT_GENERATION_ALREADY_ACTIVE' }, // У вас уже есть активная генерация ответа. Дождитесь её завершения или отмените.
		threadNotFound: { code: 'SENTENCE_CHAT_THREAD_NOT_FOUND' }, // Тред чата не найден.
		threadAlreadyExists: { code: 'SENTENCE_CHAT_THREAD_ALREADY_EXISTS' }, // Тред обсуждения для этого предложения уже существует.
		lastMessageIsNotUserQuestion: { code: 'SENTENCE_CHAT_LAST_MESSAGE_IS_NOT_USER_QUESTION' }, // Невозможно сгенерировать ответ: последнее сообщение в треде не является вопросом пользователя.
		previousAnswerNotReady: { code: 'SENTENCE_CHAT_PREVIOUS_ANSWER_NOT_READY' }, // Невозможно отправить новый вопрос: предыдущий ответ ещё не завершён.
		insufficientBalance: { code: 'SENTENCE_CHAT_INSUFFICIENT_BALANCE' }, // Недостаточно средств на балансе для генерации ответа.
	},
	aiDialogue: {
		notFound: { code: 'AI_DIALOGUE_NOT_FOUND' }, // Диалог не найден.
		scenarioNotFound: { code: 'AI_DIALOGUE_SCENARIO_NOT_FOUND' }, // Сценарий диалога не найден.
	},
	audioPronunciation: {
		notCreated: { code: 'AUDIO_PRONUNCIATION_NOT_CREATED' }, // Не удалось создать озвучку.
		alreadyExists: { code: 'AUDIO_PRONUNCIATION_ALREADY_EXISTS' }, // Озвучка для этой фразы уже существует.
		cannotUploadToS3: { code: 'AUDIO_PRONUNCIATION_CANNOT_UPLOAD_TO_S3' }, // Не удалось загрузить аудио файл в хранилище.
		cannotGenerateAudio: { code: 'AUDIO_PRONUNCIATION_CANNOT_GENERATE_AUDIO' }, // Не удалось сгенерировать аудио.
		anonymousUserCannotGenerate: { code: 'AUDIO_PRONUNCIATION_ANONYMOUS_USER_CANNOT_GENERATE' },
	},
	universalPhraseTranslation: {
		notFound: { code: 'UNIVERSAL_PHRASE_TRANSLATION_NOT_FOUND' },
		cannotParseLLmResponse: { code: 'UNIVERSAL_PHRASE_TRANSLATION_CANNOT_PARSE_LLM_RESPONSE' },
		cannotGetTranslationFromLLM: {
			code: 'UNIVERSAL_PHRASE_TRANSLATION_CANNOT_GET_TRANSLATION_FROM_LLM',
		},
	},
	youtube: {
		apiRequestFailed: { code: 'YOUTUBE_API_REQUEST_FAILED' }, // Не удалось выполнить запрос к YouTube API.
		quotaExceeded: { code: 'YOUTUBE_QUOTA_EXCEEDED' }, // Квота YouTube API исчерпана.
		languageNotSupported: { code: 'YOUTUBE_LANGUAGE_NOT_SUPPORTED' }, // Язык не поддерживается для поиска видео на YouTube.
		videoNotFound: { code: 'YOUTUBE_VIDEO_NOT_FOUND' }, // Видео с указанным ID не найдено на YouTube.
		audioDownloadFailed: { code: 'YOUTUBE_AUDIO_DOWNLOAD_FAILED' }, // Не удалось скачать аудио с YouTube.
	},
	llm: {
		llmTimeout: { code: 'LLM_TIMEOUT' }, // Превышено время ожидания ответа от LLM.
	},
} satisfies Record<string, any>

export function serializeErrorMessage(errorMessage: ErrorMessage) {
	return JSON.stringify(errorMessage)
}
