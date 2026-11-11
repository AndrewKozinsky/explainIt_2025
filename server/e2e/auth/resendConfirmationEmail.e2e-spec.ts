import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
// import { queries } from '../../src/features/db/queries'
import { AuthEmailService } from '../../src/infrastructure/emails/authEmail.service'
import { UserRepository } from '../../src/repo/user.repository'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { createApp } from '../utils/createApp'
// import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Confirm an user email (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let authEmail: AuthEmailService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		authEmail = createMainAppRes.authEmail
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	/*it('should return error if inputs has incorrect values', async () => {
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail('johnexample.com')
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: 'Validation failed',
			validationErrors: [
				{
					field: 'email',
					messages: [errorMessage.email.wrongFormat],
				},
			],
		})

		expect(authEmail.sendEmailConfirmation).toHaveBeenCalledTimes(0)
	})*/

	/*it('should return an error if the entered email is not exists', async () => {
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail('john@example.com')
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.email.notFound,
		})

		expect(authEmail.sendEmailConfirmation).toHaveBeenCalledTimes(0)
	})*/

	/*it('should return an error if the user registered with OAuth', async () => {
		await userUtils.loginUserWithOAuthSuccessfully({
			app,
			email: defUserEmail,
		})

		// Try to resend confirmation email
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail('john@example.com')
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		// Check the error
		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.email.notFound,
		})

		expect(authEmail.sendEmailConfirmation).toHaveBeenCalledTimes(0)
	})*/

	/*it('should return success if inputs has correct values', async () => {
		const user = await userUtils.createUserWithUnconfirmedEmail({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})
		if (!user) return

		// Make expiration data expired
		await userRepository.updateUser(user.id, {
			email_confirmation_code_expiration_date: subDays(new Date(), 5).toISOString(),
		})

		// Send another confirmation email
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail(user.email)
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		// Check for successful answer and that email adapter was run
		expect(resendConfirmationEmailResp.data).toBeTruthy()
		expect(authEmail.sendEmailConfirmation).toHaveBeenCalledTimes(2)

		// Check if expiration data is bigger than now for 3 hours
		const updatedUser = await userRepository.getUserById(user.id)
		if (!updatedUser || !updatedUser.confirmationCodeExpirationDate) {
			throw new Error('User does not exist')
		}

		expect(+new Date(updatedUser.confirmationCodeExpirationDate)).toBeGreaterThan(
			+add(new Date(), { days: 2, hours: 23, minutes: 59 }),
		)
		expect(+new Date(updatedUser.confirmationCodeExpirationDate)).toBeLessThan(
			+add(new Date(), { days: 3, minutes: 1 }),
		)
	})*/

	/*it('should return an error if email is already confirmed', async () => {
		const admin = await userUtils.createUserWithConfirmedEmail({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})
		if (!admin) return

		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail(admin.email)
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.email.isAlreadyConfirmed,
		})

		expect(authEmail.sendEmailConfirmation).toHaveBeenCalledTimes(1)
	})*/
})
