export type SentencePhraseTranslationExampleServiceModel = {
	text: string
	translate: string
}

export type SentencePhraseTranslationServiceModel = {
	id: number
	sentenceId: number
	phrase: string
	phraseStartOffset: number
	phraseEndOffset: number
	translate: null | string
	examples: SentencePhraseTranslationExampleServiceModel[]
	status: 'pending' | 'ready' | 'error'
	errorMessage: null | string
	createdAt: Date
	updatedAt: Date
}
