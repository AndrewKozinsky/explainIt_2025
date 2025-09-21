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
	userBalanceIsNegative: 'У пользователя отрицательный баланс.',
	userIsNotOwner: 'Пользователь не является владельцем этой сущности.',

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
}
