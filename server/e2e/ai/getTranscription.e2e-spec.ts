import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { createApp } from '../utils/createApp'
import { queries } from '../../src/features/test/queries'
import { aiDataChecker } from './aiDataChecker'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('AI get transcription (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let gigaChatService: GigaChatService
	let emailAdapter: EmailAdapterService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter: emailAdapter })

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
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
