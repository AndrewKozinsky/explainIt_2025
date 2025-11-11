import { getSentenceById } from '_pages/books/readingNext/lib/getSentenceById'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'

export function getTextByPhraseId(sentenceId: number, phraseId: number) {
	const sentence = getSentenceById(sentenceId)
	if (!sentence) return ''

	const phrase = sentence.phrases.find((phrase) => phrase.id === phraseId)
	if (!phrase) return ''

	const words = sentence.parts.reduce((acc, part) => {
		if (part.type === 'word' && phrase.wordIds.includes(part.id)) {
			acc.push(part.value)
		}
		return acc
	}, [] as string[])

	return words.join(' ')
}
export function getTextByWordIds(sentenceId: number, wordIds: number[]) {
	const sentence = getSentenceById(sentenceId)
	if (!sentence) return ''

	const words = sentence.parts.reduce((acc, part) => {
		if (part.type === 'word' && wordIds.includes(part.id)) {
			acc.push(part.value)
		}
		return acc
	}, [] as string[])

	return words.join(' ')
}
