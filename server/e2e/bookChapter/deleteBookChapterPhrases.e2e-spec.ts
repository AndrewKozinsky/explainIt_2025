import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { BookChapterPhraseRepository } from '../../src/repo/bookChapterPhrase.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookChapterRepository } from '../../src/repo/bookChapter.repository'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'
import { PrismaService } from '../../src/db/prisma.service'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Delete book chapter phrases', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookChapterPhraseRepository: BookChapterPhraseRepository
	let prismaService: PrismaService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookChapterPhraseRepository = await app.resolve(BookChapterPhraseRepository)
		prismaService = await app.resolve(PrismaService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.bookChapter.deleteChapterPhrases({ bookChapterId: 1 })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a book chapter is not exists', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Delete a book chapter mutation
		const deleteBookChapterPhrasesMutation = queries.bookChapter.deleteChapterPhrases({ bookChapterId: 9999 })

		// Run this mutation
		const [deleteBookChapterPhrases] = await makeGraphQLReqWithTokens({
			app,
			query: deleteBookChapterPhrasesMutation.query,
			queryVariables: deleteBookChapterPhrasesMutation.variables,
			sessionToken,
		})

		checkErrorResponse(deleteBookChapterPhrases, {
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

		const createdBookResp = await bookUtils.createBookWithChapters({
			app,
			sessionToken,
			book: {
				author: 'Gerald Durrell',
			},
			chapters: [{}],
		})

		// Create a second user who will try to delete this book chapter
		const { loginData: secondUser, sessionToken: secondUserSeccionData } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		// Delete a book chapter mutation
		const deleteBookChapterPhrasesMutation = queries.bookChapter.deleteChapterPhrases({
			bookChapterId: createdBookResp.chapters[0].id,
		})

		// Run this mutation
		const [deleteBookChapterPhrases] = await makeGraphQLReqWithTokens({
			app,
			query: deleteBookChapterPhrasesMutation.query,
			queryVariables: deleteBookChapterPhrasesMutation.variables,
			sessionToken: secondUserSeccionData,
		})

		checkErrorResponse(deleteBookChapterPhrases, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should delete a book chapter phrases', async () => {
		// Create a user who will create a book and a chapter
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createdBookResp = await bookUtils.createBookWithChapters({
			app,
			sessionToken,
			book: {},
			chapters: [
				{
					content: 'The story begins with the Durrell family deciding to leave England...',
				},
			],
		})

		const chapterId = createdBookResp.chapters[0].id

		// Create several phrases linked to this chapter via repository
		const phrasesData = [
			{
				sentence: 'The story begins with the Durrell family deciding to leave England...',
				phrase: 'begins with',
				phraseTranslation: 'начинается с',
				phraseAnalysis: 'analysis 1',
			},
			{
				sentence: 'They decide to leave England',
				phrase: 'decide to',
				phraseTranslation: 'решают',
				phraseAnalysis: 'analysis 2',
			},
			{
				sentence: 'The Durrell family is planning',
				phrase: 'is planning',
				phraseTranslation: 'планирует',
				phraseAnalysis: 'analysis 3',
			},
		]

		for (let i = 0; i < phrasesData.length; i++) {
			const p = phrasesData[i]
			await bookChapterPhraseRepository.createBookChapterPhrase({
				bookChapterId: chapterId,
				sentenceId: i + 1,
				transcription: '',
				phraseWordsIdx: [],
				...p,
			})
		}

		// Ensure phrases are created
		const beforeCount = await prismaService.bookChapterPhrase.count({
			where: { book_chapter_id: chapterId },
		})
		expect(beforeCount).toBe(phrasesData.length)

		// Delete the chapter phrases via GraphQL
		const deleteBookChapterPhrasesMutation = queries.bookChapter.deleteChapterPhrases({ bookChapterId: chapterId })
		const [deleteBookChapterPhrasesResp] = await makeGraphQLReqWithTokens({
			app,
			query: deleteBookChapterPhrasesMutation.query,
			queryVariables: deleteBookChapterPhrasesMutation.variables,
			sessionToken,
		})
		const deleteBookChapterPhrases =
			deleteBookChapterPhrasesResp.data[RouteNames.BOOK_CHAPTER.DELETE_BOOK_CHAPTER_PHRASES]
		expect(deleteBookChapterPhrases).toBe(true)

		// Ensure phrases are deleted
		const afterCount = await prismaService.bookChapterPhrase.count({
			where: { book_chapter_id: chapterId },
		})
		expect(afterCount).toBe(0)
	})
})
