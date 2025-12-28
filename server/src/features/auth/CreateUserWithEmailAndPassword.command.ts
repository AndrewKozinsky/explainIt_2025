import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { EmailAdapterService } from 'infrastructure/emailAdapter/email-adapter.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

type CreateUserWithEmailAndPasswordInput = {
	email: string
	password: string
}

export class CreateUserWithEmailAndPasswordCommand implements ICommand {
	constructor(public createUserInput: CreateUserWithEmailAndPasswordInput) {}
}

@CommandHandler(CreateUserWithEmailAndPasswordCommand)
export class CreateUserWithEmailAndPasswordHandler implements ICommandHandler<CreateUserWithEmailAndPasswordCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
		private emailAdapter: EmailAdapterService,
	) {}

	async execute(command: CreateUserWithEmailAndPasswordCommand) {
		const { createUserInput } = command

		const existingUser = await this.userRepository.getUserByEmail(createUserInput.email)

		if (existingUser) {
			if (existingUser.password) {
				// If a user has already registered with email and password...
				const errMessage = existingUser.isEmailConfirmed
					? errorMessage.emailIsAlreadyRegistered
					: errorMessage.emailIsNotConfirmed

				throw new CustomGraphQLError(errMessage, ErrorCode.BadRequest_400)
			} else if (!existingUser.isEmailConfirmed) {
				// Set new email verification code...
				const emailVerificationCode = await this.userRepository.setNewEmailVerifiedCode(existingUser.id)

				// Set new password...
				await this.userRepository.setPassword(existingUser.id, createUserInput.password)

				// Send an email confirmation message
				await this.emailAdapter.sendEmailConfirmationMessage(existingUser.email, emailVerificationCode)
				return await this.userQueryRepository.getUserById(existingUser.id)
			}
		}

		// User does not exist, create a new one
		const createdUser = await this.userRepository.createUserByEmailAndPassword(createUserInput)

		const newUser = await this.userQueryRepository.getUserById(createdUser.id)
		if (!newUser) {
			// Add logger here!!!
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		this.emailAdapter.sendEmailConfirmationMessage(createdUser.email, createdUser.emailConfirmationCode!)

		return newUser
	}
}
