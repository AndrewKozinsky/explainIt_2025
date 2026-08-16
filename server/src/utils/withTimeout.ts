/**
 * Выполняет promise с ограничением по времени. Если promise не завершился
 * за timeoutMs — отклоняется ошибкой из errorFactory.
 *
 * Внимание: сам promise при таймауте не отменяется — его результат (если
 * он в итоге придёт) просто отбрасывается.
 */
export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorFactory: () => Error): Promise<T> {
	let timer: NodeJS.Timeout | undefined

	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => {
			reject(errorFactory())
		}, timeoutMs)
	})

	try {
		return await Promise.race([promise, timeout])
	} finally {
		if (timer) clearTimeout(timer)
	}
}
