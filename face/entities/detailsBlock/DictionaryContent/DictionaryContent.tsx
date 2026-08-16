import { useMemo } from 'react'
import { offsetsFromWordIds, segmentSentence } from '@/entities/detailsBlock/DetailsBlock/fn/wordSegmentation'
import { useDetailsStore } from '@/entities/detailsBlock/detailsStore'
import { PhraseDictionary } from '@/widgets/dictionary'

function DictionaryContent() {
	const currentInfoView = useDetailsStore((store) => store.currentInfoView)
	const languageCode = useDetailsStore((s) => s.languageCode)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const currentWordId = useDetailsStore((s) => s.currentWordId)

	const words = useMemo(
		function () {
			if (!currentSentenceText) return []
			return segmentSentence(currentSentenceText, languageCode).map((word) => word.word)
		},
		[currentSentenceText, languageCode],
	)

	const phrase = useMemo(
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

	if (currentInfoView !== 'dictionary' || !languageCode) {
		return null
	}

	return <PhraseDictionary languageCode={languageCode} phrase={phrase} words={words} />
}

export default DictionaryContent
