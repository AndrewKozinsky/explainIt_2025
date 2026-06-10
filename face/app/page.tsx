import { redirect } from 'next/navigation'

/**
 * Корневая страница.
 *
 * Middleware автоматически редиректит `/` на `/{locale}`.
 * Эта страница — fallback на случай, если middleware не сработал.
 */
export default function RootPage() {
	redirect('/en')
}
