import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { UserQueryRepository } from '../../repo/user.queryRepository'
import { UserRepository } from '../../repo/user.repository'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'

export class CreateUserInputModel {
	email: string
	password?: string
	isUserConfirmed?: boolean
}

export class CreateUserCommand implements ICommand {
	constructor(public createUserInput: CreateUserInputModel) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
		private emailAdapter: EmailAdapterService,
	) {}

	async execute(command: CreateUserCommand) {
		const { createUserInput } = command

		const existingUser = await this.userRepository.getUserByEmail(createUserInput.email)

		if (existingUser) {
			// If a user has already registered with OAuth...
			if (!existingUser.password && !existingUser.isEmailConfirmed) {
				// Set new email verification code...
				const confirmationCode = await this.userRepository.setNewEmailVerifiedCode(existingUser.id)

				// Send email confirmation message
				await this.emailAdapter.sendEmailConfirmationMessage(existingUser.email, confirmationCode)
				return await this.userQueryRepository.getUserById(existingUser.id)
			}

			// If a user has already registered with email and password...
			const errMessage = existingUser.isEmailConfirmed
				? errorMessage.emailIsAlreadyRegistered
				: errorMessage.emailIsNotConfirmed

			throw new CustomGraphQLError(errMessage, ErrorCode.BadRequest_400)
		}

		// User does not exist, create a new one
		const createdUser = await this.userRepository.createUser(createUserInput)

		const newUser = await this.userQueryRepository.getUserById(createdUser.id)
		if (!newUser) {
			// Add logger here!!!
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		await this.emailAdapter.sendEmailConfirmationMessage(createdUser.email, createdUser.emailConfirmationCode!)

		return newUser
	}
}
