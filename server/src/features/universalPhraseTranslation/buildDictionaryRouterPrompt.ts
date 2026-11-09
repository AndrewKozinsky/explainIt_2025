import { Language, languages } from 'utils/languages'

/**
 * Строит промпт маршрутизатора: он определяет тип текста и леммы, но не пишет статью.
 * Пользовательское сообщение — нормализованный текст без окружающего контекста.
 */
export function buildDictionaryRouterPrompt(sourceLanguageCode: Language): string {
	const sourceLanguage = languages[sourceLanguageCode].nameEng

	return `You route dictionary lookups for a ${sourceLanguage} learning app. The user message is the looked-up text, already lowercased and stripped of edge punctuation. Judge it on its own: there is no surrounding text.

Return only a JSON object:
{"exists": boolean, "kind": string, "lemmas": string[]}

"exists" is false only for misspellings and invented strings. Slang, archaic words, names, brands, free word combinations and whole sentences all exist.

"kind" is one of:
- "lexical": a content word in its dictionary form (noun, verb, adjective, adverb), including slang, loanwords and rare words.
- "inflected": a non-dictionary form of a word (past tense, participle, plural, conjugated form). If the text is both a form and a separate word (saw, left), still use "inflected".
- "functional": a word with mainly grammatical work: article, preposition, conjunction, particle, auxiliary, pronoun.
- "idiom": a fixed multi-word unit: idiom, phrasal verb, collocation with its own meaning, set phrase.
- "proper": a name of a person, place, brand or organisation.
- "free": an ordinary word combination with no meaning beyond its parts.
- "sentence": a complete sentence.
- "other": anything that fits none of these.

"lemmas": the dictionary headwords behind the text, lowercased. One entry per distinct possible word, so "saw" gives ["see", "saw"]. A lexical word gives itself. An idiom gives its base form ("kicked the bucket" gives ["kick the bucket"]). Empty for proper, free, sentence, and when exists is false.`
}
