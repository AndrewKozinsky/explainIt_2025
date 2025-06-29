import { INestApplication } from '@nestjs/common'
// import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { RedisService } from '../../src/infrastructure/redis/redis.service'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { clearAllDB } from '../utils/clearDB'
// import { UserRole } from '../../src/db/dbConstants'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
// import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
// import RouteNames from '../../src/infrastructure/routeNames'
// import { CellRepository } from '../../src/repo/cell.repository'
// import { CellTypeRepository } from '../../src/repo/cellType.repository'
// import { ParcelBoxQueryRepository } from '../../src/repo/parcelBox.queryRepository'
// import { ParcelBoxRepository } from '../../src/repo/parcelBox.repository'
// import { ParcelBoxTypeQueryRepository } from '../../src/repo/parcelBoxType.queryRepository'
// import { ParcelBoxTypeRepository } from '../../src/repo/parcelBoxType.repository'
// import { UserQueryRepository } from '../../src/repo/user.queryRepository'
// import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReq } from '../makeGQReq'
import { defUserEmail, defUserPassword } from '../utils/common'
// import { defUserEmail, defUserPassword, extractErrObjFromResp, seedInitDataInDatabase } from '../utils/common'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/test/queries'
// import { seedTestData } from '../utils/seedTestData'
import { userUtils } from '../utils/userUtils'
import { UserRepository } from '../../src/repo/user.repository'
// import '../utils/jestExtendFunctions'

it('1', () => {
	expect(2).toBe(2)
})

describe('User login (e2e)', () => {
	let app: INestApplication<App>
	// let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	let userRepository: UserRepository
	// let userQueryRepository: UserQueryRepository
	// let parcelBoxTypeRepository: ParcelBoxTypeRepository
	// let parcelBoxTypeQueryRepository: ParcelBoxTypeQueryRepository
	// let cellTypeRepository: CellTypeRepository
	// let parcelBoxQueryRepository: ParcelBoxQueryRepository
	let redisService: RedisService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter })

		app = createMainAppRes.app
		// commandBus = app.get(CommandBus)
		// emailAdapter = createMainAppRes.emailAdapter
		userRepository = await app.resolve(UserRepository)
		// userQueryRepository = await app.resolve(UserQueryRepository)
		// cellTypeRepository = await app.resolve(CellTypeRepository)
		// parcelBoxQueryRepository = await app.resolve(ParcelBoxQueryRepository)
		redisService = await app.resolve(RedisService)
	})

	beforeEach(async () => {
		await beforeEachTest(app)
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

	it.only('should return 200 if dto has correct values and email is confirmed', async () => {
		const user = await userUtils.createUserWithConfirmedEmail({
			app,
			userRepository,
		})
		if (!user) return

		const loginQuery = queries.auth.login({ email: defUserEmail, password: defUserPassword })
		const [loginResp, loginRespCookies] = await makeGraphQLReq(app, loginQuery)
		console.log(loginResp)

		// const loginRespData = loginResp.data[RouteNames.AUTH.LOGIN]
		// userUtils.checkUserOutModel(loginRespData)

		// const { accessToken, refreshToken } = loginRespCookies
		// expect(typeof accessToken.value).toBe('string')
		// expect(typeof refreshToken.value).toBe('string')
	})
})
