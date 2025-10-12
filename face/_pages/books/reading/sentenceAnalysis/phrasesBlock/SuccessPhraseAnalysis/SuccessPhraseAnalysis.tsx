import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import PhraseAnalysisPhrase from '_pages/books/reading/sentenceAnalysis/phrasesBlock/PhraseAnalysisPhrase/PhraseAnalysisPhrase'
import { useGetPhraseData } from './fn/getPhraseData'
import './SuccessPhraseAnalysis.scss'

type SuccessPhraseAnalysisProps = {
	phrase: ChapterTextStructurePopulated.SuccessPhrase
}

function SuccessPhraseAnalysis(props: SuccessPhraseAnalysisProps) {
	const { phrase } = props

	const phraseData = useGetPhraseData(phrase)

	return (
		<div className='phrase-analysis-success'>
			<PhraseAnalysisPhrase>{phraseData.phraseText}</PhraseAnalysisPhrase>
			<p className='phrase-analysis-success__translation'>{phraseData.translation}</p>
			<p className='phrase-analysis-success__analysis'>{phraseData.analysis}</p>
			<PhraseExamples phraseExamples={phraseData.examples} />
		</div>
	)
}

export default SuccessPhraseAnalysis

type PhraseExamplesProps = {
	phraseExamples: {
		id: number
		foreignLang: string
		nativeLang: string
	}[]
}

function PhraseExamples(props: PhraseExamplesProps) {
	const { phraseExamples } = props

	return (
		<div className='phrase-analysis-success__examples'>
			<h4 className='phrase-analysis-success__examples-header'>Примеры</h4>
			{phraseExamples.map((example) => {
				return (
					<div className='phrase-analysis-success__example' key={example.id}>
						<span className='phrase-analysis-success__example-en'>{example.foreignLang}</span> —{' '}
						<span className='phrase-analysis-success__example-ru'>{example.nativeLang}</span>
					</div>
				)
			})}
		</div>
	)
}
