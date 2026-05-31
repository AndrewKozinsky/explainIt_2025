import { LanguageCode } from 'utils/utils'
import { ChapterTextStructurePopulated } from '@/_pages/media/reading/readingStore'
import SentenceBlock from '_pages/media/commonComponents/sentenceBlock/SentenceBlock/SentenceBlock'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import SentenceChat from '_pages/media/sentenceChat/SentenceChat/SentenceChat'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import './WatchingDetailsBlock.scss'

function WatchingDetailsBlock() {
	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentWordId = useDetailsStore((s) => s.currentWordId)
	const languageCode = useWatchingStore((s) => s.video?.data.languageCode as LanguageCode)
	const originalContent = useWatchingStore((s) => s.video?.data.processedContent)
	const sentences = useWatchingStore((s) => s.video?.data.sentences)
	const selectWord = useWatchingStore((s) => s.selectWord)

	const videoSentence = sentences?.find((s) => s.id === sentenceId)

	if (!languageCode || !videoSentence || !originalContent) {
		return null
	}

	const sentence: ChapterTextStructurePopulated.Sentence = {
		id: videoSentence.id,
		sentence: originalContent.slice(
			Math.max(0, videoSentence.startOffset),
			Math.max(0, videoSentence.startOffset) + Math.max(0, videoSentence.length),
		),
		grammarConcepts: videoSentence.grammarConcepts ?? null,
		missingGrammarConcepts: videoSentence.missingGrammarConcepts ?? [],
	}

	return (
		<div className='watching-details-block'>
			<SentenceBlock
				sentence={sentence}
				selectedSentenceId={sentenceId}
				selectedWordId={currentWordId}
				selectWord={selectWord}
				languageCode={languageCode}
				environmentColor='gray'
			/>
			{sentenceId && <SentenceChat sentenceId={sentenceId} />}
		</div>
	)
}

export default WatchingDetailsBlock
