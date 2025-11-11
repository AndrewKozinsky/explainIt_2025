import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetOnWordClick } from './fn/selectSentenceAndWord'
import { getWordPrimaryType } from './fn/getWordPrimaryType'
import { useReadingStoreNext } from '../../readingStoreNext'
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

	return (
		<span className={cn('word', 'word--' + wordType)} onClick={() => onWordClick(sentence.id, wordData.id)}>
			<span className='word__text' data-text={wordData.value}>
				{wordData.value}
			</span>
		</span>
	)
}

export default Word
