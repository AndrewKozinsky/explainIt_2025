import mainConfig from '@/shared/consts/mainConfig'

/** Настройки, с которыми клиент запускает PostHog. */
export type PosthogSettings = {
	/** Публичный токен проекта PostHog (`phc_…`). */
	projectToken: string
}

/**
 * Возвращает настройки PostHog или null, если PostHog в этом окружении выключен.
 *
 * Вызывается только на сервере (в layout), при каждом запросе.
 * PostHog работает только на рабочем сервере (servermaster) в регионе intl (immersia.site):
 * на explainit.ru, develop-сервере и локально его нет.
 *
 * Переменные читаются по имени из переменной, а не как `process.env.NEXT_PUBLIC_…`:
 * Next.js подставляет такие обращения значением на момент сборки, а регион
 * задаётся docker-compose уже при запуске контейнера.
 */
export function getPosthogSettings(): PosthogSettings | null {
	const regionVariableName = 'NEXT_PUBLIC_REGION'
	const projectTokenVariableName = 'NEXT_PUBLIC_POSTHOG_KEY'

	const region = process.env[regionVariableName]
	const projectToken = process.env[projectTokenVariableName]

	if (mainConfig.workingMode !== 'servermaster' || region !== 'intl' || !projectToken) return null

	return { projectToken }
}
