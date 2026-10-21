import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { AiDialogueImageCleanupRepository } from 'repo/aiDialogue/aiDialogueImageCleanup.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { AiDialogueTurnRepository } from 'repo/aiDialogue/aiDialogueTurn.repository'
import { AiDialogueVisualsRepository } from 'repo/aiDialogue/aiDialogueVisuals.repository'
import { ImageGenerationOutboxRepository } from 'repo/aiDialogue/imageGenerationOutbox.repository'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { ActiveAiDialogueGenerationRegistry } from 'features/aiDialogue/ActiveAiDialogueGenerationRegistry.service'
import { AiDialogueSseHub } from 'features/aiDialogue/AiDialogueSseHub.service'
import { AiDialogueVisualUpdates } from 'features/aiDialogue/AiDialogueVisualUpdates.service'
import { AiDialogueAudioStream } from 'features/aiDialogue/audio/AiDialogueAudioStream.service'
import { AiDialogueAudioUpdates } from 'features/aiDialogue/audio/AiDialogueAudioUpdates.service'
import { CleanupAiDialogueAudio } from 'features/aiDialogue/audio/CleanupAiDialogueAudio.service'
import { GetAiDialogueAudioHandler } from 'features/aiDialogue/audio/GetAiDialogueAudio.command'
import { PublishAiDialogueAudio } from 'features/aiDialogue/audio/PublishAiDialogueAudio.service'
import { CleanupAiDialogueImages } from 'features/aiDialogue/CleanupAiDialogueImages.service'
import { CreateAiDialogueHandler } from 'features/aiDialogue/CreateAiDialogue.command'
import { CreateAiDialogueMessageHandler } from 'features/aiDialogue/CreateAiDialogueMessage.command'
import { DeleteAiDialogueHandler } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GenerateAiDialogueTurn } from 'features/aiDialogue/GenerateAiDialogueTurn.service'
import { GetAiDialogueHandler } from 'features/aiDialogue/GetAiDialogue.command'
import { GetAiDialogueVisualsHandler } from 'features/aiDialogue/GetAiDialogueVisuals.command'
import { GetUserDialoguesHandler } from 'features/aiDialogue/GetUserDialogues.command'
import { CheckAiDialogueUserMessageHandler } from 'features/aiDialogue/messageCheck/CheckAiDialogueUserMessage.command'
import { OpenAiDialogueStreamHandler } from 'features/aiDialogue/OpenAiDialogueStream.command'
import { PublishImageGenerationOutbox } from 'features/aiDialogue/PublishImageGenerationOutbox.service'
import { SummarizeAiDialogue } from 'features/aiDialogue/SummarizeAiDialogue.service'
import { UpdateAiDialogueHandler } from 'features/aiDialogue/UpdateAiDialogue.command'
import { CloudflareS3Module } from 'infrastructure/cloudflareS3/cloudflareS3.module'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { AiDialogueAudioNotificationsModule } from 'infrastructure/redis/aiDialogueAudioNotifications.module'
import { AiDialogueVisualNotificationsModule } from 'infrastructure/redis/aiDialogueVisualNotifications.module'
import { AiDialogueController } from './aiDialogue.controller'
import { AiDialogueDictationWebSocket } from './aiDialogueDictationWebSocket.service'

const services = [
	AiDialogueDictationWebSocket,
	AiDialogueAudioStream,
	PublishAiDialogueAudio,
	AiDialogueAudioUpdates,
	CleanupAiDialogueAudio,
	PrismaService,
	ActiveAiDialogueGenerationRegistry,
	AiDialogueSseHub,
	GenerateAiDialogueTurn,
	SummarizeAiDialogue,
	PublishImageGenerationOutbox,
	AiDialogueVisualUpdates,
	CleanupAiDialogueImages,
]
const commandHandlers = [
	CheckAiDialogueUserMessageHandler,
	UpdateAiDialogueHandler,
	GetAiDialogueAudioHandler,
	CreateAiDialogueHandler,
	CreateAiDialogueMessageHandler,
	DeleteAiDialogueHandler,
	GetAiDialogueHandler,
	GetUserDialoguesHandler,
	GetAiDialogueVisualsHandler,
	OpenAiDialogueStreamHandler,
]
const repositories = [
	AiDialogueAudioRepository,
	AiDialogueMessageRepository,
	AiDialogueTurnRepository,
	ImageGenerationOutboxRepository,
	AiDialogueRepository,
	AiDialogueQueryRepository,
	AiDialogueVisualsRepository,
	AiDialogueImageCleanupRepository,
	AiDialogueScenarioRepository,
	AiDialogueScenarioQueryRepository,
	UserRepository,
]

@Module({
	imports: [
		AiDialogueAudioNotificationsModule,
		CqrsModule,
		LlmProviderModule,
		CloudflareS3Module,
		AiDialogueVisualNotificationsModule,
	],
	controllers: [AiDialogueController],
	providers: [...services, ...commandHandlers, ...repositories, CheckSessionCookieGuard],
})
export class AiDialogueModule {}
