import { useTranslations } from 'next-intl'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import DotSeparator from '@/shared/ui/content/DotSeparator/DotSeparator'
import { getDialogueMeta } from './fn/getDialogueMeta'
import './AiDialogueMeta.scss'

export default function AiDialogueMeta({ dialogue, locale }: { dialogue: AiDialogueListItemModel; locale: string }) {
	const t = useTranslations('userAiDialogues.card')
	const { languageName, level } = getDialogueMeta(dialogue, locale, t('anyLevel'))

	return (
		<p className='ai-dialogue-meta'>
			<span>{languageName}</span>
			<DotSeparator />
			<span className='ai-dialogue-meta__level'>{level}</span>
		</p>
	)
}
