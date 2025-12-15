import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { BookChapterPhraseQueryRepository } from '../../src/repo/bookChapterPhrase.queryRepository'
import { OpenAIService } from '../../src/infrastructure/openAI/openAI.service'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookChapterUtils } from '../utils/bookChapterUtils'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'
import { makeGraphQLReqWithTokens } from '../makeGQReq'

describe.skip('Analyze phase', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let openAIService: OpenAIService
	let bookChapterPhraseQueryRepository: BookChapterPhraseQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		openAIService = await app.resolve(OpenAIService)
		bookChapterPhraseQueryRepository = await app.resolve(BookChapterPhraseQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { mutation, variables } = queries.bookChapter.analysePhrase({
			sentenceId: 1,
			bookChapterId: 9999,
			sentence: '',
			phrase: '',
			bookAuthor: null,
			bookName: null,
			context: '',
			phraseWordsIdx: [1, 2],
		})

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: mutation,
			queryVariables: variables,
		})
	})

	it('should return 400 error if user has zero balance', async () => {
		// Create and login user (new users start with zero balance)
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Verify user has zero balance
		expect(loginData.balance).toBe(0)

		// Create a real book with chapters for testing
		const { book, chapters } = await bookUtils.createBookWithChapters({
			app,
			sessionToken,
			book: {
				name: 'Test Book',
				author: 'Test Author',
				note: 'Test note',
			},
			chapters: [
				{
					name: 'Chapter 1',
					header: 'Test Chapter',
					content: 'Test content',
					note: 'Test note',
				},
			],
		})

		const { mutation, variables } = queries.bookChapter.analysePhrase({
			sentenceId: 1,
			bookChapterId: chapters[0].id,
			sentence: 'Test sentence',
			phrase: 'test phrase',
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			context: 'Test context',
			phraseWordsIdx: [1, 2],
		})

		const [response] = await makeGraphQLReqWithTokens({
			app,
			query: mutation,
			queryVariables: variables,
			sessionToken,
		})

		checkErrorResponse(response, {
			message: errorMessage.userBalanceIsNegative,
			code: 'Bad Request',
			statusCode: 400,
		})
	})

	it('should return 500 error when openAI returns malformed response but still charge tokens', async () => {
		// Create user with sufficient balance
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Add balance to user (assuming we can update balance somehow)
		await userRepository.updateBalance(loginData.id, 100)

		// Create a real book with chapters for testing
		const { book, chapters } = await bookUtils.createBookWithChapters({
			app,
			sessionToken,
			book: {
				name: 'Test Book',
				author: 'Test Author',
				note: 'Test note',
			},
			chapters: [
				{
					name: 'Chapter 1',
					header: 'Test Chapter',
					content: 'Test content',
					note: 'Test note',
				},
			],
		})

		jest.spyOn(openAIService, 'generateText').mockResolvedValue({
			inputTokens: 500,
			outputTokens: 3000,
			message: null, // Missing message property - malformed response
		})

		const { mutation, variables } = queries.bookChapter.analysePhrase({
			sentenceId: 1,
			bookChapterId: chapters[0].id,
			sentence: 'Test sentence',
			phrase: 'test phrase',
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			context: 'Test context',
			phraseWordsIdx: [1, 2],
		})

		const [response] = await makeGraphQLReqWithTokens({
			app,
			query: mutation,
			queryVariables: variables,
			sessionToken,
		})

		// Should return unknownOpenAIError with 500 status
		checkErrorResponse(response, {
			message: errorMessage.unknownOpenAIError,
			code: 'Internal Server Error',
			statusCode: 500,
		})

		// Verify that tokens were still charged from user balance
		const updatedUser = await userRepository.getUserById(loginData.id)
		expect(updatedUser?.balance).toBeLessThan(100) // Balance should be reduced due to token usage
	})

	it('should successfully analyze sentence and phrase when openAI returns correct format', async () => {
		// Create a user with sufficient balance
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		// Add balance to user
		await userRepository.updateBalance(loginData.id, 100)

		// Create a real book with chapters for testing
		const { book, chapters } = await bookUtils.createBookWithChapters({
			app,
			sessionToken,
			book: {
				name: 'Test Book',
				author: 'Test Author',
				note: 'Test note',
			},
			chapters: [
				{
					name: 'Chapter 1',
					header: 'Test Chapter',
					content: 'Test content',
					note: 'Test note',
				},
			],
		})

		// Mock openAI to return proper formatted response
		const mockOpenAIResponse = {
			inputTokens: 500,
			outputTokens: 2000,
			message: JSON.stringify({
				transcription: 'транскрипция',
				translate: 'тестовая фраза',
				analysis: 'Анализ тестовой фразы в контексте предложения',
				examples: [
					{
						sentence: 'Example sentence 1 with test phrase',
						translation: 'Пример предложения 1 с тестовой фразой',
					},
					{
						sentence: 'Example sentence 2 with test phrase',
						translation: 'Пример предложения 2 с тестовой фразой',
					},
				],
			}),
		}

		jest.spyOn(openAIService, 'generateText').mockResolvedValue(mockOpenAIResponse)

		const { mutation, variables } = queries.bookChapter.analysePhrase({
			sentenceId: 1,
			bookChapterId: chapters[0].id,
			sentence: 'Test sentence',
			phrase: 'Test phrase',
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			context: 'Test context',
			phraseWordsIdx: [1, 2],
		})

		const [response] = await makeGraphQLReqWithTokens({
			app,
			query: mutation,
			queryVariables: variables,
			sessionToken,
		})

		// Should return successful response
		expect(response.errors).toBeUndefined()
		expect(response.data).toBeDefined()

		const responseData = response.data.book_chapter_AnalysePhrase
		expect(responseData).toBeDefined()

		bookChapterUtils.checkAnalysePhraseResp(responseData, {
			sentence: 'Test sentence',
			transcription: 'транскрипция',
			phrase: 'Test phrase',
			phraseWordsIdx: [1, 2],
			translation: 'тестовая фраза',
			analysis: 'Анализ тестовой фразы в контексте предложения',
			examples: [
				{
					sentence: 'Example sentence 1 with test phrase',
					translation: 'Пример предложения 1 с тестовой фразой',
				},
				{
					sentence: 'Example sentence 2 with test phrase',
					translation: 'Пример предложения 2 с тестовой фразой',
				},
			],
		})

		// Verify phrase was created in database
		const createdPhrase = await bookChapterPhraseQueryRepository.getPhraseById(responseData.id)
		expect(createdPhrase).toBeDefined()
		expect(createdPhrase?.phrase).toBe('Test phrase')
		expect(createdPhrase?.translation).toBe('тестовая фраза')
		expect(createdPhrase?.examples).toHaveLength(2)

		// Verify that tokens were charged from user balance
		const updatedUser = await userRepository.getUserById(loginData.id)
		expect(updatedUser?.balance).toBeLessThan(100) // Balance should be reduced due to token usage
	})
})
