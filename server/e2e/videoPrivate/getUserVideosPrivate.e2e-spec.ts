import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { VideoPrivateQueryRepository } from '../../src/repo/videoPrivate.queryRepository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Get user videos private', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository
	let videoPrivateQueryRepository: VideoPrivateQueryRepository

	beforeAll(async () => {
		const createMainAppResult = await createApp()

		app = createMainAppResult.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
		videoPrivateQueryRepository = await app.resolve(VideoPrivateQueryRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const getUserVideosQuery = queries.videoPrivate.getUserVideos()
		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: getUserVideosQuery,
		})
	})

	it('should return empty list for new user', async () => {
		const { loginData, sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const getUserVideosQuery = queries.videoPrivate.getUserVideos()
		const [getUserVideosResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getUserVideosQuery,
			sessionToken,
		})

		const userVideos = getUserVideosResponse.data[RouteNames.VIDEO_PRIVATE.GET_USER_VIDEOS]
		expect(userVideos).toEqual([])

		const userVideosFromDb = await videoPrivateQueryRepository.getUserVideos(loginData.id)
		expect(userVideosFromDb).toEqual([])
	})

	it('should return only current user videos', async () => {
		const { loginData: firstUserData, sessionToken: firstUserSessionToken } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: defUserEmail,
				password: defUserPassword,
			})

		const createFirstVideoMutation = queries.videoPrivate.create({
			name: 'First user video 1',
			subtitles: null,
			fileName: null,
			fileMimeType: null,
		})

		const createSecondVideoMutation = queries.videoPrivate.create({
			name: 'First user video 2',
			subtitles: 'Subtitles',
			fileName: null,
			fileMimeType: null,
		})

		await makeGraphQLReqWithTokens({
			app,
			query: createFirstVideoMutation.query,
			queryVariables: createFirstVideoMutation.variables,
			sessionToken: firstUserSessionToken,
		})

		await makeGraphQLReqWithTokens({
			app,
			query: createSecondVideoMutation.query,
			queryVariables: createSecondVideoMutation.variables,
			sessionToken: firstUserSessionToken,
		})

		const { loginData: secondUserData, sessionToken: secondUserSessionToken } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
				app,
				userRepository,
				email: 'second@example.com',
				password: 'password',
			})

		const createOtherUserVideoMutation = queries.videoPrivate.create({
			name: 'Second user video',
			subtitles: null,
			fileName: null,
			fileMimeType: null,
		})

		await makeGraphQLReqWithTokens({
			app,
			query: createOtherUserVideoMutation.query,
			queryVariables: createOtherUserVideoMutation.variables,
			sessionToken: secondUserSessionToken,
		})

		const getUserVideosQuery = queries.videoPrivate.getUserVideos()
		const [getUserVideosResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getUserVideosQuery,
			sessionToken: firstUserSessionToken,
		})

		const firstUserVideos = getUserVideosResponse.data[RouteNames.VIDEO_PRIVATE.GET_USER_VIDEOS]
		expect(firstUserVideos.length).toBe(2)
		firstUserVideos.forEach((videoItem) => {
			expect(videoItem.userId).toBe(firstUserData.id)
		})

		const firstUserVideosFromDb = await videoPrivateQueryRepository.getUserVideos(firstUserData.id)
		expect(firstUserVideosFromDb.length).toBe(2)

		const secondUserVideosFromDb = await videoPrivateQueryRepository.getUserVideos(secondUserData.id)
		expect(secondUserVideosFromDb.length).toBe(1)
	})
})
