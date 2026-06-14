import { UniversalPhraseTranslationResolver } from './universalPhraseTranslation.resolver'

export const universalPhraseTranslationResolversDesc: Record<
	keyof typeof UniversalPhraseTranslationResolver.prototype,
	string
> = {
	getOrCreateUniversalPhraseTranslation: 'Get or create translation for a phrase using LLM',
}
