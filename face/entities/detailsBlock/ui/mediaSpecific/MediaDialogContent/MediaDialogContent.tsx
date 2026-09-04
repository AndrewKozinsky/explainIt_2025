import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SentenceChat from '@/entities/sentenceChat/ui/SentenceChat/SentenceChat'

function MediaDialogContent() {
	const mediaStore = useMediaStoreContext()
	const sentenceId = mediaStore((s) => s.selectedSentenceId)

	if (!sentenceId) {
		return null
	}

	return <SentenceChat sentenceId={sentenceId} />
}

export default MediaDialogContent
