import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserQueryRepository } from '../../src/repo/user.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/test/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Register user (e2e)', () => {
	let app: INestApplication<App>
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let userQueryRepository: UserQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		// commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		userQueryRepository = await app.resolve(UserQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it.only('should return error if wrong data was passed', async () => {
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

		// Check if a confirmation letter was sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)

		// Check returned object
		expect(createUserResp.data).toStrictEqual({
			[RouteNames.AUTH.REGISTER]: {
				id: expect.any(Number),
				email: defUserEmail,
			},
		})
		expect(createUserResp.errors).toBe(null)

		// Find created user in the database
		const userId = createUserResp.data[RouteNames.AUTH.REGISTER].id
		const createdUser = await userQueryRepository.getUserById(userId)
		expect(createdUser).toStrictEqual({ id: 1, email: defUserEmail })
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

	it.only('should return error if a user is already created and email is confirmed', async () => {
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
})
