import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword, welcomeBonusInRUR } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Register user (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()
		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should create a new user with OAuth', async () => {
		// Register/login a user with OAuth
		const { registerWithOAuthData: createUserWithOAuthResp } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Check the returned object
		userUtils.checkUserOutResp(createUserWithOAuthResp, {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: 0,
		})

		// Check that user data in the database is correct
		const createdUserRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(createdUserRowData, {
			email: defUserEmail,
			password: null,
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonusInRUR,
		})

		// Check that a confirmation letter was not sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('a user registered with OAuth then tries to do the same the second time then the program must return user data', async () => {
		// 1. Register/login a user with OAuth
		const { registerWithOAuthData: firstRegisterWithOAuthResp } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Check the returned object
		userUtils.checkUserOutResp(firstRegisterWithOAuthResp, {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: welcomeBonusInRUR,
		})

		// 2. Register/login a user with OAuth for the second time
		const { registerWithOAuthData: secondRegisterWithOAuthResp } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Check the returned object
		userUtils.checkUserOutResp(secondRegisterWithOAuthResp, {
			email: defUserEmail,
			isUserConfirmed: true,
			balance: welcomeBonusInRUR,
		})

		// Check that user data in the database is correct
		const userRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userRowData, {
			email: defUserEmail,
			password: null,
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonusInRUR,
		})

		// Check that a confirmation letter was not sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('register a user with email and password. Then register with OAuth twice', async () => {
		// 1. Register the user with email and password
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })
		await makeGraphQLReq(app, registerUserMutation)

		// 2. Register/login a user with OAuth for the first time
		const { registerWithOAuthData: registerWithOAuthResp_1 } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Check the returned object
		await checkUserAfterOAuth(registerWithOAuthResp_1)

		// 3. Register the user with OAuth for the second time
		const { registerWithOAuthData: registerWithOAuthResp_2 } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		await checkUserAfterOAuth(registerWithOAuthResp_2)

		// 4. Check that a confirmation letter was sent only once
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)

		async function checkUserAfterOAuth(userOutResponseData: any) {
			const rowUserExpectedData = {
				email: defUserEmail,
				password: 'password',
				emailConfirmationCode: 'code',
				confirmationCodeExpirationDate: 'data',
				isEmailConfirmed: false,
				isUserConfirmed: true,
				balance: welcomeBonusInRUR,
			}

			userUtils.checkUserOutResp(userOutResponseData, {
				email: defUserEmail,
				isUserConfirmed: true,
				balance: welcomeBonusInRUR,
			})

			// Check that user data in the database is correct
			const userRowData_1 = await userRepository.getUserByEmail(defUserEmail)
			userUtils.checkUserServiceResponseData(userRowData_1, rowUserExpectedData)
		}
	})

	it('should not create a new user if OAuth provider returns wrong answer', async () => {
		const registerWithOAuthResp = await userUtils.loginUserWithOAuthFail({ app })

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

	it('should not change an existed user if OAuth provider returns wrong answer', async () => {
		// 1. Register the user with email and password
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })
		await makeGraphQLReq(app, registerUserMutation)

		// 2.A try to register the user with OAuth
		const registerWithOAuthResp = await userUtils.loginUserWithOAuthFail({ app })

		// 3. Check the returned object
		checkErrorResponse(registerWithOAuthResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.cannotGetAccessTokenForOAuthProvider,
		})

		// 4. Check that user was not changed in the database
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
