import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { welcomeBonusInRUR } from '../utils/common'
import { bookUtils } from '../../e2e/utils/bookUtils'
import { BookQueryRepository } from '../../src/repo/book.queryRepository'
import { BookRepository } from '../../src/repo/book.repository'
import { UserRepository } from '../../src/repo/user.repository'
import {
	serverTestDataConfig,
	UserBookConfig,
	UserRegisteredWithCredentialsConfig,
	UserRegisteredWithOAuthConfig,
	UserWithUnconfirmedEmailConfig,
} from '../../src/features/db/serverTestDataConfig'
import { App } from 'supertest/types'
import { createApp } from '../utils/createApp'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'

describe('Check that test user were created correctly (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookRepository: BookRepository
	let bookQueryRepository: BookQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookRepository = await app.resolve(BookRepository)
		bookQueryRepository = await app.resolve(BookQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('creates test users', async () => {
		const usersConfig = serverTestDataConfig.getUsersConfig()

		for (let userConfigKey in usersConfig) {
			const userConfig = usersConfig[userConfigKey]

			if (userConfig.type === 'userWithUnconfirmedEmail') {
				await checkUserWithUnconfirmedEmail({ userConfig, userRepository, bookQueryRepository })
			}
			if (userConfig.type === 'userRegisteredWithCredentials') {
				await checkUserWithConfirmedEmail({ userConfig, userRepository, bookQueryRepository })
			}
			if (userConfig.type === 'userRegisteredWithOAuth') {
				// await checkUserWithOAuth({ userConfig, userRepository, bookQueryRepository })
			}
			if (userConfig.type === 'userRegisteredWithCredentialsAndOAuth') {
				// await checkUserWithCredentialsAndOAuth({ userConfig, userRepository })
			}

			/*if (userConfig.books) {
				await this.createUserBooks(createdUserId, userConfig.books)
			}*/
		}
	})
})

async function checkUserWithUnconfirmedEmail(props: {
	userConfig: UserWithUnconfirmedEmailConfig
	userRepository: UserRepository
	bookQueryRepository: BookQueryRepository
}) {
	const { userConfig, userRepository, bookQueryRepository } = props

	const userFromDB = await userRepository.getUserByEmail(userConfig.email)

	expect(userFromDB.email).toBe(userConfig.email)
	expect(typeof userFromDB.password).toBe('string')
	expect(userFromDB.isUserConfirmed).toBe(false)
	expect(userFromDB.isEmailConfirmed).toBe(false)
	expect(typeof userFromDB.emailConfirmationCode).toBe('string')
	expect(typeof userFromDB.confirmationCodeExpirationDate).toBe('string')
	expect(userFromDB.balance).toBe(0)

	// Check books
	const books = await bookQueryRepository.getUserBooks(userConfig.id)
	expect(books.length).toBe(1)

	bookUtils.checkForDefaultBook({ book: books[0], userId: userConfig.id })
}

async function checkUserWithConfirmedEmail(props: {
	userConfig: UserRegisteredWithCredentialsConfig
	userRepository: UserRepository
	bookQueryRepository: BookQueryRepository
}) {
	const { userConfig, userRepository, bookQueryRepository } = props

	const userFromDB = await userRepository.getUserByEmail(userConfig.email)

	expect(userFromDB.email).toBe(userConfig.email)
	expect(typeof userFromDB.password).toBe('string')
	expect(userFromDB.isUserConfirmed).toBe(false)
	expect(userFromDB.isEmailConfirmed).toBe(true)
	expect(userFromDB.confirmationCodeExpirationDate).toBe(null)
	expect(userFromDB.balance).toBe(0)

	await checkUserBooks({ userId: userConfig.id, booksConfig: userConfig.books, bookQueryRepository })
}

async function checkUserWithOAuth(props: {
	userConfig: UserRegisteredWithOAuthConfig
	userRepository: UserRepository
	bookQueryRepository: BookQueryRepository
}) {
	const { userConfig, userRepository, bookQueryRepository } = props

	const userFromDB = await userRepository.getUserByEmail(userConfig.email)

	expect(userFromDB.email).toBe(userConfig.email)
	expect(userFromDB.password).toBe(null)
	expect(userFromDB.isUserConfirmed).toBe(true)
	expect(userFromDB.isEmailConfirmed).toBe(false)
	expect(userFromDB.confirmationCodeExpirationDate).toBe(null)
	expect(userFromDB.balance).toBe(welcomeBonusInRUR * 100)

	await checkUserBooks({ userId: userConfig.id, booksConfig: userConfig.books, bookQueryRepository })
}

async function checkUserBooks(props: {
	userId: number
	booksConfig?: UserBookConfig[]
	bookQueryRepository: BookQueryRepository
}) {
	const { userId, booksConfig, bookQueryRepository } = props

	// Check that user has the default book
	const books = await bookQueryRepository.getUserBooks(userId)
	console.log(books)
	bookUtils.checkForDefaultBook({ book: books[0], userId })

	// Check other books
	if (booksConfig.length) {
		// expect(books.length).toBe(books.length + 1)
	}
}
