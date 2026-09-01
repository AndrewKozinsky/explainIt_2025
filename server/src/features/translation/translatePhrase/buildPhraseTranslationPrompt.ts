import { Language, languages } from 'utils/languages'

type BuildPhraseTranslationPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	sentenceText: string
	selectedWord: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export function buildPhraseTranslationPrompt(input: BuildPhraseTranslationPromptInput) {
	const targetLanguage = languages[input.targetLanguageCode].nameEng
	const sourceLanguage = languages[input.sourceLanguageCode].nameEng

	const mediaContext = buildMediaContext({
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
	})

	return `You are an assistant for learning the ${sourceLanguage} language.${mediaContext}

You are given a sentence:
"${input.sentenceText}"

The user selected a word:
- text: "${input.selectedWord}"
- startOffset: ${input.selectedWordStartOffset}
- endOffset: ${input.selectedWordEndOffset}

Your task:
1) Determine the meaningful phrase the selection belongs to.
2) Translate this phrase into ${targetLanguage}.
3) Give short examples.

Return the answer strictly as multi-line text without markdown and without explanations:
- Line 1: the phrase in the source language.
- Line 2: the translation of this phrase into ${targetLanguage}.
- Line 3: an example of the phrase used in the source language (optional).
- Line 4: the translation of the example (optional).
- Lines 5+ following the same pattern in pairs (example / translation of the example).

Rules:
- phrase must be a substring of the source sentence.
- Do not add line numbering, headings, JSON, or field keys.
- If there are no examples, return only the first 2 lines.`
}

function buildMediaContext(input: {
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) {
	if (input.bookName || input.bookAuthor) {
		const details = [input.bookName ?? '', input.bookAuthor ? `author: ${input.bookAuthor}` : '']
			.filter(Boolean)
			.join(', ')

		return details ? ` Context: book (${details}).` : ''
	}

	if (input.videoName || input.videoYear) {
		const details = [input.videoName ?? '', input.videoYear ? `year: ${input.videoYear}` : '']
			.filter(Boolean)
			.join(', ')
		return details ? ` Context: movie (${details}).` : ''
	}

	return ''
}
