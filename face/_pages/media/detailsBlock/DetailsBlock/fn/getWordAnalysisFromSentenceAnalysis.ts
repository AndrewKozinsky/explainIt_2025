type AnalysisBlockMatch = {
	block: string
	score: number
}

/**
 * Ищет в markdown-анализе блок, который лучше всего соответствует выделенному слову.
 * Сопоставление делается по токенам заголовка блока, чтобы поддерживать многословные
 * элементы вроде `customs inspector` или `cargo plane`.
 * Если слово встречается в предложении несколько раз, выбирает блок по позиции слова.
 */
export function getWordAnalysisFromSentenceAnalysis(input: {
	analysis: null | string
	selectedWord: null | string
	sentenceText?: null | string
	wordId?: null | number
	locale?: string
}): null | string {
	const { analysis, selectedWord, sentenceText, wordId, locale } = input

	if (!analysis || !selectedWord) return null

	const blocks = splitAnalysisIntoBlocks(analysis)
	if (!blocks.length) return null

	let bestMatch: null | AnalysisBlockMatch = null

	for (const block of blocks) {
		const headword = getBlockHeadword(block)
		if (!headword) continue

		const score = getBlockScore({
			selectedWord,
			headword,
			locale,
		})

		if (score <= 0) continue

		// Если есть позиция слова и текст предложения, проверяем соответствие позиции
		if (sentenceText && wordId != null) {
			const blockRange = findHeadwordPositionInSentence({
				headword,
				sentenceText,
				locale,
			})

			// Если выделенное слово находится внутри диапазона фразы — совпадение
			if (blockRange && wordId >= blockRange.start && wordId <= blockRange.end) {
				return block
			}

			// Иначе пропускаем блок
			continue
		}

		if (!bestMatch || score > bestMatch.score) {
			bestMatch = {
				block,
				score,
			}
		}
	}

	return bestMatch?.block ?? null
}

/**
 * Делит markdown-анализ на отдельные словарные блоки.
 * Каждый блок начинается со строки `* **headword** — ...` и включает все следующие
 * вложенные примеры до начала следующего такого блока.
 */
function splitAnalysisIntoBlocks(analysis: string): string[] {
	const lines = analysis.split('\n')
	const blocks: string[] = []
	let currentBlock: string[] = []

	for (const line of lines) {
		if (isTopLevelBlockStart(line)) {
			if (currentBlock.length) {
				blocks.push(currentBlock.join('\n').trim())
			}

			currentBlock = [line]
			continue
		}

		if (currentBlock.length) {
			currentBlock.push(line)
		}
	}

	if (currentBlock.length) {
		blocks.push(currentBlock.join('\n').trim())
	}

	return blocks.filter(Boolean)
}

/**
 * Проверяет, является ли строка началом верхнеуровневого словарного блока.
 */
function isTopLevelBlockStart(line: string): boolean {
	return /^\*\s+\*\*.+?\*\*/.test(line.trim())
}

/**
 * Извлекает из первого markdown-пункта заголовок разбираемого слова или словосочетания.
 */
function getBlockHeadword(block: string): null | string {
	const firstLine = block.split('\n')[0]?.trim()
	if (!firstLine) return null

	const match = firstLine.match(/^\*\s+\*\*(.+?)\*\*/)
	return match?.[1]?.trim() ?? null
}

/**
 * Вычисляет score соответствия между выделенным словом пользователя и заголовком блока.
 * Сначала сравнивает нормализованные формы токенов, затем использует лёгкие английские
 * эвристики для случаев вроде `smuggling -> smuggle`.
 */
function getBlockScore(input: { selectedWord: string; headword: string; locale?: string }): number {
	const selectedForms = buildCandidateForms(input.selectedWord, input.locale)
	const headwordTokens = tokenizeWords(input.headword, input.locale)

	for (const token of headwordTokens) {
		const tokenForms = buildCandidateForms(token, input.locale)

		if (!hasIntersection(selectedForms, tokenForms)) {
			continue
		}

		if (normalizeText(token, input.locale) === normalizeText(input.selectedWord, input.locale)) {
			return 100
		}

		return 80
	}

	return 0
}

/**
 * Строит набор кандидатных форм слова для поиска совпадений.
 * Для всех языков используется Unicode-нормализация, а для английского сверху
 * добавляются простые эвристические словоформы.
 */
