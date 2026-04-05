import { LanguageResolver } from './language.resolver'

export const languageResolversDesc: Record<keyof typeof LanguageResolver.prototype, string> = {
	getLanguages: 'Get all available languages',
}
