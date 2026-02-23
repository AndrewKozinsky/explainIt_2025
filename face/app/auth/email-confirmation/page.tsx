import { Suspense } from 'react'
import Spinner from '@/ui/Spinner/Spinner'
import AuthConfirmEmailPage from '../../../_pages/auth/AuthConfirmEmailPage/AuthConfirmEmailPage'

export default async function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<AuthConfirmEmailPage />
		</Suspense>
	)
}
