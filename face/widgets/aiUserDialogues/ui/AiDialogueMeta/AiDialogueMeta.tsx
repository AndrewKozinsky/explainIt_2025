import { useTranslations } from 'next-intl'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import DotSeparator from '@/shared/ui/DotSeparator/DotSeparator'
import AiDialogueTime from './AiDialogueTime'
import { getDialogueMeta } from './fn/getDialogueMeta'
import { getDialogueTime } from './fn/getDialogueTime'
import './AiDialogueMeta.scss'

export default function AiDialogueMeta({ dialogue, locale }: { dialogue: AiDialogueListItemModel; locale: string }) {
	const t = useTranslations('userAiDialogues.card')
	const { languageName, level } = getDialogueMeta(dialogue, locale, t('anyLevel'))
	const time = getDialogueTime(dialogue.lastMessage, locale)

	return (
		<p className='ai-dialogue-meta'>
			<span>{languageName}</span>
			<DotSeparator />
			<span>{level}</span>
			{time && (
				<>
					<DotSeparator />
					<AiDialogueTime time={time} />
				</>
			)}
		</p>
	)
}
