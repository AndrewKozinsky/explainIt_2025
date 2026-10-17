import type { AiDialogueTextMappingProps } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import SegmentedText from '../SegmentedText/SegmentedText'
import type { DialogueTextSegment } from '../SegmentedText/fn/wordSelection'
import './AiDialogueTextWithTranslation.scss'

type AiDialogueTextWithTranslationProps = AiDialogueTextMappingProps & {
	content: string
	translation?: string
	isTranslationVisible: boolean
	onWordClick: (segment: DialogueTextSegment) => void
}

function AiDialogueTextWithTranslation({
	content,
	translation,
	wordMap,
	isTranslationVisible,
	onWordClick,
}: AiDialogueTextWithTranslationProps) {
	return (
		<div className='ai-dialogue-text-with-translation'>
			<div className='ai-dialogue-text-with-translation__text'>
				<SegmentedText text={content} wordMap={wordMap} onWordClick={onWordClick} />
			</div>

			{isTranslationVisible && translation ? (
				<p className='ai-dialogue-text-with-translation__translation'>{translation}</p>
			) : null}
		</div>
	)
}

export default AiDialogueTextWithTranslation
