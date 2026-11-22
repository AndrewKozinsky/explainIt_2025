import { useTranslations } from 'next-intl'
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import type { DetailsBlockTab } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import { InfoButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/InfoButtonIcon'
import AiDialogueExamInfo from '@/widgets/aiDialogueExam/AiDialogueExamInfo'

export function useAiDialogueExamTabs(scenario: AiDialogueScenarioModel): DetailsBlockTab<'exam'>[] {
	const tPage = useTranslations('aiDialoguePage')

	return [
		{
			id: 'exam',
			label: <InfoButtonIcon />,
			ariaLabel: tPage('tabs.exam'),
			content: <AiDialogueExamInfo scenario={scenario} />,
		},
	]
}
