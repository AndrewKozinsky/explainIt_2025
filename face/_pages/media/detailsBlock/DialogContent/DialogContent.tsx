import React from 'react'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import SentenceChat from '../../sentenceChat/SentenceChat/SentenceChat'

function DialogContent() {
	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'ai_dialog' || !sentenceId) {
		return null
	}

	return <SentenceChat sentenceId={sentenceId} />
}

export default DialogContent
