import DetailsSentence from '_pages/video/watching/text/detailsSide/DetailsSentence/DetailsSentence'
import React from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import DetailsHelp from '../DetailsHelp/DetailsHelp'

function DetailsSide() {
	const selectedText = useWatchingStore((s) => s.selectedText)
	const selectedItem = selectedText.subtitle ?? selectedText.plainText

	if (!selectedItem || !selectedItem.wordsTexts.length) {
		return <DetailsHelp />
	}

	return <DetailsSentence />
}

export default DetailsSide
