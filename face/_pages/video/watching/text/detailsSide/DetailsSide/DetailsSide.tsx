import React from 'react'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import DetailsHelp from '../DetailsHelp/DetailsHelp'
import DetailsSentence from '../DetailsSentence/DetailsSentence'
import PhraseAnalysis from '../PhraseAnalysis/PhraseAnalysis'
import './DetailsSide.scss'

function DetailsSide() {
	const selectedText = useWatchingStore((s) => s.selectedText)
	const selectedItem = selectedText.subtitle ?? selectedText.plainText

	if (!selectedItem || !selectedItem.wordsTexts.length) {
		return <DetailsHelp />
	}

	return (
		<div className='details-side'>
			<DetailsSentence />
			<PhraseAnalysis />
		</div>
	)
}

export default DetailsSide
