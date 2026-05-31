import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'
import GrammarConceptsBlock from '../GrammarConceptsBlock/GrammarConceptsBlock'

type SentenceToolsProps = {
	sentence: ChapterTextStructurePopulated.Sentence
}

function SentenceTools(props: SentenceToolsProps) {
	const { sentence } = props

	return (
		<div>
			<GrammarConceptsBlock sentence={sentence} />
		</div>
	)
}

export default SentenceTools
