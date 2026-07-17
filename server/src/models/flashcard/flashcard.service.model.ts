import { SentencePhraseTranslationExampleServiceModel } from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { LanguageCode } from 'prisma/generated/client'

export type FlashcardServiceModel = {
	id: number
	userId: number
	languageCode: LanguageCode
	sentenceText: string
	sentenceTranslation: null | string
	phrase: string
	phraseStartOffset: number
	phraseEndOffset: number
	phraseTranslation: null | string
	examples: SentencePhraseTranslationExampleServiceModel[]
	bookId: null | number
	videoId: null | number
	sentencePhraseTranslationId: null | number
	createdAt: Date
}
