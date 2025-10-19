import { Suspense } from 'react'
import OAuthPage from '../../../../_pages/auth/OAuthPage/OAuthPage'
import Spinner from '@/ui/Spinner/Spinner'

export default async function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<OAuthPage providerType='yandex' />
		</Suspense>
	)
}
