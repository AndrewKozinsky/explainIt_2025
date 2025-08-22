import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookChapterQueryRepository } from '../../src/repo/bookChapter.queryRepository'
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

describe.skip('Create book chapter', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let bookChapterQueryRepository: BookChapterQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		bookChapterQueryRepository = await app.resolve(BookChapterQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { query, variables } = queries.bookChapter.create({ bookId: 9999 })

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: query,
			queryVariables: variables,
		})
	})

	it('should throw an error if the book does not exist', async () => {
		// Create a user with confirmed email
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Create a book chapter
		const createdBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				bookId: 999,
				name: 'Chapter 1',
				header: 'My Family and Other Animals',
				content: 'Some content',
				note: null,
			},
		})

		checkErrorResponse(createdBookChapterResp, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.book.notFound,
		})
	})

	it('should throw an error if the book belongs to another user', async () => {
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

		// Create a second user who will try to create a chapter for this book
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Try to create a chapter for this book of the first user
		const createdBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: secondUserSeccionData,
			bookChapter: {
				bookId: createdBook.id,
				name: 'Chapter 1',
			},
		})

		checkErrorResponse(createdBookChapterResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('should create several book chapters if the book belongs to this user', async () => {
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

		const book = createdBookResp.data[RouteNames.BOOK.CREATE]

		// Create a chapter for this book
		const createdFirstBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				bookId: book.id,
				name: 'Chapter 1',
				header: 'Chapter 1',
				content: 'Content of chapter 1',
				note: 'Note',
			},
		})
		const firstBookChapter = createdFirstBookChapterResp.data[RouteNames.BOOK_CHAPTER.CREATE]

		// Check firstBookChapter
		bookChapterUtils.checkBookChapterOutResp(firstBookChapter)

		// Create a chapter for this book
		const createdSecondBookChapterResp = await bookChapterUtils.createBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				bookId: book.id,
			},
		})
		const secondBookChapter = createdSecondBookChapterResp.data[RouteNames.BOOK_CHAPTER.CREATE]

		// Check firstBookChapter
		bookChapterUtils.checkBookChapterOutResp(secondBookChapter)

		// Check that the user has two book chapters in the database
		const userBookChapters = await bookChapterQueryRepository.getBookChapters(book.id)
		expect(userBookChapters.length).toBe(2)
	})
})
