import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreateBooksPublicCommand } from '../../src/features/bookPublic/CreateBooksPublic.command'
import { clearAllDB } from './clearDB'
import { seedTestData } from './seedTestData'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	await commandBus.execute(new CreateBooksPublicCommand())
	await seedTestData(commandBus)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
