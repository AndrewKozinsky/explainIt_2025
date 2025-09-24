import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ChapterTextStructure } from '../../src/features/bookChapter/chapterStructure/chapterStructureTypes'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { BookChapterQueryRepository } from '../../src/repo/bookChapter.queryRepository'
import { UserRepository } from '../../src/repo/user.repository'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { bookChapterUtils } from '../utils/bookChapterUtils'
import { bookUtils } from '../utils/bookUtils'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

describe('Analyze phase', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let bookChapterQueryRepository: BookChapterQueryRepository

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		bookChapterQueryRepository = await app.resolve(BookChapterQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { query, variables } = queries.bookChapter.analyseSentenceAndPhrase({
			bookChapterId: 9999,
			sentence: '',
			phrase: '',
			bookAuthor: null,
			bookName: null,
			context: '',
		})

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: query,
			queryVariables: variables,
		})
	})
})
