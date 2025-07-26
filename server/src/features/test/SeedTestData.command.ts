import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from 'src/repo/user.repository'
import { ConfirmEmailCommand } from '../auth/ConfirmEmail.command'
import { CreateUserCommand } from '../auth/CreateUser.command'
import { serverTestDataConfig } from './serverTestDataConfig'

export class SeedTestDataCommand {
	constructor() {}
}

@CommandHandler(SeedTestDataCommand)
export class SeedTestDataHandler implements ICommandHandler<SeedTestDataCommand> {
	constructor(
		private userRepository: UserRepository,
		private commandBus: CommandBus,
	) {}

	async execute() {
		// Create test users and set id into each user in usersConfig
		await this.seedUsers()
	}

	async seedUsers() {
		// Create test users
		const usersConfig = serverTestDataConfig.getUsersConfig()

		for (let userKey in usersConfig) {
			const userConfig = usersConfig[userKey]

			let createdUser = userConfig.confirmed
				? await this.createUserWithConfirmedEmail(userConfig)
				: await this.createUserWithUnconfirmedEmail(userConfig)

			if (!createdUser) {
				throw new Error('User was not created')
			}

			userConfig.id = createdUser.id
		}

		return usersConfig
	}

	async createUserWithUnconfirmedEmail(props: { email: string; password: string }) {
		const createdUser = await this.commandBus.execute(new CreateUserCommand(props))

		return await this.userRepository.getUserById(createdUser.id)
	}

	async createUserWithConfirmedEmail(props: { email: string; password: string }) {
		const createdUser = await this.createUserWithUnconfirmedEmail(props)
		if (!createdUser) {
			throw new Error('A user was not created')
		}

		const { emailConfirmationCode } = createdUser
		if (!emailConfirmationCode) {
			throw new Error('Email confirmationCode not found')
		}

		await this.commandBus.execute(new ConfirmEmailCommand({ code: emailConfirmationCode }))

		return createdUser
	}
}
