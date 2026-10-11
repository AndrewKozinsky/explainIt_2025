import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import SegmentedText from '@/widgets/aiDialogueMessages/ui/SegmentedText/SegmentedText'
import { useDialogueContentSelection } from './fn/useDialogueContentSelection'
import './AiDialogueContentBlock.scss'

type AiDialogueContentBlockProps = AiDialogueTextMappingProps & {
	content: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function AiDialogueContentBlock({ content, translation, onWordSelect, wordMap }: AiDialogueContentBlockProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({
		content,
		onWordSelect,
		wordMap,
	})

	return (
		<div className='ai-dialogue-content-block'>
			<SegmentedText text={content} wordMap={wordMap} onWordClick={handleWordClick} />
			{isTranslationVisible && translation ? (
				<div className='ai-dialogue-content-block__translation'>{translation}</div>
			) : null}
		</div>
	)
}

export default AiDialogueContentBlock
