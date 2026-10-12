import { mapToUser } from '@/entities/user/repository/UserMappers'
import {
	authControllerConfirmEmail,
	authControllerLogin,
	authControllerLoginWithOAuth,
	authControllerLogout,
	authControllerRegister,
} from '@/shared/api/generated/auth/auth'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type {
	AuthRepository,
	ConfirmEmailInput,
	LoginInput,
	LoginWithOAuthInput,
	LoginWithOAuthResult,
	RegisterInput,
} from './AuthRepository'

/**
 * Реализация AuthRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 */
export class AuthApi implements AuthRepository {
	async register(input: RegisterInput): Promise<ApiResult<LoginWithOAuthResult>> {
		return executeApiCall(
			() => authControllerRegister(input as Parameters<typeof authControllerRegister>[0]),
			(data) => mapToUser(data),
		)
	}

	async login(input: LoginInput): Promise<ApiResult<LoginWithOAuthResult>> {
		return executeApiCall(
			() => authControllerLogin(input as Parameters<typeof authControllerLogin>[0]),
			(data) => mapToUser(data),
		)
	}

	async confirmEmail(input: ConfirmEmailInput): Promise<ApiResult<void>> {
		return executeApiCall(() =>
			authControllerConfirmEmail(input as Parameters<typeof authControllerConfirmEmail>[0]),
		)
	}

	async loginWithOAuth(input: LoginWithOAuthInput): Promise<ApiResult<LoginWithOAuthResult>> {
		return executeApiCall(
			() => authControllerLoginWithOAuth(input as Parameters<typeof authControllerLoginWithOAuth>[0]),
			(data) => mapToUser(data),
		)
	}

	async logout(): Promise<ApiResult<void>> {
		return executeApiCall(() => authControllerLogout())
	}
}
