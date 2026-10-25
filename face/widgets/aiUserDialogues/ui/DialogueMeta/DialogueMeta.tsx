import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import DotSeparator from '@/shared/ui/DotSeparator/DotSeparator'
import DialogueTime from './DialogueTime'
import { getDialogueMeta } from './fn/getDialogueMeta'
import { getDialogueTime } from './fn/getDialogueTime'
import './DialogueMeta.scss'

export default function DialogueMeta({ dialogue, locale }: { dialogue: AiDialogueListItemModel; locale: string }) {
	const { languageName, level } = getDialogueMeta(dialogue, locale)
	const time = getDialogueTime(dialogue.lastMessage, locale)

	return (
		<p className='ai-dialogue-card__meta'>
			<span className='ai-dialogue-card__language'>{languageName}</span>
			<DotSeparator />
			<span>{level}</span>
			{time && (
				<>
					<DotSeparator />
					<DialogueTime time={time} />
				</>
			)}
		</p>
	)
}
