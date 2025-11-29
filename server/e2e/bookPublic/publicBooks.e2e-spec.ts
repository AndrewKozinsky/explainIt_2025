import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { bookPublicUtils } from '../utils/bookPublicUtils'
import { CreatePublicBooksHandler } from '../../src/features/bookPublic/CreateBooksPublic.command'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { BookPublicQueryRepository } from '../../src/repo/bookPublic.queryRepository'
import { App } from 'supertest/types'
import { createApp } from '../utils/createApp'
import { PrismaService } from '../../src/db/prisma.service'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Public books', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let bookPublicQueryRepository: BookPublicQueryRepository
	let prisma: PrismaService
	let createPublicBooksHandler: CreatePublicBooksHandler

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		bookPublicQueryRepository = await app.resolve(BookPublicQueryRepository)
		prisma = await app.resolve(PrismaService)
		createPublicBooksHandler = await app.resolve(CreatePublicBooksHandler)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('check that public books exist after start server', async () => {
		const publicBooks = await bookPublicQueryRepository.getPublicBooks()

		// Get public books data
		const booksDataConfig = createPublicBooksHandler.getBooksData()
		expect(booksDataConfig.length).toBe(publicBooks.length)

		// Check the returning objects
		for (let i = 0; i < publicBooks.length; i++) {
			const dataFromServer = publicBooks[i]
			const configData = booksDataConfig[i]

			bookPublicUtils.matchBookPublicOutWithBookPublicConfig(dataFromServer, configData)
		}
	})

	it('try to start server several times and check that public books number did not change', async () => {
		const booksCount1 = await prisma.bookPublic.count()
		const chaptersCount1 = await prisma.bookChapter.count({ where: { book_public_id: { not: null } } })

		// Simulate a second server start by creating a second Nest application instance
		const second = await createApp()
		await second.app.close()

		const booksCount2 = await prisma.bookPublic.count()
		const chaptersCount2 = await prisma.bookChapter.count({ where: { book_public_id: { not: null } } })

		expect(booksCount2).toBe(booksCount1)
		expect(chaptersCount2).toBe(chaptersCount1)
	})
})
