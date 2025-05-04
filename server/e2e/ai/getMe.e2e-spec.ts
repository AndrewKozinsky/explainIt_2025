import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import { makeGraphQLReq } from '../makeGQReq'
import { createApp } from '../utils/createMainApp'
import { queries } from '../../src/features/test/queries'

describe('Get me (e2e)', () => {
	let app: INestApplication<App>
	let gigaChatService: GigaChatService
	// let commandBus: CommandBus
	// let emailAdapter: EmailAdapterService
	// let userRepository: UserRepository
	// let devicesRepository: DevicesRepository
	// let jwtAdapterService: JwtAdapterService
	// let mainConfig: MainConfigService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		gigaChatService = await app.resolve(GigaChatService)
		// commandBus = app.get(CommandBus)
		// emailAdapter = createMainAppRes.emailAdapter
		// userRepository = await app.resolve(UserRepository)
		// devicesRepository = await app.resolve(DevicesRepository)
		// jwtAdapterService = await app.resolve(JwtAdapterService)
		// mainConfig = await app.resolve(MainConfigService)
	})

	beforeEach(async () => {
		// await clearAllDB(app)
		// await seedInitDataInDatabase(app)
		// await seedTestData(commandBus)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return 401 if there is not access device token cookie', async () => {
		gigaChatService.generateText = jest.fn().mockResolvedValue('wrong text')

		const checkTranslationQuery = queries.ai.checkTranslation({ rusSentence: 'russian', engSentence: 'english' })

		const [checkTranslationResp] = await makeGraphQLReq(app, checkTranslationQuery)
		console.log(checkTranslationResp)
	})

	/*it('should return 401 if the JWT accessToken inside cookie is expired', async () => {
		await authUtils.accessTokenChecks.tokenExpired({
			app,
			queryOrMutationStr: queries.auth.getMe(),
			userRepository,
			devicesRepository,
			jwtAdapter: jwtAdapterService,
			mainConfig,
			role: UserRole.Admin,
		})
	})*/

	/*it('should return an admin if passed access token is valid', async () => {
		const { loginData, accessToken, refreshToken } = await userUtils.createUserAndLogin({
			app,
			userRepository,
			role: UserRole.Admin,
			email: defAdminEmail,
			password: defAdminPassword,
		})

		if (!loginData || !accessToken) {
			throw new Error('Unable to login user')
		}

		expect(getMeResp.data[RouteNames.AUTH.GET_ME]).toEqual({
			id: expect.any(Number),
			email: defAdminEmail,
			role: 'admin',
		})
	})*/

	/*it('should return a sender if passed access token is valid', async () => {
		const { loginData, accessToken, refreshToken } = await userUtils.createUserAndLogin({
			app,
			userRepository,
			role: UserRole.Sender,
			email: defSenderEmail,
			password: defSenderPassword,
		})

		if (!loginData || !accessToken) {
			throw new Error('Unable to login user')
		}

		const getMeQuery = queries.auth.getMe()
		const [getMeResp, cookies] = await makeGraphQLReqWithTokens({
			app,
			query: getMeQuery,
			accessTokenStr: accessToken.value,
			mainConfig,
		})

		expect(getMeResp.data[RouteNames.AUTH.GET_ME]).toEqual({
			id: expect.any(Number),
			email: defSenderEmail,
			firstName: null,
			lastName: null,
			passportNum: null,
			balance: 0,
			active: false,
			role: 'sender',
		})
	})*/
})