function buildCandidateForms(word: string, locale?: string): Set<string> {
	const normalized = normalizeText(word, locale)
	const forms = new Set<string>()

	if (!normalized) return forms

	forms.add(normalized)

	for (const variant of buildEnglishHeuristicForms(normalized)) {
		forms.add(variant)
	}

	return forms
}

/**
 * Добавляет английские словоформы для часто встречающихся случаев:
 * `smuggling -> smuggle`, `studies -> study`, `works -> work`.
 */
function buildEnglishHeuristicForms(word: string): string[] {
	const variants = new Set<string>()

	if (word.endsWith('ies') && word.length > 3) {
		variants.add(word.slice(0, -3) + 'y')
	}

	if (word.endsWith('ing') && word.length > 4) {
		const stem = word.slice(0, -3)
		variants.add(stem)
		variants.add(stem + 'e')

		if (hasDoubleEnding(stem)) {
			variants.add(stem.slice(0, -1))
			variants.add(stem.slice(0, -1) + 'e')
		}
	}

	if (word.endsWith('ed') && word.length > 3) {
		const stem = word.slice(0, -2)
		variants.add(stem)
		variants.add(stem + 'e')

		if (hasDoubleEnding(stem)) {
			variants.add(stem.slice(0, -1))
		}
	}

	if (word.endsWith('es') && word.length > 3) {
		variants.add(word.slice(0, -2))
	}

	if (word.endsWith('s') && word.length > 2) {
		variants.add(word.slice(0, -1))
	}

	return [...variants].filter(Boolean)
}

/**
 * Проверяет, оканчивается ли строка на удвоенную букву.
 * Это помогает восстановить базовую форму в случаях вроде `stopping -> stop`.
 */
function hasDoubleEnding(value: string): boolean {
	if (value.length < 2) return false

	const last = value[value.length - 1]
	const previous = value[value.length - 2]

	return last === previous
}

/**
 * Делит текст на word-like токены через `Intl.Segmenter`.
 * Это даёт единый механизм токенизации для латиницы, арабского и CJK-языков.
 */
function tokenizeWords(text: string, locale?: string): string[] {
	const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })

	return [...segmenter.segment(text)].filter((segment) => segment.isWordLike).map((segment) => segment.segment)
}

/**
 * Нормализует текст для сопоставления:
 * приводит к нижнему регистру, убирает диакритику и очищает лишнюю пунктуацию.
 */
function normalizeText(text: string, locale?: string): string {
	return text
		.toLocaleLowerCase(locale)
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[’']/g, '')
		.replace(/[^\p{L}\p{N}\s-]/gu, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

/** Проверяет, пересекаются ли два множества строк. */
function hasIntersection(left: Set<string>, right: Set<string>): boolean {
	for (const item of left) {
		if (right.has(item)) {
			return true
		}
	}

	return false
}

type WordRange = {
	start: number // 1-indexed, inclusive
	end: number // 1-indexed, inclusive
}

/**
 * Находит диапазон слов headword в предложении.
 * Возвращает {start, end} (1-indexed) или null, если не найдено.
 * Учитывает, что headword может быть словосочетанием (например, "the happiest").
 */
function findHeadwordPositionInSentence(input: {
	headword: string
	sentenceText: string
	locale?: string
}): null | WordRange {
	const { headword, sentenceText, locale } = input

	const sentenceTokens = tokenizeWords(sentenceText, locale)
	const headwordTokens = tokenizeWords(headword, locale)

	if (!headwordTokens.length || !sentenceTokens.length) return null

	// Ищем последовательность токенов headword в предложении
	const firstHeadwordToken = normalizeText(headwordTokens[0]!, locale)

	for (let i = 0; i < sentenceTokens.length; i++) {
		const sentenceToken = sentenceTokens[i]
		if (!sentenceToken) continue

		if (normalizeText(sentenceToken, locale) !== firstHeadwordToken) continue

		// Проверяем, что вся последовательность токенов headword совпадает
		let allMatch = true
		for (let j = 0; j < headwordTokens.length; j++) {
			const headwordToken = headwordTokens[j]
			const sentenceTokenAt = sentenceTokens[i + j]

			if (!headwordToken || !sentenceTokenAt) {
				allMatch = false
				break
			}

			if (normalizeText(headwordToken, locale) !== normalizeText(sentenceTokenAt, locale)) {
				allMatch = false
				break
			}
		}

		if (allMatch) {
			// Возвращаем 1-indexed диапазон
			return {
				start: i + 1,
				end: i + headwordTokens.length,
			}
		}
	}

	return null
}
