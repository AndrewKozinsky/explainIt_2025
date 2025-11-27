import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { welcomeBonusInRUR } from '../utils/common'
import { bookUtils } from '../../e2e/utils/bookUtils'
import { BookPrivateQueryRepository } from 'server/src/repo/bookPrivate.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import {
	UserBookConfig,
	UserRegisteredWithCredentialsAndOAuthConfig,
	UserRegisteredWithCredentialsConfig,
	UserRegisteredWithOAuthConfig,
	UserWithUnconfirmedEmailConfig,
} from '../../src/features/db/serverTestDataConfig'
import { App } from 'supertest/types'
import { createApp } from '../utils/createApp'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'

describe.skip('Check that test user were created correctly (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookQueryRepository: BookPrivateQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookQueryRepository = await app.resolve(BookPrivateQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('test', () => {
		expect(true).toBe(true)
	})

	/*it('creates test users', async () => {
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
				await checkUserWithOAuth({ userConfig, userRepository, bookQueryRepository })
			}
			if (userConfig.type === 'userRegisteredWithCredentialsAndOAuth') {
				await checkUserWithCredentialsAndOAuth({ userConfig, userRepository, bookQueryRepository })
			}
		}
	})*/
})

async function checkUserWithUnconfirmedEmail(props: {
	userConfig: UserWithUnconfirmedEmailConfig
	userRepository: UserRepository
	bookQueryRepository: BookPrivateQueryRepository
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
	bookQueryRepository: BookPrivateQueryRepository
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
	bookQueryRepository: BookPrivateQueryRepository
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

async function checkUserWithCredentialsAndOAuth(props: {
	userConfig: UserRegisteredWithCredentialsAndOAuthConfig
	userRepository: UserRepository
	bookQueryRepository: BookPrivateQueryRepository
}) {
	const { userConfig, userRepository, bookQueryRepository } = props

	const userFromDB = await userRepository.getUserByEmail(userConfig.email)

	expect(userFromDB.email).toBe(userConfig.email)
	expect(typeof userFromDB.password).toBe('string')
	expect(userFromDB.isUserConfirmed).toBe(true)
	expect(userFromDB.isEmailConfirmed).toBe(false)
	expect(typeof userFromDB.confirmationCodeExpirationDate).toBe('string')
	expect(userFromDB.balance).toBe(welcomeBonusInRUR * 100)

	await checkUserBooks({ userId: userConfig.id, booksConfig: userConfig.books, bookQueryRepository })
}

async function checkUserBooks(props: {
	userId: number
	booksConfig?: UserBookConfig[]
	bookQueryRepository: BookPrivateQueryRepository
}) {
	const { userId, booksConfig, bookQueryRepository } = props

	// Check that user has the default book
	const books = await bookQueryRepository.getUserBooks(userId)
	if (!books.length) {
		throw new Error('User has no have at least default book')
	}
	bookUtils.checkForDefaultBook({ book: books[0], userId })

	// Check other books
	if (booksConfig?.length) {
		expect(books.length).toBe(booksConfig.length + 1)
	} else {
		expect(books.length).toBe(1)
	}
}
