import { useRef } from 'react'
import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useLongPress } from 'utils/events'
import { useGetOnWordClick, useGetOnWordLongTap } from './fn/selectSentenceAndWord'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useWordHoverHandlers } from './fn/useWordHoverHandlers'
import './Word.scss'

type WordProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	wordData: ChapterTextStructurePopulated.Word
}

function Word(props: WordProps) {
	const { sentence, wordData } = props
	const selectedSentence = useReadingStore((state) => state.selection)
	const deviceType = useReadingStore((state) => state.deviceType)

	const wordType = getWordPrimaryType(selectedSentence, sentence, wordData.id)
	const onWordClick = useGetOnWordClick()
	const onWordLongTap = useGetOnWordLongTap()

	const {
		onMouseDown,
		onMouseUp,
		onTouchStart,
		onTouchEnd,
		onTouchMove,
		onTouchCancel,
		onMouseLeave: onLongPressMouseLeave,
	} = useLongPress({
		onLongPress: () => onWordLongTap(sentence.id, wordData.id),
		onClick: () => onWordClick(sentence.id, wordData.id),
		delay: 400,
		vibrate: 50,
	})

	const wrapperRef = useRef<HTMLSpanElement | null>(null)

	const { onMouseEnter, onMouseLeave } = useWordHoverHandlers(wrapperRef, sentence.id, wordData.id)

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTouchCancel={onTouchCancel}
			onMouseEnter={onMouseEnter}
			onMouseLeave={(e) => {
				onMouseLeave()
				onLongPressMouseLeave(e)
			}}
			ref={wrapperRef}
		>
			<span
				className={cn('word__text', deviceType === 'touch' && 'no-select')}
				onContextMenu={(e) => e.preventDefault()}
				data-text={wordData.value}
			>
				{wordData.value}
			</span>
		</span>
	)
}

export default Word
