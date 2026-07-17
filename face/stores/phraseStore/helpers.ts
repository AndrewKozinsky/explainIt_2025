import { LanguageCode } from '@/shared/utils/languages'

export function makePhraseKey(phrase: string, languageCode: LanguageCode): string {
	return `${languageCode}:${phrase.trim().toLocaleLowerCase()}`
}
