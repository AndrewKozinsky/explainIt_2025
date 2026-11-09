import { Language, languages } from 'utils/languages'

type BuildDictionaryDeepSectionsPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	phrase: string
	articleJson: string
}

/** Строит промпт дополнительных разделов статьи, которые генерируются в фоне после основной части. */
export function buildDictionaryDeepSectionsPrompt(input: BuildDictionaryDeepSectionsPromptInput): string {
	const source = languages[input.sourceLanguageCode].nameEng
	const target = languages[input.targetLanguageCode].nameEng

	return `A dictionary entry about the ${source} word or phrase "${input.phrase}" for a native ${target} speaker already exists:
${input.articleJson}

Write the optional extra sections that appear below it. Consider: similar words and how they really differ, typical mistakes of ${target} speakers, useful combinations, related words. Include a section only when it would genuinely help; many words need one section or none. Do not repeat the entry. Never write about pronunciation, transcription or capitalisation, and never list inflected forms: a separate block shows them.

If this is an idiom whose origin helps to remember it, you may add a section about where it comes from. Etymologies of idioms are often disputed: state only what is well established, call a disputed explanation a version, and leave the section out if you are not sure. Never invent an origin.

Write in ${target}. Quote ${source} only for ${source} words.

Return only a JSON object {"blocks": [...]}, or {"blocks": []} if nothing is worth adding. Every section is a "block" with a title, containing the blocks below.
{"type":"block","header":"Section title","children":[...]}
{"type":"text","text":"Markdown text. Put ${source} words in **bold**."}
{"type":"example","sentence":"${source} sentence","translation":"${target} translation"}
In an example wrap in **double asterisks** the word the section is about in "sentence", and the words that translate it in "translation".
{"type":"words","currentWord":{"word":"${input.phrase}","description":"its meaning, one short ${target} sentence"},"similarWords":[{"word":"a similar ${source} word","description":"what it means and how it differs, one short ${target} sentence"}]}
Use "words" for similar words, 2 to 4 of them. The learner can open an entry about any of them, so give real dictionary words. Similar words belong to one meaning: if "${input.phrase}" has several, say which one in the section title, and make a separate section only for another meaning that really needs it.
{"type":"list","items":[{"term":"${source} expression","translation":"${target} translation"}]}
Use "list" for useful combinations and other expressions that need only a translation.`
}
