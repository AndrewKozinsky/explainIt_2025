import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateBookCommand } from 'features/book/CreateBook.command'
import { CreateBookChapterCommand } from 'features/bookChapter/CreateBookChapter.command'
import { UserRepository } from 'src/repo/user.repository'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'
import { ConfirmEmailCommand } from '../auth/ConfirmEmail.command'
import { CreateUserWithEmailAndPasswordCommand } from '../auth/CreateUserWithEmailAndPassword.command'
import { LoginWithOAuthCommand } from '../auth/LoginWithOAuth.command'
import { Request } from 'express'
import {
	serverTestDataConfig,
	UserBookConfig,
	UserRegisteredWithCredentialsAndOAuthConfig,
	UserRegisteredWithCredentialsConfig,
	UserRegisteredWithOAuthConfig,
	UserWithUnconfirmedEmailConfig,
} from './serverTestDataConfig'

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

			let createdUserId: null | number = null

			if (userConfig.type === 'userWithUnconfirmedEmail') {
				createdUserId = await this.createUserWithUnconfirmedEmail(userConfig)
			}
			if (userConfig.type === 'userRegisteredWithCredentials') {
				createdUserId = await this.createUserWithConfirmedEmail(userConfig)
			}
			if (userConfig.type === 'userRegisteredWithOAuth') {
				createdUserId = await this.createUserWithOAuth(userConfig)
			}
			if (userConfig.type === 'userRegisteredWithCredentialsAndOAuth') {
				createdUserId = await this.createUserWithCredentialsAndOAuth(userConfig)
			}

			if (!createdUserId) {
				throw new Error('User was not created')
			}

			userConfig.id = createdUserId

			if (userConfig.books) {
				await this.createUserBooks(createdUserId, userConfig.books)
			}
		}

		return usersConfig
	}

	async createUserWithUnconfirmedEmail(userConfig: UserWithUnconfirmedEmailConfig) {
		const createdUser = await this.commandBus.execute(new CreateUserWithEmailAndPasswordCommand(userConfig))
		return createdUser.id
	}

	async createUserWithConfirmedEmail(userConfig: UserRegisteredWithCredentialsConfig) {
		const createdUser = await this.commandBus.execute(new CreateUserWithEmailAndPasswordCommand(userConfig))
		if (!createdUser) return null

		const user = await this.userRepository.getUserById(createdUser.id)
		if (!user) return null

		const { emailConfirmationCode } = user
		if (!emailConfirmationCode) {
			throw new Error('Email confirmationCode not found')
		}

		await this.commandBus.execute(new ConfirmEmailCommand({ code: emailConfirmationCode }))

		return user.id
	}

	async createUserWithOAuth(userConfig: UserRegisteredWithOAuthConfig) {
		const createdUser = await this.commandBus.execute(
			new LoginWithOAuthCommand({
				request: this.getFakeRequest(),
				loginWithOAuthInput: { code: 'code', providerType: OAuthProviderType.YANDEX },
				clientIP: 'clientIP',
				clientName: 'clientName',
				overrideDataFromProvider: {
					email: userConfig.email,
					name: 'user name',
				},
			}),
		)

		return createdUser?.id
	}

	async createUserWithCredentialsAndOAuth(userConfig: UserRegisteredWithCredentialsAndOAuthConfig) {
		const createdUser = await this.commandBus.execute(new CreateUserWithEmailAndPasswordCommand(userConfig))

		await this.commandBus.execute(
			new LoginWithOAuthCommand({
				request: this.getFakeRequest(),
				loginWithOAuthInput: { code: 'code', providerType: OAuthProviderType.YANDEX },
				clientIP: 'clientIP',
				clientName: 'clientName',
				overrideDataFromProvider: {
					email: userConfig.email,
					name: 'user name',
				},
			}),
		)

		return createdUser?.id
	}

	async createUserBooks(userId: number, booksConfig: UserBookConfig[]) {
		for (const bookConfig of booksConfig) {
			const createdBook = await this.commandBus.execute(new CreateBookCommand(userId, bookConfig))
			bookConfig.id = createdBook.id

			if (!bookConfig.chapters) return

			for (const chapterConfig of bookConfig.chapters) {
				const createdChapter = await this.commandBus.execute(
					new CreateBookChapterCommand(userId, { bookId: bookConfig.id!, ...chapterConfig }),
				)
				chapterConfig.id = createdChapter.id
			}
		}
	}

	getFakeRequest() {
		return {
			session: {
				userId: null,
				clientIP: null,
				clientName: null,
				save: (callback: (err?: any) => void) => callback(null),
			},
		} as any as Request
	}
}
