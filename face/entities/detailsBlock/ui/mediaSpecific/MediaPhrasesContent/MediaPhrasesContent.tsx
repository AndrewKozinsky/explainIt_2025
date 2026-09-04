import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import SentencePhraseAnalyses from '@/entities/sentencesAndSubtitles/ui/phrase/SentencePhrasesAnalyses/SentencePhraseAnalyses'

function MediaPhrasesContent() {
	const mediaStore = useMediaStoreContext()
	const languageCode = mediaStore((store) => store.languageCode)

	return <SentencePhraseAnalyses languageCode={languageCode!} />
}

export default MediaPhrasesContent
