import { useAutoSetProperPhraseId } from './fn/autoSetProperPhraseId'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import HintBlock from '../HintBlock/HintBlock'
import SelectedPhraseAnalyseRouter from '../SelectedPhraseAnalyseRouter/SelectedPhraseAnalyseRouter'
import PhrasesSwitch from '../PhraseSwitch/PhrasesSwitch'
import './Analysis.scss'

function Analysis() {
	useAutoSetProperPhraseId()

	const selection = useReadingStoreNext((s) => s.selection)
	if (!selection.sentenceId) return null

	return (
		<div className='analysis'>
			<PhrasesSwitch />
			<SelectedPhraseAnalyseRouter />
			<HintBlock />
		</div>
	)
}

export default Analysis
