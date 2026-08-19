import SentencePhraseAnalyses from '@/entities/sentencesAndSubtitles/phrase/SentencePhrasesAnalyses/SentencePhraseAnalyses'
import { useDetailsStore } from '../detailsStore'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'

function WordsContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)
	const mediaStore = useMediaStoreContext()
	const languageCode = mediaStore((store) => store.languageCode)

	if (currentInfoView !== 'words') {
		return null
	}

	return <SentencePhraseAnalyses languageCode={languageCode!} />
}

export default WordsContent
