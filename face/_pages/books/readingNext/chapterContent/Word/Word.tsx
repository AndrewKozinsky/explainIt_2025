import { getWordType } from '_pages/books/readingNext/chapterContent/Word/fn/getWordType'
import cn from 'classnames'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetOnWordClick } from './fn/selectSentenceAndWord'
import './Word.scss'

type WordProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	wordData: ChapterTextStructurePopulated.Word
}

function Word(props: WordProps) {
	const { sentence, wordData } = props

	const wordType = getWordType(sentence, wordData.id)
	const onWordClick = useGetOnWordClick()

	return (
		<span className={cn('word', 'word--' + wordType)} onClick={() => onWordClick(sentence.id, wordData.id)}>
			<span className='word__text'>{wordData.value}</span>
		</span>
	)
}

export default Word
