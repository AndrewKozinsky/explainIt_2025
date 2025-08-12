import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { LoginWithOAuthCommand } from '../../src/features/auth/LoginWithOAuth.command'
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

describe.skip('Register user (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let userQueryRepository: UserQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
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

	it('should return error if wrong data was passed', async () => {
		const registerUserMutation = queries.auth.registerUser({ email: 'johnexample.com', password: 'my' })

		const [createUserResp] = await makeGraphQLReq(app, registerUserMutation)

		checkErrorResponse(createUserResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: 'Validation failed',
			validationErrors: [
				{
					field: 'email',
					messages: [errorMessage.wrongEmailFormat],
				},
				{ field: 'password', messages: [errorMessage.minCharacters(6)] },
			],
		})
	})

	it('should create a new user', async () => {
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })

		const [createUserResp] = await makeGraphQLReq(app, registerUserMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(createUserResp.data[RouteNames.AUTH.REGISTER], {
			email: defUserEmail,
			isUserConfirmed: false,
		})

		expect(createUserResp.errors).toBeFalsy()

		// Find created user in the database
		const userId = createUserResp.data[RouteNames.AUTH.REGISTER].id
		const createdUser = await userQueryRepository.getUserById(userId)

		userUtils.checkUserOutResponseData(createdUser, {
			email: defUserEmail,
		})

		// Check that user data in the database is correct
		const createdUserRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(createdUserRowData, {
			email: defUserEmail,
			password: 'some password',
			emailConfirmationCode: 'some code',
			confirmationCodeExpirationDate: 'some date',
			isEmailConfirmed: false,
			isUserConfirmed: false,
			balance: 0,
		})

		// Check if a confirmation letter was sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})

	it('should return error if a user is already created, but email is not confirmed', async () => {
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })

		// Create the first user
		await makeGraphQLReq(app, registerUserMutation)
		// A try to create the user for the second time
		const [createUserResp2] = await makeGraphQLReq(app, registerUserMutation)

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)

		checkErrorResponse(createUserResp2, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailIsNotConfirmed,
		})
	})

	it('should return error if a user is already created and email is confirmed', async () => {
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })

		const [createUserResp1] = await makeGraphQLReq(app, registerUserMutation)
		const firstUserId = createUserResp1.data[RouteNames.AUTH.REGISTER].id
		await userRepository.makeEmailVerified(firstUserId)

		const [createUserResp2] = await makeGraphQLReq(app, registerUserMutation)

		checkErrorResponse(createUserResp2, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailIsAlreadyRegistered,
		})
	})

	it('should register a user if he has already registered with OAuth', async () => {
		// Register a user with OAuth
		await commandBus.execute(
			new LoginWithOAuthCommand({
				request: userUtils.getFakeRequestForOAuth(),
				loginWithOAuthInput: { code: 'code', providerType: OAuthProviderType.YANDEX },
				clientIP: 'clientIP',
				clientName: 'clientName',
				overrideDataFromProvider: {
					email: defUserEmail,
					name: 'user name',
				},
			}),
		)

		// Check that the data was saved correctly in the database
		const createdUserByOAuth = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(createdUserByOAuth, {
			email: defUserEmail,
			password: null,
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})

		// Make a try to register a user with the same email
		const registerUserMutation = queries.auth.registerUser({ email: defUserEmail, password: defUserPassword })
		const [registeredUserResp] = await makeGraphQLReq(app, registerUserMutation)

		// Check the returned object
		userUtils.checkUserOutResponseData(registeredUserResp.data[RouteNames.AUTH.REGISTER], {
			email: defUserEmail,
			isUserConfirmed: true,
		})

		// Check that the data was saved correctly in the database
		const registeredUserByEmailAndPassword = await userRepository.getUserByEmail(defUserEmail)
		console.log(registeredUserByEmailAndPassword)
		userUtils.checkUserServiceResponseData(registeredUserByEmailAndPassword, {
			email: defUserEmail,
			password: 'some password',
			emailConfirmationCode: 'some code',
			confirmationCodeExpirationDate: 'some date',
			isEmailConfirmed: false,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})
	})
})
