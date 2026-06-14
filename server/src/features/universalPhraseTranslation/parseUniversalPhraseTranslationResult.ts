import { UniversalPhraseTranslationData } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'

export type ParseUniversalPhraseTranslationResult =
	| { type: 'translation'; data: UniversalPhraseTranslationData }
	| { type: 'nonExistentWord' }
	| { type: 'invalid' }

/**
 * Парсит JSON-ответ от LLM в типизированный результат.
 * Обрабатывает:
 * - Обычный перевод (UniversalPhraseTranslationData)
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

	if (!parsedJson || typeof parsedJson !== 'object' || Array.isArray(parsedJson)) {
		return { type: 'invalid' }
	}

	const parsedResponse = parsedJson as Record<string, unknown>

	// Проверяем nonExistentWord
	if (parsedResponse.nonExistentWord === true) {
		return { type: 'nonExistentWord' }
	}

	// Валидируем обязательные поля перевода
	if (typeof parsedResponse.coreIdea !== 'string') {
		return { type: 'invalid' }
	}

	if (!Array.isArray(parsedResponse.usageGroups)) {
		return { type: 'invalid' }
	}

	for (const group of parsedResponse.usageGroups) {
		if (!group || typeof group !== 'object') {
			return { type: 'invalid' }
		}

		const usageGroup = group as Record<string, unknown>
		if (
			typeof usageGroup.title !== 'string' ||
			typeof usageGroup.explain !== 'string' ||
			!Array.isArray(usageGroup.examples)
		) {
			return { type: 'invalid' }
		}

		for (const exampleItem of usageGroup.examples) {
			if (!exampleItem || typeof exampleItem !== 'object') {
				return { type: 'invalid' }
			}

			const example = exampleItem as Record<string, unknown>
			if (typeof example.sentence !== 'string' || typeof example.translate !== 'string') {
				return { type: 'invalid' }
			}
		}
	}

	// Опциональные поля: проверяем тип если они не null
	if (
		parsedResponse.similarWords !== null &&
		parsedResponse.similarWords !== undefined &&
		typeof parsedResponse.similarWords !== 'string'
	) {
		return { type: 'invalid' }
	}

	if (
		parsedResponse.commonMistakes !== null &&
		parsedResponse.commonMistakes !== undefined &&
		typeof parsedResponse.commonMistakes !== 'string'
	) {
		return { type: 'invalid' }
	}

	if (parsedResponse.patterns !== null && parsedResponse.patterns !== undefined) {
		if (!Array.isArray(parsedResponse.patterns)) {
			return { type: 'invalid' }
		}

		for (const patternItem of parsedResponse.patterns) {
			if (!patternItem || typeof patternItem !== 'object') {
				return { type: 'invalid' }
			}
			const pattern = patternItem as Record<string, unknown>
			if (typeof pattern.phrase !== 'string' || typeof pattern.translate !== 'string') {
				return { type: 'invalid' }
			}
		}
	}

	return { type: 'translation', data: parsedResponse as UniversalPhraseTranslationData }
}
