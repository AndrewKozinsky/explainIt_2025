import { TranslateResolver } from './translate.resolver'

export const translateResolversDesc: Record<keyof typeof TranslateResolver.prototype, string> = {
	getPhraseTranslation: 'Get existing phrase translation by sentence and offsets',
	getSentenceTranslation: 'Get existing sentence translation by sentence id',
	translateSentence: 'Translate sentence',
	translatePhrase: 'Translate phrase in sentence by selected offsets',
}
