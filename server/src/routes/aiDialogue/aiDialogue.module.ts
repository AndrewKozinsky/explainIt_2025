import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateAiDialogueHandler } from 'features/aiDialogue/CreateAiDialogue.command'
import { DeleteAiDialogueHandler } from 'features/aiDialogue/DeleteAiDialogue.command'
import { GetUserDialoguesHandler } from 'features/aiDialogue/GetUserDialogues.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiDialogueController } from './aiDialogue.controller'

const services = [PrismaService]
const commandHandlers = [CreateAiDialogueHandler, DeleteAiDialogueHandler, GetUserDialoguesHandler]
const repositories = [
	AiDialogueRepository,
	AiDialogueQueryRepository,
	AiDialogueScenarioRepository,
	AiDialogueScenarioQueryRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [AiDialogueController],
	providers: [...services, ...commandHandlers, ...repositories, CheckSessionCookieGuard],
})
export class AiDialogueModule {}
