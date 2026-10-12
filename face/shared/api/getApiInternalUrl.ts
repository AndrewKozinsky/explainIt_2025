/** Адрес NestJS для серверных запросов: контейнер текущего MODE или локальный процесс. */
export function getApiInternalUrl(): string {
	if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL
	if (process.env.MODE) return `http://explainserver${process.env.MODE}:3001`
	return 'http://localhost:3001'
}
