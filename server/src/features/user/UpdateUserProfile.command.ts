import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository, type UserProfileUpdate } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import type { UserGender } from 'prisma/generated/client'
import { getAvatarPreset } from './avatarPresets'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'

type UpdateUserProfileInput = { gender?: UserGender; avatarPresetId?: string }

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
		private readonly cleanup: CleanupUserAvatars,
	) {}

	async execute(command: UpdateUserProfileCommand) {
		const { gender, avatarPresetId } = command.input

		if (
			(gender === undefined && avatarPresetId === undefined) ||
			(gender !== undefined && gender !== 'MALE' && gender !== 'FEMALE') ||
			(avatarPresetId !== undefined && typeof avatarPresetId !== 'string')
		)
			throw new CustomError(errorMessage.user.invalidProfileUpdate, ErrorStatusCode.BadRequest_400)

		const data: UserProfileUpdate = {}
		if (gender !== undefined) data.gender = gender

		if (avatarPresetId !== undefined) {
			const preset = getAvatarPreset(avatarPresetId)
			if (!preset) throw new CustomError(errorMessage.user.invalidAvatarPreset, ErrorStatusCode.BadRequest_400)
			data.gender = preset.gender
			data.avatar_preset_id = preset.id
			data.avatar_s3_key = null
		}

		const result = await this.repository.updateProfile(command.userId, data)
		if (!result) throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)
		if (avatarPresetId !== undefined) await this.cleanup.cleanupReplacedPhoto(result.previousAvatarKey)

		return this.queryRepository.mapDbUserToOutUser(result.user)
	}
}
