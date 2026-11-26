import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { type UserProfileUpdate, UserRepository } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { GENERATE_SCENE_IMAGE, type UserPreferences } from 'models/user/userPreferences'
import type { UserGender } from 'prisma/generated/client'
import { getAvatarPreset } from './avatarPresets'

type UpdateUserProfileInput = { gender?: UserGender; avatarPresetId?: string | null; preferences?: UserPreferences }

export class UpdateUserProfileCommand implements ICommand {
	constructor(
		public userId: number,
		public input: UpdateUserProfileInput,
	) {}
}

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {
	constructor(
		private readonly repository: UserRepository,
		private readonly queryRepository: UserQueryRepository,
	) {}

	async execute(command: UpdateUserProfileCommand) {
		if (!this.isValidProfileUpdate(command.input)) {
			throw new CustomError(errorMessage.user.invalidProfileUpdate, ErrorStatusCode.BadRequest_400)
		}

		const { gender, avatarPresetId, preferences } = command.input
		const generateSceneImage = preferences?.[GENERATE_SCENE_IMAGE]
		const data: UserProfileUpdate = {}
		if (gender !== undefined) data.gender = gender
		if (generateSceneImage !== undefined) data.preferences = { [GENERATE_SCENE_IMAGE]: generateSceneImage }

		if (avatarPresetId === null) data.avatar_preset_id = null

		if (typeof avatarPresetId === 'string') {
			const preset = getAvatarPreset(avatarPresetId)
			if (!preset) throw new CustomError(errorMessage.user.invalidAvatarPreset, ErrorStatusCode.BadRequest_400)

			data.gender = preset.gender
			data.avatar_preset_id = preset.id
		}

		const result = await this.repository.updateProfile(command.userId, data)
		if (!result) throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)

		if (result.avatarSelectionRejected)
			throw new CustomError(errorMessage.user.invalidProfileUpdate, ErrorStatusCode.BadRequest_400)

		return this.queryRepository.mapDbUserToOutUser(result.user)
	}

	private isValidProfileUpdate({ gender, avatarPresetId, preferences }: UpdateUserProfileInput): boolean {
		const generateSceneImage = preferences?.[GENERATE_SCENE_IMAGE]
		const hasChanges = gender !== undefined || avatarPresetId !== undefined || generateSceneImage !== undefined

		return (
			hasChanges &&
			this.isValidGender(gender) &&
			this.isValidAvatarPresetId(avatarPresetId) &&
			this.isValidSceneImagePreference(generateSceneImage)
		)
	}

	private isValidGender(gender: unknown): boolean {
		return gender === undefined || gender === 'MALE' || gender === 'FEMALE'
	}

	private isValidAvatarPresetId(avatarPresetId: unknown): boolean {
		return avatarPresetId === undefined || avatarPresetId === null || typeof avatarPresetId === 'string'
	}

	private isValidSceneImagePreference(generateSceneImage: unknown): boolean {
		return generateSceneImage === undefined || typeof generateSceneImage === 'boolean'
	}
}
