/**
 * Определяет серверный ли это компонент
 */
export function isServerComponent() {
	try {
		window.blur()
		return false
	} catch (err) {
		return true
	}
}

export async function wait(delay: number): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, delay))
}
