// import type {
// 	AuthRepository,
// 	ConfirmEmailInput,
// 	LoginInput,
// 	LoginWithOAuthInput,
// 	RegisterInput,
// } from './repository/AuthRepository'

// export type {
// 	AuthRepository,
// 	ConfirmEmailInput,
// 	LoginInput,
// 	LoginWithOAuthInput,
// 	LoginWithOAuthResult,
// 	RegisterInput,
// } from './repository/AuthRepository'

/**
 * Сервис аутентификации — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link AuthRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new AuthApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
/*export class AuthService {
	private authRepository: AuthRepository

	constructor(authRepository: AuthRepository) {
		this.authRepository = authRepository
	}

	/!** Логин по email и паролю *!/
	async login(input: LoginInput) {
		return this.authRepository.login(input)
	}

	/!** Регистрация нового пользователя *!/
	async register(input: RegisterInput) {
		return this.authRepository.register(input)
	}

	/!** Подтверждение email по коду *!/
	async confirmEmail(input: ConfirmEmailInput) {
		return this.authRepository.confirmEmail(input)
	}

	/!** Авторизация через OAuth-провайдера *!/
	async loginWithOAuth(input: LoginWithOAuthInput) {
		return this.authRepository.loginWithOAuth(input)
	}

	/!** Завершить сессию пользователя (logout) *!/
	async logout() {
		return this.authRepository.logout()
	}
}*/
