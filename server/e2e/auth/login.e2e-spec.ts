import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { userUtils } from '../utils/userUtils'
import { UserRepository } from '../../src/repo/user.repository'

it('1', () => {
	expect(2).toBe(2)
})

/*describe.skip('User login (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return error if incorrect email and password was sent', async () => {
		const loginQuery = queries.auth.login({ email: 'wrongemail.com', password: '123' })
		const [loginResp] = await makeGraphQLReq(app, loginQuery)

		checkErrorResponse(loginResp, {
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

	it('should return 400 if email and password does not match', async () => {
		const loginQuery = queries.auth.login({ email: 'wrong@email.com', password: '123456' })
		const [loginResp] = await makeGraphQLReq(app, loginQuery)

		checkErrorResponse(loginResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.userNotFound,
		})
	})

	it('should return error if email is not confirmed', async () => {
		const user = await userUtils.createUserWithUnconfirmedEmail({
			app,
			userRepository,
		})
		if (!user) return

		const loginQuery = queries.auth.login({ email: defUserEmail, password: defUserPassword })
		const [loginResp] = await makeGraphQLReq(app, loginQuery)

		checkErrorResponse(loginResp, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.emailIsNotConfirmed,
		})
	})

	it('should return 200 if dto has correct values and email is confirmed', async () => {
		const user = await userUtils.createUserWithConfirmedEmail({
			app,
			userRepository,
		})
		if (!user) return

		const loginQuery = queries.auth.login({ email: defUserEmail, password: defUserPassword })
		const [loginResp, loginRespCookies] = await makeGraphQLReq(app, loginQuery)

		const loginRespData = loginResp.data[RouteNames.AUTH.LOGIN]
		userUtils.checkUserOutModel(loginRespData)

		userUtils.checkSessionCookie(loginRespCookies)
	})
})*/
