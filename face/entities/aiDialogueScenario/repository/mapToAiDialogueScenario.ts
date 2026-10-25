import type { AiDialogueScenarioOutModel } from '@/shared/api/generated/models'
import { extractString } from '@/shared/utils/extractors'
import type { AiDialogueScenarioModel } from '../AiDialogueScenarioModel'

export function mapToAiDialogueScenario(raw: AiDialogueScenarioOutModel): AiDialogueScenarioModel {
	return {
		id: raw.id,
		slug: extractString(raw.slug),
		title: raw.title,
		description: raw.description,
	}
}
