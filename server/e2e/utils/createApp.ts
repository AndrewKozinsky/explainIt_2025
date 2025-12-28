import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { applyAppSettings } from '../../src/infrastructure/applyAppSettings'
import { EmailAdapterService } from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import { TelegramService } from '../../src/infrastructure/telegram/telegram.service'
import {
	YandexCloudS3Service,
	YandexCloudS3ServiceMock,
} from '../../src/infrastructure/yandexCloudS3/yandexCloudS3.service'

export async function createApp() {
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
		.overrideProvider(YandexCloudS3Service)
		.useValue(new YandexCloudS3ServiceMock())
		.compile()

	const app = moduleFixture.createNestApplication()
	await applyAppSettings(app)
	await app.init()

	const mockedEmailAdapter = moduleFixture.get<EmailAdapterService>(EmailAdapterService)
	const mockedS3 = moduleFixture.get<YandexCloudS3ServiceMock>(YandexCloudS3Service)

	return {
		app,
		emailAdapter: mockedEmailAdapter,
		s3: mockedS3,
	}
}
