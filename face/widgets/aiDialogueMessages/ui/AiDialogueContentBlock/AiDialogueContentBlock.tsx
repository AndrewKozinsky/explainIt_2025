'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueTextWithTranslation from '../AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import DialogueAudioButton from '../audio/DialogueAudioButton'
import DialogueTextVisibilityButton from '../DialogueTextVisibilityButton/DialogueTextVisibilityButton'
import { useDialogueContentSelection } from './fn/useDialogueContentSelection'
import { useDialogueTextVisibility } from './fn/useDialogueTextVisibility'
import './AiDialogueContentBlock.scss'

type AiDialogueContentBlockProps = AiDialogueTextMappingProps & {
	audioAddress?: DialogueAudioAddress
	colorScheme?: 'dark' | 'light'
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
	colorScheme = 'dark',
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
				{audioAddress && <DialogueAudioButton address={audioAddress} colorScheme={colorScheme} />}
				<DialogueTextVisibilityButton
					isTextVisible={isTextVisible}
					onClick={toggleTextVisibility}
					colorScheme={colorScheme}
				/>
			</div>
			{isTextVisible && (
				<AiDialogueTextWithTranslation
					content={content}
					translation={translation}
					wordMap={wordMap}
					isTranslationVisible={isTranslationVisible}
					onWordClick={handleWordClick}
				/>
			)}
		</div>
	)
}

export default AiDialogueContentBlock
