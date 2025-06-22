import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { applyAppSettings } from '../../src/infrastructure/applyAppSettings'
import {EmailAdapterService} from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import { TelegramService } from '../../src/infrastructure/telegram/telegram.service'

export async function createApp(props: { emailAdapter: EmailAdapterService }) {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(EmailAdapterService)
		.useValue({
			sendEmailConfirmationMessage: jest.fn().mockResolvedValue('Mocked Email Response'),
			sendEmail: jest.fn().mockResolvedValue('Mocked Email Response'),
			sendPasswordRecoveryMessage: jest.fn().mockResolvedValue('Mocked Email Response'),
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
