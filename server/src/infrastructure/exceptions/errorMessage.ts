export const errorMessage = {
	// EMAIL
	email: {
		emailIsAlreadyRegistered: 'Почта уже зарегистрирована.',
		emailIsNotConfirmed: 'Почта зарегистрирована, но не подтверждена.',
		wrongEmailFormat: 'Адрес электронной почты должен соответствовать формату example@mail.com',
		emailIsAlreadyConfirmed: 'Почта уже подтверждена.',
		emailConfirmationCodeIsExpired: 'Срок действия кода подтверждения почты истек.',
		emailConfirmationCodeNotFound: 'Код подтверждения почты не найден.',
		emailNotFound: 'Почта не найдена.',
	},

	// USER
	user: {
		userNotFound: 'Пользователь не найден.',
		userUnauthorized: 'Пользователь не авторизован.',
		userIsNotOwner: 'Пользователь не является владельцем этой сущности.',
	},

	userBalanceIsNegative: 'Отрицательный баланс.',
	userBalanceBelowMinimum: 'Недостаточно средств на балансе для выполнения операции.',
	insufficientBalanceForTranslation: 'Недостаточно средств на балансе для перевода.',
	paymentIdIsRequiredForPaymentTransactions: 'Payment ID is required for payment transactions',
	cannotDepositAmountLessThanZero: 'You cannot deposit an amount less than zero into your balance.',
	cannotWriteOffAmountGreaterThanZero: 'You cannot write off an amount greater than zero from your balance.',
	invalidSrtFormat: 'Invalid SRT format',
	invalidSrtTimeFormat: 'Invalid SRT time format',

	// AUTH
	sessionTokenIsNotValid: 'Токен сессии недействителен.',
	cannotGetAccessTokenForOAuthProvider: 'Не получилось получить токен доступа у поставщика OAuth.',
	cannotGetUserDataFromOAuthProvider: 'Не получилось получить данные о пользователе у поставщика OAuth.',

	// NUMBERS
	minNum(num: number) {
		return 'Минимальное число: ' + num
	},
	maxNum(num: number) {
		return 'Максимальное число: ' + num
	},

	// STRINGS
	mustBeString(name: string) {
		return name + ' должен быть строкой.'
	},
	minCharacters(num: number) {
		return 'Минимальное количество символов: ' + num
	},
	maxCharacters(num: number) {
		return 'Максимальное количество символов: ' + num
	},
	stringDateInISO(name: string) {
		return (
			name +
			'Должна быть строка в формате ISO. Например: 2024-09-29T09:18:40.523Z. Чтобы это сделать используйте new Date().toISOString().'
		)
	},

	// ARRAY
	mustBeArray(name: string) {
		return name + ' должен быть массивом.'
	},
	mustBeArrayOfStrings(name: string) {
		return name + ' должен быть массивом строк.'
	},
	mustBeArrayOfMongoDBStrings(name: string) {
		return name + ' должен быть массивом строк mongoId.'
	},

	// MICK
	noSessionObject: 'Нет объект сессии (request.session).',
	cannotFinishSession: 'Не удалось завершить сессию.',
	unknownDbError: 'Неизвестная ошибка в базе данных.',
	unknownOpenAIError: 'Неизвестная ошибка при запросе в LLM.',
	unknownError: 'Неизвестная ошибка сервера.',
	cannotSaveSession: 'Невозможно сохранить сессию',
	onlyDevMode: 'Работает только в режиме разработки.',

	// YOOKASSA
	yookassaCannotCreatePayment: 'Не удалось создать платеж .',

	book: {
		notCreated: 'Книга не создана.',
		notFound: 'Книга не найдена.',
	},

	bookChapter: {
		notCreated: 'Глава книги не создана.',
		notFound: 'Глава книги не найдена.',
		cannotAnalyzeSentenceAndPhrase: 'Не удалось проанализировать предложение и фразу.',
	},

	sentence: {
		notFound: 'Предложение не найдено.',
	},

	video: {
		notCreated: 'Видел не создано.',
		notFound: 'Видео не найдено.',
		subtitlesGenerationAlreadyRunning: 'Генерация субтитров для этого видео уже выполняется.',
		subtitlesGenerationFileNotUploaded: 'Видеофайл не загружен — нечего распознавать.',
		subtitlesGenerationLanguageRequired: 'Для генерации субтитров у видео должен быть указан язык.',
		subtitlesGenerationVideoTooLong: 'Длительность видео превышает допустимый лимит для генерации субтитров.',
		subtitlesGenerationFailed: 'Не удалось сгенерировать субтитры для видео.',
		subtitlesAsrFailed: 'Сервис распознавания речи вернул ошибку.',
	},
	sentenceTranslation: {
		notFound: 'Перевод предложения не найден.',
		alreadyExists: 'Перевод предложения уже существует.',
		userCannotAccessForeignPrivateMedia: 'Нельзя получать переводы материалов другого пользователя.',
		anonymousUserCannotTranslate: 'Вы не можете переводить без авторизации.',
	},
	nlp: {
		cantDivideTextIntoSentences: 'Не получилось разделить текст на предложения.',
		languageRequired: 'Для разделения текста на предложения нужно указать язык.',
	},
	universalPhrase: {
		notCreated: 'Фраза не создана.',
		notFound: 'Фраза не найдена.',
		alreadyExists: 'Фраза с таким текстом и языком уже существует.',
	},
	universalTranscription: {
		notCreated: 'Не удалось создать транскрипцию.',
		alreadyExists: 'Транскрипция для этой фразы уже существует.',
		cannotGetTranscriptionFromLLM: 'Не удалось получить транскрипцию от LLM.',
	},
	sentenceChat: {
		questionIsEmpty: 'Текст вопроса пустой.',
		generationAlreadyActive: 'У вас уже есть активная генерация ответа. Дождитесь её завершения или отмените.',
		threadNotFound: 'Тред чата не найден.',
		threadAlreadyExists: 'Тред обсуждения для этого предложения уже существует.',
		lastMessageIsNotUserQuestion:
			'Невозможно сгенерировать ответ: последнее сообщение в треде не является вопросом пользователя.',
		previousAnswerNotReady: 'Невозможно отправить новый вопрос: предыдущий ответ ещё не завершён.',
		insufficientBalance: 'Недостаточно средств на балансе для генерации ответа.',
	},
	flashcard: {
		notFound: 'Карточка не найдена.',
		sourcePhraseNotFound: 'Фраза-источник для карточки не найдена.',
		sourceSentenceNotFound: 'Предложение-источник для карточки не найдено.',
		sourceLanguageNotFound: 'Не удалось определить язык фразы для карточки.',
		alreadyExists: 'Карточка для этой фразы уже существует.',
	},
	audioPronunciation: {
		notCreated: 'Не удалось создать озвучку.',
		alreadyExists: 'Озвучка для этой фразы уже существует.',
		cannotUploadToS3: 'Не удалось загрузить аудио файл в хранилище.',
		cannotGenerateAudio: 'Не удалось сгенерировать аудио.',
		anonymousUserCannotGenerate: 'Вы не можете создавать озвучку без авторизации.',
	},
}
