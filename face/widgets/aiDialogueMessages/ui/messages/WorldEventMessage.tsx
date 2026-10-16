import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type WorldEventMessageProps = AiDialogueTextMappingProps & {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function WorldEventMessage({ content = '', translation = '', onWordSelect, wordMap }: WorldEventMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--world-event'>
			<AiDialogueContentBlock
				wordMap={wordMap}
				content={content}
				translation={translation}
				onWordSelect={onWordSelect}
			/>
		</div>
	)
}

export default WorldEventMessage
