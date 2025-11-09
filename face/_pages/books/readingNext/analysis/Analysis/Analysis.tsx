import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import HintBlock from '../HintBlock/HintBlock'
import './Analysis.scss'

function Analysis() {
	const selectedSentence = useReadingStoreNext((s) => s.selectedSentence)
	if (selectedSentence.id) {
		return null
	}

	console.log(444)
	return (
		<div className='analysis'>
			<HintBlock />
		</div>
	)
}

export default Analysis
