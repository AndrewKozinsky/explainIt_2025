import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import RouteNames from '../../src/infrastructure/routeNames'
import { YandexCloudS3ServiceMock } from '../../src/infrastructure/yandexCloudS3/yandexCloudS3.service'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

describe.skip('Create video private', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let s3Mock: YandexCloudS3ServiceMock

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		s3Mock = createMainAppRes.s3
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
		s3Mock.clear()
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const { query, variables } = queries.videoPrivate.create({
			name: null,
			subtitles: null,
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: query,
			queryVariables: variables,
		})
	})

	it('should create a video and store uploaded file in mock S3', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createMutation = queries.videoPrivate.create({
			name: 'My video',
			subtitles: 'My subtitles',
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [createVideoResp] = await makeGraphQLReqWithTokens({
			app,
			query: createMutation.query,
			queryVariables: createMutation.variables,
			sessionToken,
		})

		const createdVideo = createVideoResp.data[RouteNames.VIDEO_PRIVATE.CREATE]
		expect(createdVideo.id).toEqual(expect.any(Number))
		expect(createdVideo.name).toBe('My video')
		expect(createdVideo.subtitles).toBe('My subtitles')
		expect(createdVideo.userId).toEqual(expect.any(Number))
		expect(createdVideo.uploadUrl).toEqual(expect.any(String))

		const fileBuffer = Buffer.from('test video bytes')
		const storedObjectKey = s3Mock.uploadByUrl(createdVideo.uploadUrl, fileBuffer, 'video/mp4')
		expect(s3Mock.hasObject(storedObjectKey)).toBe(true)

		const storedObject = s3Mock.getObject(storedObjectKey)
		expect(storedObject?.contentType).toBe('video/mp4')
		expect(storedObject?.body.equals(fileBuffer)).toBe(true)
	})
})
