import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { UserRepository } from 'src/repo/user.repository'

export class ResendConfirmationEmailCommand {
	constructor(public readonly email: string) {}
}

@CommandHandler(ResendConfirmationEmailCommand)
export class ResendConfirmationEmailHandler implements ICommandHandler<ResendConfirmationEmailCommand> {
	constructor(
		private userRepository: UserRepository,
		private emailAdapter: EmailAdapterService,
	) {}

	async execute(command: ResendConfirmationEmailCommand) {
		const { email } = command

		const user = await this.userRepository.getUserByEmail(email)

		// Throw an error if user is not found or he registered with OAuth
		if (!user || !user.password) {
			throw new CustomGraphQLError(errorMessage.emailNotFound, ErrorCode.BadRequest_400)
		}

		if (user.isEmailConfirmed) {
			throw new CustomGraphQLError(errorMessage.emailIsAlreadyConfirmed, ErrorCode.BadRequest_400)
		}

		const confirmationCode = await this.userRepository.setNewEmailVerifiedCode(user.id)

		this.emailAdapter.sendEmailConfirmationMessage(email, confirmationCode)

		return true
	}
}
