import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

export type UserGender = 'MALE' | 'FEMALE'
export type AvatarPresetId = 'male-1' | 'male-2' | 'female-1' | 'female-2'

export const GENERATE_SCENE_IMAGE = 'ai-dialogue-generate-scene-image'

export type UserPreferences = {
	[GENERATE_SCENE_IMAGE]?: boolean
}

/** Доменная модель пользователя, не зависящая от OpenAPI. */
export type UserModel = {
	id: number
	email: string
	isUserConfirmed: boolean
	balance: number
	gender: UserGender
	avatarPresetId: AvatarPresetId | null
	avatarUrl: string
	uploadedAvatarUrl: string | null
	preferences: UserPreferences
}

export type AvatarPresetModel = {
	id: AvatarPresetId
	gender: UserGender
	avatarUrl: string
}

export type UpdateUserProfileInput = {
	gender?: UserGender
	avatarPresetId?: AvatarPresetId | null
	preferences?: UserPreferences
}

/** Доступ к данным пользователя; реализацию можно подменить в тестах и Storybook. */
export type UserRepository = {
	getMe(signal?: AbortSignal): Promise<ApiResult<UserModel>>
	getAvatarPresets(signal?: AbortSignal): Promise<ApiResult<AvatarPresetModel[]>>
	updateMe(input: UpdateUserProfileInput): Promise<ApiResult<UserModel>>
	uploadAvatar(file: File): Promise<ApiResult<UserModel>>
	deleteAvatar(): Promise<ApiResult<UserModel>>
}
