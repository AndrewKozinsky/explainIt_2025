'use client'

import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { useDialogueContentSelection } from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import './WorldEventMessage.scss'

type WorldEventMessageProps = AiDialogueTextMappingProps & {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function WorldEventMessage({ content = '', translation = '', onWordSelect, wordMap }: WorldEventMessageProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({ content, onWordSelect, wordMap })

	return (
		<div className='world-event-message'>
			<AiDialogueTextWithTranslation
				wordMap={wordMap}
				content={content}
				translation={translation}
				isTranslationVisible={isTranslationVisible}
				onWordClick={handleWordClick}
			/>
		</div>
	)
}

export default WorldEventMessage
