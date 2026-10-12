import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/** Доменная модель пользователя, не зависящая от OpenAPI. */
export type UserModel = {
	id: number
	email: string
	isUserConfirmed: boolean
	balance: number
}

/** Доступ к данным пользователя; реализацию можно подменить в тестах и Storybook. */
export type UserRepository = {
	getMe(): Promise<ApiResult<UserModel>>
}
