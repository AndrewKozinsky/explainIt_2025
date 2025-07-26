import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { seedTestData } from './seedTestData'
import { clearAllDB } from './clearDB'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	jest.clearAllMocks()
	await seedTestData(commandBus)
}

export async function afterEachTest(app: INestApplication) {}
