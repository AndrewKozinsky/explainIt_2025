import { useWatchingStore } from '_pages/video/watching/watchingStore'
import React from 'react'

function DetailsSide() {
	const selectedText = useWatchingStore((s) => s.selectedText)
	console.log(selectedText.sentence)
	console.log(selectedText.words)

	return <div>DetailsSide 2</div>
}

export default DetailsSide
