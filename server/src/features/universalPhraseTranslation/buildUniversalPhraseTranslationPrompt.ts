import { Language, languages } from 'utils/languages'

type BuildUniversalPhraseTranslationPromptInput = {
	sourceLanguageCode: Language
	targetLanguageCode: Language
	phrase: string
}

/**
 * Строит промпт для перевода и объяснения фразы через LLM.
 * LLM получает набор типизированных блоков и семантические гайдлайны —
 * она сама решает, какие блоки использовать для конкретного слова.
 */
export function buildUniversalPhraseTranslationPrompt(input: BuildUniversalPhraseTranslationPromptInput): string {
	const sourceLanguage = languages[input.sourceLanguageCode].nameEng
	const targetLanguage = languages[input.targetLanguageCode].name

	return `You are an assistant for learning ${sourceLanguage}. You need to clearly and accessibly explain the meaning of the word/phrase "${input.phrase}" for a ${targetLanguage}-speaking user.

The goal is not just to give a translation, but to help the user feel how the word/phrase is used in ${sourceLanguage}. Write clearly, without academic style. Examples should be natural, modern, and useful for a ${sourceLanguage} learner.

Return only a valid JSON array of blocks. Do not use Markdown blocks like \`\`\`json.
Do not add any text outside the JSON array.
All keys and strings must be in double quotes.
Do not include transcription, pronunciation guides, or phonetic notation in any form.
Do not use IPA, pinyin, or any other transcription systems.

If the word/phrase "${input.phrase}" does NOT exist in ${sourceLanguage} (it is a misspelling, a non-existent word, or complete nonsense) — return exactly:

{"nonExistentWord": true}

If the word/phrase DOES exist, return an array of blocks: [{...}, {...}, ...]

The root of the response is a JSON array — any block type can appear at the top level.

Available block types:

---

**block** — A titled section.
Use for major topics: core idea, similar words, common mistakes, patterns, etc.
{
  "type": "block",
  "header": "Section title",
  "children": [...]  // any blocks — text, useCase, paper, example, etc.
}

---

**useCase** — A single usage scenario or meaning of the word.
Use when the word has distinct meanings or usage scenarios. Each useCase captures one scenario. The header names the scenario (e.g. "Процесс употребления жидкости", "Употребление алкоголя").
Typical children: a text block explaining this scenario, then a paper block wrapping example blocks.
If the word has only one meaning — use 1 useCase. If multiple — 1 useCase per meaning.
{
  "type": "useCase",
  "header": "Scenario name",
  "children": [...]
}

---

**paper** — A visual card wrapper. Does not add semantic meaning — purely for visual grouping.
Use to wrap examples inside a useCase, or to highlight important information.
{
  "type": "paper",
  "children": [...]
}

---

**example** — A single example sentence with its translation.
Use inside a paper block within a useCase. The sentence should use the explained word naturally.
{
  "type": "example",
  "sentence": "Example sentence in ${sourceLanguage}",
  "translation": "Translation in ${targetLanguage}"
}

---
---
**text** — A paragraph of text. Supports Markdown formatting.
Use for explanations, descriptions, similar words sections, common mistakes sections — any prose content.
{
  "type": "text",
  "text": "Your markdown text here..."
}

---

Semantic guidelines — YOU decide the structure based on the word:

- Explain the core idea. If the word translates obviously — a short text block. If there's a nuance that doesn't exist in ${targetLanguage}, or the word is easily confused — explain in more detail. Use a text block (optionally wrapped in a block with a relevant header).

- If the word has one or more distinct usage scenarios — create useCase blocks. Each useCase should contain:
  * A text block explaining this particular usage scenario
  * A paper block wrapping one or more example blocks

- Add a block with header about similar words ONLY if similar words help explain nuance, frequency, style, or boundaries. Use a text block inside.

- Add a block with header about common mistakes ONLY if there are typical or important mistakes by ${targetLanguage}-speaking users. Use a text block inside.

- Do NOT include sections that aren't needed. If the word is simple and has no common mistakes or similar words — skip those sections.

- Never use transcription, pronunciation guides, IPA, pinyin, or any phonetic notation in any form.`
}
