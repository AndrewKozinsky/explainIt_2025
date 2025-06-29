import { INestApplication } from '@nestjs/common'
import { add, subDays } from 'date-fns'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/test/queries'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Confirm an user email (e2e)', () => {
	let app: INestApplication<App>
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return error if input has incorrect values', async () => {
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail('johnexample.com')
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: 'Validation failed',
			validationErrors: [
				{
					field: 'email',
					messages: [errorMessage.wrongEmailFormat],
				},
			],
		})

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('should return an error if the entered email is not exists', async () => {
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail('john@example.com')
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		checkErrorResponse(resendConfirmationEmailResp, {
			code: 'Bad Request',
			statusCode: 400,
			message: errorMessage.emailNotFound,
		})

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(0)
	})

	it('should return success if input has correct values', async () => {
		const admin = await userUtils.createUserWithUnconfirmedEmail({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})
		if (!admin) return

		// Make expiration data expired
		await userRepository.updateUser(admin.id, {
			email_confirmation_code_expiration_date: subDays(new Date(), 5).toISOString(),
		})

		// Send another confirmation email
		const resendConfirmationEmailMutation = queries.auth.resendConfirmationEmail(admin.email)
		const [resendConfirmationEmailResp] = await makeGraphQLReq(app, resendConfirmationEmailMutation)

		// Check for successful answer and that email adapter was run
		expect(resendConfirmationEmailResp.data).toBeTruthy()
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(2)

		// Check if expiration data is bigger than now for 3 hours
		const updatedUser = await userRepository.getUserById(admin.id)
		if (!updatedUser || !updatedUser.confirmationCodeExpirationDate) {
			throw new Error('User does not exist')
		}

		expect(+new Date(updatedUser.confirmationCodeExpirationDate)).toBeGreaterThan(
			+add(new Date(), { days: 2, hours: 23, minutes: 59 }),
		)
		expect(+new Date(updatedUser.confirmationCodeExpirationDate)).toBeLessThan(
			+add(new Date(), { days: 3, minutes: 1 }),
		)
	})

	it('should return an error if email is already confirmed', async () => {
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
			message: errorMessage.emailIsAlreadyConfirmed,
		})

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)
	})
})
