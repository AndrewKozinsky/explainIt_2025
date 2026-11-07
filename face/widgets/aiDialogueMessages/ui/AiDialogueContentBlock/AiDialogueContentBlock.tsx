'use client'

import { useTranslations } from 'next-intl'
import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import DialogueAudioButton from '../audio/DialogueAudioButton'
import SegmentedText from '../SegmentedText/SegmentedText'
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

/**
 * Реплика NPC или описание сцены. Кнопка воспроизведения, кнопка скрытого текста и сам текст стоят в одной строке:
 * кнопки — в начале первой строки текста.
 */
function AiDialogueContentBlock({
	replyTextKey,
	content,
	translation,
	onWordSelect,
	wordMap,
	audioAddress,
	colorScheme = 'dark',
}: AiDialogueContentBlockProps) {
	const t = useTranslations('aiDialogueMessages')
	const { isTextVisible, revealText } = useReplyTextVisibility(replyTextKey)

	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({
		content,
		onWordSelect,
		wordMap,
	})

	// Кнопка скрытого текста появляется, только когда текст уже пришёл.
	const hasHiddenText = !isTextVisible && Boolean(content.trim())

	return (
		<div className={`ai-dialogue-content-block ai-dialogue-content-block--${colorScheme}`}>
			<div className='ai-dialogue-content-block__line'>
				{audioAddress && (
					<span className='ai-dialogue-content-block__button'>
						<DialogueAudioButton address={audioAddress} colorScheme={colorScheme} />
					</span>
				)}
				{hasHiddenText && (
					<span className='ai-dialogue-content-block__button'>
						<Button
							size='small'
							theme='outline'
							colorScheme={colorScheme}
							rounded
							onClick={revealText}
							aria-label={t('showText')}
							title={t('showText')}
						>
							{getHiddenTextPreview(content)}
						</Button>
					</span>
				)}
				{isTextVisible && <SegmentedText text={content} wordMap={wordMap} onWordClick={handleWordClick} />}
			</div>

			{isTextVisible && isTranslationVisible && translation ? (
				<p className='ai-dialogue-content-block__translation'>{translation}</p>
			) : null}
		</div>
	)
}

export default AiDialogueContentBlock
