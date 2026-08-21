/**
 * Таймаут синхронного запроса к LLM (перевод, транскрипция).
 * Должен быть меньше proxy_read_timeout nginx (60с по умолчанию),
 * чтобы в случае зависшего LLM ошибка успела дойти до клиента до 504.
 */
export const LLM_TRANSLATION_TIMEOUT_MS = 55_000

export async function wait(delay: number): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, delay))
}
