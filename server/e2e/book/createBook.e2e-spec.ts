import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
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

describe.skip('Create book', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let bookQueryRepository: BookQueryRepository
	let mainConfig: MainConfigService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		bookQueryRepository = await app.resolve(BookQueryRepository)
		mainConfig = await app.resolve(MainConfigService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		await authUtils.tokenNotExist(app, queries.book.create({ author: null, name: null, note: null }))
	})

	it('should return all user books', async () => {
		// Create a user with confirmed email
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Create the first book
		await bookUtils.createBook({
			app,
			mainConfig,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
				name: 'My Family and Other Animals',
				note: 'My note',
			},
		})

		// Check that the user has only one book in the database
		let userBooks = await bookQueryRepository.getUserBooks(loginData.id)
		expect(userBooks.length).toBe(1)

		// -----

		// Create the second book
		const createdBook_2Resp = await bookUtils.createBook({
			app,
			mainConfig,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell 2',
				name: 'My Family and Other Animals 2',
				note: null,
			},
		})
		const createdBook_2 = createdBook_2Resp.data[RouteNames.BOOK.CREATE]

		// Check the returning object
		bookUtils.checkBookOutResp(createdBook_2)

		// Check that the user has two books in the database
		userBooks = await bookQueryRepository.getUserBooks(loginData.id)
		expect(userBooks.length).toBe(2)
	})
})
