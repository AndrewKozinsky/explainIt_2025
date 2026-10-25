import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { AiDialogueScenarioGroupQueryRepository } from 'repo/aiDialogueScenarioGroup/aiDialogueScenarioGroup.queryRepository'
import { PrismaService } from 'db/prisma.service'
import { CreateAiDialogueScenariosHandler } from 'features/aiDialogueScenario/CreateAiDialogueScenarios.command'
import { GetAiDialogueScenarioGroupsHandler } from 'features/aiDialogueScenario/GetAiDialogueScenarioGroups.command'
import { AiDialogueScenarioGroupController } from './aiDialogueScenarioGroup.controller'

const services = [PrismaService]
const commandHandlers = [CreateAiDialogueScenariosHandler, GetAiDialogueScenarioGroupsHandler]
const repositories = [AiDialogueScenarioRepository, AiDialogueScenarioGroupQueryRepository]

@Module({
	imports: [CqrsModule],
	controllers: [AiDialogueScenarioGroupController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class AiDialogueScenarioGroupModule {}
