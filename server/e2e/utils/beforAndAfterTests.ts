import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { seedTestData } from './seedTestData'
import { clearAllDB } from './clearDB'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	await seedTestData(commandBus)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
