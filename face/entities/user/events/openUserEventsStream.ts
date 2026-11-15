import type { UserStreamEvent } from '../types/userStreamEvent'

const userEventsUrl = '/api/user/events'

type UserEventsHandlers = {
	balanceChanged: (balance: number) => void
}

/**
 * Открывает личный SSE-поток пользователя.
 * При обрыве EventSource переподключается сам, а сервер сразу присылает текущий баланс.
 * Закрывает поток вызывающий код.
 */
export function openUserEventsStream(handlers: UserEventsHandlers): EventSource {
	const eventSource = new EventSource(userEventsUrl)

	eventSource.onmessage = function (message) {
		const event = parseUserStreamEvent(message.data)

		if (event?.type === 'balance') handlers.balanceChanged(event.balance)
	}

	return eventSource
}

function parseUserStreamEvent(rawEvent: string): null | UserStreamEvent {
	try {
		const event = JSON.parse(rawEvent) as UserStreamEvent

		if (event.type === 'balance' && Number.isFinite(event.balance)) return event
	} catch {
		// Повреждённое событие пропускается: следующее принесёт актуальный баланс.
	}

	return null
}
