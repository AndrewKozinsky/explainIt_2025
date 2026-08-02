import SentencePhraseAnalyses from '@/entites/sentencesAndSubtitles/phrase/SentencePhrasesAnalyses/SentencePhraseAnalyses'
import { useDetailsStore } from '../detailsStore'

function WordsContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)
	const languageCode = useDetailsStore((store) => store.languageCode)

	if (currentInfoView !== 'words') {
		return null
	}

	return <SentencePhraseAnalyses languageCode={languageCode!} />
}

export default WordsContent
