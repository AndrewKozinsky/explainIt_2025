import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { applyAppSettings } from '../../src/infrastructure/applyAppSettings'
import {
	EmailAdapterService,
	EmailAdapterServiceMock,
} from '../../src/infrastructure/emailAdapter/email-adapter.service'
import { AuthEmailService } from '../../src/infrastructure/emails/authEmail.service'
// import { GigaChatService } from '../../src/infrastructure/gigaChat/gigaChat.service'
import { StartServerTasksRunner } from '../../src/infrastructure/StartServerTasksRunner'
import { TelegramService } from '../../src/infrastructure/telegram/telegram.service'
import {
	YandexCloudS3Service,
	YandexCloudS3ServiceMock,
} from '../../src/infrastructure/yandexCloudS3/yandexCloudS3.service'

export async function createApp() {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(StartServerTasksRunner)
		.useValue({
			onApplicationBootstrap: async function onApplicationBootstrap() {},
		})
		.overrideProvider(EmailAdapterService)
		.useValue(new EmailAdapterServiceMock())
		.overrideProvider(AuthEmailService)
		.useValue({
			sendEmailConfirmation: jest.fn().mockResolvedValue(undefined),
			sendPasswordRecovery: jest.fn().mockResolvedValue(undefined),
		})
		/*.overrideProvider(GigaChatService)
		.useValue({
			generateText: jest.fn().mockResolvedValue('GigaChat generated text'),
		})*/
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

	const mockedAuthEmail = moduleFixture.get<AuthEmailService>(AuthEmailService)
	const mockedS3 = moduleFixture.get<YandexCloudS3ServiceMock>(YandexCloudS3Service)

	return {
		app,
		authEmail: mockedAuthEmail,
		s3: mockedS3,
	}
}
