import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioGroupQueryRepository } from 'repo/aiDialogueScenarioGroup/aiDialogueScenarioGroup.queryRepository'
import { AiDialogueScenarioGroupOutModel } from 'models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model'

export class GetAiDialogueScenarioGroupsCommand implements ICommand {}

@CommandHandler(GetAiDialogueScenarioGroupsCommand)
export class GetAiDialogueScenarioGroupsHandler implements ICommandHandler<GetAiDialogueScenarioGroupsCommand> {
	constructor(private groups: AiDialogueScenarioGroupQueryRepository) {}

	async execute(): Promise<AiDialogueScenarioGroupOutModel[]> {
		return this.groups.getPublicScenarioGroups()
	}
}
