export type BookChapterPhraseServiceModel = {
	id: number
	sentenceId: number
	sentence: string
	phrase: string
	transcription: string
	phraseWordsIdx: number[]
	phraseTranslation: string
	phraseAnalysis: string
	examples: PhraseExample[]
}

type PhraseExample = {
	id: number
	sentence: string
	translation: string
}
