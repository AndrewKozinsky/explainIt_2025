import { useDetailsStore } from '_pages/bookAndVideoCommon/detailsBlock/detailsStore'
import { SelectedSentence } from '../SelectedSentence/SelectedSentence'
import SentenceAnalysis from '../SentenceAnalysis/SentenceAnalysis'
import { SentenceTranslation } from '../SentenceTranslation/SentenceTranslation'
import './AnalysisBlock.scss'

export function AnalysisBlock() {
	const sentenceAnalysisLoading = useDetailsStore((store) => store.sentenceAnalysisLoading)
	const sentenceAnalysisError = useDetailsStore((store) => store.sentenceAnalysisError)

	if (sentenceAnalysisLoading) {
		return <AnalysisBlockLoading />
	}

	if (sentenceAnalysisError) {
		return <AnalysisBlockError />
	}

	return <AnalysisBlockSuccess />
}

function AnalysisBlockLoading() {
	return <div>AnalysisBlockLoading</div>
}

function AnalysisBlockError() {
	return <div>AnalysisBlockError</div>
}

function AnalysisBlockSuccess() {
	return (
		<div className='analysis-block__data'>
			<SelectedSentence />
			<SentenceTranslation />
			<SentenceAnalysis />
		</div>
	)
}
