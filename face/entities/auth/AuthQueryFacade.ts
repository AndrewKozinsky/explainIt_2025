import { authService } from './AuthService'
import type { AuthService, ConfirmEmailInput, LoginInput, LoginWithOAuthInput, RegisterInput } from './AuthService'

/**
 * Адаптер между доменным сервисом аутентификации и TanStack Query.
 *
 * У {@link AuthService} нет запросов — только мутации. В отличие от запросов,
 * мутации не прогоняются через `unwrapApiResult`: ошибки возвращаются в данных
 * (`ApiResult`), а не выбрасываются, чтобы формы могли разложить ошибки
 * валидации по полям.
 */
export class AuthQueryFacade {
	constructor(private readonly service: AuthService) {}

	/** Логин по email и паролю */
	login() {
		return { mutationFn: (input: LoginInput) => this.service.login(input) }
	}

	/** Регистрация нового пользователя */
	register() {
		return { mutationFn: (input: RegisterInput) => this.service.register(input) }
	}

	/** Подтверждение email по коду */
	confirmEmail() {
		return { mutationFn: (input: ConfirmEmailInput) => this.service.confirmEmail(input) }
	}

	/** Авторизация через OAuth-провайдера */
	loginWithOAuth() {
		return { mutationFn: (input: LoginWithOAuthInput) => this.service.loginWithOAuth(input) }
	}

	/** Завершить сессию пользователя (logout) */
	logout() {
		return { mutationFn: () => this.service.logout() }
	}
}

/** Готовый экземпляр фасада */
export const authQueries = new AuthQueryFacade(authService)
