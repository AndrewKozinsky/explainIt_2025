import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { CleanupUserAvatars } from './CleanupUserAvatars.service'

export class DeleteUserAvatarCommand implements ICommand {
	constructor(public userId: number) {}
}

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler implements ICommandHandler<DeleteUserAvatarCommand> {
	constructor(
		private readonly repository: UserRepository,
		private readonly queryRepository: UserQueryRepository,
		private readonly cleanup: CleanupUserAvatars,
	) {}

	async execute(command: DeleteUserAvatarCommand) {
		const result = await this.repository.updateProfile(command.userId, { avatar_s3_key: null })
		if (!result) {
			throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.NotFound_404)
		}

		await this.cleanup.cleanupReplacedPhoto(result.previousAvatarKey)

		return this.queryRepository.mapDbUserToOutUser(result.user)
	}
}
