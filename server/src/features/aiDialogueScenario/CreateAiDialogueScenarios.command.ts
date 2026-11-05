import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueScenarioGroupSeedData, AiDialogueScenarioSeedData } from './common'
import { aiDialogueScenarioGroups } from './groups'
import { getPublicScenarioCoverKey } from './publicScenarioCoverKey'
import { cityAndServicesScenarios } from './scenarios/cityAndServicesScenarios'
import { foodAndShoppingScenarios } from './scenarios/foodAndShoppingScenarios'
import { homeAndEverydayLifeScenarios } from './scenarios/homeAndEverydayLifeScenarios'
import { travelScenarios } from './scenarios/travelScenarios'

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

		await this.aiDialogueScenarioRepository.synchronizePublicScenarios(this.getGroupsData(), scenarios)
	}

	/**
	 * Группы в порядке вывода: по первому сценарию группы в getScenariosData().
	 * Группы без сценариев идут в конце в порядке groups.ts (на странице они не выводятся).
	 */
	getGroupsData(): AiDialogueScenarioGroupSeedData[] {
		const groupOrder = [...new Set(this.getScenariosData().map((scenario) => scenario.groupSlug))]
		const getRank = (group: AiDialogueScenarioGroupSeedData) => {
			const index = groupOrder.indexOf(group.slug)
			return index === -1 ? groupOrder.length : index
		}

		// Array.prototype.sort стабильна: группы без сценариев сохраняют порядок groups.ts.
		return [...aiDialogueScenarioGroups].sort((a, b) => getRank(a) - getRank(b))
	}

	/** Все публичные сценарии в порядке вывода на странице: порядок групп и сценариев внутри них. */
	getScenariosData(): AiDialogueScenarioSeedData[] {
		return [
			...travelScenarios,
			...foodAndShoppingScenarios,
			...cityAndServicesScenarios,
			...homeAndEverydayLifeScenarios,
		]
	}
}
