// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/** Входные данные для подтверждения email. */
/*export type ConfirmEmailInput = {
	code: string
}*/

/** Входные данные для регистрации. */
/*export type RegisterInput = {
	email: string
	password: string
}*/

/** Входные данные для логина по email/паролю. */
/*export type LoginInput = {
	email: string
	password: string
}*/

/** Входные данные для OAuth-авторизации. */
/*export type LoginWithOAuthInput = {
	providerType: string
	code: string
}*/

/** Результат авторизации (данные пользователя). */
/*export type LoginWithOAuthResult = {
	id: number
	email: string
	isUserConfirmed: boolean
	balance: number
}*/

/** Унифицированная модель пользователя — не зависит от API. */
export type UserModel = {
	id: number
	email: string
	isUserConfirmed: boolean
	balance: number
}

/**
 * Репозиторий аутентификации — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
/*export type AuthRepository = {
	/!** Подтверждение email по коду *!/
	confirmEmail(input: ConfirmEmailInput): Promise<ApiResult<void>>
	/!** Логин по email и паролю *!/
	login(input: LoginInput): Promise<ApiResult<LoginWithOAuthResult>>
	/!** Регистрация нового пользователя *!/
	register(input: RegisterInput): Promise<ApiResult<LoginWithOAuthResult>>
	/!** Авторизация через OAuth-провайдера (GitHub, Google, Yandex) *!/
	loginWithOAuth(input: LoginWithOAuthInput): Promise<ApiResult<LoginWithOAuthResult>>
	/!** Завершить сессию пользователя (logout) *!/
	logout(): Promise<ApiResult<void>>
}*/
