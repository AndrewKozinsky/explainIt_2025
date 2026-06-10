export type GrammarConceptServiceModel = {
	id: string
	sourceLanguageCode: string
	targetLanguageCode: string
	category: string
	title: string
	slug: string
	order: number
	aliases: string[]
}

export type UniversalPhraseServiceModel = {
	id: number
	sentenceText: string
	sourceLanguageCode: string
	grammarExtractionStatus: 'NOT_STARTED' | 'ERROR' | 'SUCCESS'
	grammarConcepts: GrammarConceptServiceModel[]
	missingGrammarConcepts: MissingGrammarConceptServiceModel[]
}

export type MissingGrammarConceptServiceModel = {
	id: number
	universalPhraseId: number
	sourceLanguageCode: string
	targetLanguageCode: string
	category: string
	alias: string
	sentenceText: string
}
