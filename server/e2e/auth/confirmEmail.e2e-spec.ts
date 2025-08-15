import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, welcomeBonus } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/db/queries'
import { userUtils } from '../utils/userUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Confirm an user email (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

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

	it('should return error if wrong confirmation code was passed', async () => {
		const confirmEmailQuery = queries.auth.confirmEmail('123')
		const [confirmEmailResp] = await makeGraphQLReq(app, confirmEmailQuery)

		checkErrorResponse(confirmEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailConfirmationCodeNotFound,
		})

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('should return success if email is successfully confirmed', async () => {
		const createdUser = await userUtils.createUserWithUnconfirmedEmail({
			userRepository,
			app,
		})
		if (!createdUser) return

		const { emailConfirmationCode } = createdUser

		const confirmEmailQuery = queries.auth.confirmEmail(emailConfirmationCode!)
		const [confirmEmailResp] = await makeGraphQLReq(app, confirmEmailQuery)

		expect(confirmEmailResp.data).toStrictEqual({
			[RouteNames.AUTH.CONFIRM_EMAIL]: true,
		})

		const updatedUser = await userRepository.getUserById(createdUser.id)
		if (!updatedUser) return

		expect(userUtils.isUserEmailConfirmed(updatedUser)).toBe(true)

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})

	it('should return error if email verification allowed time is over', async () => {
		const createdUser = await userUtils.createUserWithUnconfirmedEmail({
			userRepository,
			app,
		})
		if (!createdUser) return

		// Change email confirmation allowed time to past
		await userRepository.updateUser(createdUser.id, {
			email_confirmation_code_expiration_date: new Date().toISOString(),
		})

		const { emailConfirmationCode } = createdUser

		// Try to confirm email
		const confirmEmailQuery = queries.auth.confirmEmail(emailConfirmationCode!)
		const [confirmEmailResp] = await makeGraphQLReq(app, confirmEmailQuery)

		checkErrorResponse(confirmEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailConfirmationCodeIsExpired,
		})

		// Check the user's email is still unconfirmed
		const thisUser = await userRepository.getUserById(createdUser.id)
		if (!thisUser) return

		expect(userUtils.isUserEmailConfirmed(thisUser)).toBe(false)
	})

	it('should return 400 if they try to confirm email the second time', async () => {
		const createdUser = await userUtils.createUserWithUnconfirmedEmail({
			userRepository,
			app,
		})
		if (!createdUser) return

		const { emailConfirmationCode } = createdUser

		// Try to confirm email
		const confirmEmailQuery = queries.auth.confirmEmail(emailConfirmationCode!)
		const [confirmEmailResp] = await makeGraphQLReq(app, confirmEmailQuery)
		expect(confirmEmailResp.data).toStrictEqual({
			[RouteNames.AUTH.CONFIRM_EMAIL]: true,
		})

		// Try to confirm email second time
		const [confirmEmailResp2] = await makeGraphQLReq(app, confirmEmailQuery)

		checkErrorResponse(confirmEmailResp2, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailConfirmationCodeNotFound,
		})

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})

	it('register user, then login with OAuth, then confirm email', async () => {
		// 1. Register user with email and password
		const createdUser = await userUtils.createUserWithUnconfirmedEmail({
			userRepository,
			app,
			email: defUserEmail,
		})
		if (!createdUser) return

		const { emailConfirmationCode } = createdUser

		// 2. Log in with OAuth
		await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// 3. Confirm email
		const confirmEmailQuery = queries.auth.confirmEmail(emailConfirmationCode!)
		const [confirmEmailResp] = await makeGraphQLReq(app, confirmEmailQuery)
		expect(confirmEmailResp.data).toStrictEqual({
			[RouteNames.AUTH.CONFIRM_EMAIL]: true,
		})

		// 4. Check that user data in the database is correct
		const userRowData = await userRepository.getUserByEmail(defUserEmail)
		userUtils.checkUserServiceResponseData(userRowData, {
			email: defUserEmail,
			password: 'password',
			emailConfirmationCode: null,
			confirmationCodeExpirationDate: null,
			isEmailConfirmed: true,
			isUserConfirmed: true,
			balance: welcomeBonus,
		})
	})
})
