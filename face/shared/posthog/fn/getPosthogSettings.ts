import mainConfig from '@/shared/consts/mainConfig'
import { getRuntimeRegion } from '@/shared/utils/getRuntimeRegion'

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
 * Токен читается по имени из переменной, а не как `process.env.NEXT_PUBLIC_…`,
 * чтобы брать значение при запросе, а не подставленное при сборке.
 */
export function getPosthogSettings(): PosthogSettings | null {
	const projectTokenVariableName = 'NEXT_PUBLIC_POSTHOG_KEY'
	const projectToken = process.env[projectTokenVariableName]

	if (mainConfig.workingMode !== 'servermaster' || getRuntimeRegion() !== 'intl' || !projectToken) return null

	return { projectToken }
}
