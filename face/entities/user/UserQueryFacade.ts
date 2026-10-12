import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { userService } from './UserService'
import type { UserService } from './UserService'
import type { UpdateUserProfileInput } from './UserService'

export const userQueryKeys = {
	all: ['user'] as const,
	me: () => [...userQueryKeys.all, 'me'] as const,
	avatarPresets: () => [...userQueryKeys.all, 'avatar-presets'] as const,
}

/** В кэше React Query хранится UserModel, а не ответ Orval с data/status/headers. */
export class UserQueryFacade {
	constructor(private readonly service: UserService) {}

	getMe() {
		return queryOptions({
			queryKey: userQueryKeys.me(),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getMe(signal)),
		})
	}

	getAvatarPresets() {
		return queryOptions({
			queryKey: userQueryKeys.avatarPresets(),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getAvatarPresets(signal)),
		})
	}

	updateMe() {
		return { mutationFn: (input: UpdateUserProfileInput) => this.service.updateMe(input) }
	}

	uploadAvatar() {
		return { mutationFn: (file: File) => this.service.uploadAvatar(file) }
	}
}

export const userQueries = new UserQueryFacade(userService)
