import {INestApplication} from '@nestjs/common'
// import { CommandBus } from '@nestjs/cqrs'
import {App} from 'supertest/types'
import {EmailAdapterService} from '../../src/infrastructure/emailAdapter/email-adapter.service'
// import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
// import RouteNames from '../../src/infrastructure/routeNames'
// import { CellRepository } from '../../src/repo/cell.repository'
// import { CellTypeRepository } from '../../src/repo/cellType.repository'
// import { ParcelBoxRepository } from '../../src/repo/parcelBox.repository'
// import { ParcelBoxTypeRepository } from '../../src/repo/parcelBoxType.repository'
// import { UserQueryRepository } from '../../src/repo/user.queryRepository'
// import { UserRepository } from '../../src/repo/user.repository'
import {makeGraphQLReq} from '../makeGQReq'
import {clearAllDB} from '../utils/clearDB'
// import { defAdminEmail, defAdminPassword, extractErrObjFromResp, seedInitDataInDatabase } from '../utils/common'
import {createApp} from '../utils/createApp'
import {queries} from '../../src/features/test/queries'
// import { seedTestData } from '../utils/seedTestData'
// import '../utils/jestExtendFunctions'

describe('Register user (e2e)', () => {
	let app: INestApplication<App>
	// let commandBus: CommandBus
	let emailAdapter: EmailAdapterService
	// let userRepository: UserRepository
	// let userQueryRepository: UserQueryRepository
	// let parcelBoxRepository: ParcelBoxRepository
	// let cellRepository: CellRepository
	// let cellTypeRepository: CellTypeRepository
	// let parcelBoxTypeRepository: ParcelBoxTypeRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp({emailAdapter})

		app = createMainAppRes.app
		// commandBus = app.get(CommandBus)
		// emailAdapter = createMainAppRes.emailAdapter
		// userRepository = await app.resolve(UserRepository)
		// userQueryRepository = await app.resolve(UserQueryRepository)
	})

	beforeEach(async () => {
		await clearAllDB(app)
		// await seedInitDataInDatabase(app)
		// await seedTestData(commandBus)
		jest.clearAllMocks()
	})

	it.only('should return error if wrong data was passed', async () => {
		const registerAdminMutation = queries.auth.registerAdmin({email: 'johnexample.com', password: 'my'})

		const [createUserResp] = await makeGraphQLReq(app, registerAdminMutation)

		expect(createUserResp.data).toBe(null)
		console.log(JSON.stringify(createUserResp))

		const err = {
			"errors": [
				{
					"message": "Bad Request Exception",
					"locations": [{"line": 2, "column": 6}],
					"path": ["auth_register"],
					"extensions": {
						"code": "BAD_REQUEST",
						"originalError": {
							"message": [
								"Адрес электронной почты должен соответствовать формату example@mail.com",
								"Минимальное количество символов: 6"
							],
							"error": "Bad Request",
							"statusCode": 400
						}
					}
				}
			],
			"data": null
		}
		// console.log(createUserResp.errors[0].extensions)

		/*const firstErr = extractErrObjFromResp(createUserResp)

		expect(firstErr).toStrictEqual({
			message: errorMessage.wrongInputData,
			code: 400,
			fields: {
				email: ['The email must match the format example@mail.com'],
				password: [errorMessage.minCharacters(6)],
			},
		})*/
	})

	/*it('should create a new user', async () => {
		const registerAdminMutation = queries.auth.registerAdmin({ email: defAdminEmail, password: defAdminPassword })

		const [createUserResp] = await makeGraphQLReq(app, registerAdminMutation)

		// Check if a confirmation letter was sent
		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)

		// Check returned object
		expect(createUserResp.data).toStrictEqual({
			[RouteNames.AUTH.REGISTER_ADMIN]: {
				id: 9,
				email: defAdminEmail,
				role: 'admin',
			},
		})

		// Find created admin in the database
		const adminId = createUserResp.data[RouteNames.AUTH.REGISTER_ADMIN].id
		const createdUser = await userQueryRepository.getUserById(adminId)
		expect(createdUser).toStrictEqual({ id: 1, email: defAdminEmail, role: 'admin' })
	})*/

	/*it('should return error if a user is already created, but email is not confirmed', async () => {
		const registerAdminMutation = queries.auth.registerAdmin({ email: defAdminEmail, password: defAdminPassword })

		await makeGraphQLReq(app, registerAdminMutation)
		const [createUserResp2] = await makeGraphQLReq(app, registerAdminMutation)

		expect(emailAdapter.sendEmailConfirmationMessage).toHaveBeenCalledTimes(1)

		const firstErr = extractErrObjFromResp(createUserResp2)

		expect(firstErr).toStrictEqual({
			code: 400,
			message: errorMessage.emailIsNotConfirmed,
		})
	})*/

	/*it('should return error if a user is already created and email is confirmed', async () => {
		const registerAdminMutation = queries.auth.registerAdmin({ email: defAdminEmail, password: defAdminPassword })

		const [createUserResp1] = await makeGraphQLReq(app, registerAdminMutation)
		const firstAdminId = createUserResp1.data[RouteNames.AUTH.REGISTER_ADMIN].id
		await userRepository.makeEmailVerified(firstAdminId)

		const [createUserResp2] = await makeGraphQLReq(app, registerAdminMutation)
		const firstErr = extractErrObjFromResp(createUserResp2)

		expect(firstErr).toStrictEqual({
			code: 400,
			message: errorMessage.emailIsAlreadyRegistered,
		})
	})*/
})
