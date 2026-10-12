import { userControllerGetMe } from '@/shared/api/generated/user/user'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { mapToUser } from './UserMappers'
import type { UserModel, UserRepository } from './UserRepository'

/** Реализация репозитория пользователя через REST API. */
export class UserApi implements UserRepository {
	getMe(): Promise<ApiResult<UserModel>> {
		return executeApiCall(() => userControllerGetMe({ cache: 'no-store' }), mapToUser)
	}
}
