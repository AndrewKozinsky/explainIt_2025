import { useMemo } from 'react'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { splitDialogueText } from './fn/wordSelection'
import type { DialogueTextSegment } from './fn/wordSelection'
import './SegmentedText.scss'

type SegmentedTextProps = {
	text: string
	wordMap?: AiDialogueWordMapBlock
	onWordClick?: (segment: DialogueTextSegment) => void
}

function SegmentedText({ text, wordMap, onWordClick }: SegmentedTextProps) {
	const segments = useMemo(() => splitDialogueText(text, wordMap), [text, wordMap])
	return (
		<>
			{segments.map((segment) => {
				if (!segment.isWord || !onWordClick) return <span key={segment.start}>{segment.text}</span>

				return (
					<button
						key={segment.start}
						type='button'
						className='segmented-text__word'
						onClick={() => onWordClick(segment)}
					>
						{segment.text}
					</button>
				)
			})}
		</>
	)
}

export default SegmentedText
