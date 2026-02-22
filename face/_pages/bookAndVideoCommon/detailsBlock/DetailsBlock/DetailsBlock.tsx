// import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
// import { useAutoTranslateSentence } from '_pages/bookAndVideoCommon/selectedSentence/DetailsSentence/fn/useAutoTranslateSentence'
// import { SelectedSentence } from '_pages/bookAndVideoCommon/selectedSentence/SelectedSentence/SelectedSentence'
// import SentenceAnalysis from '_pages/bookAndVideoCommon/selectedSentence/SentenceAnalysis/SentenceAnalysis'
// import { useSelectedSentenceStore } from '../selectedSentenceStore'
import ViewRouter from '../ViewRouter/ViewRouter'
import { usePopulateStore } from './fn/populateStore'
import { useSetCorrectView } from './fn/setCorrectView'
// import { useSyncSentenceTranslations } from './fn/useSyncSentenceTranslations'
import './SelectedSentenceBlock.scss'

function DetailsBlock() {
	usePopulateStore()
	useSetCorrectView()

	// useSyncSentenceTranslations()
	// const { errorText } = useAutoTranslateSentence()

	// const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	// const wordIds = useSelectedSentenceStore((s) => s.wordIds)

	// if (!sentenceId || !wordIds.length) return null

	return (
		<div className='details-side'>
			<ViewRouter />
		</div>
	)
}

export default DetailsBlock
