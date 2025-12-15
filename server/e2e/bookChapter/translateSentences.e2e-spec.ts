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

describe.skip('Translate sentences', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let openAIService: OpenAIService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		openAIService = await app.resolve(OpenAIService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { mutation, variables } = queries.bookChapter.translateSentences({
			bookName: null,
			bookAuthor: null,
			sentences: ['The first sentence'],
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

		const { mutation, variables } = queries.bookChapter.translateSentences({
			bookName: null,
			bookAuthor: null,
			sentences: ['The first sentence'],
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

		// Add balance to a user (assuming we can update balance somehow)
		await userRepository.updateBalance(loginData.id, 100)

		jest.spyOn(openAIService, 'generateText').mockResolvedValue({
			inputTokens: 500,
			outputTokens: 3000,
			message: null, // Missing message property - malformed response
		})

		const { mutation, variables } = queries.bookChapter.translateSentences({
			bookName: null,
			bookAuthor: null,
			sentences: ['The first sentence.', 'The second sentence.', 'The third sentence.'],
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

		// Mock openAI to return a proper formatted response
		const mockOpenAIResponse = {
			inputTokens: 500,
			outputTokens: 2000,
			message: JSON.stringify({
				translates: [
					'Перевод первого предложения.',
					'Перевод второго предложения.',
					'Перевод третьего предложения.',
				],
			}),
		}

		jest.spyOn(openAIService, 'generateText').mockResolvedValue(mockOpenAIResponse)
		const { mutation, variables } = queries.bookChapter.translateSentences({
			bookAuthor: 'Test Author',
			bookName: 'Test Book',
			sentences: ['The first sentence.', 'The second sentence.', 'The third sentence.'],
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
		const responseData = response.data.book_chapter_TranslateSentences
		expect(responseData).toBeDefined()

		bookChapterUtils.checkTranslateSentencesResp(responseData, {
			translates: [
				'Перевод первого предложения.',
				'Перевод второго предложения.',
				'Перевод третьего предложения.',
			],
		})

		// Verify that tokens were charged from user balance
		const updatedUser = await userRepository.getUserById(loginData.id)
		expect(updatedUser?.balance).toBeLessThan(100) // Balance should be reduced due to token usage
	})
})
