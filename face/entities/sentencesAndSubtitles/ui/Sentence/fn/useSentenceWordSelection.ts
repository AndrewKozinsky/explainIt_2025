import { useMemo } from 'react'
import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'
import { segmentText } from '@/shared/ui/ClickableText/fn/textSegments'
import type { TextSegment } from '@/shared/ui/ClickableText/fn/textSegments'

type UseSentenceWordSelectionInput = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	/** Сколько слов предложения стоит до этого текста: в субтитрах предложение бывает разбито на части. */
	wordIdOffset: number
}

/**
 * Связывает слова текста предложения со стором материала. Слова в сторе — порядковые номера wordId (с 1)
 * во всём предложении, а в тексте — позиции начала слов, поэтому номер = wordIdOffset + порядок слова в тексте.
 *
 * - Рамка при наведении: фраза, уже переведённая для этого слова, или одно слово, если перевода ещё нет.
 * - Заливка: выбранная фраза предложения, а пока её перевод не пришёл — нажатое слово.
 */
export function useSentenceWordSelection(input: UseSentenceWordSelectionInput) {
	const { sentenceId, sentenceText, selectedSentenceId, selectedWordId, selectWord, wordIdOffset } = input

	const mediaStore = useMediaStoreContext()
	const sentenceEntry = mediaStore((state) => state.sentences.find((entry) => entry.sentenceId === sentenceId))
	const phrases = sentenceEntry?.data.phrases

	const segments = useMemo(() => segmentText(sentenceText), [sentenceText])
	const wordStarts = useMemo(
		() => segments.filter((segment) => segment.isWord).map((segment) => segment.start),
		[segments],
	)

	function getWordId(segment: TextSegment) {
		return wordIdOffset + wordStarts.indexOf(segment.start) + 1
	}

	// То же правило, что при выборе фразы для нажатого слова (useFetchPhraseTranslation).
	function getHighlightedStarts(segment: TextSegment) {
		const wordId = getWordId(segment)
		const phrase = phrases?.find((item) => item.wordIds.includes(wordId))

		return phrase
			? getStartsByWordIds({ wordIds: phrase.wordIds, wordStarts, wordIdOffset })
			: new Set([segment.start])
	}

	const selectedStarts = useMemo(() => {
		if (selectedSentenceId !== sentenceId || selectedWordId === null) return null

		// Сразу после клика выбранная фраза ещё прежняя: пока она не покрывает нажатое слово, заливается только оно.
		const selectedPhrase = phrases?.find((item) => item.randomGeneratedPhraseId === sentenceEntry?.selectedPhraseId)
		const selectedWordIds = selectedPhrase?.wordIds.includes(selectedWordId)
			? selectedPhrase.wordIds
			: [selectedWordId]
		const starts = getStartsByWordIds({ wordIds: selectedWordIds, wordStarts, wordIdOffset })

		return starts.size ? starts : null
	}, [
		selectedSentenceId,
		selectedWordId,
		sentenceId,
		phrases,
		sentenceEntry?.selectedPhraseId,
		wordStarts,
		wordIdOffset,
	])

	function handleWordClick(segment: TextSegment) {
		selectWord({ sentenceId, wordId: getWordId(segment) })
	}

	return { segments, selectedStarts, getHighlightedStarts, handleWordClick }
}

/**
 * Начала слов в тексте по номерам слов предложения. Слова из других частей предложения (соседних субтитров)
 * в этом тексте не рисуются и пропускаются.
 */
function getStartsByWordIds(input: { wordIds: number[]; wordStarts: number[]; wordIdOffset: number }) {
	const { wordIds, wordStarts, wordIdOffset } = input
	const starts = wordIds.map((wordId) => wordStarts[wordId - wordIdOffset - 1])

	return new Set(starts.filter((start) => start !== undefined))
}
