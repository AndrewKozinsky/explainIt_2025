import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from 'repo/user.repository'
import { AuthEmailService } from 'infrastructure/emails/authEmail.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { Language } from 'utils/languages'

export class ResendConfirmationEmailCommand {
	/**
	 * @param email почта, на которую повторно отправляется письмо подтверждения.
	 * @param locale язык интерфейса, на котором отправляется письмо.
	 */
	constructor(
		public readonly email: string,
		public readonly locale: Language,
	) {}
}

@CommandHandler(ResendConfirmationEmailCommand)
export class ResendConfirmationEmailHandler implements ICommandHandler<ResendConfirmationEmailCommand> {
	constructor(
		private userRepository: UserRepository,
		private authEmail: AuthEmailService,
	) {}

	async execute(command: ResendConfirmationEmailCommand) {
		const { email, locale } = command

		const user = await this.userRepository.getUserByEmail(email)

		// Throw an error if user is not found or he registered with OAuth
		if (!user || !user.password) {
			throw new CustomError(errorMessage.email.notFound, ErrorStatusCode.BadRequest_400)
		}

		if (user.isEmailConfirmed) {
			throw new CustomError(errorMessage.email.isAlreadyConfirmed, ErrorStatusCode.BadRequest_400)
		}

		const confirmationCode = await this.userRepository.setNewEmailVerifiedCode(user.id)

		this.authEmail.sendEmailConfirmation({ email, confirmationCode, locale })

		return true
	}
}
