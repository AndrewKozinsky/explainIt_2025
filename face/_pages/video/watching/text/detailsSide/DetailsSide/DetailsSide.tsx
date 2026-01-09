import React from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import DetailsHelp from '../DetailsHelp/DetailsHelp'

function DetailsSide() {
	const selectedText = useWatchingStore((s) => s.selectedText)

	if (!selectedText.words.length) {
		return <DetailsHelp />
	}

	return <div>{selectedText.sentence}</div>
}

export default DetailsSide
