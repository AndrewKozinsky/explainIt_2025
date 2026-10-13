import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import SegmentedText from '@/widgets/aiDialogueMessages/ui/SegmentedText/SegmentedText'
import DialogueAudioButton from '../audio/DialogueAudioButton'
import { useDialogueContentSelection } from './fn/useDialogueContentSelection'
import './AiDialogueContentBlock.scss'

type AiDialogueContentBlockProps = AiDialogueTextMappingProps & {
	audioAddress?: DialogueAudioAddress
	content: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function AiDialogueContentBlock({
	content,
	translation,
	onWordSelect,
	wordMap,
	audioAddress,
}: AiDialogueContentBlockProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({
		content,
		onWordSelect,
		wordMap,
	})

	return (
		<div className='ai-dialogue-content-block'>
			<div className='ai-dialogue-content-block__line'>
				<div className='ai-dialogue-content-block__text'>
					<SegmentedText text={content} wordMap={wordMap} onWordClick={handleWordClick} />
				</div>
				{audioAddress && content && <DialogueAudioButton address={audioAddress} />}
			</div>
			{isTranslationVisible && translation ? (
				<div className='ai-dialogue-content-block__translation'>{translation}</div>
			) : null}
		</div>
	)
}

export default AiDialogueContentBlock
