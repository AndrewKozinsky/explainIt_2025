import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioGroupQueryRepository } from 'repo/aiDialogueScenarioGroup/aiDialogueScenarioGroup.queryRepository'
import { Language } from 'utils/languages'
import { AiDialogueScenarioGroupOutModel } from 'models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model'

export class GetAiDialogueScenarioGroupsCommand implements ICommand {
	/** @param locale язык интерфейса, на котором возвращаются названия и описания. */
	constructor(public locale: Language) {}
}

@CommandHandler(GetAiDialogueScenarioGroupsCommand)
export class GetAiDialogueScenarioGroupsHandler implements ICommandHandler<GetAiDialogueScenarioGroupsCommand> {
	constructor(private groups: AiDialogueScenarioGroupQueryRepository) {}

	async execute(command: GetAiDialogueScenarioGroupsCommand): Promise<AiDialogueScenarioGroupOutModel[]> {
		return this.groups.getPublicScenarioGroups(command.locale)
	}
}
