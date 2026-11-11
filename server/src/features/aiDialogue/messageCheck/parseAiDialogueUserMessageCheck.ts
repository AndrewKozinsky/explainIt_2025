import type {
	AiDialogueUserMessageCheckOutModel,
	AiDialogueUserMessagePartCheckOutModel,
} from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'

/**
 * Разбирает полный текстовый ответ LLM о грамматике и стиле черновика сообщения
 * пользователя и превращает его в объект для REST-ответа. Исходный черновик функция
 * не принимает и не проверяет: она проверяет только структуру результата LLM.
 *
 * Вход — построчный протокол с секциями speech, затем action и завершающей строкой end.
 * В каждой секции находится либо единственная строка ok (замечаний нет), либо записи:
 * - critical и ровно 3 строки: заголовок, исходный фрагмент с выделенной ошибкой
 *   в Markdown, объяснение в Markdown;
 * - suggestion и ровно 2 строки: объяснение в Markdown, исправленный пример.
 * Каждое значение занимает одну непустую физическую строку. Записи могут повторяться;
 * пустые строки, JSON, code fences и текст после end не допускаются. Единственное послабление:
 * лишняя строка end сразу перед заголовком action пропускается, а у suggestion допускается лишняя
 * строка заголовка перед объяснением (она отбрасывается), если без неё запись не сходится. Внешние пробелы
 * ответа и строк удаляются, поддерживаются LF и CRLF. Markdown сохраняется как текст.
 *
 * @param text Полный ответ модели, например "speech\nok\naction\nok\nend".
 * @returns { speech: { critical: [], suggestions: [] }, action: { critical: [], suggestions: [] } },
 * где critical содержит { title, sentenceMarkdown, explanationMarkdown }, а suggestions —
 * { explanationMarkdown, example }. Для секции ok оба массива пусты.
 * Возвращает null при нарушении протокола, обрыве ответа или превышении лимитов:
 * 64000 символов ответа, 8000 символов значения, 12 замечаний на секцию.
 * Неполный ответ не трактуется как успешная проверка без ошибок.
 */
export function parseAiDialogueUserMessageCheck(text: string): AiDialogueUserMessageCheckOutModel | null {
	if (text.length > 64_000) return null

	const lines = text
		.trim()
		.split(/\r?\n/)
		.map((line) => line.trim())

	let cursor = 0

	// Модель иногда закрывает строкой end и секцию speech. Такая строка не несёт данных, поэтому
	// пропускается, но только если сразу за ней идёт заголовок action.
	function skipStrayEndBefore(nextHeader: string): void {
		if (nextHeader === 'action' && lines[cursor] === 'end' && lines[cursor + 1] === 'action') cursor++
	}

	/** Строка index начинает следующую запись, следующую секцию или завершает ответ. */
	function isRecordBoundary(index: number, nextHeader: string): boolean {
		const line = lines[index]
		if (line === 'critical' || line === 'suggestion' || line === nextHeader) return true

		return nextHeader === 'action' && line === 'end' && lines[index + 1] === 'action'
	}

	// Модель иногда даёт suggestion заголовок по образцу critical, и запись занимает 3 строки вместо 2.
	// Заголовок отбрасывается, но только если 2-строчное прочтение не сходится, а 3-строчное сходится.
	function hasExtraSuggestionTitle(nextHeader: string): boolean {
		return !isRecordBoundary(cursor + 2, nextHeader) && isRecordBoundary(cursor + 3, nextHeader)
	}

	function readField(header: string, nextHeader: string): AiDialogueUserMessagePartCheckOutModel | null {
		if (lines[cursor++] !== header) return null
		const result: AiDialogueUserMessagePartCheckOutModel = { critical: [], suggestions: [] }

		if (lines[cursor] === 'ok') {
			cursor++
			skipStrayEndBefore(nextHeader)
			return lines[cursor] === nextHeader ? result : null
		}

		while (cursor < lines.length && lines[cursor] !== nextHeader) {
			skipStrayEndBefore(nextHeader)
			if (lines[cursor] === nextHeader) break
			if (result.critical.length + result.suggestions.length >= 12) return null

			const severity = lines[cursor++]
			const count = severity === 'critical' ? 3 : severity === 'suggestion' ? 2 : 0
			if (!count) return null
			if (severity === 'suggestion' && hasExtraSuggestionTitle(nextHeader)) {
				if (!lines[cursor] || lines[cursor].length > 8_000) return null
				cursor++
			}

			const fields = lines.slice(cursor, cursor + count)
			if (fields.length !== count || fields.some((field) => !field || field.length > 8_000)) return null

			cursor += count
			if (severity === 'critical') {
				result.critical.push({ title: fields[0], sentenceMarkdown: fields[1], explanationMarkdown: fields[2] })
			} else {
				result.suggestions.push({ explanationMarkdown: fields[0], example: fields[1] })
			}
		}

		return result.critical.length || result.suggestions.length ? result : null
	}

	const speech = readField('speech', 'action')
	if (!speech) return null

	const action = readField('action', 'end')
	if (!action || lines[cursor++] !== 'end' || cursor !== lines.length) return null

	return { speech, action }
}
