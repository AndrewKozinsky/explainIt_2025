import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { createApp } from '../utils/createMainApp'
import { queries } from '../../src/features/test/queries'
import { aiDataChecker } from './aiDataChecker'

describe.only('Get me (e2e)', () => {
	let app: INestApplication<App>
	let gigaChatService: GigaChatService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		gigaChatService = await app.resolve(GigaChatService)
	})

	beforeEach(async () => {})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it.only('should return error response if GigaChat return empty string', async () => {
		gigaChatService.generateText = jest.fn().mockResolvedValue('')

		const getTranscriptionQuery = queries.ai.getTranscription({ engSentence: 'english' })

		const [getTranscriptionResp] = await makeGraphQLReq(app, getTranscriptionQuery)

		aiDataChecker.getTranscription.checkErrorRes(getTranscriptionResp)
	})

	/*it('should return success response if GigaChat return data in a correct format', async () => {
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
	})*/
})
