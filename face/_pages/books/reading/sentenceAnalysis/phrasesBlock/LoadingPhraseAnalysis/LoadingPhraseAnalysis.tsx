import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import PhraseAnalysisPhrase from '_pages/books/reading/sentenceAnalysis/phrasesBlock/PhraseAnalysisPhrase/PhraseAnalysisPhrase'
import Paragraph from 'ui/Paragraph/Paragraph'
import { useGetPhraseData } from './fn/getPhraseData'
import './LoadingPhraseAnalysis.scss'

type LoadingPhraseAnalysisProps = {
	phrase: ChapterTextStructurePopulated.LoadingPhrase
}

function LoadingPhraseAnalysis(props: LoadingPhraseAnalysisProps) {
	const { phrase } = props

	const phraseData = useGetPhraseData(phrase)

	return (
		<div className='phrase-analysis-loading'>
			<PhraseAnalysisPhrase>{phraseData.phraseText}</PhraseAnalysisPhrase>
			<Paragraph fontSize={14} extraClass='phrase-analysis-loading__loading-text'>
				Перевод…
			</Paragraph>
		</div>
	)
}

export default LoadingPhraseAnalysis
