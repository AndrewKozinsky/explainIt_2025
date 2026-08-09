import { TranslationBlock } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'

export type ParseUniversalPhraseTranslationResult =
	| { type: 'translation'; data: TranslationBlock[] }
	| { type: 'nonExistentWord' }
	| { type: 'invalid' }

const MAX_DEPTH = 10

/**
 * Парсит JSON-ответ от LLM в типизированный результат.
 * Обрабатывает:
 * - Массив блоков (TranslationBlock[])
 * - Ответ о несуществующем слове ({nonExistentWord: true})
 * - Возможные обёртки в markdown-блоки ```json.
 * Возвращает discriminated union.
 */
export function parseUniversalPhraseTranslationResult(rawMessage: string): ParseUniversalPhraseTranslationResult {
	let jsonString = rawMessage.trim()

	// Убираем возможную markdown-обёртку ```json ... ```
	const codeBlockMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)```/)
	if (codeBlockMatch) {
		jsonString = codeBlockMatch[1].trim()
	}

	let parsedJson: unknown

	try {
		parsedJson = JSON.parse(jsonString)
	} catch {
		return { type: 'invalid' }
	}

	if (!parsedJson || typeof parsedJson !== 'object') {
		return { type: 'invalid' }
	}

	// Проверяем nonExistentWord (может быть на верхнем уровне объектом)
	if (!Array.isArray(parsedJson)) {
		const parsedResponse = parsedJson as Record<string, unknown>
		if (parsedResponse.nonExistentWord === true) {
			return { type: 'nonExistentWord' }
		}
		return { type: 'invalid' }
	}

	// Валидируем массив блоков
	const validated: TranslationBlock[] = []

	for (const item of parsedJson) {
		const block = validateBlock(item, 0)
		if (!block) {
			return { type: 'invalid' }
		}
		validated.push(block)
	}

	return { type: 'translation', data: validated }
}

/**
 * Рекурсивно валидирует один блок.
 * Возвращает null если блок невалидный.
 */
function validateBlock(block: unknown, depth: number): TranslationBlock | null {
	if (depth > MAX_DEPTH) {
		return null
	}

	if (!block || typeof block !== 'object' || Array.isArray(block)) {
		return null
	}

	const b = block as Record<string, unknown>

	if (typeof b.type !== 'string') {
		return null
	}

	switch (b.type) {
		case 'block':
			return validateBlockBlock(b, depth)
		case 'useCase':
			return validateUseCaseBlock(b, depth)
		case 'paper':
			return validatePaperBlock(b, depth)
		case 'example':
			return validateExampleBlock(b)
		case 'phrasesButtons':
			return validatePhrasesButtonsBlock(b)
		case 'text':
			return validateTextBlock(b)
		default:
			return null
	}
}

function validateChildren(children: unknown, depth: number): TranslationBlock[] | null {
	if (!Array.isArray(children)) {
		return null
	}

	const validated: TranslationBlock[] = []

	for (const item of children) {
		const child = validateBlock(item, depth + 1)
		if (!child) {
			return null
		}
		validated.push(child)
	}

	return validated
}

function validateBlockBlock(b: Record<string, unknown>, depth: number): TranslationBlock | null {
	if (typeof b.header !== 'string') {
		return null
	}

	const children = validateChildren(b.children, depth)
	if (!children) {
		return null
	}

	return {
		type: 'block',
		header: b.header,
		children,
	}
}

function validateUseCaseBlock(b: Record<string, unknown>, depth: number): TranslationBlock | null {
	if (typeof b.header !== 'string') {
		return null
	}

	const children = validateChildren(b.children, depth)
	if (!children) {
		return null
	}

	return {
		type: 'useCase',
		header: b.header,
		children,
	}
}

function validatePaperBlock(b: Record<string, unknown>, depth: number): TranslationBlock | null {
	const children = validateChildren(b.children, depth)
	if (!children) {
		return null
	}

	return {
		type: 'paper',
		children,
	}
}

function validateExampleBlock(b: Record<string, unknown>): TranslationBlock | null {
	if (typeof b.sentence !== 'string' || typeof b.translation !== 'string') {
		return null
	}

	return {
		type: 'example',
		sentence: b.sentence,
		translation: b.translation,
	}
}

function validatePhrasesButtonsBlock(b: Record<string, unknown>): TranslationBlock | null {
	if (!Array.isArray(b.labels)) {
		return null
	}

	for (const label of b.labels) {
		if (typeof label !== 'string') {
			return null
		}
	}

	return {
		type: 'phrasesButtons',
		labels: b.labels,
	}
}

function validateTextBlock(b: Record<string, unknown>): TranslationBlock | null {
	if (typeof b.text !== 'string') {
		return null
	}

	return {
		type: 'text',
		text: b.text,
	}
}
