import type { UploadProgressCallbacks } from '@/shared/api/uploadWithProgress'
import { UserApi } from './repository/UserApi'
import type { UpdateUserProfileInput, UserRepository } from './repository/UserRepository'

export { GENERATE_SCENE_IMAGE } from './repository/UserRepository'

export type {
	AvatarPresetId,
	AvatarPresetModel,
	UpdateUserProfileInput,
	UserGender,
	UserModel,
	UserRepository,
} from './repository/UserRepository'

/** Сервис пользователя — прослойка между компонентами и репозиторием. */
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	getMe(signal?: AbortSignal) {
		return this.repository.getMe(signal)
	}

	getAvatarPresets(signal?: AbortSignal) {
		return this.repository.getAvatarPresets(signal)
	}

	updateMe(input: UpdateUserProfileInput) {
		return this.repository.updateMe(input)
	}

	uploadAvatar(file: File, uploadProgress?: UploadProgressCallbacks) {
		return this.repository.uploadAvatar(file, uploadProgress)
	}

	deleteAvatar() {
		return this.repository.deleteAvatar()
	}
}

export const userService = new UserService(new UserApi())
