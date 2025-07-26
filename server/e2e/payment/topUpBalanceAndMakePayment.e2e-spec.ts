import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
import { YooKassaService } from '../../src/infrastructure/yooKassa/yooKassa.service'
import { PaymentRepository } from '../../src/repo/payment.repository'
import { UserRepository } from '../../src/repo/user.repository'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { paymentUtils } from '../utils/paymentUtils'
import { userUtils } from '../utils/userUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { agent as request } from 'supertest'

it('1', () => {
	expect(2).toBe(2)
})

describe('Top up balance with YooKassa (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let paymentRepository: PaymentRepository
	let mainConfig: MainConfigService
	let yooKassaService: YooKassaService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		paymentRepository = await app.resolve(PaymentRepository)
		mainConfig = await app.resolve(MainConfigService)
		yooKassaService = await app.resolve(YooKassaService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it.only('should return a user if passed session token is valid', async () => {
		// Create 2 users
		const { loginData: userFirstLoginData, sessionToken: userFirstSessionToken } =
			await userUtils.createUserAndLogin({
				app,
				userRepository,
				email: 'user-1@example.com',
				password: 'some-pass-1',
			})
		const { loginData: userSecondLoginData, sessionToken: userSecondSessionToken } =
			await userUtils.createUserAndLogin({
				app,
				userRepository,
				email: 'user-2@example.com',
				password: 'some-pass-2',
			})

		const firstUserId = userFirstLoginData.id
		const secondUserId = userSecondLoginData.id

		// -------

		// The first user pays 10
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 10,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
				mainConfig,
			},
			'payment.succeeded',
		)

		// Check if the first user's balance is 10
		let firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(1000)

		// and the second user's balance is 0
		let secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(0)

		// -------

		// The second user pays 20
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: secondUserId,
				moneyAmount: 20,
				paymentRepository,
				yooKassaService,
				sessionToken: userSecondSessionToken,
				mainConfig,
			},
			'payment.succeeded',
		)

		// Check if the first user's balance is 10
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(1000)

		// and the second user's balance is 20
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(2000)

		// -------

		// The second user pays 2
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: secondUserId,
				moneyAmount: 2,
				paymentRepository,
				yooKassaService,
				sessionToken: userSecondSessionToken,
				mainConfig,
			},
			'payment.succeeded',
		)

		// Check if the first user's balance is 10
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(1000)

		// and the second user's balance is 22
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(2200)

		// -------

		// The first user don't pays 100
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 100,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
				mainConfig,
			},
			'payment.canceled',
		)

		// Check if the first user's balance is 10
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(1000)

		// and the second user's balance is 22
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(2200)

		// -------

		// The first user pays 50
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 50,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
				mainConfig,
			},
			'payment.succeeded',
		)

		// Check if the first user's balance is 60
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(6000)

		// and the second user's balance is 22
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(2200)
	})
})
