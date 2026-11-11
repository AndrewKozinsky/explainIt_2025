import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { Language } from 'utils/languages'
import { AuthEmailService } from 'infrastructure/emails/authEmail.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

type CreateUserWithEmailAndPasswordInput = {
	email: string
	password: string
}

export class CreateUserWithEmailAndPasswordCommand implements ICommand {
	/**
	 * @param createUserInput почта и пароль нового пользователя.
	 * @param locale язык интерфейса, на котором отправляется письмо подтверждения почты.
	 */
	constructor(
		public createUserInput: CreateUserWithEmailAndPasswordInput,
		public locale: Language,
	) {}
}

@CommandHandler(CreateUserWithEmailAndPasswordCommand)
export class CreateUserWithEmailAndPasswordHandler implements ICommandHandler<CreateUserWithEmailAndPasswordCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
		private authEmail: AuthEmailService,
	) {}

	async execute(command: CreateUserWithEmailAndPasswordCommand) {
		const { createUserInput, locale } = command

		const existingUser = await this.userRepository.getUserByEmail(createUserInput.email)

		if (existingUser) {
			if (existingUser.password) {
				// If a user has already registered with email and password...
				const errMessage = existingUser.isEmailConfirmed
					? errorMessage.email.isAlreadyRegistered
					: errorMessage.email.isNotConfirmed

				throw new CustomError(errMessage, ErrorStatusCode.BadRequest_400)
			} else if (!existingUser.isEmailConfirmed) {
				// Set new email verification code...
				const emailVerificationCode = await this.userRepository.setNewEmailVerifiedCode(existingUser.id)

				// Set new password...
				await this.userRepository.setPassword(existingUser.id, createUserInput.password)

				// Send an email confirmation message
				await this.authEmail.sendEmailConfirmation({
					email: existingUser.email,
					confirmationCode: emailVerificationCode,
					locale,
				})
				return await this.userQueryRepository.getUserById(existingUser.id)
			}
		}

		// User does not exist, create a new one
		const createdUser = await this.userRepository.createUserByEmailAndPassword(createUserInput)

		await this.userRepository.updateUser(createdUser.id, { balance: 500 })

		const newUser = await this.userQueryRepository.getUserById(createdUser.id)
		if (!newUser) {
			// Add logger here!!!
			throw new CustomError(errorMessage.unknownDbError, ErrorStatusCode.InternalServerError_500)
		}

		this.authEmail.sendEmailConfirmation({
			email: createdUser.email,
			confirmationCode: createdUser.emailConfirmationCode!,
			locale,
		})

		return newUser
	}
}
