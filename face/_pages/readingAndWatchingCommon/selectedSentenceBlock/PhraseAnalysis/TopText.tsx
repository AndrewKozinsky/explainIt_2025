// import React from 'react'
// import Spinner from 'ui/Spinner/Spinner'
// import { useWatchingStore } from '_pages/video/watching/watchingStore'

/*function TopText() {
	return (
		<div className='phrase-analysis__top-text'>
			<EngText />
			<Circle />
			<RusText />
			<Transcription />
		</div>
	)
}*/

// export default TopText

/*function EngText() {
	const analysis = useWatchingStore((s) => s.analysis)

	return analysis.engText
}*/

/*function Circle() {
	const analysis = useWatchingStore((s) => s.analysis)
	const isLoading = analysis.analysis.type === 'loading'
	const isError = analysis.analysis.type === 'error'

	if (isError) {
		return null
	}

	return (
		<div className='phrase-analysis__top-text-circle'>
			{isLoading ? (
				<div className='phrase-analysis__circle-loading'>
					<Spinner />
				</div>
			) : (
				<span className='phrase-analysis__top-text-circle-arrow'>→</span>
			)}
		</div>
	)
}*/

/*function RusText() {
	const analysis = useWatchingStore((s) => s.analysis)
	if (analysis.analysis.type !== 'data') {
		return null
	}

	return analysis.analysis.rusText
}*/

/*function Transcription() {
	const analysis = useWatchingStore((s) => s.analysis)
	if (analysis.analysis.type !== 'data' || !analysis.analysis.transcription) {
		return null
	}

	return <span className='phrase-analysis__top-text-transcription'>{analysis.analysis.transcription}</span>
}*/
