import { INestApplication } from '@nestjs/common'
import { clearAllDB } from './clearDB'

export async function beforeEachTest(app: INestApplication) {
	await clearAllDB(app)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {}
