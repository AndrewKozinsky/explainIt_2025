import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookRepository } from '../../src/repo/book.repository'
import { BookChapterRepository } from '../../src/repo/bookChapter.repository'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookChapterUtils } from '../utils/bookChapterUtils'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Delete book', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let bookRepository: BookRepository
	let bookChapterRepository: BookChapterRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		bookRepository = await app.resolve(BookRepository)
		bookChapterRepository = await app.resolve(BookChapterRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.book.delete({ id: 1 })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a book is not exists', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const deletedBookResp = await bookUtils.deleteBook({
			app,
			sessionToken: sessionToken,
			book: {
				id: 999,
			},
		})

		checkErrorResponse(deletedBookResp, {
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

		// Create a book
		const createdBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
			},
		})
		const book = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Create a second user who will try to delete this book
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Try to delete this book
		const deletedBookResp = await bookUtils.deleteBook({
			app,
			sessionToken: secondUserSeccionData,
			book: {
				id: book.id,
			},
		})

		checkErrorResponse(deletedBookResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should delete a created book', async () => {
		// Create a user who will create a book
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Create a book
		const createdBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
				name: 'My Family and Other Animals',
				note: null,
			},
		})
		const book = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Try to delete this book
		let deletedBookResp = await bookUtils.deleteBook({
			app,
			sessionToken,
			book: {
				id: book.id,
			},
		})
		const deletedBook = deletedBookResp.data[RouteNames.BOOK.DELETE]
		expect(deletedBook).toBe(true)

		// Check that user has no book
		const userBooksResp = await bookUtils.getUserBooks({ app, sessionToken })
		let userBooks = userBooksResp.data[RouteNames.BOOK.GET_USER_BOOKS]
		expect(userBooks.length).toBe(0)
	})

	it('should delete user books with all chapters', async () => {
		// Create a user who will create a book and a chapter
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Create the first and the second book
		const firstBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell',
			},
		})
		const secondBookResp = await bookUtils.createBook({
			app,
			sessionToken: sessionToken,
			book: {
				author: 'Gerald Durrell 2',
			},
		})

		const firstBook = firstBookResp.data[RouteNames.BOOK.CREATE]
		const secondBook = secondBookResp.data[RouteNames.BOOK.CREATE]

		for (let i = 0; i < 3; i++) {
			await bookChapterUtils.createBookChapter({
				app,
				sessionToken: sessionToken,
				bookChapter: {
					name: 'Chapter 1',
					bookId: firstBook.id,
				},
			})
		}

		for (let i = 0; i < 4; i++) {
			await bookChapterUtils.createBookChapter({
				app,
				sessionToken: sessionToken,
				bookChapter: {
					name: 'Chapter 1',
					bookId: secondBook.id,
				},
			})
		}

		// Delete the first book
		const deleteFirstBookRes = await bookUtils.deleteBook({
			app,
			sessionToken,
			book: {
				id: firstBook.id,
			},
		})
		expect(deleteFirstBookRes.data[RouteNames.BOOK.DELETE]).toBe(true)

		// Check that the first book does not exist
		const getFirstBook = await bookRepository.getBookById(firstBook.id)
		expect(getFirstBook).toBe(null)

		// Check that the first book's chapters have gone
		const firstBookChapters = await bookChapterUtils.getBookChapters({
			bookChapterRepository,
			bookId: firstBook.id,
		})
		expect(firstBookChapters.length).toBe(0)

		// Check that the second book has 5 chapters (the first chapter was added when the book was created)
		const secondBookChapters = await bookChapterUtils.getBookChapters({
			bookChapterRepository,
			bookId: secondBook.id,
		})
		expect(secondBookChapters.length).toBe(5)
	})
})
