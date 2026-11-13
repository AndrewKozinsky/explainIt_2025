import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueScenarioRepository } from 'repo/aiDialogueScenario/aiDialogueScenario.repository'
import { sportsLeisureScenarios } from 'features/aiDialogueScenario/scenarios/sportsLeisureScenarios'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueScenarioGroupSeedData, AiDialogueScenarioSeedData } from './common'
import { aiDialogueScenarioGroups } from './groups'
import { getPublicScenarioCoverKey } from './publicScenarioCoverKey'
import { cityAndServicesScenarios } from './scenarios/cityAndServicesScenarios'
import { doorKnocksScenarios } from './scenarios/doorKnocksScenarios'
import { foodAndShoppingScenarios } from './scenarios/foodAndShoppingScenarios'
import { homeAndEverydayLifeScenarios } from './scenarios/homeAndEverydayLifeScenarios'
import { immigrationScenarios } from './scenarios/immigrationScenarios'
import { kidsFamilyScenarios } from './scenarios/kidsFamilyScenarios'
import { localServicesScenarios } from './scenarios/localServicesScenarios'
import { misunderstandingsAndConflictsScenarios } from './scenarios/misunderstandingsAndConflictsScenarios'
import { relationshipsScenarios } from './scenarios/relationshipsScenarios'
import { techServicesScenarios } from './scenarios/techServicesScenarios'
import { transportCarScenarios } from './scenarios/transportCarScenarios'
import { travelScenarios } from './scenarios/travelScenarios'
import { unexpectedEncountersScenarios } from './scenarios/unexpectedEncountersScenarios'
import { workScenarios } from './scenarios/workScenarios'

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
			const firstScenarioIndex = groupOrder.indexOf(group.slug)
			return firstScenarioIndex === -1 ? groupOrder.length : firstScenarioIndex
		}

		// Array.prototype.sort стабильна: группы без сценариев сохраняют порядок groups.ts.
		return [...aiDialogueScenarioGroups].sort((groupA, groupB) => getRank(groupA) - getRank(groupB))
	}

	/** Все публичные сценарии в порядке вывода на странице: порядок групп и сценариев внутри них. */
	getScenariosData(): AiDialogueScenarioSeedData[] {
		return [
			...travelScenarios,
			...foodAndShoppingScenarios,
			...cityAndServicesScenarios,
			...homeAndEverydayLifeScenarios,
			...doorKnocksScenarios,
			...immigrationScenarios,
			...relationshipsScenarios,
			...misunderstandingsAndConflictsScenarios,
			...unexpectedEncountersScenarios,
			...workScenarios,
			// ...healthEmergencyScenarios,
			...transportCarScenarios,
			// ...moneyBankingScenarios,
			// ...studyScenarios,
			...kidsFamilyScenarios,
			...techServicesScenarios,
			...localServicesScenarios,
			...sportsLeisureScenarios,
		]
	}
}
