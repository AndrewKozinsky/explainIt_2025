import type { AiDialogueTextMappingProps } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueUi'
import { useDialogueMode } from '../DialogueModeContext'
import SegmentedText from '../SegmentedText/SegmentedText'
import type { DialogueTextSegment } from '../SegmentedText/fn/wordSelection'
import './AiDialogueTextWithTranslation.scss'

type AiDialogueTextWithTranslationProps = AiDialogueTextMappingProps & {
	content: string
	translation?: string
	isTranslationVisible: boolean
	onWordClick: (segment: DialogueTextSegment) => void
	/** Цвет перевода: `inherit` — как у текста, `muted` — серый. */
	translationTone?: 'inherit' | 'muted'
}

function AiDialogueTextWithTranslation({
	content,
	translation,
	wordMap,
	isTranslationVisible,
	onWordClick,
	translationTone = 'inherit',
}: AiDialogueTextWithTranslationProps) {
	const mode = useDialogueMode()

	return (
		<div className='ai-dialogue-text-with-translation'>
			<div className='ai-dialogue-text-with-translation__text'>
				{mode === 'practice' ? (
					<SegmentedText text={content} wordMap={wordMap} onWordClick={onWordClick} />
				) : (
					content
				)}
			</div>

			{mode !== 'exam' && isTranslationVisible && translation ? (
				<p
					className={`ai-dialogue-text-with-translation__translation ai-dialogue-text-with-translation__translation--${translationTone}`}
				>
					{translation}
				</p>
			) : null}
		</div>
	)
}

export default AiDialogueTextWithTranslation
