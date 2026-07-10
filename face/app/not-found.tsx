import { Link } from '@/i18n/routing'

export default function NotFound() {
	return (
		<div>
			<h1>Page not found</h1>
			<Link href='/'>To the main page</Link>
		</div>
	)
}
