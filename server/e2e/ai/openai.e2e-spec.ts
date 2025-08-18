import { INestApplication } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { App } from 'supertest/types'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { OpenAIService } from '../../src/infrastructure/openAI/openAI.service'
import { afterEachTest, beforeEachTest } from '../utils/beforAndAfterTests'
import { createApp } from '../utils/createApp'

it('1', () => {
	expect(2).toBe(2)
})

describe.skip('OpenAI (e2e)', () => {
	let app: INestApplication<App>
	let commandBus: CommandBus
	let openAIService: OpenAIService
	let emailAdapter: EmailAdapterService

	beforeAll(async () => {
		const createMainAppRes = await createApp({ emailAdapter: emailAdapter })
		app = createMainAppRes.app
		openAIService = await app.resolve(OpenAIService)
	})

	beforeEach(async () => {
		await beforeEachTest(app, commandBus)
	})

	afterEach(async () => {
		await afterEachTest(app)
	})

	it('test', async () => {
		const res = await openAIService.generateText(
			'Ты учитель английского для ученика с продвинутыми знаниями. Есть предложение: "I joined the fencing team in high school in order to get out of gym class.". Что обозначает "get" в этом контексте?',
		)
		console.log(JSON.stringify(res))
		console.log('------')
		// @ts-ignore
		console.log(JSON.stringify(res.choices[0]).message.content)
		// expect(res).toEqual(res)
	})
})

const ff = {
	translate: 'Я присоединился к команде фехтования, чтобы не ходить на уроки физкультуры.',
	phrase: '«get out of» не означает «получить» здесь. Это именно фразовый глагол со значением «избежать, уйти от». Это разговорный стиль. Формально можно сказать «to be exempt from gym class» или «to avoid gym class»/«to skip gym class».',
}
