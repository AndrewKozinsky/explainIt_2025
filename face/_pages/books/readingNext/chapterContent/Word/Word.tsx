import { useRef } from 'react'
import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useLongPress } from 'utils/events'
import { useGetOnWordClick, useGetOnWordLongTap } from './fn/selectSentenceAndWord'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useReadingStoreNext } from '../../readingStoreNext'
import { useWordHoverHandlers } from './fn/useWordHoverHandlers'
import './Word.scss'

type WordProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	wordData: ChapterTextStructurePopulated.Word
}

function Word(props: WordProps) {
	const { sentence, wordData } = props
	const selectedSentence = useReadingStoreNext((state) => state.selection)

	const wordType = getWordPrimaryType(selectedSentence, sentence, wordData.id)
	const onWordClick = useGetOnWordClick()
	const onWordLongTap = useGetOnWordLongTap()

	const { onMouseDown, onMouseUp } = useLongPress({
		onLongPress: () => onWordLongTap(sentence.id, wordData.id),
		onClick: () => onWordClick(sentence.id, wordData.id),
		delay: 500,
		vibrate: 50,
	})

	const wrapperRef = useRef<HTMLSpanElement | null>(null)

	const { onMouseEnter, onMouseLeave } = useWordHoverHandlers(wrapperRef, sentence.id, wordData.id)

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			ref={wrapperRef}
		>
			<span className='word__text' data-text={wordData.value}>
				{wordData.value}
			</span>
		</span>
	)
}

export default Word
