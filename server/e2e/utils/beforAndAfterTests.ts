import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { seedTestData } from './seedTestData'
import { clearAllDB } from './clearDB'
import { CreateBooksPublicCommand } from '../../src/features/bookPublic/CreateBooksPublic.command'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	await commandBus.execute(new CreateBooksPublicCommand())
	await seedTestData(commandBus)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
