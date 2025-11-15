import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetOnWordClick } from './fn/selectSentenceAndWord'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useReadingStoreNext } from '../../readingStoreNext'
import { useRef } from 'react'
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

	const wrapperRef = useRef<HTMLSpanElement | null>(null)

	const { onMouseEnter, onMouseLeave } = useWordHoverHandlers(wrapperRef, sentence.id, wordData.id)

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onClick={() => onWordClick(sentence.id, wordData.id)}
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
