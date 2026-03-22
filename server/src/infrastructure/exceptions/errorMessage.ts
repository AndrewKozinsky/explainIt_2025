export const errorMessage = {
	// EMAIL
	emailIsAlreadyRegistered: 'Почта уже зарегистрирована.',
	emailIsNotConfirmed: 'Почта зарегистрирована, но не подтверждена.',
	wrongEmailFormat: 'Адрес электронной почты должен соответствовать формату example@mail.com',
	emailIsAlreadyConfirmed: 'Почта уже подтверждена.',
	emailConfirmationCodeIsExpired: 'Срок действия кода подтверждения почты истек.',
	emailConfirmationCodeNotFound: 'Код подтверждения почты не найден.',
	emailNotFound: 'Почта не найдена.',

	// USER
	userNotFound: 'Пользователь не найден.',
	userUnauthorized: 'Пользователь не авторизован.',
	userBalanceIsNegative: 'Отрицательный баланс.',
	userHasNoActiveSubscription: 'У пользователя нет активной подписки.',
	privateMediaIsNotIncludedInSubscriptionTariff: 'Тариф подписки не включает перевод приватного медиа.',
	insufficientSubscriptionBalanceForPrivateMediaTranslation: 'Недостаточно средств на балансе для перевода.',
	userIsNotOwner: 'Пользователь не является владельцем этой сущности.',
	tariffNotFound: 'Тариф не найден.',
	tariffIdIsRequired: 'Tariff id is required',
	paymentIdIsRequiredForPaymentTransactions: 'Payment ID is required for payment transactions',
	cannotDepositAmountLessThanZero: 'You cannot deposit an amount less than zero into your balance.',
	cannotWriteOffAmountGreaterThanZero: 'You cannot write off an amount greater than zero from your balance.',
	invalidSrtFormat: 'Invalid SRT format',
	invalidSrtTimeFormat: 'Invalid SRT time format',

	// AUTH
	sessionTokenIsNotValid: 'Токен сессии недействителен.',
	cannotGetAccessTokenForOAuthProvider: 'Не получилось получить токен доступа у поставщика OAuth.',
	cannotGetUserDataFromOAuthProvider: 'Не получилось получить данные о пользователе у поставщика OAuth.',

	// INPUT DATA
	// wrongInputData: 'Неверные значения полей.',

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
	unknownOpenAIError: 'Неизвестная ошибка при запросе в OpenAI.',
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
	},
	sentenceTranslation: {
		notFound: 'Перевод предложения не найден.',
		alreadyExists: 'Перевод предложения уже существует.',
		dailyLimitReached: 'Дневной лимит переводов исчерпан. Попробуйте снова завтра.',
		userCannotAccessForeignPrivateMedia: 'Нельзя получать переводы материалов другого пользователя.',
		privateTranslationRequiresStandardSubscriptionBalance:
			'Создание нового перевода доступно только при активной стандартной подписке и положительном балансе.',
		anonymousUserCannotTranslate: 'Вы не можете переводить без авторизации.',
	},
	nlp: {
		cantDivideTextIntoSentences: 'Не получилось разделить текст на предложения.',
	},
}
