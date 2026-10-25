import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueScenarioSeedData } from './common'
import { cityAndServicesScenarios } from './scenarios/cityAndServicesScenarios'
import { foodAndShoppingScenarios } from './scenarios/foodAndShoppingScenarios'
import { homeAndEverydayLifeScenarios } from './scenarios/homeAndEverydayLifeScenarios'
import { travelScenarios } from './scenarios/travelScenarios'
import { aiDialogueScenarioGroups } from './groups'
import { getPublicScenarioCoverKey } from './publicScenarioCoverKey'

export class CreateAiDialogueScenariosCommand implements ICommand {
	constructor() {}
}

@CommandHandler(CreateAiDialogueScenariosCommand)
export class CreateAiDialogueScenariosHandler implements ICommandHandler<CreateAiDialogueScenariosCommand> {
	constructor(
		private aiDialogueScenarioRepository: AiDialogueScenarioRepository,
		private mainConfig: MainConfigService,
	) {}

	async execute() {
		const { mode } = this.mainConfig.get()

		const scenarios = this.getScenariosData().map((scenario) => ({
			...scenario,
			coverS3Key: getPublicScenarioCoverKey(mode, scenario.slug),
		}))

		await this.aiDialogueScenarioRepository.synchronizePublicScenarios(aiDialogueScenarioGroups, scenarios)
	}

	getScenariosData(): AiDialogueScenarioSeedData[] {
		return [
			...travelScenarios,
			...foodAndShoppingScenarios,
			...cityAndServicesScenarios,
			...homeAndEverydayLifeScenarios,
		]
	}
}
