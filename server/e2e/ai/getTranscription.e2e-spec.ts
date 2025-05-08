import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { createApp } from '../utils/createMainApp'
import { queries } from '../../src/features/test/queries'
import { aiDataChecker } from './aiDataChecker'

describe('AI get transcription (e2e)', () => {
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

	it('should return error response if GigaChat return empty string', async () => {
		gigaChatService.generateText = jest.fn().mockResolvedValue('')

		const getTranscriptionQuery = queries.ai.getTranscription({ engSentence: 'english' })

		const [getTranscriptionResp] = await makeGraphQLReq(app, getTranscriptionQuery)

		aiDataChecker.getTranscription.checkErrorRes(getTranscriptionResp)
	})

	it('should return success response if GigaChat return data in a correct format', async () => {
		gigaChatService.generateText = jest.fn().mockResolvedValue('/aɪ lʌv ju:/')

		const getTranscriptionQuery = queries.ai.getTranscription({
			engSentence: 'english',
		})

		const [getTranscriptionResp] = await makeGraphQLReq(app, getTranscriptionQuery)

		aiDataChecker.getTranscription.checkSuccessRes(getTranscriptionResp)
		expect(getTranscriptionResp.data[RouteNames.AI.GET_TRANSCRIPTION]).toEqual({ transcription: 'aɪ lʌv ju:' })
	})
})
