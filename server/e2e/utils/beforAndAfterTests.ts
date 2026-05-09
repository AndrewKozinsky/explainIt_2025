import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
// import { CreatePublicBooksCommand } from 'server/src/features/bookPublic/CreatePublicBooks.command'
// import { CreatePublicVideosCommand } from 'server/src/features/video/CreatePublicVideos.command'
import { clearAllDB } from './clearDB'
import { seedTestData } from './seedTestData'

export async function beforeEachTest(app: INestApplication, commandBus: CommandBus) {
	await clearAllDB(app)
	// await commandBus.execute(new CreatePublicBooksCommand())
	// await commandBus.execute(new CreatePublicVideosCommand())
	await seedTestData(commandBus)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
