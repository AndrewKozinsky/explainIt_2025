import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { AiDialogueScenarioSeedData } from './common'
import { englishScenarios } from './english/scenarios'

export class CreateAiDialogueScenariosCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateAiDialogueScenariosCommand)
export class CreateAiDialogueScenariosHandler implements ICommandHandler<CreateAiDialogueScenariosCommand> {
	constructor(private aiDialogueScenarioRepository: AiDialogueScenarioRepository) {}

	async execute() {
		for (const scenarioData of this.getScenariosData()) {
			await this.getOrCreateScenario(scenarioData)
		}
	}

	getScenariosData(): AiDialogueScenarioSeedData[] {
		return [...englishScenarios]
	}

	async getOrCreateScenario(scenarioData: AiDialogueScenarioSeedData) {
		const existingScenario = await this.aiDialogueScenarioRepository.getScenarioBySlug(scenarioData.slug)
		if (existingScenario) {
			return existingScenario.id
		}

		const newScenario = await this.aiDialogueScenarioRepository.createScenario(scenarioData)
		return newScenario.id
	}
}
