import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuthControllerConfirmEmail } from '@/shared/api/generated/auth/auth'

export type ConfirmationStatus = 'loading' | 'success' | 'error'

export function useConfirmEmail() {
	const { mutateAsync: confirmEmail } = useAuthControllerConfirmEmail()

	const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>('loading')

	const searchParams = useSearchParams()
	const confirmationCode = searchParams.get('code')

	useEffect(
		function () {
			if (!confirmationCode) {
				setConfirmationStatus('error')
				return
			}

			confirmEmail({ data: { code: confirmationCode } })
				.then(function () {
					setConfirmationStatus('success')
				})
				.catch(function (err) {
					console.log(err)
					setConfirmationStatus('error')
				})
		},
		[confirmationCode, confirmEmail],
	)

	return confirmationStatus
}
