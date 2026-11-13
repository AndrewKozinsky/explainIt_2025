/**
 * Настройки PostHog (облако EU).
 *
 * Браузер отправляет запросы не напрямую в PostHog, а на свой путь `proxyPath`:
 * Next.js пересылает их дальше (см. `rewrites` в `next.config.ts`). Так запросы
 * не режут блокировщики рекламы.
 */
export const posthogConfig = {
	/** Путь на своём домене, через который идут запросы к PostHog. */
	proxyPath: '/ingest',
	/** Адрес приёма событий PostHog EU. */
	ingestHost: 'https://eu.i.posthog.com',
	/** Адрес статических файлов PostHog EU (скрипты записи сессий и т. п.). */
	assetsHost: 'https://eu-assets.i.posthog.com',
	/** Адрес интерфейса PostHog EU: нужен для ссылок из тулбара. */
	uiHost: 'https://eu.posthog.com',
	/**
	 * Атрибут поля ввода, значение которого видно в записи сессии.
	 * Остальные поля в записях скрыты звёздочками.
	 */
	unmaskedInputAttribute: 'data-posthog-unmask',
} as const
