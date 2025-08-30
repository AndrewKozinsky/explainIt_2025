import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { userUtils } from '../utils/userUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Top up balance with YooKassa (e2e)', () => {
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

	it('should return 401 if there is not session token cookie', async () => {
		await authUtils.tokenNotExist({ app, queryOrMutationStr: queries.payment.topUpBalanceWithYooKassa(1) })
	})

	it('should return a confirmation page link for user registered with email and password', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const topUpBalanceQuery = queries.payment.topUpBalanceWithYooKassa(20)
		const [topUpBalanceResp] = await makeGraphQLReqWithTokens({
			app,
			query: topUpBalanceQuery,
			sessionToken,
		})

		expect(topUpBalanceResp.data[RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE]).toEqual({
			confirmationUrl: expect.any(String),
		})
	})

	it('should return a confirmation page link for user registered with OAuth', async () => {
		const { registerWithOAuthData, sessionToken } = await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		const topUpBalanceQuery = queries.payment.topUpBalanceWithYooKassa(20)
		const [topUpBalanceResp] = await makeGraphQLReqWithTokens({
			app,
			query: topUpBalanceQuery,
			sessionToken,
		})

		expect(topUpBalanceResp.data[RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE]).toEqual({
			confirmationUrl: expect.any(String),
		})
	})
})
