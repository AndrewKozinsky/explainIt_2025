import React from 'react'
import { useDetailsStore } from '@/entities/detailsBlock/detailsStore'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SentenceChat from '@/entities/sentenceChat/ui/SentenceChat/SentenceChat'

function DialogContent() {
	const mediaStore = useMediaStoreContext()
	const sentenceId = mediaStore((s) => s.selectedSentenceId)
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'ai_dialog' || !sentenceId) {
		return null
	}

	return <SentenceChat sentenceId={sentenceId} />
}

export default DialogContent
