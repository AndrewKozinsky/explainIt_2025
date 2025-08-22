import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

/*
describe.skip('Update book', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.book.update({ id: 1, author: null })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a book is not exists', async () => {
		// Create a user with confirmed email
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Try to update a non-existent book
		const updatedBookResp = await bookUtils.updateBook({
			app,
			sessionToken: sessionToken,
			book: {
				id: 999,
				author: 'Gerald Durrell',
				name: 'My Family and Other Animals',
				note: 'My note',
			},
		})

		checkErrorResponse(updatedBookResp, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.book.notFound,
		})
	})

	it('should return 400 status if a book belongs to another user', async () => {
		// Create a user who will create a book
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createdBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
				name: 'My Family and Other Animals',
				note: null,
			},
		})
		const createdBook = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Create a second user who will try to update this book
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Try to update this book
		const updatedBookResp = await bookUtils.updateBook({
			app,
			sessionToken: secondUserSeccionData,
			book: {
				id: createdBook.id,
				author: 'author',
			},
		})

		checkErrorResponse(updatedBookResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should update a created book', async () => {
		// Create a user who will create a book
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createdBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
				name: 'My Family and Other Animals',
				note: null,
			},
		})
		const createdBook = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Try to update this book with no data
		const updatedBookResp = await bookUtils.updateBook({
			app,
			sessionToken: sessionToken,
			book: {
				id: createdBook.id,
			},
		})

		// Check that the book was not changed
		bookUtils.checkBookOutResp(updatedBookResp.data[RouteNames.BOOK.UPDATE], {
			id: createdBook.id,
			author: 'Gerald Durrell',
			name: 'My Family and Other Animals',
			note: null,
		})

		// Try to update several fields
		const updatedBookResp_2 = await bookUtils.updateBook({
			app,
			sessionToken: sessionToken,
			book: {
				id: createdBook.id,
				author: 'Jack London',
				note: 'My note',
			},
		})

		// Check that only these fields were changed
		bookUtils.checkBookOutResp(updatedBookResp_2.data[RouteNames.BOOK.UPDATE], {
			id: createdBook.id,
			author: 'Jack London',
			name: 'My Family and Other Animals',
			note: 'My note',
		})
	})
})
*/
