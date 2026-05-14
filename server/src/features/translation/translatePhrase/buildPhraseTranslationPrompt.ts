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

	return `You are an assistant for learning ${sourceLanguage}.${mediaContext}

You are given this sentence:
"${input.sentenceText}"

The user selected this fragment:
- text: "${input.selectedWord}"
- startOffset: ${input.selectedWordStartOffset}
- endOffset: ${input.selectedWordEndOffset}

Your task:
1) Identify the meaningful phrase related to the selection.
2) Translate that phrase into ${targetLanguage}.
3) Provide short examples.

Return the answer strictly as multiline plain text without markdown and explanations:
- Line 1: phrase in the source language.
- Line 2: translation of this phrase into ${targetLanguage}.
- Line 3: example using the phrase in the source language (optional).
- Line 4: example translation (optional).
- Lines 5+: follow the same paired pattern (example / example translation).

Rules:
- The phrase must be a substring of the source sentence.
- Do not add line numbering, headings, JSON, or field names.
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
