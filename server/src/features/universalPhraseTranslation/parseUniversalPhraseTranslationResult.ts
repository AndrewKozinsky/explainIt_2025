import {
	ListBlock,
	ListItem,
	TranslationBlock,
	WordCard,
	WordsBlock,
} from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import {
	WORD_SENSE_VISUAL_KINDS,
	WordSenseVisual,
	WordSenseVisualKind,
} from 'models/universalPhraseTranslation/wordSense.service.model'

/** Значение в ответе модели: ещё не привязано к записи WordSense. */
export type DraftSenseBlock = {
	type: 'sense'
	header: string
	lemma: null | string
	gloss: null | string
	senseRef: null | number
	visual: null | WordSenseVisual
	children: DraftBlock[]
}

export type DraftBlock =
	| DraftSenseBlock
	| { type: 'block'; header: string; children: DraftBlock[] }
	| Exclude<TranslationBlock, { children: TranslationBlock[] }>

export type ParseUniversalPhraseTranslationResult =
	{ type: 'translation'; data: DraftBlock[] } | { type: 'nonExistentWord' } | { type: 'invalid' }

const MAX_DEPTH = 10
const MAX_GLOSS_LENGTH = 300
const MAX_LEMMA_LENGTH = 300
const MAX_VISUAL_PROMPT_LENGTH = 2000
const MAX_WORD_LENGTH = 300
const MAX_DESCRIPTION_LENGTH = 500

/** Разбирает JSON из ответа LLM, в том числе завёрнутый в markdown-блок. */
export function parseLlmJson(rawMessage: string): unknown {
	const jsonText = rawMessage.trim().match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? rawMessage.trim()

	try {
		return JSON.parse(jsonText)
	} catch {
		return null
	}
}

/**
 * Парсит ответ писателя статьи. Структура свободная, поэтому неизвестные и испорченные блоки
 * просто пропускаются: статья считается негодной, только если не осталось ни одного блока.
 */
export function parseUniversalPhraseTranslationResult(rawMessage: string): ParseUniversalPhraseTranslationResult {
	const parsedResponse = parseLlmJson(rawMessage) as null | { nonExistentWord?: unknown; blocks?: unknown }

	if (!parsedResponse || typeof parsedResponse !== 'object') return { type: 'invalid' }
	if (parsedResponse.nonExistentWord === true) return { type: 'nonExistentWord' }
	if (!Array.isArray(parsedResponse.blocks)) return { type: 'invalid' }

	const blocks = validateBlocks(parsedResponse.blocks, 0)

	return blocks.length > 0 ? { type: 'translation', data: blocks } : { type: 'invalid' }
}

/**
 * Парсит ответ с глубокими разделами. Пустой массив — допустимый ответ «добавить нечего».
 * Возвращает null, только если ответ не удалось разобрать.
 */
export function parseDeepSectionsResult(rawMessage: string): null | TranslationBlock[] {
	const parsedResponse = parseLlmJson(rawMessage) as null | { blocks?: unknown }
	if (!parsedResponse || !Array.isArray(parsedResponse.blocks)) return null

	return withoutSenses(validateBlocks(parsedResponse.blocks, 0))
}

function withoutSenses(blocks: DraftBlock[]): TranslationBlock[] {
	return blocks.flatMap((block): TranslationBlock[] => {
		if (block.type === 'sense') return withoutSenses(block.children)
		if (block.type === 'block') return [{ ...block, children: withoutSenses(block.children) }]
		return [block]
	})
}

function validateBlocks(rawBlocks: unknown[], depth: number): DraftBlock[] {
	if (depth > MAX_DEPTH) return []

	return rawBlocks.flatMap((rawBlock) => {
		const block = validateBlock(rawBlock, depth)
		return block ? [block] : []
	})
}

