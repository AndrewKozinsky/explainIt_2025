import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookChapterUtils } from '../utils/bookChapterUtils'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

describe('Update book chapter', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.bookChapter.update({ id: 1 })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a book chapter is not exists', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const updatedBookChapterResp = await bookChapterUtils.updateBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				id: 999,
				name: 'Chapter 1',
				header: 'My family',
				content: 'My precious content',
				note: 'My note',
			},
		})

		checkErrorResponse(updatedBookChapterResp, {
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

		// Create a second user who will try to update this book chapter
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Try to update this book chapter
		const updatedBookChapterResp = await bookChapterUtils.updateBookChapter({
			app,
			sessionToken: secondUserSeccionData,
			bookChapter: {
				id: createdBook.id,
				header: 'Updated header',
			},
		})

		checkErrorResponse(updatedBookChapterResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it.only('user should update a created book chapter', async () => {
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

		// Try to update this book chapter
		let updatedBookChapterResp = await bookChapterUtils.updateBookChapter({
			app,
			sessionToken,
			bookChapter: {
				id: createdChapterBook.id,
			},
		})

		// Check that the book chapter was not changed
		bookChapterUtils.checkBookChapterOutResp(updatedBookChapterResp.data[RouteNames.BOOK_CHAPTER.UPDATE], {
			id: createdChapterBook.id,
			name: 'Chapter 1',
			header: 'My chapter 1 header',
			content: 'My chapter 1 content',
			note: null,
			book: {
				id: createdBook.id,
				name: 'My Family and Other Animals',
				author: 'Gerald Durrell',
				note: null,
			},
		})

		// Try to update several fields
		updatedBookChapterResp = await bookChapterUtils.updateBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				id: createdChapterBook.id,
				header: 'My chapter 1 header 2',
				note: 'My note 2',
			},
		})
		// Check that only these fields were changed
		bookChapterUtils.checkBookChapterOutResp(updatedBookChapterResp.data[RouteNames.BOOK_CHAPTER.UPDATE], {
			id: createdChapterBook.id,
			name: 'Chapter 1',
			header: 'My chapter 1 header 2',
			content: 'My chapter 1 content',
			note: 'My note 2',
			book: {
				id: createdBook.id,
				name: 'My Family and Other Animals',
				author: 'Gerald Durrell',
				note: null,
			},
		})

		// Change each book chapter fieds
		updatedBookChapterResp = await bookChapterUtils.updateBookChapter({
			app,
			sessionToken: sessionToken,
			bookChapter: {
				id: createdChapterBook.id,
				name: 'name',
				header: 'header',
				content: 'content',
				note: 'note',
			},
		})
		bookChapterUtils.checkBookChapterOutResp(updatedBookChapterResp.data[RouteNames.BOOK_CHAPTER.UPDATE], {
			id: createdChapterBook.id,
			name: 'name',
			header: 'header',
			content: 'content',
			note: 'note',
			book: {
				id: createdBook.id,
				name: 'My Family and Other Animals',
				author: 'Gerald Durrell',
				note: null,
			},
		})
	})
})
