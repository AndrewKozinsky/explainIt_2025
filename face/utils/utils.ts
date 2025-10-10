/** Определяет серверный ли это компонент */
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

export function isMacOS(): boolean {
	if (typeof navigator === 'undefined') return false
	const ua = navigator.userAgent || ''
	const platform = (navigator as any).platform || ''
	return /Mac|Macintosh|Mac OS/.test(ua) || /Mac/.test(platform)
}
