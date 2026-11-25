import { useTranslations } from 'next-intl'
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import type { DetailsBlockTab } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import { InfoButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/InfoButtonIcon'
import { SettingsButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/SettingsButtonIcon'
import AiDialogueExamInfo from '@/widgets/aiDialogue/aiDialogueExam/AiDialogueExamInfo'
import AiDialogueSettings from '@/widgets/aiDialogue/aiDialogueSettings/AiDialogueSettings'

export function useAiDialogueExamTabs(scenario: AiDialogueScenarioModel): DetailsBlockTab<'exam' | 'settings'>[] {
	const tPage = useTranslations('aiDialoguePage')

	return [
		{
			id: 'exam',
			label: <InfoButtonIcon />,
			ariaLabel: tPage('tabs.exam'),
			content: <AiDialogueExamInfo scenario={scenario} />,
		},
		{
			id: 'settings',
			label: <SettingsButtonIcon />,
			ariaLabel: tPage('tabs.settings'),
			content: <AiDialogueSettings mode='exam' />,
		},
	]
}
