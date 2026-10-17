'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import SegmentedText from '@/widgets/aiDialogueMessages/ui/SegmentedText/SegmentedText'
import DialogueAudioButton from '../audio/DialogueAudioButton'
import DialogueTextVisibilityButton from '../DialogueTextVisibilityButton/DialogueTextVisibilityButton'
import { useDialogueContentSelection } from './fn/useDialogueContentSelection'
import { useDialogueTextVisibility } from './fn/useDialogueTextVisibility'
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
	const { isTextVisible, toggleTextVisibility } = useDialogueTextVisibility()
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({
		content,
		onWordSelect,
		wordMap,
	})

	return (
		<div className='ai-dialogue-content-block'>
			<div className='ai-dialogue-content-block__buttons'>
				{audioAddress && <DialogueAudioButton address={audioAddress} />}
				<DialogueTextVisibilityButton isTextVisible={isTextVisible} onClick={toggleTextVisibility} />
			</div>
			{isTextVisible && (
				<>
					<div className='ai-dialogue-content-block__text'>
						<SegmentedText text={content} wordMap={wordMap} onWordClick={handleWordClick} />
					</div>

					{isTranslationVisible && translation ? (
						<div className='ai-dialogue-content-block__translation'>{translation}</div>
					) : null}
				</>
			)}
		</div>
	)
}

export default AiDialogueContentBlock
