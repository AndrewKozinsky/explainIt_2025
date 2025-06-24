import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
// import { EmailAdapterService } from '../../infrastructure/emailAdapter/email-adapter.service'
import {UserOutModel} from '../../models/user/user.out.model'
import {UserRepository} from '../../repo/user.repository'
// import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
// import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
// import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
// import { CreateSenderInputModel } from '../../models/auth/auth.input.model'
// import { SenderOutModel } from '../../models/sender/sender.out.model'
// import { SenderQueryRepository } from '../../repo/sender.queryRepository'
// import { SenderRepository } from '../../repo/sender.repository'
import {RegisterUserInput} from '../../routes/auth/inputs/registerUser.input'

export class CreateUserCommand implements ICommand {
	constructor(public createUserInput: RegisterUserInput) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		private userRepository: UserRepository,
		// private userQueryRepository: UserQueryRepository,
		// private emailAdapter: EmailAdapterService,
	) {}

	async execute(command: CreateUserCommand) {
		/*const { createUserInput } = command

		const existingUser = await this.userRepository.getUserByEmail(createUserInput.email)

		if (existingUser) {
			const errMessage = existingUser.isEmailConfirmed
				? errorMessage.emailIsAlreadyRegistered
				: errorMessage.emailIsNotConfirmed

			throw new CustomGraphQLError(errMessage, ErrorCode.BadRequest_400)
		}

		const createdUser = await this.userRepository.createUser(createUserInput, UserRole.User)
		await this.userRepository.createUser(createdUser.id)

		const newUser = await this.userQueryRepository.getUserByUserId(createdUser.id)
		if (!newUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		await this.emailAdapter.sendEmailConfirmationMessage(createdUser.email, createdUser.emailConfirmationCode!)

		return newUser*/
	}
}
