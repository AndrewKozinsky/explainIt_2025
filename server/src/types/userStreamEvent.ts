/**
 * События личного SSE-потока пользователя (`GET /api/user/events`).
 * Клиентское зеркало: `face/entities/user/types/userStreamEvent.ts`.
 */
export type UserStreamEvent = UserBalanceStreamEvent

/**
 * Текущий баланс пользователя в микродолларах; может быть отрицательным.
 * Приходит сразу после подключения и после каждого изменения баланса.
 */
export type UserBalanceStreamEvent = {
	type: 'balance'
	balance: number
}
