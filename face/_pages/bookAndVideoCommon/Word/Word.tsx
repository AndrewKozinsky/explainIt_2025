import { useRef } from 'react'
import cn from 'classnames'
import { useSystemStore } from 'stores/systemStore'
import { useLongPress } from 'utils/events'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
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
	const onWordClick = () => selectWord({ sentenceId, wordId })
	const onWordLongTap = () => selectWord({ sentenceId, wordId })

	const {
		onMouseDown,
		onMouseUp,
		onTouchStart,
		onTouchEnd,
		onTouchMove,
		onTouchCancel,
		onMouseLeave: onLongPressMouseLeave,
	} = useLongPress({
		onLongPress: onWordLongTap,
		onClick: onWordClick,
		delay: 400,
		vibrate: 50,
	})

	const wrapperRef = useRef<HTMLSpanElement | null>(null)

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTouchCancel={onTouchCancel}
			ref={wrapperRef}
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
