import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import { UserQueryRepository } from '../../repo/user.queryRepository'
import { UserRepository } from '../../repo/user.repository'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { RegisterUserInput } from '../../routes/auth/inputs/registerUser.input'

export class CreateUserCommand implements ICommand {
	constructor(public createUserInput: RegisterUserInput) {}
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
			const errMessage = existingUser.isEmailConfirmed
				? errorMessage.emailIsAlreadyRegistered
				: errorMessage.emailIsNotConfirmed

			throw new CustomGraphQLError(errMessage, ErrorCode.BadRequest_400)
		}

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
