import cn from 'classnames'
import { useSystemStore } from 'stores/systemStore'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useWordSelectHandlers } from './fn/useWordSelectHandlers'
import './Word.scss'

type WordProps = {
	sentenceId: number
	wordId: number
	text: string
	selectedSentenceId: null | number
	selectedWordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

function Word(props: WordProps) {
	const { sentenceId, wordId, text, selectedSentenceId, selectedWordIds, selectWord } = props
	const deviceType = useSystemStore((state) => state.deviceType)

	const wordType = getWordPrimaryType({ selectedSentenceId, selectedWordIds, sentenceId, wordId })

	const { onClick, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = useWordSelectHandlers({
		deviceType,
		thresholdPx: 5,
		onSelect: () => selectWord({ sentenceId, wordId }),
	})

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onClick={onClick}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTouchCancel={onTouchCancel}
		>
			<span
				className={cn('word__text', deviceType === 'touch' && 'no-select')}
				onContextMenu={(e) => e.preventDefault()}
			>
				{text}
			</span>
		</span>
	)
}

export default Word
