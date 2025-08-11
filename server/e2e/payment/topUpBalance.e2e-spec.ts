import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
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

/*describe.skip('Top up balance with YooKassa (e2e)', () => {
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
		await authUtils.tokenNotExist(app, queries.payment.topUpBalanceWithYooKassa(1))
	})

	it('should return a confirmation page link', async () => {
		const { loginData, sessionToken } = await userUtils.createUserAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		if (!loginData || !sessionToken) {
			throw new Error('Unable to login user')
		}

		const topUpBalanceQuery = queries.payment.topUpBalanceWithYooKassa(10)
		const [topUpBalanceResp, topUpBalanceRespCookies] = await makeGraphQLReqWithTokens({
			app,
			query: topUpBalanceQuery,
			sessionToken,
			mainConfig,
		})

		expect(topUpBalanceResp.data[RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE]).toEqual({
			confirmationUrl: expect.any(String),
		})

		expect(
			topUpBalanceResp.data[RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE].confirmationUrl.startsWith(
				'https://yoomoney.ru/checkout/payments/v2/contract?orderId=',
			),
		).toBeTruthy()
	})
})*/
