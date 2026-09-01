import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetAiDialogueScenariosCommand } from 'features/aiDialogueScenario/GetAiDialogueScenarios.command'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'
import { ApiGetAiDialogueScenarios } from './openAPI.decorators'

@ApiTags('AiDialogueScenario')
@Controller('ai-dialogue-scenario')
export class AiDialogueScenarioController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetAiDialogueScenarios()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getAiDialogueScenarios(): Promise<AiDialogueScenarioOutModel[]> {
		return await this.commandBus.execute(new GetAiDialogueScenariosCommand())
	}
}
