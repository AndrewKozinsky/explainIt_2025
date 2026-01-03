import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { CreatePublicBooksHandler } from '../../src/features/bookPublic/CreateBooksPublic.command'
import RouteNames from '../../src/infrastructure/routeNames'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookPublicUtils } from '../utils/bookPublicUtils'
import { createApp } from '../utils/createApp'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Get public book', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let createPublicBooksHandler: CreatePublicBooksHandler

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		createPublicBooksHandler = await app.resolve(CreatePublicBooksHandler)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return one public book by id', async () => {
		const publicBooksResp = await bookPublicUtils.getBooks(app)
		const publicBooks = publicBooksResp.data[RouteNames.BOOK_PUBLIC.GET_BOOKS]

		expect(publicBooks.length).toBeGreaterThan(0)

		const bookFromList = publicBooks[0]
		const getBookResp = await bookPublicUtils.getBook(app, { id: bookFromList.id })
		const book = getBookResp.data[RouteNames.BOOK_PUBLIC.GET_BOOK]

		const booksDataConfig = createPublicBooksHandler.getBooksData()
		const configBook = booksDataConfig[0]

		bookPublicUtils.matchBookPublicOutWithBookPublicConfig(book, configBook)
	})
})
