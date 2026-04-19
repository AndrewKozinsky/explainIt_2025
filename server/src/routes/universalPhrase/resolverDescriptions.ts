import { UniversalPhraseResolver } from './universalPhrase.resolver'

export const universalPhraseResolversDesc: Record<keyof typeof UniversalPhraseResolver.prototype, string> = {
	getUniversalPhrase: 'Get phrase with transcription and audio pronunciations',
	createUniversalPhrase: 'Create a new phrase',
}
