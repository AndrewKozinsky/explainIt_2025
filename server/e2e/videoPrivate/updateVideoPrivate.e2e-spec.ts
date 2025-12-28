import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { YandexCloudS3ServiceMock } from '../../src/infrastructure/yandexCloudS3/yandexCloudS3.service'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

describe('Update video private', () => {
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
		const query = queries.videoPrivate.update({ id: 1, name: null })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	it('should return 404 status if a video does not exist', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const updateVideoMutation = queries.videoPrivate.update({
			id: 999,
			name: 'My video',
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		checkErrorResponse(updateVideoResponse, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.video.notFound,
		})
	})

	it('should return 403 status if a video belongs to another user', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
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
			sessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]

		const { sessionToken: secondUserSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: 'second@example.com',
			password: 'password',
		})

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			name: 'New name',
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken: secondUserSessionToken,
		})

		checkErrorResponse(updateVideoResponse, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should update a created video (fields + file upload url)', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			subtitles: 'My subtitles',
			fileName: null,
			fileMimeType: null,
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]

		// Try to update with no data
		const updateVideoMutation = queries.videoPrivate.update({ id: createdVideo.id })
		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE]).toEqual({
			id: createdVideo.id,
			name: 'My video',
			subtitles: 'My subtitles',
			userId: createdVideo.userId,
			uploadUrl: null,
		})

		// Update several fields + request new upload URL
		const updateVideoMutation2 = queries.videoPrivate.update({
			id: createdVideo.id,
			name: 'Updated name',
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [updateVideoResponse2] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation2.query,
			queryVariables: updateVideoMutation2.variables,
			sessionToken,
		})

		const updatedVideo = updateVideoResponse2.data[RouteNames.VIDEO_PRIVATE.UPDATE]
		expect(updatedVideo.id).toBe(createdVideo.id)
		expect(updatedVideo.userId).toBe(createdVideo.userId)
		expect(updatedVideo.name).toBe('Updated name')
		expect(updatedVideo.subtitles).toBe('My subtitles')
		expect(updatedVideo.uploadUrl).toEqual(expect.any(String))

		const fileBuffer = Buffer.from('updated video bytes')
		const storedObjectKey = s3Mock.uploadByUrl(updatedVideo.uploadUrl, fileBuffer, 'video/mp4')
		expect(s3Mock.hasObject(storedObjectKey)).toBe(true)

		const storedObject = s3Mock.getObject(storedObjectKey)
		expect(storedObject?.contentType).toBe('video/mp4')
		expect(storedObject?.body.equals(fileBuffer)).toBe(true)
	})
})
