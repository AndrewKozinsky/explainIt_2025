import HintBlock from '_pages/books/readingNext/analysis/HintBlock/HintBlock'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import './Analysis.scss'

function Analysis() {
	const selectedSentenceId = useReadingStoreNext((s) => s.selectedSentenceId)
	if (!selectedSentenceId) {
		return null
	}

	return (
		<div className='analysis'>
			<HintBlock />
		</div>
	)
}

export default Analysis
