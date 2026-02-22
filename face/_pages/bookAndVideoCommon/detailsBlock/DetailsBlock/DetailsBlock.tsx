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
		<div className='details-side'>
			<ViewRouter />
		</div>
	)
}

export default DetailsBlock
