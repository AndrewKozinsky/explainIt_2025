import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { OpenAIService } from '../../src/infrastructure/openAI/openAI.service'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
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
import { makeGraphQLReqWithTokens } from '../makeGQReq'

describe('Analyze phase', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookChapterQueryRepository: BookChapterQueryRepository
	let openAIService: OpenAIService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookChapterQueryRepository = await app.resolve(BookChapterQueryRepository)
		openAIService = await app.resolve(OpenAIService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { query, variables } = queries.bookChapter.analyseSentenceAndPhrase({
			bookChapterId: 9999,
			sentence: '',
			phrase: '',
			bookAuthor: null,
			bookName: null,
			context: '',
		})

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: query,
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

		const { query, variables } = queries.bookChapter.analyseSentenceAndPhrase({
			bookChapterId: 9999,
			sentence: 'Test sentence',
			phrase: 'test phrase',
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			context: 'Test context',
		})

		const [response] = await makeGraphQLReqWithTokens({
			app,
			query,
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

		jest.spyOn(openAIService, 'generateText').mockResolvedValue({
			inputTokens: 500,
			outputTokens: 3000,
			message: null, // Missing message property - malformed response
		})

		const { query, variables } = queries.bookChapter.analyseSentenceAndPhrase({
			bookChapterId: 9999,
			sentence: 'Test sentence',
			phrase: 'test phrase',
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			context: 'Test context',
		})

		const [response] = await makeGraphQLReqWithTokens({
			app,
			query,
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
})
