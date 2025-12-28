import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { UserRepository } from '../../src/repo/user.repository'
import { makeGraphQLReqWithTokens } from '../makeGQReq'
import { authUtils } from '../utils/authUtils'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { defUserEmail, defUserPassword } from '../utils/common'
import { createApp } from '../utils/createApp'
import { userUtils } from '../utils/userUtils'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('Get video private', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let userRepository: UserRepository

	beforeAll(async () => {
		const createMainAppResult = await createApp()

		app = createMainAppResult.app
		commandBus = app.get(CommandBus)
		userRepository = await app.resolve(UserRepository)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('should return 401 if there is not session token cookie', async () => {
		const getVideoQuery = queries.videoPrivate.get({ id: 1 })
		await authUtils.tokenNotExist({
			app,
			queryOrMutationStr: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
		})
	})

	it('should return 404 status if a video does not exist', async () => {
		const { sessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: defUserEmail,
			password: defUserPassword,
		})

		const getVideoQuery = queries.videoPrivate.get({ id: 999 })
		const [getVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
			sessionToken,
		})

		checkErrorResponse(getVideoResponse, {
			code: 'Not Found',
			statusCode: 404,
			message: errorMessage.video.notFound,
		})
	})

	it('should return 403 status if a video belongs to another user', async () => {
		const { sessionToken: ownerSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
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
			sessionToken: ownerSessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]

		const { sessionToken: notOwnerSessionToken } = await userUtils.createUserWithEmailAndPasswordAndLogin({
			app,
			userRepository,
			email: 'second@example.com',
			password: 'password',
		})

		const getVideoQuery = queries.videoPrivate.get({ id: createdVideo.id })
		const [getVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
			sessionToken: notOwnerSessionToken,
		})

		checkErrorResponse(getVideoResponse, {
			code: 'Forbidden',
			statusCode: 403,
			message: errorMessage.userIsNotOwner,
		})
	})

	it('user should get own video by id', async () => {
		const { loginData: ownerUserData, sessionToken: ownerSessionToken } =
			await userUtils.createUserWithEmailAndPasswordAndLogin({
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
			sessionToken: ownerSessionToken,
		})

		const createdVideo = createVideoResponse.data[RouteNames.VIDEO_PRIVATE.CREATE]

		const getVideoQuery = queries.videoPrivate.get({ id: createdVideo.id })
		const [getVideoResponse] = await makeGraphQLReqWithTokens({
			app,
			query: getVideoQuery.query,
			queryVariables: getVideoQuery.variables,
			sessionToken: ownerSessionToken,
		})

		expect(getVideoResponse.data[RouteNames.VIDEO_PRIVATE.GET]).toEqual({
			id: createdVideo.id,
			name: 'My video',
			subtitles: 'My subtitles',
			userId: ownerUserData.id,
		})
	})
})
