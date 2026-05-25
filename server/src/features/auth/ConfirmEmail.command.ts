import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

export type ConfirmEmailInput = {
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
			throw new CustomError(errorMessage.email.confirmationCodeNotFound, ErrorStatusCode.BadRequest_400)
		}

		if (new Date(user.confirmationCodeExpirationDate!) <= new Date()) {
			throw new CustomError(errorMessage.email.confirmationCodeIsExpired, ErrorStatusCode.BadRequest_400)
		}

		try {
			await this.userRepository.makeEmailVerified(user.id)
			return true
		} catch (error: unknown) {
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}
	}
}
