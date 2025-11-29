import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreatePublicBooksHandler } from '../../src/features/bookPublic/CreateBooksPublic.command'
import { bookPublicUtils } from '../utils/bookPublicUtils'
import { App } from 'supertest/types'
import RouteNames from '../../src/infrastructure/routeNames'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { createApp } from '../utils/createApp'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Get user books', () => {
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

	it('should return all public books', async () => {
		// Get public books
		let publicBooksResp = await bookPublicUtils.getBooks(app)
		let publicBooks = publicBooksResp.data[RouteNames.BOOK_PUBLIC.GET_BOOKS]

		// Get public books data
		const booksDataConfig = createPublicBooksHandler.getBooksData()

		expect(publicBooks.length).toBe(booksDataConfig.length)

		// Check the returning objects
		for (let i = 0; i < publicBooks.length; i++) {
			const dataFromServer = publicBooks[i]
			const configData = booksDataConfig[i]

			bookPublicUtils.matchBookPublicOutWithBookPublicConfig(dataFromServer, configData)
		}
	})
})
