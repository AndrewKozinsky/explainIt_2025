import { useMemo } from 'react'
import { offsetsFromWordIds } from '@/entities/media/model/prepareData'
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
	const currentPhraseText = mediaStore((s) => {
		const entry = s.sentences.find((item) => item.sentenceId === currentSentenceId)
		const phrase = entry?.data.phrases.find((item) => item.randomGeneratedPhraseId === entry.selectedPhraseId)

		return phrase && !phrase.loading ? phrase.phrase : null
	})

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

	const words = useMemo(
		() => [currentWord, currentPhraseText].filter((word): word is string => Boolean(word)),
		[currentWord, currentPhraseText],
	)

	if (!languageCode) return null

	return <PhraseDictionary languageCode={languageCode} currentWord={currentWord} words={words} />
}

export default DictionaryContent
