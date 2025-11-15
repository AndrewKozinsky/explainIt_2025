import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetOnWordClick } from './fn/selectSentenceAndWord'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useReadingStoreNext } from '../../readingStoreNext'
import './Word.scss'
import { useMemo, useRef, useState } from 'react'
import ChapterTooltip from '../../chapter/ChapterTooltip/ChapterTooltip'

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
	const [isHovered, setIsHovered] = useState(false)

	const successPhrases = useMemo(() => {
		return sentence.phrases.filter((phrase): phrase is ChapterTextStructurePopulated.SuccessPhrase => {
			return phrase.type === 'success' && phrase.wordIds.includes(wordData.id)
		})
	}, [sentence.phrases, wordData.id])


	const open = successPhrases.length > 0 && isHovered

	return (
		<span
			className={cn('word', 'word--' + wordType)}
			onClick={() => onWordClick(sentence.id, wordData.id)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			ref={wrapperRef}
		>
			<span className='word__text' data-text={wordData.value}>
				{wordData.value}
			</span>
			<ChapterTooltip anchorEl={wrapperRef.current} open={open} phrases={successPhrases} />
		</span>
	)
}

export default Word
