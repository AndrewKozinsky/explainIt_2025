/**
 * Событие личного SSE-потока пользователя `GET /api/user/events`.
 * Зеркало серверного типа `server/src/types/userStreamEvent.ts`.
 */
export type UserStreamEvent = UserBalanceStreamEvent

/** Текущий баланс в микродолларах; может быть отрицательным. Приходит при подключении и после каждого изменения. */
export type UserBalanceStreamEvent = { type: 'balance'; balance: number }
