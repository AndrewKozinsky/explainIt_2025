import { isWordAnalyzed } from '_pages/books/reading/chapter/ChapterText/fn/isWordAnalyzed'
import cn from 'classnames'
import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetSelectSentenceAndWord } from './fn/selectSentenceAndWord'

type WordProps = {
	sentence: ChapterTextStructurePopulated.Sentence
	wordData: ChapterTextStructurePopulated.Word
}

function Word(props: WordProps) {
	const { sentence, wordData } = props

	const selectSentenceAndWord = useGetSelectSentenceAndWord()
	const isAnalyzed = isWordAnalyzed(sentence, wordData.id)

	return (
		<span
			className={cn('chapter-text__word', isAnalyzed && 'chapter-text__word--selected')}
			onClick={() => selectSentenceAndWord(sentence.id, wordData.id)}
		>
			{wordData.value}
		</span>
	)
}

export default Word
