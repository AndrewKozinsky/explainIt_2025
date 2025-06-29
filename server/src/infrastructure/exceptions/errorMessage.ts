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

	// AUTH
	// refreshTokenIsNotValid: 'Токен обновления недействителен.',
	// accessTokenIsNotValid: 'Токен доступа недействителен.',

	// AI
	parcelBoxTypeDidNotCreated: 'Тип посыльного ящика не создан.',
	parcelBoxTypeDoesNotExist: 'Тип посыльного ящика не найден.',

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
		return name + ' must be a string'
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
		return name + ' must be an array.'
	},
	mustBeArrayOfStrings(name: string) {
		return name + ' must be an array of strings.'
	},
	mustBeArrayOfMongoDBStrings(name: string) {
		return name + ' must be an array of mongoId strings.'
	},

	// MICK
	noSessionObject: 'Нет объект сессии (request.session).',
	unknownDbError: 'Неизвестная ошибка в базе данных.',
	unknownError: 'Неизвестная ошибка сервера.',
	cannotSaveSession: 'Не возможно сохранить сессию',
	// onlyDevMode: 'It works only in development mode.',
}
