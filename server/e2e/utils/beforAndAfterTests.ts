import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { CreateBooksPublicCommand } from '../../src/features/bookPublic/CreateBooksPublic.command'
import { CreateTariffsCommand } from '../../src/features/tariff/CreateTariffs.command'
import { CreateVideosPublicCommand } from '../../src/features/video/CreateVideosPublic.command'
import { clearAllDB } from './clearDB'
import { seedTestData } from './seedTestData'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	await commandBus.execute(new CreateBooksPublicCommand())
	await commandBus.execute(new CreateVideosPublicCommand())
	await commandBus.execute(new CreateTariffsCommand())
	await seedTestData(commandBus)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
