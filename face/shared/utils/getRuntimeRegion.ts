/**
 * Возвращает регион сайта (`ru` — explainit.ru, `intl` — immersia.site) на момент запроса.
 * Вызывается только на сервере.
 *
 * Регион docker-compose передаёт контейнеру при запуске, а `process.env.NEXT_PUBLIC_REGION`
 * Next.js подставил бы значением на момент сборки, когда региона ещё нет.
 * Поэтому переменная читается по имени из переменной.
 */
export function getRuntimeRegion(): 'ru' | 'intl' | undefined {
	const regionVariableName = 'NEXT_PUBLIC_REGION'
	const region = process.env[regionVariableName]

	return region === 'ru' || region === 'intl' ? region : undefined
}
