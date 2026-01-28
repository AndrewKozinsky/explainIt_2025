import { openSse } from 'utils/sse/openSse'

/**
 * Универсальный "клиент потока":
 * - открывает SSE соединение
 * - читает чанки (кусочки) результата
 * - аккумулирует весь текст в `fullText`
 * - позволяет подписаться на прогресс через `onChunk`
 * - возвращает итог как Promise (ok/error)
 *
 * Зачем это нужно:
 * - UI удобно обновлять по чанкам (`onChunk`)
 * - после завершения удобно иметь полный результат (`fullText`)
 * - этот слой всё ещё не знает про домен (перевод/анализ). Он знает только про
 *   то, что сервер в событии `chunk` присылает JSON вида { text: string }.
 */
export async function readStream(
	url: string,
	options?: {
		onChunk?: (chunk: string, fullText: string) => void
	},
): Promise<{ type: 'ok'; fullText: string } | { type: 'error'; message: string }> {
	return await new Promise((resolve) => {
		// Полный накопленный текст результата.
		// Каждый новый chunk добавляется в конец.
		let fullText = ''

		const { close } = openSse(url, {
			onChunk: (data) => {
				// `data` — строка, которую сервер отправил в SSE событии `chunk`.
				// По протоколу нашего сервера это JSON: { "text": "..." }.
				const text = safeReadChunkText(data)
				if (text === null) {
					// Если JSON не распарсился, дальше продолжать нет смысла — закрываем соединение.
					close()
					resolve({ type: 'error', message: 'Ошибка чтения ответа' })
					return
				}

				// Наращиваем накопленный текст.
				fullText += text
				// Сообщаем наверх о прогрессе.
				options?.onChunk?.(text, fullText)
			},
			// Сервер завершил поток.
			onDone: () => resolve({ type: 'ok', fullText }),
			// Сервер сообщил об ошибке или произошла транспортная ошибка.
			onError: (message) => resolve({ type: 'error', message }),
		})
	})
}

/**
 * Безопасно парсим JSON из чанка.
 * Если сервер прислал невалидный JSON — возвращаем null.
 */
function safeReadChunkText(data: string): null | string {
	try {
		const parsed = JSON.parse(data) as { text?: string }
		return parsed.text ?? ''
	} catch (error) {
		return null
	}
}
