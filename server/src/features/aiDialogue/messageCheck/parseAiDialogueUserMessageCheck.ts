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
 * пустые строки, JSON, code fences и текст после end не допускаются. Внешние пробелы
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

	function readField(header: string, nextHeader: string): AiDialogueUserMessagePartCheckOutModel | null {
		if (lines[cursor++] !== header) return null
		const result: AiDialogueUserMessagePartCheckOutModel = { critical: [], suggestions: [] }

		if (lines[cursor] === 'ok') {
			cursor++
			return lines[cursor] === nextHeader ? result : null
		}

		while (cursor < lines.length && lines[cursor] !== nextHeader) {
			if (result.critical.length + result.suggestions.length >= 12) return null

			const severity = lines[cursor++]
			const count = severity === 'critical' ? 3 : severity === 'suggestion' ? 2 : 0
			if (!count) return null

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
