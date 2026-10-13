import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueSceneImage from '../visuals/DialogueSceneImage'
import './AiDialogueMessages.scss'

type SceneUpdateMessageProps = AiDialogueTextMappingProps & {
	audioAddress: Omit<DialogueAudioAddress, 'actionIndex'>
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
	messageId?: number
	reserveSpace: boolean
}

function SceneUpdateMessage({
	audioAddress,
	content = '',
	translation = '',
	onWordSelect,
	messageId,
	reserveSpace,
	wordMap,
}: SceneUpdateMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--scene-update'>
			<DialogueSceneImage messageId={messageId} reserveSpace={reserveSpace} />
			<span className='ai-dialogue-message__label'>Смена сцены</span>
			<AiDialogueContentBlock
				audioAddress={{ ...audioAddress, actionIndex: -1 }}
				wordMap={wordMap}
				content={content}
				translation={translation}
				onWordSelect={onWordSelect}
			/>
		</div>
	)
}

export default SceneUpdateMessage
