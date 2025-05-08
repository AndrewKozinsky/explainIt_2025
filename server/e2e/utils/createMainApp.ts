import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { applyAppSettings } from '../../src/infrastructure/applyAppSettings'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import { TelegramService } from '../../src/infrastructure/telegram/telegram.service'

export async function createApp() {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(GigaChatService)
		.useValue({
			generateText: jest.fn().mockResolvedValue('GigaChat generated text'),
		})
		.overrideProvider(TelegramService)
		.useValue({
			sendMessageToFromExplainBot: jest.fn().mockResolvedValue(true),
		})
		.compile()

	const app = moduleFixture.createNestApplication()
	await applyAppSettings(app)
	await app.init()

	return {
		app,
	}
}
