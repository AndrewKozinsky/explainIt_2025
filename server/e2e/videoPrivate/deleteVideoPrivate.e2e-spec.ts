import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { YandexCloudS3ServiceMock } from '../../src/infrastructure/yandexCloudS3/yandexCloudS3.service'
import { UserRepository } from '../../src/repo/user.repository'
import { VideoPrivateQueryRepository } from '../../src/repo/videoPrivate.queryRepository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

describe('Delete video private', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let videoPrivateQueryRepository: VideoPrivateQueryRepository
	let s3Mock: YandexCloudS3ServiceMock

	beforeAll(async () => {
		const createMainAppResult = await createApp()

		app = createMainAppResult.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		videoPrivateQueryRepository = await app.resolve(VideoPrivateQueryRepository)
		s3Mock = createMainAppResult.s3
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
		s3Mock.clear()
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const deleteVideoMutation = queries.videoPrivate.delete({ id: 1 })

		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: deleteVideoMutation.query,
			queryVariables: deleteVideoMutation.variables,
		})
	})

	it('should return 404 status if a video does not exist', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const deleteVideoMutation = queries.videoPrivate.delete({ id: 999 })
		const [deleteVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: deleteVideoMutation.query,
			queryVariables: deleteVideoMutation.variables,
			sessionToken,
		})

		checkErrorResponse(deleteVideoResponse, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.video.notFound,
		})
	})

	it('should return 403 status if a video belongs to another user', async () => {
		const { sessionToken: firstUserSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			subtitles: null,
			fileName: null,
			fileMimeType: null,
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken: firstUserSessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]

		const { sessionToken: secondUserSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: 'second@example.com',
			password: 'password',
		})

		const deleteVideoMutation = queries.videoPrivate.delete({ id: createdVideo.id })
		const [deleteVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: deleteVideoMutation.query,
			queryVariables: deleteVideoMutation.variables,
			sessionToken: secondUserSessionToken,
		})

		checkErrorResponse(deleteVideoResponse, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should delete a created video and its file from storage', async () => {
		const { sessionToken: ownerSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			subtitles: 'My subtitles',
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken: ownerSessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]
		expect(createdVideo.uploadUrl).toEqual(expect.any(String))

		const uploadedFileBuffer = Buffer.from('video bytes for delete test')
		const storedObjectKey = s3Mock.uploadByUrl(createdVideo.uploadUrl, uploadedFileBuffer, 'video/mp4')
		expect(s3Mock.hasObject(storedObjectKey)).toBe(true)

		const deleteVideoMutation = queries.videoPrivate.delete({ id: createdVideo.id })
		const [deleteVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: deleteVideoMutation.query,
			queryVariables: deleteVideoMutation.variables,
			sessionToken: ownerSessionToken,
		})

		expect(deleteVideoResponse.data[RouteNames.VIDEO_PRIVATE.DELETE]).toBe(true)

		expect(s3Mock.hasObject(storedObjectKey)).toBe(false)

		const deletedVideo = await videoPrivateQueryRepository.getVideoById(createdVideo.id)
		expect(deletedVideo).toBe(null)
	})
})
