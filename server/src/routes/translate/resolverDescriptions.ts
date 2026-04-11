import { TranslateResolver } from './translate.resolver'

export const translateResolversDesc: Record<keyof typeof TranslateResolver.prototype, string> = {
	translateSentence: 'Translate sentence',
	translatePhrase: 'Translate phrase in sentence by selected offsets',
}
