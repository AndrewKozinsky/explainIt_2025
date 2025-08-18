import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { UserRepository } from '../../repo/user.repository'

export class ConfirmEmailInput {
	code: string
}

export class ConfirmEmailCommand implements ICommand {
	constructor(public createAdminInput: ConfirmEmailInput) {}
}

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	constructor(private userRepository: UserRepository) {}

	async execute(command: ConfirmEmailCommand) {
		const { createAdminInput } = command

		const user = await this.userRepository.getUserByConfirmationCode(createAdminInput.code)

		// Throw an error if user is not found or he registered with OAuth or confirmation code not found
		if (!user || !user.password || !user.emailConfirmationCode) {
			throw new CustomGraphQLError(errorMessage.emailConfirmationCodeNotFound, ErrorCode.BadRequest_400)
		}

		if (new Date(user.confirmationCodeExpirationDate!) <= new Date()) {
			throw new CustomGraphQLError(errorMessage.emailConfirmationCodeIsExpired, ErrorCode.BadRequest_400)
		}

		try {
			await this.userRepository.makeEmailVerified(user.id)
			return true
		} catch (error: unknown) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}
	}
}
