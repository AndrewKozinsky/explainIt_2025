import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { userService } from './UserService'
import type { UserService } from './UserService'

export const userQueryKeys = {
	all: ['user'] as const,
	me: () => [...userQueryKeys.all, 'me'] as const,
}

/** В кэше React Query хранится UserModel, а не ответ Orval с data/status/headers. */
export class UserQueryFacade {
	constructor(private readonly service: UserService) {}

	getMe() {
		return queryOptions({
			queryKey: userQueryKeys.me(),
			queryFn: () => unwrapApiResult(this.service.getMe()),
		})
	}
}

export const userQueries = new UserQueryFacade(userService)
