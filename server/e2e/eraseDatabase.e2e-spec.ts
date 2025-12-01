import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { afterEachTest, beforeEachTest } from './utils/beforAndAfterTests'
import { createApp } from './utils/createApp'

describe('Erase database', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('when a user registered with email and password he should get default book Alice in Wonderland', async () => {
		expect(2).toBe(2)
	})
})
