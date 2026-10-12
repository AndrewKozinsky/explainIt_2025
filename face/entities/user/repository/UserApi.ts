import {
	userControllerGetMe,
	userControllerGetAvatarPresets,
	userControllerUpdateMe,
	userControllerUploadAvatar,
} from '@/shared/api/generated/user/user'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { mapToAvatarPreset, mapToUser } from './UserMappers'
import type { AvatarPresetModel, UpdateUserProfileInput, UserModel, UserRepository } from './UserRepository'

/** Реализация репозитория пользователя через REST API. */
export class UserApi implements UserRepository {
	getMe(signal?: AbortSignal): Promise<ApiResult<UserModel>> {
		return executeApiCall(() => userControllerGetMe({ cache: 'no-store', signal }), mapToUser)
	}

	getAvatarPresets(signal?: AbortSignal): Promise<ApiResult<AvatarPresetModel[]>> {
		return executeApiCall(
			() => userControllerGetAvatarPresets({ cache: 'no-store', signal }),
			(data) => data.map(mapToAvatarPreset),
		)
	}

	updateMe(input: UpdateUserProfileInput): Promise<ApiResult<UserModel>> {
		return executeApiCall(() => userControllerUpdateMe(input), mapToUser)
	}

	uploadAvatar(file: File): Promise<ApiResult<UserModel>> {
		return executeApiCall(() => userControllerUploadAvatar({ file }), mapToUser)
	}
}
