import { getAudioAddress, SCENE_AUDIO_ACTION_INDEX } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getReplyTextKey } from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueSceneImage from './DialogueSceneImage'
import './SceneUpdateMessage.scss'

type SceneUpdateMessageProps = AiDialogueTextMappingProps & {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
	/** ID сохранённого сообщения; у превью его нет, и кнопка озвучки не показывается. */
	messageId?: number
	previewEventIndex: number
	reserveSpace: boolean
}

function SceneUpdateMessage({
	content = '',
	translation = '',
	onWordSelect,
	messageId,
	previewEventIndex,
	reserveSpace,
	wordMap,
}: SceneUpdateMessageProps) {
	return (
		<div className='ai-dialogue-message-scene-update'>
			<DialogueSceneImage messageId={messageId} reserveSpace={reserveSpace} />
			<div className='ai-dialogue-message-scene-update__content'>
				<AiDialogueContentBlock
					colorScheme='light'
					replyTextKey={getReplyTextKey(messageId, previewEventIndex, SCENE_AUDIO_ACTION_INDEX)}
					audioAddress={getAudioAddress(messageId, SCENE_AUDIO_ACTION_INDEX)}
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
