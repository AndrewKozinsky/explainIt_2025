import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from '../../src/infrastructure/mainConfig/mainConfig.service'
import { YooKassaService } from '../../src/infrastructure/yooKassa/yooKassa.service'
import { PaymentRepository } from '../../src/repo/payment.repository'
import { UserRepository } from '../../src/repo/user.repository'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { welcomeBonusInKop } from '../utils/common'
import { createApp } from '../utils/createApp'
import { paymentUtils } from '../utils/paymentUtils'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Top up balance with YooKassa (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	let paymentRepository: PaymentRepository
	let mainConfig: MainConfigService
	let yooKassaService: YooKassaService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

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

	it.only('two users make payments successfully', async () => {
		let firstUserCalculatedBalance = 0
		let secondUserCalculatedBalance = welcomeBonusInKop

		// Create 2 users
		const { loginData: userFirstLoginData, sessionToken: userFirstSessionToken } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'user-1@example.com',
				password: 'some-pass-1',
			})

		const { registerWithOAuthData: createUserWithOAuthResp, sessionToken: userSecondSessionToken } =
			await userUtils.loginUserWithOAuthSuccessfully({
				app,
				email: 'user-2@example.com',
			})

		const firstUserId = userFirstLoginData.id
		const secondUserId = createUserWithOAuthResp.id

		// Check if the first user's balance is 0
		let firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is 10 because he registered with OAuth
		let secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)

		// -------

		// The first user pays 15
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 15,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
			},
			'payment.succeeded',
		)
		firstUserCalculatedBalance += 15

		// Check if the first user's balance is 15 rubles
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is welcomeBonus because he registered with OAuth
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)

		// -------

		// The second user pays 22 kopecks
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: secondUserId,
				moneyAmount: 22,
				paymentRepository,
				yooKassaService,
				sessionToken: userSecondSessionToken,
			},
			'payment.succeeded',
		)
		secondUserCalculatedBalance += 22

		// Check if the first user's balance is 15 kopecks
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is 22
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)

		// -------

		// The second user pays 2 kopecks
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: secondUserId,
				moneyAmount: 2,
				paymentRepository,
				yooKassaService,
				sessionToken: userSecondSessionToken,
			},
			'payment.succeeded',
		)
		secondUserCalculatedBalance += 2

		// Check if the first user's balance is 15 kopecks
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is 22 kopecks
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)

		// -------

		// The first user doesn't pay 100 kopecks
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 100,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
			},
			'payment.canceled',
		)

		// Check if the first user's balance is 15 kopecks
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is 22 kopecks
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)

		// -------

		// The first user pays 5
		await paymentUtils.makePaymentAndPay(
			{
				app,
				userId: firstUserId,
				moneyAmount: 5,
				paymentRepository,
				yooKassaService,
				sessionToken: userFirstSessionToken,
			},
			'payment.succeeded',
		)
		firstUserCalculatedBalance += 5

		// Check if the first user's balance is 10 kopecks
		firstUser = await userRepository.getUserById(firstUserId)
		expect(firstUser.balance).toBe(firstUserCalculatedBalance)

		// and the second user's balance is 22 kopecks
		secondUser = await userRepository.getUserById(secondUserId)
		expect(secondUser.balance).toBe(secondUserCalculatedBalance)
	})
})
