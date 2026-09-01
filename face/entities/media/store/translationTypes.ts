export type SentenceTranslation = {
	text: string
	loading: boolean
	error: null | string
	translation: null | string
	visible: boolean
}

export type PhraseExample = { text: string; translate: string }

export type SentencePhraseType = {
	randomGeneratedPhraseId: string
	sentencePhraseId: null | number
	wordIds: number[]
	phrase: null | string
	loading: boolean
	error: null | string
	translation: null | string
	examples: PhraseExample[]
}

export type DetailsSentenceEntry = {
	sentenceId: number
	sentenceText: string
	selectedPhraseId: string | null
	data: { translation: SentenceTranslation; phrases: SentencePhraseType[] }
}
