import { Suspense } from 'react'
import AuthConfirmEmailPage from '../../../_pages/auth/AuthConfirmEmailPage/AuthConfirmEmailPage'
import Spinner from '@/ui/Spinner/Spinner'

export default async function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<AuthConfirmEmailPage />
		</Suspense>
	)
}
