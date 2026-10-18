import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueSceneImage from './DialogueSceneImage'
import './SceneUpdateMessage.scss'

type SceneUpdateMessageProps = AiDialogueTextMappingProps & {
	textVisibilityKey: string
	audioAddress: Omit<DialogueAudioAddress, 'actionIndex'>
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
	messageId?: number
	reserveSpace: boolean
}

function SceneUpdateMessage({
	textVisibilityKey,
	audioAddress,
	content = '',
	translation = '',
	onWordSelect,
	messageId,
	reserveSpace,
	wordMap,
}: SceneUpdateMessageProps) {
	return (
		<div className='ai-dialogue-message-scene-update'>
			<DialogueSceneImage messageId={messageId} reserveSpace={reserveSpace} />
			<div className='ai-dialogue-message-scene-update__content'>
				<AiDialogueContentBlock
					textVisibilityKey={textVisibilityKey}
					colorScheme='light'
					audioAddress={{ ...audioAddress, actionIndex: -1 }}
					wordMap={wordMap}
					content={content}
					translation={translation}
					onWordSelect={onWordSelect}
				/>
			</div>
		</div>
	)
}

export default SceneUpdateMessage
