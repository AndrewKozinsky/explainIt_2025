/**
 * SSE (Server‑Sent Events) — это способ, которым сервер может "пушить" данные в браузер
 * по одному HTTP‑соединению, не дожидаясь, пока клиент сделает следующий запрос.
 *
 * В браузере SSE реализован через стандартный API `EventSource`:
 * - браузер сам держит соединение открытым
 * - браузер сам умеет переподключаться (по умолчанию)
 * - данные приходят как поток событий
 *
 * Важно:
 * - `EventSource` работает только в браузере (в Node.js его нет без полифилла)
 * - события могут быть "обычными" (event: message) и кастомными (event: chunk/done/error)
 *
 * В нашем проекте сервер отправляет кастомные SSE‑события:
 * - `chunk` — очередной кусочек результата (JSON строка, обычно { "text": "..." })
 * - `done` — сервер закончил генерацию
 * - `error` — сервер прислал ошибку (JSON строка вида { "message": "..." })
 *
 * Эта функция — тонкий транспортный слой:
 * она НИЧЕГО не знает про бизнес‑логику, а только:
 * - открывает соединение
 * - маршрутизирует события в коллбеки
 * - умеет безопасно закрыть соединение
 */
export function openSse(
	url: string,
	handlers: {
		onChunk?: (data: string) => void
		onDone?: () => void
		onError?: (message: string) => void
	},
) {
	// EventSource начинает запрос немедленно и держит соединение открытым.
	const source = new EventSource(url)
	let closed = false

	// Закрытие нужно обязательно делать:
	// - чтобы не держать лишние сетевые соединения
	// - чтобы не продолжать получать события после завершения/ошибки
	function close() {
		if (closed) return

		closed = true
		source.close()
	}

	// Сервер прислал часть результата (строку JSON).
	source.addEventListener('chunk', (event) => {
		handlers.onChunk?.((event as MessageEvent).data)
	})

	// Сервер сигнализирует, что поток завершён.
	source.addEventListener('done', () => {
		handlers.onDone?.()
		close()
	})

	// Сервер прислал кастомное SSE-событие error (это НЕ то же самое, что source.onerror).
	// Мы пытаемся достать сообщение об ошибке из JSON.
	source.addEventListener('error', (event) => {
		let message = 'Ошибка SSE соединения'

		try {
			const data = JSON.parse((event as MessageEvent).data) as { message?: string }
			if (data.message) message = data.message
		} catch (error) {}

		handlers.onError?.(message)
		close()
	})

	// Низкоуровневая ошибка транспорта (например, сеть/сервер недоступен).
	// В этом случае у нас нет JSON от сервера.
	source.onerror = () => {
		handlers.onError?.('Ошибка SSE соединения')
		close()
	}

	return { close }
}
