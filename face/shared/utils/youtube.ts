/**
 * Распознаёт YouTube-адрес и достаёт из него идентификатор видео.
 *
 * Принимает только полные URL с доменом, чтобы не путать видео-ID
 * с обычным поисковым запросом. Строка `xyhjWY3X9dE` без домена
 * вернёт null и будет обработана как поисковый запрос.
 *
 * Поддерживаемые форматы:
 *   https://www.youtube.com/watch?v={id}
 *   https://youtube.com/watch?v={id}
 *   https://m.youtube.com/watch?v={id}
 *   https://youtu.be/{id}
 *   https://www.youtube.com/embed/{id}
 *   https://www.youtube.com/shorts/{id}
 *
 * ID видео — ровно 11 символов из [a-zA-Z0-9_-].
 *
 * @returns videoId или null, если строка не является YouTube-адресом.
 */
export function extractYouTubeVideoId(input: string): null | string {
	const trimmed = input.trim()
	if (!trimmed) return null

	let url: URL

	try {
		// Префикс https:// позволяет парсить адреса без протокола: "youtube.com/watch?v=..."
		const normalized = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
		url = new URL(normalized)
	} catch {
		return null
	}

	const hostname = url.hostname.replace(/^(www\.|m\.)/, '')

	if (hostname === 'youtu.be') {
		const id = url.pathname.split('/')[1]
		return isValidVideoId(id) ? id : null
	}

	if (hostname !== 'youtube.com') return null

	if (url.pathname === '/watch') {
		const v = url.searchParams.get('v')
		return v && isValidVideoId(v) ? v : null
	}

	const match = url.pathname.match(/^\/(embed|shorts)\/([a-zA-Z0-9_-]{11})$/)
	if (match && isValidVideoId(match[2])) {
		return match[2]
	}

	return null
}

function isValidVideoId(id: string): boolean {
	return /^[a-zA-Z0-9_-]{11}$/.test(id)
}
