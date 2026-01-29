import { SentenceTranslationResolver } from './sentenceTranslation.resolver'

export const sentenceTranslationResolversDesc: Record<
	keyof typeof SentenceTranslationResolver.prototype,
	string
> = {
	getSentenceTranslation: 'Get sentence translation by id',
}
