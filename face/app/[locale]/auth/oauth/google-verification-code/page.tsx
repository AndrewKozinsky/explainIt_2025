import { Suspense } from 'react'
import Spinner from '@/ui/Spinner/Spinner'
import OAuthPage from '_pages/auth/OAuthPage/OAuthPage'

export default async function Page() {
	return (
		<Suspense fallback={<Spinner size='small' />}>
			<OAuthPage providerType='google' />
		</Suspense>
	)
}
