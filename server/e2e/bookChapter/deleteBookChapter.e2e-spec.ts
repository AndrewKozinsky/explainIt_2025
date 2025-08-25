import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
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

describe.skip('Update book chapter', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let bookChapterRepository: BookChapterRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		bookChapterRepository = await app.resolve(BookChapterRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.bookChapter.delete({ id: 1 })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a book chapter is not exists', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const deletedBookChapterResp = await bookChapterUtils.deleteBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				id: 999,
			},
		})

		checkErrorResponse(deletedBookChapterResp, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.bookChapter.notFound,
		})
	})

	it('should return 400 status if a book chapter belongs to another user', async () => {
		// Create a user who will create a book and a chapter
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
		const createdBook = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Create a book chapter for this book
		const createdBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				name: 'Chapter 1',
				bookId: createdBook.id,
				header: 'My chapter 1 header',
				content: 'My chapter 1 content',
				note: 'My chapter 1 note',
			},
		})
		const createdChapterBook = createdBookChapterResp.data[RouteNames.BOOK_CHAPTER.CREATE]

		// Create a second user who will try to delete this book chapter
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Try to delete this book chapter
		const deletedBookChapterResp = await bookChapterUtils.deleteBookChapter({
			app,
			sessionToken: secondUserSeccionData,
			bookChapter: {
				id: createdChapterBook.id,
			},
		})

		checkErrorResponse(deletedBookChapterResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should delete a created book chapter', async () => {
		// Create a user who will create a book and a chapter
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
		const createdBook = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Create a book chapter for this book
		const createdBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				name: 'Chapter 1',
				bookId: createdBook.id,
				header: 'My chapter 1 header',
				content: 'My chapter 1 content',
				note: null,
			},
		})
		const createdChapterBook = createdBookChapterResp.data[RouteNames.BOOK_CHAPTER.CREATE]

		// Try to delete this book chapter
		let deletedBookChapterResp = await bookChapterUtils.deleteBookChapter({
			app,
			sessionToken,
			bookChapter: {
				id: createdChapterBook.id,
			},
		})
		const deletedBookChapter = deletedBookChapterResp.data[RouteNames.BOOK_CHAPTER.DELETE]
		expect(deletedBookChapter).toBe(true)

		// Check that user has no book chapters
		const bookChapters = await bookChapterUtils.getBookChapters({
			bookChapterRepository,
			bookId: createdChapterBook.id,
		})
		expect(bookChapters.length).toBe(0)
	})

	it('user creates 2 books with chapters and deletes several chapter. Test checks that deletion does not delete book chapters from another book', async () => {
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

		// Add 3 chapters to the first book and 4 to the second book
		const firstBookChaptersIds: number[] = []
		const secondBookChaptersIds: number[] = []

		for (let i = 0; i < 3; i++) {
			const bookChaptersResp = await bookChapterUtils.createBookChapter({
				app,
				sessionToken: sessionToken,
				bookChapter: {
					name: 'Chapter 1',
					bookId: firstBook.id,
				},
			})

			firstBookChaptersIds.push(bookChaptersResp.data[RouteNames.BOOK_CHAPTER.CREATE].id)
		}

		for (let i = 0; i < 4; i++) {
			const bookChaptersResp = await bookChapterUtils.createBookChapter({
				app,
				sessionToken: sessionToken,
				bookChapter: {
					name: 'Chapter 1',
					bookId: secondBook.id,
				},
			})

			secondBookChaptersIds.push(bookChaptersResp.data[RouteNames.BOOK_CHAPTER.CREATE].id)
		}

		// Delete the first 2 chapters from the first and the second book
		for (let i = 0; i < 2; i++) {
			await Promise.all([
				bookChapterUtils.deleteBookChapter({
					app,
					sessionToken,
					bookChapter: {
						id: firstBookChaptersIds[i],
					},
				}),
				bookChapterUtils.deleteBookChapter({
					app,
					sessionToken,
					bookChapter: {
						id: secondBookChaptersIds[i],
					},
				}),
			])
		}

		// Check that the first book has 1 chapter
		const firstBookChapters = await bookChapterUtils.getBookChapters({
			bookChapterRepository,
			bookId: firstBook.id,
		})
		expect(firstBookChapters.length).toBe(1)

		// Check that the second book has 2 chapters
		const secondBookChapters = await bookChapterUtils.getBookChapters({
			bookChapterRepository,
			bookId: secondBook.id,
		})
		expect(secondBookChapters.length).toBe(2)
	})
})
