import { UniversalPhraseOutModel } from '../universalPhrase/universalPhrase.out.model'

export class SentencePhraseTranslationExampleOutModel {
	text: string

	translate: string
}

export class SentencePhraseTranslationOutModel {
	id: number

	sentenceId: number

	phrase: string

	phraseStartOffset: number

	phraseEndOffset: number

	translate: null | string

	examples: SentencePhraseTranslationExampleOutModel[]

	status: 'pending' | 'ready' | 'error'

	errorMessage: null | string

	createdAt: string

	updatedAt: string

	flashcardId: null | number

	universalPhrase: UniversalPhraseOutModel | null
}
