export type BookChapterPhraseServiceModel = {
	id: number
	sentence: string
	phrase: string
	phraseTranslation: string
	phraseAnalysis: string
	examples: PhraseExample[]
}

type PhraseExample = {
	id: number
	sentence: string
	translation: string
}
