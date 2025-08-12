import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { MainConfigService } from '../../infrastructure/mainConfig/mainConfig.service'
import { BalanceTransactionRepository } from '../../repo/balanceTransaction.repository'
import { UserQueryRepository } from '../../repo/user.queryRepository'
import { UserRepository } from '../../repo/user.repository'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'

export class CreateUserWithEmailInputModel {
	email: string
}

export class CreateUserWithEmailCommand implements ICommand {
	constructor(public createUserInput: CreateUserWithEmailInputModel) {}
}

@CommandHandler(CreateUserWithEmailCommand)
export class CreateUserWithEmailHandler implements ICommandHandler<CreateUserWithEmailCommand> {
	constructor(
		private userRepository: UserRepository,
		private userQueryRepository: UserQueryRepository,
		private mainConfigService: MainConfigService,
		private balanceTransactionRepository: BalanceTransactionRepository,
	) {}

	async execute(command: CreateUserWithEmailCommand) {
		const { email } = command.createUserInput

		const existingUser = await this.userRepository.getUserByEmail(email)

		if (existingUser) {
			if (existingUser.isUserConfirmed) {
				throw new CustomGraphQLError(errorMessage.emailIsAlreadyRegistered, ErrorCode.BadRequest_400)
			}

			await this.userRepository.updateUser(existingUser.id, { is_user_confirmed: true })
			await this.addWelcomeBonus(existingUser.id)

			return await this.userQueryRepository.getUserByEmail(email)
		}

		// User does not exist, create a new one
		const createdUser = await this.userRepository.createUserByEmail(email)
		if (!createdUser) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		await this.addWelcomeBonus(createdUser.id)

		const newUser = await this.userQueryRepository.getUserById(createdUser.id)
		if (!newUser) {
			// Add logger here!!!
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return newUser
	}

	async addWelcomeBonus(userId: number) {
		const { welcomeBonus } = this.mainConfigService.get()

		await this.balanceTransactionRepository.createTransaction({
			userId,
			amount: welcomeBonus,
			type: 'ACCOUNT_CONFIRMATION_WELCOME_BONUS',
		})
	}
}
