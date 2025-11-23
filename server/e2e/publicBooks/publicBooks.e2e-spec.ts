import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { clearAllDB } from '../utils/clearDB'
import { BookPublicQueryRepository } from '../../src/repo/bookPublic.queryRepository'
import { BookChapterRepository } from '../../src/repo/bookChapter.repository'
import { BookPublicRepository } from '../../src/repo/bookPublic.repository'
import { App } from 'supertest/types'
import { createApp } from '../utils/createApp'
import { PrismaService } from '../../src/db/prisma.service'
import { wizardOfOzChapters } from '../../src/features/bookPublic/wizardOfOz/wizardOfOzBook'
import { solomonMinesChapters } from '../../src/features/bookPublic/solomonMines/solomonMinesBook'

it('1', () => {
	expect(2).toBe(2)
})

describe('Public books', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let bookPublicQueryRepository: BookPublicQueryRepository
	let bookChapterRepository: BookChapterRepository
	let prisma: PrismaService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		bookPublicQueryRepository = await app.resolve(BookPublicQueryRepository)
		bookChapterRepository = await app.resolve(BookChapterRepository)
		prisma = await app.resolve(PrismaService)
	})

	beforeEach(async () => {
		jest.clearAllMocks()
	})

	afterEach(async () => {
		await clearAllDB(app)
	})

	it('check that public books exist after start server', async () => {
		const publicBooks = await bookPublicQueryRepository.getPublicBooks()

		const booksCount = publicBooks.length
		expect(booksCount).toBe(2)

		const chaptersCount = await prisma.bookChapter.count({ where: { book_public_id: { not: null } } })
		expect(chaptersCount).toBe(wizardOfOzChapters.length + solomonMinesChapters.length)
	})

	it.only('try to start server several times and check that public books number did not change', async () => {
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
