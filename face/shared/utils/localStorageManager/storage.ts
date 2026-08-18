export function getItem(key: string): string | null {
	if (typeof window === 'undefined') return null
	return window.localStorage.getItem(key)
}

export function setItem(key: string, value: string) {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(key, value)
}

export function removeItem(key: string) {
	if (typeof window === 'undefined') return
	window.localStorage.removeItem(key)
}
