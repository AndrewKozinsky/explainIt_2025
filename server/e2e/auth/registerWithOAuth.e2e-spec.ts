import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { LoginWithOAuthHandler } from '../../src/features/auth/LoginWithOAuth.command'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserQueryRepository } from '../../src/repo/user.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import { OAuthProviderType } from '../../src/routes/auth/inputs/loginWithOAuth.input'
import { makeGraphQLReq } from '../makeGQReq'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword, welcomeBonus } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe('Register user (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let userQueryRepository: UserQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })
		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		userQueryRepository = await app.resolve(UserQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should create a new user with OAuth', async () => {
		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Method getUserDataFromOAuthCode returns my email and name
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthCode').mockResolvedValue({
			email: defUserEmail,
			name: 'Test User',
		})

		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		const [createUserWithOAuthResp] = await makeGraphQLReq(app, registerWithOAuthUserMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(createUserWithOAuthResp.data[RouteNames.AUTH.LOGIN_WITH_OAUTH], {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: 0,
		})

		expect(createUserWithOAuthResp.errors).toBeFalsy()

		// Check that user data in the database is correct
		const createdUserRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(createdUserRowData, {
			email: defUserEmail,
			password: null,
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})

		// Check that a confirmation letter was not sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('a user registered with OAuth then tries to do the same the second time then the program must return user data', async () => {
		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Method getUserDataFromOAuthCode returns my email and name
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthCode').mockResolvedValue({
			email: defUserEmail,
			name: 'Test User',
		})

		// Register the user for the first time
		const registerWithOAuthMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		const [firstRegisterWithOAuthResp] = await makeGraphQLReq(app, registerWithOAuthMutation)

		userUtils.checkUserOutResponseData(firstRegisterWithOAuthResp.data[RouteNames.AUTH.LOGIN_WITH_OAUTH], {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: 0,
		})

		expect(firstRegisterWithOAuthResp.errors).toBeFalsy()

		const [secondRegisterWithOAuthResp] = await makeGraphQLReq(app, registerWithOAuthMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(secondRegisterWithOAuthResp.data[RouteNames.AUTH.LOGIN_WITH_OAUTH], {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: 0,
		})

		expect(secondRegisterWithOAuthResp.errors).toBeFalsy()

		// Check that user data in the database is correct
		const userRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userRowData, {
			email: defUserEmail,
			password: null,
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})

		// Check that a confirmation letter was not sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('register a user with email and password. Then register with OAuth twice', async () => {
		// 1. Register the user with email and password
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })
		await makeGraphQLReq(app, registerUserMutation)

		// 2. Preparing for register with OAuth

		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Method getUserDataFromOAuthCode returns my email and name
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthCode').mockResolvedValue({
			email: defUserEmail,
			name: 'Test User',
		})

		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		const rowUserExpectedData = {
			email: defUserEmail,
			password: 'password',
			emailConfirmationCode: 'code',
			confirmationCodeExpirationDate: 'data',
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonus,
		}

		// 3. Register the user with OAuth for the first time
		const [registerWithOAuthResp_1] = await makeGraphQLReq(app, registerWithOAuthUserMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(registerWithOAuthResp_1.data[RouteNames.AUTH.LOGIN_WITH_OAUTH], {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})

		expect(registerWithOAuthResp_1.errors).toBeFalsy()

		// Check that user data in the database is correct
		const userRowData_1 = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userRowData_1, rowUserExpectedData)

		// 4. Register the user with OAuth for the second time
		const [registerWithOAuthResp_2] = await makeGraphQLReq(app, registerWithOAuthUserMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(registerWithOAuthResp_2.data[RouteNames.AUTH.LOGIN_WITH_OAUTH], {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})

		expect(registerWithOAuthResp_2.errors).toBeFalsy()

		// Check that user data in the database is correct
		const userRowData_2 = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userRowData_2, rowUserExpectedData)

		// 5. Check that a confirmation letter was sent only once
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})

	it('should not create a new user if OAuth provider returns wrong answer', async () => {
		// Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Create a mock for method getUserDataFromOAuthProvider. It returns null to imitate wrong answer from OAuth provider
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthProvider').mockResolvedValue(null)

		// Create a mutation to register the user with OAuth
		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		// A try to register the user with OAuth
		const [registerWithOAuthResp] = await makeGraphQLReq(app, registerWithOAuthUserMutation)

		// Check the returned object
		checkErrorResponse(registerWithOAuthResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.cannotGetAccessTokenForOAuthProvider,
		})

		// Check that user does not exist in the database
		const userInDatabase = await userRepository.getUserByEmail(defUserEmail)
		expect(userInDatabase).toBeNull()
	})

	it.only('should not change an existed user if OAuth provider returns wrong answer', async () => {
		// 1. Register the user with email and password
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })
		await makeGraphQLReq(app, registerUserMutation)

		// 2. Get LoginWithOAuthHandler use case to create a mock below
		const loginWithOAuthHandler = app.get<LoginWithOAuthHandler>(LoginWithOAuthHandler)

		// Create a mock for method getUserDataFromOAuthProvider. It returns null to imitate wrong answer from OAuth provider
		jest.spyOn(loginWithOAuthHandler, 'getUserDataFromOAuthProvider').mockResolvedValue(null)

		// Create a mutation to register the user with OAuth
		const registerWithOAuthUserMutation = queries.auth.loginUserWithOAuth({
			providerType: OAuthProviderType.YANDEX,
			code: 'some code',
		})

		// A try to register the user with OAuth
		const [registerWithOAuthResp] = await makeGraphQLReq(app, registerWithOAuthUserMutation)

		// Check the returned object
		checkErrorResponse(registerWithOAuthResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.cannotGetAccessTokenForOAuthProvider,
		})

		// Check that user was not changed in the database
		const userInDatabase = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userInDatabase, {
			email: defUserEmail,
			password: 'password',
			emailConfirmationCode: 'code',
			confirmationCodeExpirationDate: 'data',
			isEmailConfirmed: false,
			isUserConfirmed: false,
			balance: 0,
		})

		// 5. Check that a confirmation letter was sent only once
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})
})
