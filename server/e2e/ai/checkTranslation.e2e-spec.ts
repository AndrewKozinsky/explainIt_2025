import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/test/queries'
import { aiDataChecker } from './aiDataChecker'

describe('Ai check translation (e2e)', () => {
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

	it('should return error response if GigaChat return data in a wrong format', async () => {
		gigaChatService.generateText = jest.fn().mockResolvedValue('wrong text')

		const checkTranslationQuery = queries.ai.checkTranslation({ rusSentence: 'russian', engSentence: 'english' })

		const [checkTranslationResp] = await makeGraphQLReq(app, checkTranslationQuery)

		aiDataChecker.checkTranslation.checkErrorRes(checkTranslationResp)
	})

	it('should return success response if GigaChat return data in a correct format', async () => {
		const gigaChatResultObj: Record<number, any> = {
			0: { correct: false, analysis: 'Перевод неверный.' },
			1: { correct: true, analysis: 'Перевод верный.' },
		}

		for (let i = 0; i < 2; i++) {
			let gigaChatResultString = '```json\n' + JSON.stringify(gigaChatResultObj[i]) + '```'

			gigaChatService.generateText = jest.fn().mockResolvedValue(gigaChatResultString)

			const checkTranslationQuery = queries.ai.checkTranslation({
				rusSentence: 'russian',
				engSentence: 'english',
			})

			const [checkTranslationResp] = await makeGraphQLReq(app, checkTranslationQuery)
			aiDataChecker.checkTranslation.checkSuccessRes(checkTranslationResp)

			expect(checkTranslationResp.data[RouteNames.AI.CHECK_TRANSLATION]).toEqual(gigaChatResultObj[i])
		}
	})
})
