import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

function SentenceAnalysis() {
	const translation = useSelectedSentenceStore((s) => s.translation)
	const analysis = useSelectedSentenceStore((s) => s.analysis)

	if (!translation && !analysis) return null

	return (
		<div className='sentence-analysis'>
			{translation ? <div className='sentence-analysis__translation'>{translation}</div> : null}
			{analysis ? <div className='sentence-analysis__analysis'>{analysis}</div> : null}
		</div>
	)
}

export default SentenceAnalysis
