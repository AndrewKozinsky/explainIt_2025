import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { type UserProfileUpdate, UserRepository } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import type { UserGender } from 'prisma/generated/client'
import { getAvatarPreset } from './avatarPresets'

type UpdateUserProfileInput = { gender?: UserGender; avatarPresetId?: string | null }

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
		const { gender, avatarPresetId } = command.input

		if (
			(gender === undefined && avatarPresetId === undefined) ||
			(gender !== undefined && gender !== 'MALE' && gender !== 'FEMALE') ||
			(avatarPresetId !== undefined && avatarPresetId !== null && typeof avatarPresetId !== 'string')
		)
			throw new CustomError(errorMessage.user.invalidProfileUpdate, ErrorStatusCode.BadRequest_400)

		const data: UserProfileUpdate = {}
		if (gender !== undefined) data.gender = gender

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
}
