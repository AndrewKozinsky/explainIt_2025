import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { queries } from '../../src/features/db/queries'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import RouteNames from '../../src/infrastructure/routeNames'
import { makeGraphQLReq } from '../makeGQReq'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { checkErrorResponse } from '../utils/checkErrorResp'
import { createApp } from '../utils/createApp'

it('1', () => {
	expect(2).toBe(2)
})

describe('Translate text (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus

	beforeAll(async () => {
		const createMainAppRes = await createApp()

		app = createMainAppRes.app
		commandBus = app.get(CommandBus)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it.only('should return translatedText (localtest returns same text)', async () => {
		const { mutation, variables } = queries.translate.translateText({
			text: 'Hello',
			targetLanguageCode: 'ru',
			sourceLanguageCode: 'en',
		})

		const [resp] = await makeGraphQLReq(app, mutation, variables)
		// console.log(resp)

		// expect(resp.errors).toBeUndefined()
		// expect(resp.data).toBeDefined()
		/*expect(resp.data[RouteNames.TRANSLATE.TRANSLATE]).toEqual({
			translatedText: 'Hello',
		})*/
	})

	it('should return 400 error for invalid input (empty text)', async () => {
		const { mutation, variables } = queries.translate.translateText({
			text: '',
			targetLanguageCode: 'ru',
			sourceLanguageCode: 'en',
		})

		const [resp] = await makeGraphQLReq(app, mutation, variables)

		checkErrorResponse(resp, {
			code: 'Bad Request',
			statusCode: 400,
			message: 'Validation failed',
			validationErrors: [
				{
					field: 'text',
					messages: [errorMessage.minCharacters(1)],
				},
			],
		})
	})
})
