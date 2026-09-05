import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { ActiveAiDialogueGenerationRegistry } from 'features/aiDialogue/ActiveAiDialogueGenerationRegistry.service'
import { AiDialogueSseHub } from 'features/aiDialogue/AiDialogueSseHub.service'
import { CreateAiDialogueHandler } from 'features/aiDialogue/CreateAiDialogue.command'
import { CreateAiDialogueMessageHandler } from 'features/aiDialogue/CreateAiDialogueMessage.command'
import { DeleteAiDialogueHandler } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GenerateAiDialogueTurn } from 'features/aiDialogue/GenerateAiDialogueTurn.service'
import { GetAiDialogueHandler } from 'features/aiDialogue/GetAiDialogue.command'
import { GetUserDialoguesHandler } from 'features/aiDialogue/GetUserDialogues.command'
import { SummarizeAiDialogue } from 'features/aiDialogue/SummarizeAiDialogue.service'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { AiDialogueController } from './aiDialogue.controller'

const services = [
	PrismaService,
	ActiveAiDialogueGenerationRegistry,
	AiDialogueSseHub,
	GenerateAiDialogueTurn,
	SummarizeAiDialogue,
]
const commandHandlers = [
	CreateAiDialogueHandler,
	CreateAiDialogueMessageHandler,
	DeleteAiDialogueHandler,
	GetAiDialogueHandler,
	GetUserDialoguesHandler,
]
const repositories = [
	AiDialogueMessageRepository,
	AiDialogueRepository,
	AiDialogueQueryRepository,
	AiDialogueScenarioRepository,
	AiDialogueScenarioQueryRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [AiDialogueController],
	providers: [...services, ...commandHandlers, ...repositories, CheckSessionCookieGuard],
})
export class AiDialogueModule {}
