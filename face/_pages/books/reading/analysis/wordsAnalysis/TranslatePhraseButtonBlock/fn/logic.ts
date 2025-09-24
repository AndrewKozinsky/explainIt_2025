import { ChapterTextStructureFull } from '_pages/books/chapterStructureTypes'

export type TranslatedPhrase = { id: number; wordIds: number[] }

export function isMacOS(): boolean {
	if (typeof navigator === 'undefined') return false
	const ua = navigator.userAgent || ''
	const platform = (navigator as any).platform || ''
	return /Mac|Macintosh|Mac OS/.test(ua) || /Mac/.test(platform)
}

export function arraysEqualAsSets(a: number[], b: number[]): boolean {
	if (a.length !== b.length) return false
	const setA = new Set(a)
	for (const id of b) {
		if (!setA.has(id)) return false
	}
	return true
}

export function getWordValueById(wordId: number, sentenceParts: ChapterTextStructureFull.SentencePart[]) {
	const found = sentenceParts.find((p) => p.type === 'word' && p.id === wordId)
	if (!found || found.type !== 'word') {
		return ''
	}

	return found.value
}

export function getSelectedWordsValues(ids: number[], sentenceParts: ChapterTextStructureFull.SentencePart[]) {
	return ids.map((id) => getWordValueById(id, sentenceParts)).filter((v) => v)
}

export function shouldShowParagraph(args: {
	selectedWordIds: number[]
	translatedPhrases: TranslatedPhrase[]
	isLoading: boolean
}) {
	const { selectedWordIds, translatedPhrases, isLoading } = args
	return selectedWordIds.length && !translatedPhrases.length && !isLoading
}

export function getParagraphText() {
	return isMacOS()
		? 'Зажмите cmd для выделения нескольких связанных слов.'
		: 'Зажмите ctrl для выделения нескольких слов.'
}

export function shouldShowButton(selectedWordIds: number[]) {
	return selectedWordIds.length > 0
}

export function getButtonText(args: {
	sentenceTranslation: string | null
	selectedWordIds: number[]
	translatedPhrases: TranslatedPhrase[]
	sentenceParts: ChapterTextStructureFull.SentencePart[]
}) {
	const { sentenceTranslation, selectedWordIds, translatedPhrases, sentenceParts } = args

	// If selection matches any existing translated phrase -> navigate text
	const matchingPhrase = translatedPhrases.find((p) => arraysEqualAsSets(p.wordIds, selectedWordIds))
	if (matchingPhrase) {
		const words = getSelectedWordsValues(selectedWordIds, sentenceParts)
		return `Перейти к ${words.join(' ')}`
	}

	const hasSentenceTranslation = Boolean(sentenceTranslation && sentenceTranslation.length > 0)
	const multiple = selectedWordIds.length > 1

	if (!hasSentenceTranslation) {
		if (!multiple) {
			const word = getWordValueById(selectedWordIds[0], sentenceParts)
			return `Перевести предложение и ${word}`
		}
		return 'Перевести предложение и фразу'
	}

	if (!multiple) {
		const word = getWordValueById(selectedWordIds[0], sentenceParts)
		return `Перевести ${word}`
	}
	return 'Перевести фразу'
}
