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

export function getDeviceType(): 'touch' | 'mouse' {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'mouse'
	try {
		const hasTouch =
			'ontouchstart' in window || (navigator as any).maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

		const isCoarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches
		return hasTouch || isCoarse ? 'touch' : 'mouse'
	} catch {
		return 'mouse'
	}
}
