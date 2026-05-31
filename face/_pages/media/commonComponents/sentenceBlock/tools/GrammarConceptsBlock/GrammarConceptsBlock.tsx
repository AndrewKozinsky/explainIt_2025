import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'
import FetchGrammarConceptsButton from '../FetchGrammarConceptsButton/FetchGrammarConceptsButton'
import GrammarConceptLinks from '../GrammarConceptLinks/GrammarConceptLinks'

type GrammarConceptsBlockProps = {
	sentence: ChapterTextStructurePopulated.Sentence
}

function GrammarConceptsBlock(props: GrammarConceptsBlockProps) {
	const { sentence } = props

	const grammarConcepts = sentence.grammarConcepts
	const missingGrammarConcepts = sentence.missingGrammarConcepts

	return (
		<div>
			{!grammarConcepts ? (
				<FetchGrammarConceptsButton
					sentenceId={sentence.id}
					sentenceText={sentence.sentence}
					sourceLanguage='en'
				/>
			) : (
				<GrammarConceptLinks
					grammarConcepts={grammarConcepts}
					missingGrammarConcepts={missingGrammarConcepts}
				/>
			)}
		</div>
	)
}

export default GrammarConceptsBlock