function validateBlock(rawBlock: unknown, depth: number): DraftBlock | null {
	if (!rawBlock || typeof rawBlock !== 'object' || Array.isArray(rawBlock)) return null

	const block = rawBlock as Record<string, unknown>

	switch (block.type) {
		case 'block':
			return typeof block.header === 'string'
				? { type: 'block', header: block.header, children: validateChildren(block.children, depth) }
				: null
		case 'sense':
			return validateSenseBlock(block, depth)
		case 'example':
			return typeof block.sentence === 'string' && typeof block.translation === 'string'
				? { type: 'example', sentence: block.sentence, translation: block.translation }
				: null
		case 'text':
			return typeof block.text === 'string' ? { type: 'text', text: block.text } : null
		case 'words':
			return validateWordsBlock(block)
		case 'list':
			return validateListBlock(block)
		default:
			return null
	}
}

function validateChildren(children: unknown, depth: number): DraftBlock[] {
	return Array.isArray(children) ? validateBlocks(children, depth + 1) : []
}

function validateSenseBlock(block: Record<string, unknown>, depth: number): DraftSenseBlock | null {
	if (typeof block.header !== 'string') return null

	return {
		type: 'sense',
		header: block.header,
		lemma: cleanText(block.lemma, MAX_LEMMA_LENGTH)?.toLowerCase() ?? null,
		gloss: cleanText(block.gloss, MAX_GLOSS_LENGTH),
		senseRef: typeof block.senseRef === 'number' ? block.senseRef : null,
		visual: validateVisual(block.visual),
		children: validateChildren(block.children, depth),
	}
}

function validateVisual(rawVisual: unknown): null | WordSenseVisual {
	if (!rawVisual || typeof rawVisual !== 'object') return null

	const visual = rawVisual as Record<string, unknown>
	const prompt = cleanText(visual.prompt, MAX_VISUAL_PROMPT_LENGTH)
	if (!prompt || !WORD_SENSE_VISUAL_KINDS.includes(visual.kind as WordSenseVisualKind)) return null

	const kind = visual.kind as WordSenseVisualKind

	return { kind, aspect: kind === 'comic' ? 'strip' : 'landscape', prompt }
}

/** Блок без похожих слов бессмыслен, а карточка текущего слова необязательна. */
function validateWordsBlock(block: Record<string, unknown>): null | WordsBlock {
	const currentWord = validateWordCard(block.currentWord)
	const currentWordKey = currentWord?.word.toLowerCase()
	const similarWords = (Array.isArray(block.similarWords) ? block.similarWords : []).flatMap((rawCard) => {
		const wordCard = validateWordCard(rawCard)
		return wordCard && wordCard.word.toLowerCase() !== currentWordKey ? [wordCard] : []
	})

	return similarWords.length > 0 ? { type: 'words', currentWord, similarWords } : null
}

function validateWordCard(rawCard: unknown): null | WordCard {
	if (!rawCard || typeof rawCard !== 'object') return null

	const card = rawCard as Record<string, unknown>
	const word = cleanText(card.word, MAX_WORD_LENGTH)
	const description = cleanText(card.description, MAX_DESCRIPTION_LENGTH)

	return word && description ? { word, description } : null
}

function validateListBlock(block: Record<string, unknown>): null | ListBlock {
	const items = (Array.isArray(block.items) ? block.items : []).flatMap((rawItem) => {
		const listItem = validateListItem(rawItem)
		return listItem ? [listItem] : []
	})

	return items.length > 0 ? { type: 'list', items } : null
}

function validateListItem(rawItem: unknown): null | ListItem {
	if (!rawItem || typeof rawItem !== 'object') return null

	const item = rawItem as Record<string, unknown>
	const term = cleanText(item.term, MAX_WORD_LENGTH)
	const translation = cleanText(item.translation, MAX_DESCRIPTION_LENGTH)

	return term && translation ? { term, translation } : null
}

function cleanText(rawText: unknown, maxLength: number): null | string {
	if (typeof rawText !== 'string' || !rawText.trim()) return null

	return rawText.trim().slice(0, maxLength)
}
