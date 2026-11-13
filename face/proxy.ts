import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
	// ingest — запросы PostHog (см. posthogConfig.proxyPath), их не нужно локализовать.
	matcher: ['/((?!api|ingest|_next|_vercel|.*\\..*).*)'],
}
