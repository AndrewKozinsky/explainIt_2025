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
1) Translate the selected word into ${targetLanguage}. By default, translate ONLY the selected word — do NOT expand it into a larger phrase.
2) Exception: expand the selection ONLY when the selected word belongs to a multi-word unit whose meaning cannot be derived by translating each word separately. This includes:
   - Phrasal verbs: "look for", "give up", "turn off", "take after"
   - Idioms: "kick the bucket", "spill the beans"
   - Hyphenated compounds: "Eleven-year-old", "well-known", "mother-in-law"
   - Strong collocations where the word changes its core meaning: "make friends" (make ≠ create), "take place" (take ≠ grab)
   In such cases, output the minimal multi-word unit (e.g., "look for" not "look for the keys"; "make friends" not "make some new friends").
3) Provide short examples using the translated word or expression.

Return the answer strictly as multiline plain text without markdown and explanations:
- Line 1: phrase in the source language (the selected word, or the minimal multi-word expression if expansion is justified).
- Line 2: translation into ${targetLanguage}.
- Line 3: example using the phrase in the source language (optional).
- Line 4: example translation (optional).
- Lines 5+: follow the same paired pattern (example / example translation).

Rules:
- The phrase must be a substring of the source sentence.
- Do NOT expand adjective+noun ("nearest relative", "big house"), adverb+verb ("quickly ran"), or verb+object where each word keeps its meaning ("read a book", "buy a car").
- If the phrase is a strong collocation split by other words (e.g., "make some new friends"), return the canonical form ("make friends") — not the interrupted span.
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
