import { useMemo } from 'react'
import { offsetsFromWordIds, segmentSentence } from '@/entities/media/model/prepareData'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import { PhraseDictionary } from '@/widgets/dictionary'

function DictionaryContent() {
	const mediaStore = useMediaStoreContext()
	const languageCode = mediaStore((s) => s.languageCode)
	const currentSentenceId = mediaStore((s) => s.selectedSentenceId)
	const currentWordId = mediaStore((s) => s.selectedWordId)
	const currentSentenceText = mediaStore(
		(s) => s.sentences.find((entry) => entry.sentenceId === currentSentenceId)?.sentenceText ?? null,
	)

	const words = useMemo(
		function () {
			if (!currentSentenceText) return []

			return segmentSentence(currentSentenceText, languageCode).map((word) => word.word)
		},
		[currentSentenceText, languageCode],
	)

	const currentWord = useMemo(
		function () {
			if (!currentSentenceText || currentWordId === null || !languageCode) return undefined

			return offsetsFromWordIds({
				sentenceText: currentSentenceText,
				locale: languageCode,
				wordIds: [currentWordId],
			})?.text
		},
		[currentSentenceText, currentWordId, languageCode],
	)

	if (!languageCode) return null

	return <PhraseDictionary languageCode={languageCode} currentWord={currentWord} words={words} />
}

export default DictionaryContent
