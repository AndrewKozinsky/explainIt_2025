import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetAiDialogueScenarioGroupsCommand } from 'features/aiDialogueScenario/GetAiDialogueScenarioGroups.command'
import { AiDialogueScenarioGroupOutModel } from 'models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model'
import { ApiGetAiDialogueScenarioGroups } from './openAPI.decorators'

@ApiTags('AiDialogueScenarioGroup')
@Controller('ai-dialogue-scenario-group')
export class AiDialogueScenarioGroupController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetAiDialogueScenarioGroups()
	@Header('Cache-Control', 'no-store')
	@HttpCode(HttpStatus.OK)
	@Get()
	async getAiDialogueScenarioGroups(): Promise<AiDialogueScenarioGroupOutModel[]> {
		return await this.commandBus.execute(new GetAiDialogueScenarioGroupsCommand())
	}
}
