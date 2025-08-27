import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookQueryRepository } from '../../src/repo/book.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookUtils } from '../utils/bookUtils'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Get user books', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let bookQueryRepository: BookQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		bookQueryRepository = await app.resolve(BookQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { query, variables } = queries.book.create({ author: null, name: null, note: null })
		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: query,
			queryVariables: variables,
		})
	})

	it('should return 2 user books', async () => {
		// Create a user with confirmed email
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Create the first book
		const firstBookConfig = {
			author: 'Gerald Durrell',
			name: 'My Family and Other Animals',
			note: 'My note',
		}

		const secondBookConfig = {
			author: 'Gerald Durrell 2',
			name: 'My Family and Other Animals 2',
			note: null,
		}

		const defaultBookChapterConfig = {
			name: null,
			header: null,
			note: null,
		}

		await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: firstBookConfig,
		})

		// Get user's books
		let userBooksResp = await bookUtils.getUserBooks({ app, sessionToken })
		let userBooks = userBooksResp.data[RouteNames.BOOK.GET_USER_BOOKS]

		// Check the returning object
		expect(userBooks.length).toBe(1)
		bookUtils.checkBookOutResp(userBooks[0])

		// Check that the user has only one book in the database
		let userBooksFromDb = await bookQueryRepository.getUserBooks(loginData.id)
		expect(userBooksFromDb.length).toBe(1)

		// Create the second book
		await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: secondBookConfig,
		})

		// Get user's books
		userBooksResp = await bookUtils.getUserBooks({ app, sessionToken })
		userBooks = userBooksResp.data[RouteNames.BOOK.GET_USER_BOOKS]

		// Check the returning object
		expect(userBooks.length).toBe(2)
		bookUtils.checkBookOutResp(userBooks[0], { ...firstBookConfig, chapters: [defaultBookChapterConfig] })
		bookUtils.checkBookOutResp(userBooks[1], { ...secondBookConfig, chapters: [defaultBookChapterConfig] })

		// Check that the user has two books in the database
		userBooksFromDb = await bookQueryRepository.getUserBooks(loginData.id)
		expect(userBooksFromDb.length).toBe(2)
	})
})
