import { Language, languages } from 'utils/languages'

type BuildUniversalPhraseTranslationPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	phrase: string
}

/**
 * Строит промпт для перевода и объяснения фразы через LLM.
 * Адаптирует язык учителя и ученика под переданную языковую пару.
 */
export function buildUniversalPhraseTranslationPrompt(input: BuildUniversalPhraseTranslationPromptInput): string {
	const sourceLanguage = languages[input.sourceLanguageCode].nameEng
	const targetLanguage = languages[input.targetLanguageCode].name

	return `You are an assistant for learning ${sourceLanguage}. You need to clearly and accessibly explain the meaning of the word/phrase "${input.phrase}" for a ${targetLanguage}-speaking user.

The goal is not just to give a translation, but to help the user feel how the word/phrase is used in ${sourceLanguage}. Write clearly, without academic style. Examples should be natural, modern, and useful for a ${sourceLanguage} learner.

Return only valid JSON. Do not use Markdown blocks like \`\`\`json.
Do not add any text outside the JSON.
All keys and strings must be in double quotes.
Do not include transcription, pronunciation guides, or phonetic notation in any form.
Do not use IPA, pinyin, or any other transcription systems.

If the word/phrase "${input.phrase}" does NOT exist in ${sourceLanguage} (it is a misspelling, a non-existent word, or complete nonsense) — return exactly:

{"nonExistentWord": true}

If the word/phrase DOES exist, return the following structure:

{
  "coreIdea": string,
  "usageGroups": [
    {
      "title": string,
      "explain": string,
      "examples": [
        {
          "sentence": string,
          "translate": string
        }
      ]
    }
  ],
  "similarWords": null || string,
  "commonMistakes": null || string,
  "patterns": null || [
    {
      "phrase": string,
      "translate": string
    }
  ]
}

Rules:

coreIdea — information that gives the key to understanding the main idea and purpose of the word/phrase. If the word translates obviously — one line with translation and essence. If the word has a nuance that doesn't exist in ${targetLanguage}, or it's easy to confuse — explain in more detail. Markdown is allowed.

usageGroups — array of main usage scenarios. If the word has no really different usages, create only one usageGroup. In each usageGroup:
title — name of the usage scenario.
explain — explanation revealing the usage scenario of the word.
examples — array of examples revealing the usage scenario.

similarWords — fill in if similar words help understand nuance, frequency, style, or usage boundaries. Otherwise return null. Markdown is allowed.

commonMistakes — fill in if there are typical or important mistakes by ${targetLanguage} speakers. Otherwise return null. Markdown is allowed.

patterns — array of typical constructions with this word. Fill only if it's really necessary to tell about it for understanding the word.`
}
