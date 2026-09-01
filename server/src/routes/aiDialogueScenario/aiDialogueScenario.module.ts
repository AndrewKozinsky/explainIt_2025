import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateAiDialogueScenariosHandler } from 'features/aiDialogueScenario/CreateAiDialogueScenarios.command'
import { GetAiDialogueScenariosHandler } from 'features/aiDialogueScenario/GetAiDialogueScenarios.command'
import { AiDialogueScenarioController } from './aiDialogueScenario.controller'

const services = [PrismaService]
const commandHandlers = [CreateAiDialogueScenariosHandler, GetAiDialogueScenariosHandler]
const repositories = [AiDialogueScenarioRepository, AiDialogueScenarioQueryRepository]

@Module({
	imports: [CqrsModule],
	controllers: [AiDialogueScenarioController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class AiDialogueScenarioModule {}
