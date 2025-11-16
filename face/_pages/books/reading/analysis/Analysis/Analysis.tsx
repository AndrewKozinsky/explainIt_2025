import { useAutoSetProperPhraseId } from './fn/autoSetProperPhraseId'
import { useReadingStore } from '_pages/books/reading/readingStore'
import HintBlock from '../HintBlock/HintBlock'
import SelectedPhraseAnalyseRouter from '../SelectedPhraseAnalyseRouter/SelectedPhraseAnalyseRouter'
import PhrasesSwitch from '../PhraseSwitch/PhrasesSwitch'
import './Analysis.scss'

function Analysis() {
	useAutoSetProperPhraseId()

	const selection = useReadingStore((s) => s.selection)
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
