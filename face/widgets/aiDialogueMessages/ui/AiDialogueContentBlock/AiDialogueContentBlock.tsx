'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueTextWithTranslation from '../AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import DialogueAudioButton from '../audio/DialogueAudioButton'
import { getHiddenTextPreview } from './fn/getHiddenTextPreview'
import { useDialogueContentSelection } from './fn/useDialogueContentSelection'
import { useReplyTextVisibility } from './fn/useReplyTextVisibility'
import './AiDialogueContentBlock.scss'

type AiDialogueContentBlockProps = AiDialogueTextMappingProps & {
	/** Ключ видимости текста: getReplyTextKey. */
	replyTextKey: string
	/** Есть только у сохранённого сообщения: у превью озвучивать ещё нечего. */
	audioAddress?: DialogueAudioAddress
	colorScheme?: 'dark' | 'light'
	content: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function AiDialogueContentBlock({
	replyTextKey,
	content,
	translation,
	onWordSelect,
	wordMap,
	audioAddress,
	colorScheme = 'dark',
}: AiDialogueContentBlockProps) {
	const { isTextVisible, revealText } = useReplyTextVisibility(replyTextKey)

	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({
		content,
		onWordSelect,
		wordMap,
	})

	// Кнопка скрытого текста появляется, только когда текст уже пришёл.
	const hasHiddenText = !isTextVisible && Boolean(content.trim())

	return (
		<div className='ai-dialogue-content-block'>
			{(audioAddress || hasHiddenText) && (
				<div className='ai-dialogue-content-block__buttons'>
					{audioAddress && <DialogueAudioButton address={audioAddress} colorScheme={colorScheme} />}
					{hasHiddenText && (
						<Button
							size='small'
							theme='outline'
							colorScheme={colorScheme}
							rounded
							onClick={revealText}
							aria-label='Показать текст'
							title='Показать текст'
						>
							{getHiddenTextPreview(content)}
						</Button>
					)}
				</div>
			)}
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
