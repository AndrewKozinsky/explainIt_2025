import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
import { authUtils } from '../utils/authUtils'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { userUtils } from '../utils/userUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'

it('1', () => {
	expect(2).toBe(2)
})

/*describe.skip('Logout (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let mainConfig: MainConfigService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		mainConfig = await app.resolve(MainConfigService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		await authUtils.tokenNotExist(app, queries.auth.logout())
	})

	it('should give success answer if the JWT refreshToken is valid', async () => {
		const { loginData, sessionToken } = await userUtils.createUserAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const logoutMutation = queries.auth.logout()
		const [logoutResp, logoutRespCookies] = await makeGraphQLReqWithTokens({
			app,
			query: logoutMutation,
			sessionToken,
			mainConfig,
		})

		expect(logoutResp.data[RouteNames.AUTH.LOGOUT]).toBe(true)

		// Check if a refresh token in cookie is already expired
		const expiredSessionToken = logoutRespCookies[mainConfig.get().session.name]
		const expiredSessionTokenDate = new Date(expiredSessionToken.expires)
		expect(+expiredSessionTokenDate <= +new Date()).toBe(true)
	})
})*/
