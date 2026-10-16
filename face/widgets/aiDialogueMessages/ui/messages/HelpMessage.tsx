import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type HelpMessageProps = AiDialogueTextMappingProps & {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function HelpMessage({ content = '', translation = '', onWordSelect, wordMap }: HelpMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--help'>
			<AiDialogueContentBlock
				wordMap={wordMap}
				content={content}
				translation={translation}
				onWordSelect={onWordSelect}
			/>
		</div>
	)
}

export default HelpMessage
