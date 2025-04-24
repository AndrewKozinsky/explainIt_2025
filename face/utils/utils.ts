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
