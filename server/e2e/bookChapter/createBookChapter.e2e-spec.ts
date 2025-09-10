import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ChapterTextStructure } from '../../src/features/bookChapter/chapterStructure/chapterStructureTypes'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
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

describe('Create book chapter', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookChapterQueryRepository: BookChapterQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
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

		// Check that the user has three book chapters in the database (one chapter was added when a user created a book)
		const userBookChapters = await bookChapterQueryRepository.getBookChapters(book.id)
		expect(userBookChapters.length).toBe(3)
	})

	it.only('should create book chapter and get structured chapter text', async () => {
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
				content: `Alice was very tired: she had peeped into the book. “And what is the use of a book,” thought Alice “without conversations?”

So she was considering in her own mind. Suddenly a White Rabbit ran close by her.`,
				note: 'Note',
			},
		})
		const firstBookChapter = createdFirstBookChapterResp.data[RouteNames.BOOK_CHAPTER.CREATE]

		const expectedChapterContent: ChapterTextStructure.Chapter = [
			[
				{
					sentence: 'Alice was very tired: she had peeped into the book.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'Alice' },
						{ id: 2, type: 'word', value: 'was' },
						{ id: 3, type: 'word', value: 'very' },
						{ id: 4, type: 'word', value: 'tired' },
						{ id: 5, type: 'punctuation', value: ':' },
						{ id: 6, type: 'word', value: 'she' },
						{ id: 7, type: 'word', value: 'had' },
						{ id: 8, type: 'word', value: 'peeped' },
						{ id: 9, type: 'word', value: 'into' },
						{ id: 10, type: 'word', value: 'the' },
						{ id: 11, type: 'word', value: 'book' },
						{ id: 12, type: 'punctuation', value: '.' },
					],
				},
				{
					sentence: '“And what is the use of a book,” thought Alice “without conversations?”',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'punctuation', value: '“' },
						{
							id: 2,
							type: 'word',
							value: 'And',
						},
						{
							id: 3,
							type: 'word',
							value: 'what',
						},
						{
							id: 4,
							type: 'word',
							value: 'is',
						},
						{
							id: 5,
							type: 'word',
							value: 'the',
						},
						{
							id: 6,
							type: 'word',
							value: 'use',
						},
						{
							id: 7,
							type: 'word',
							value: 'of',
						},
						{
							id: 8,
							type: 'word',
							value: 'a',
						},
						{
							id: 9,
							type: 'word',
							value: 'book',
						},
						{ id: 10, type: 'punctuation', value: ',”' },
						{
							id: 11,
							type: 'word',
							value: 'thought',
						},
						{
							id: 12,
							type: 'word',
							value: 'Alice',
						},
						{ id: 13, type: 'punctuation', value: '“' },
						{
							id: 14,
							type: 'word',
							value: 'without',
						},
						{
							id: 15,
							type: 'word',
							value: 'conversations',
						},
						{ id: 16, type: 'punctuation', value: '?”' },
					],
				},
			],
			[
				{
					sentence: 'So she was considering in her own mind.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'So' },
						{ id: 2, type: 'word', value: 'she' },
						{ id: 3, type: 'word', value: 'was' },
						{ id: 4, type: 'word', value: 'considering' },
						{ id: 5, type: 'word', value: 'in' },
						{ id: 6, type: 'word', value: 'her' },
						{ id: 7, type: 'word', value: 'own' },
						{ id: 8, type: 'word', value: 'mind' },
						{ id: 9, type: 'punctuation', value: '.' },
					],
				},
				{
					sentence: 'Suddenly a White Rabbit ran close by her.',
					translatedSentence: null,
					sentenceParts: [
						{ id: 1, type: 'word', value: 'Suddenly' },
						{ id: 2, type: 'word', value: 'a' },
						{ id: 3, type: 'word', value: 'White' },
						{ id: 4, type: 'word', value: 'Rabbit' },
						{ id: 5, type: 'word', value: 'ran' },
						{ id: 6, type: 'word', value: 'close' },
						{ id: 7, type: 'word', value: 'by' },
						{ id: 8, type: 'word', value: 'her' },
						{ id: 9, type: 'punctuation', value: '.' },
					],
				},
			],
		]

		expect(JSON.parse(firstBookChapter.content)).toEqual(expectedChapterContent)
	})
})
