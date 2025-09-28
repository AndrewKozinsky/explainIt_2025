import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { OpenAIService } from '../../src/infrastructure/openAI/openAI.service'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { createApp } from '../utils/createApp'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('OpenAI (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let openAIService: OpenAIService
	let emailAdapter: EmailAdapterService

	beforeAll(async () => {
		const createMainAppRes = await createApp()
		app = createMainAppRes.app
		openAIService = await app.resolve(OpenAIService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('test', async () => {
		expect(1).toBe(1)
	})
})
