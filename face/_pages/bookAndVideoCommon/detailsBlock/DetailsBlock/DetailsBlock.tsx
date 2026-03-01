import ViewportSyncedHeight from 'ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { useTranslateSentence } from '../DetailsSentence/fn/translateSentence'
import ViewRouter from '../ViewRouter/ViewRouter'
import { usePopulateStore } from './fn/populateStore'
import { useSetCorrectView } from './fn/setCorrectView'
import { useFetchReadySentenceAnalysis } from './fn/useFetchReadySentenceAnalysis'
import './DetailsBlock.scss'

function DetailsBlock() {
	usePopulateStore()
	useSetCorrectView()

	useFetchReadySentenceAnalysis()
	useTranslateSentence()

	return (
		<ViewportSyncedHeight extraClass='details-side'>
			<ViewRouter />
		</ViewportSyncedHeight>
	)
}

export default DetailsBlock
