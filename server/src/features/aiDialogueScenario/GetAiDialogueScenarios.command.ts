import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioQueryRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.queryRepository'

export class GetAiDialogueScenariosCommand implements ICommand {
	constructor() {}
}

@CommandHandler(GetAiDialogueScenariosCommand)
export class GetAiDialogueScenariosHandler implements ICommandHandler<GetAiDialogueScenariosCommand> {
	constructor(private aiDialogueScenarioQueryRepository: AiDialogueScenarioQueryRepository) {}

	async execute() {
		return await this.aiDialogueScenarioQueryRepository.getPublicScenarios()
	}
}
