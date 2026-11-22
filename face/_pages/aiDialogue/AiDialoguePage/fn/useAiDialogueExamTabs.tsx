import { useTranslations } from 'next-intl'
import type { DetailsBlockTab } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import { InfoButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/InfoButtonIcon'
import AiDialogueExamInfo from '@/widgets/aiDialogueExam/AiDialogueExamInfo'

export function useAiDialogueExamTabs(): DetailsBlockTab<'exam'>[] {
	const tPage = useTranslations('aiDialoguePage')

	return [
		{
			id: 'exam',
			icon: <InfoButtonIcon />,
			text: tPage('tabs.exam'),
			content: <AiDialogueExamInfo />,
		},
	]
}
