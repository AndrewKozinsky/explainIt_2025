import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { PrismaService } from '../../src/db/prisma.service'
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

describe.skip('Update video private', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let s3Mock: YandexCloudS3ServiceMock
	let prismaService: PrismaService

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		s3Mock = createMainAppRes.s3
		prismaService = await app.resolve(PrismaService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
		s3Mock.clear()
		;(global as any).fetch = jest.fn().mockResolvedValue({
			json: async () => ({ sentences: [] }),
		})
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const query = queries.videoPrivate.update({ id: 1, name: null })
		await authUtils.tokenNotExist({ app, queryOrMutationStr: query.query, queryVariables: query.variables })
	})

	/*it('should return 404 status if a video does not exist', async () => {
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
	})*/

	/*it('should return 403 status if a video belongs to another user', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
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
	})*/

	/*it('user should update a created video (fields + file upload url)', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: 'My subtitles',
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

		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE]).toEqual(
			expect.objectContaining({
				id: createdVideo.id,
				name: 'My video',
				content: null,
				processedContent: null,
				userId: createdVideo.userId,
				uploadUrl: null,
			}),
		)

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
		expect(updatedVideo.content).toBe(null)
		expect(updatedVideo.processedContent).toBe(null)
		expect(updatedVideo.uploadUrl).toEqual(expect.any(String))

		const fileBuffer = Buffer.from('updated video bytes')
		const storedObjectKey = s3Mock.uploadByUrl(updatedVideo.uploadUrl, fileBuffer, 'video/mp4')
		expect(s3Mock.hasObject(storedObjectKey)).toBe(true)

		const storedObject = s3Mock.getObject(storedObjectKey)
		expect(storedObject?.contentType).toBe('video/mp4')
		expect(storedObject?.body.equals(fileBuffer)).toBe(true)
	})*/

	/*it('should not return uploadUrl if video already has a fileUrl', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]
		expect(createdVideo.uploadUrl).toEqual(expect.any(String))

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			name: 'Updated name',
			fileName: 'updated-video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		const updatedVideo = updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE]
		expect(updatedVideo.uploadUrl).toBe(null)
	})*/

	/*it('should delete video file if client sends fileName: null and isFileUploaded is true', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]
		expect(createdVideo.uploadUrl).toEqual(expect.any(String))

		const fileBuffer = Buffer.from('video bytes')
		const storedObjectKey = s3Mock.uploadByUrl(createdVideo.uploadUrl, fileBuffer, 'video/mp4')
		expect(s3Mock.hasObject(storedObjectKey)).toBe(true)

		await prismaService.videoPrivate.update({
			where: { id: createdVideo.id },
			data: { is_file_uploaded: true },
		})

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			fileName: null,
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE].uploadUrl).toBe(null)
		expect(s3Mock.hasObject(storedObjectKey)).toBe(false)

		const getVideoQuery = {
			query: `
				query GetVideoPrivate($input: GetPrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.GET}(input: $input) {
						id
						fileUrl
						isFileUploaded
					}
				}`,
			variables: { input: { id: createdVideo.id } },
		}

		const [getVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
			sessionToken,
		})

		expect(getVideoResponse.data[RouteNames.VIDEO_PRIVATE.GET]).toEqual({
			id: createdVideo.id,
			fileUrl: null,
			isFileUploaded: false,
		})
	})*/

	/*it('should clear fileUrl and isFileUploaded even if file was not uploaded (fileName: null)', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
			fileName: 'video.mp4',
			fileMimeType: 'video/mp4',
		})

		const [createVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: createVideoMutation.query,
			queryVariables: createVideoMutation.variables,
			sessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]
		expect(createdVideo.uploadUrl).toEqual(expect.any(String))

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			fileName: null,
		})

		await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		const getVideoQuery = {
			query: `
				query GetVideoPrivate($input: GetPrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.GET}(input: $input) {
						id
						fileUrl
						isFileUploaded
					}
				}`,
			variables: { input: { id: createdVideo.id } },
		}

		const [getVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
			sessionToken,
		})

		expect(getVideoResponse.data[RouteNames.VIDEO_PRIVATE.GET]).toEqual({
			id: createdVideo.id,
			fileUrl: null,
			isFileUploaded: false,
		})
	})*/

	/*it('should process plain content on update: save normalized content + create sentences', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
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

		const inputContent = 'Hello world. Second sentence.'
		;(global as any).fetch = jest.fn().mockResolvedValue({
			json: async () => ({ sentences: ['Hello world.', 'Second sentence.'] }),
		})

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			content: inputContent,
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE].content).toBe(inputContent)
		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE].processedContent).toBe(inputContent)

		const sentences = await prismaService.sentence.findMany({
			where: { video_private_id: createdVideo.id },
			orderBy: { order_index: 'asc' },
		})
		expect(sentences).toHaveLength(2)
		expect(sentences[0].start_offset).toBe(0)
		expect(sentences[0].length).toBe('Hello world.'.length)
		expect(sentences[1].start_offset).toBe(inputContent.indexOf('Second sentence.'))
		expect(sentences[1].length).toBe('Second sentence.'.length)

		const subtitles = await prismaService.subtitle.findMany({
			where: { video_private_id: createdVideo.id },
		})
		expect(subtitles).toHaveLength(0)

		const inits = await prismaService.subtitleSentenceInit.findMany({
			where: { subtitle: { video_private_id: createdVideo.id } },
		})
		expect(inits).toHaveLength(0)
	})*/

	/*it('should process SRT on update: flatten content + create subtitles/sentences/init (supports no-ms times)', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const createVideoMutation = queries.videoPrivate.create({
			name: 'My video',
			content: null,
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

		const srt = '1\n00:00:01,000 --> 00:00:02,000\nHello world\n\n2\n00:00:03 --> 00:00:04\nSecond line'
		const expectedPrepared = 'Hello world Second line'

		;(global as any).fetch = jest.fn().mockResolvedValue({
			json: async () => ({ sentences: [expectedPrepared] }),
		})

		const updateVideoMutation = queries.videoPrivate.update({
			id: createdVideo.id,
			content: srt,
		})

		const [updateVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: updateVideoMutation.query,
			queryVariables: updateVideoMutation.variables,
			sessionToken,
		})

		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE].content).toBe(srt)
		expect(updateVideoResponse.data[RouteNames.VIDEO_PRIVATE.UPDATE].processedContent).toBe(expectedPrepared)

		const subtitles = await prismaService.subtitle.findMany({
			where: { video_private_id: createdVideo.id },
			orderBy: { order_index: 'asc' },
		})
		expect(subtitles).toHaveLength(2)
		expect(subtitles[0].start_time_ms).toBe(1000)
		expect(subtitles[0].end_time_ms).toBe(2000)
		expect(subtitles[0].start_offset).toBe(0)
		expect(subtitles[0].length).toBe('Hello world'.length)
		expect(subtitles[1].start_time_ms).toBe(3000)
		expect(subtitles[1].end_time_ms).toBe(4000)
		expect(subtitles[1].start_offset).toBe('Hello world '.length)
		expect(subtitles[1].length).toBe('Second line'.length)

		const sentences = await prismaService.sentence.findMany({
			where: { video_private_id: createdVideo.id },
			orderBy: { order_index: 'asc' },
		})
		expect(sentences).toHaveLength(1)
		expect(sentences[0].start_offset).toBe(0)
		expect(sentences[0].length).toBe(expectedPrepared.length)

		const inits = await prismaService.subtitleSentenceInit.findMany({
			where: { subtitle: { video_private_id: createdVideo.id } },
			orderBy: { id: 'asc' },
		})

		expect(inits.length).toBeGreaterThan(0)
		// both subtitles should map into the only sentence
		const initForFirst = inits.find(
			(i) => i.start_offset === subtitles[0].start_offset && i.length === subtitles[0].length,
		)
		const initForSecond = inits.find(
			(i) => i.start_offset === subtitles[1].start_offset && i.length === subtitles[1].length,
		)
		expect(initForFirst).toBeTruthy()
		expect(initForSecond).toBeTruthy()
	})*/
})
