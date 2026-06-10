import React from 'react'
import { LanguageCode } from 'utils/languages'
import { ChapterTextStructurePopulated } from '@/_pages/media/reading/readingStore'
import SentencePhraseAnalyses from '_pages/media/commonComponents/sentenceBlock/phrase/SentencePhrasesAnalyses/SentencePhraseAnalyses'
import SentenceBlock from '_pages/media/commonComponents/sentenceBlock/SentenceBlock/SentenceBlock'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useReadingStore } from '../../reading/readingStore'

type WordsContentProps = {
	mediaType: 'reading' | 'watching'
}

function WordsContent(props: WordsContentProps) {
	const { mediaType } = props

	const currentInfoView = useDetailsStore((store) => store.currentInfoView)

	if (currentInfoView !== 'words') {
		return null
	}

	if (mediaType === 'reading') {
		return <ReadingDetailsBlock />
	} else if (mediaType === 'watching') {
		return <WatchingDetailsBlock />
	}

	return null
}

export default WordsContent

function ReadingDetailsBlock() {
	const book = useReadingStore((s) => s.book?.data)

	return <SentencePhraseAnalyses languageCode={book?.languageCode!} />
}

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
		<SentenceBlock
			sentence={sentence}
			selectedSentenceId={sentenceId}
			selectedWordId={currentWordId}
			selectWord={selectWord}
			languageCode={languageCode}
			environmentColor='gray'
		/>
	)
}
