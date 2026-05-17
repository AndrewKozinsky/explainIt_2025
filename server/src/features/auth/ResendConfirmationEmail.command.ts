import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from 'repo/user.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { EmailAdapterService } from 'infrastructure/emailAdapter/email-adapter.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

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
			throw new CustomError(errorMessage.email.notFound, ErrorStatusCode.BadRequest_400)
		}

		if (user.isEmailConfirmed) {
			throw new CustomError(errorMessage.email.isAlreadyConfirmed, ErrorStatusCode.BadRequest_400)
		}

		const confirmationCode = await this.userRepository.setNewEmailVerifiedCode(user.id)

		this.emailAdapter.sendEmailConfirmationMessage(email, confirmationCode)

		return true
	}
}
