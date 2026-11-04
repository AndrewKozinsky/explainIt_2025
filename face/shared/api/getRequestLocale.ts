import { languageKeys } from '@/shared/utils/languages'

/**
 * Возвращает локаль интерфейса для заголовка `Accept-Language` запросов к API.
 * Сервер по ней выбирает переводы контента: названия и описания групп и сценариев диалогов.
 * В браузере локаль берётся из первого сегмента адреса (у всех страниц есть префикс локали),
 * при серверном рендеринге — из next-intl. Если определить локаль не удалось, возвращается null.
 */
export async function getRequestLocale(): Promise<null | string> {
	if (typeof window !== 'undefined') {
		const segment = window.location?.pathname.split('/')[1] ?? ''
		return (languageKeys as readonly string[]).includes(segment) ? segment : null
	}

	try {
		const { getLocale } = await import('next-intl/server')
		return await getLocale()
	} catch {
		// Вне контекста запроса (например, при сборке) локали нет — сервер вернёт тексты на английском.
		return null
	}
}
